// Serverless Function da Vercel: backend do ChatBot do portfólio.
//
// Ordem de tentativa:
//   1. n8n  — o workflow real, exposto na internet via Cloudflare Tunnel.
//             Só é tentado se N8N_WEBHOOK_URL estiver definida.
//   2. Groq — fallback quando o n8n não responde (PC desligado, Docker parado,
//             tunnel caído, timeout). O chat do site nunca fica mudo.
//
// Variáveis de ambiente (Vercel > Settings > Environment Variables):
//   N8N_WEBHOOK_URL  (opcional)    https://n8n.seudominio.com.br/webhook/<id>
//   N8N_API_KEY      (opcional)    valor do Header Auth do node Webhook
//   N8N_HEADER_NAME  (opcional)    padrão: x-api-key
//   N8N_TIMEOUT_MS   (opcional)    padrão: 12000
//   GROQ_API_KEY     (recomendada) console.groq.com/keys
//   GROQ_MODEL       (opcional)    padrão: openai/gpt-oss-120b

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
const MODELO = process.env.GROQ_MODEL || "openai/gpt-oss-120b";

const N8N_URL = process.env.N8N_WEBHOOK_URL || "";
const N8N_HEADER = process.env.N8N_HEADER_NAME || "x-api-key";
const N8N_TIMEOUT = Number(process.env.N8N_TIMEOUT_MS) || 12000;

const MAX_HISTORICO = 10; // últimas mensagens enviadas como contexto

// Mesmo system prompt do node "Assistente1" do n8n, para as duas rotas
// responderem com a mesma persona.
const SYSTEM_PROMPT = `Você é o assistente virtual do portfólio de Lucas Andrade,
desenvolvedor de software com foco em Inteligência Artificial.

Sobre o Lucas:
- Desenvolvedor full stack: React, Vite, TailwindCSS no front; PHP/Laravel e
  Symfony no back; também trabalha com Docker, n8n e automações com IA.
- Desenvolve Expert Advisors em MQL5 para MetaTrader 5.
- Portfólio: https://lucas-andrade.vercel.app
- GitHub: https://github.com/lucas19fonseca

Regras:
- Responda sempre em português do Brasil, de forma curta e direta (2 a 4 frases).
- Fale sobre a carreira, projetos, tecnologias e formas de contato do Lucas.
- Se não souber algo, diga que não tem essa informação e sugira falar com o
  Lucas pelo formulário de contato do site.
- Nunca invente experiências, empresas ou datas.`;

// O n8n pode devolver objeto, array ou string, com o texto em campos diferentes
// dependendo de como o "Respond to Webhook" foi configurado.
function extrairTexto(data) {
  if (data == null) return "";
  if (typeof data === "string") return data.trim();
  if (Array.isArray(data)) return extrairTexto(data[0]);
  if (typeof data !== "object") return "";

  const direto =
    data.output ?? data.text ?? data.reply ?? data.message ?? data.answer;
  if (typeof direto === "string") return direto.trim();

  if (data.json) return extrairTexto(data.json);
  if (data.data) return extrairTexto(data.data);
  return "";
}

function comTimeout(ms) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), ms);
  return { signal: ctrl.signal, cancelar: () => clearTimeout(timer) };
}

// Rota 1: o workflow do n8n. Devolve o texto ou null (para cair no fallback).
async function tentarN8n({ pergunta, sessionId, historico }) {
  if (!N8N_URL) return null;

  const { signal, cancelar } = comTimeout(N8N_TIMEOUT);

  try {
    const headers = { "Content-Type": "application/json" };
    if (process.env.N8N_API_KEY) headers[N8N_HEADER] = process.env.N8N_API_KEY;

    const resposta = await fetch(N8N_URL, {
      method: "POST",
      headers,
      // Mesmo corpo que o front manda em dev, para o workflow não precisar mudar.
      body: JSON.stringify({ chatInput: pergunta, sessionId, historico }),
      signal,
    });

    if (!resposta.ok) {
      console.warn("n8n respondeu", resposta.status, await resposta.text());
      return null;
    }

    const bruto = await resposta.text();
    if (!bruto.trim()) return null;

    let dados;
    try {
      dados = JSON.parse(bruto);
    } catch {
      dados = bruto; // workflow respondendo texto puro
    }

    const texto = extrairTexto(dados);
    if (!texto) {
      console.warn("n8n sem campo de texto na resposta:", bruto.slice(0, 500));
      return null;
    }
    return texto;
  } catch (err) {
    console.warn("n8n indisponível:", err.name === "AbortError" ? "timeout" : err.message);
    return null;
  } finally {
    cancelar();
  }
}

// Rota 2: Groq direto, com a chave guardada no servidor.
async function tentarGroq({ pergunta, historico }) {
  if (!process.env.GROQ_API_KEY) return null;

  const mensagens = historico
    .filter((m) => m && typeof m.texto === "string" && m.texto.trim())
    .map((m) => ({
      role: m.autor === "user" ? "user" : "assistant",
      content: String(m.texto).slice(0, 2000),
    }));

  const resposta = await fetch(GROQ_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: MODELO,
      temperature: 0.6,
      max_tokens: 500,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...mensagens,
        { role: "user", content: pergunta.slice(0, 2000) },
      ],
    }),
  });

  if (!resposta.ok) {
    console.error("Erro da Groq:", resposta.status, await resposta.text());
    return null;
  }

  const dados = await resposta.json();
  return dados?.choices?.[0]?.message?.content?.trim() || null;
}

export default async function handler(req, res) {
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  try {
    const body =
      typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};

    const pergunta = String(body.chatInput ?? body.message ?? "").trim();
    if (!pergunta) return res.status(400).json({ error: "Mensagem vazia" });

    const sessionId = String(body.sessionId ?? "").slice(0, 100);
    const historico = Array.isArray(body.historico)
      ? body.historico.slice(-MAX_HISTORICO)
      : [];

    // 1. n8n
    const viaN8n = await tentarN8n({ pergunta, sessionId, historico });
    if (viaN8n) return res.status(200).json({ output: viaN8n, fonte: "n8n" });

    // 2. Groq
    const viaGroq = await tentarGroq({ pergunta, historico });
    if (viaGroq) return res.status(200).json({ output: viaGroq, fonte: "groq" });

    console.error("Nenhum backend respondeu (n8n e Groq falharam)");
    return res.status(502).json({ error: "Falha ao gerar resposta" });
  } catch (err) {
    console.error("Erro em /api/chat:", err);
    return res.status(500).json({ error: "Erro interno" });
  }
}
