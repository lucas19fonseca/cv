// Serverless Function da Vercel: backend do ChatBot do portfólio.
//
// Substitui o webhook do n8n em produção (o n8n roda em localhost e não é
// acessível pela internet). Chama a Groq API direto, com a chave guardada
// no servidor — ela nunca vai pro navegador.
//
// Variáveis de ambiente (Vercel > Settings > Environment Variables):
//   GROQ_API_KEY   (obrigatória)  console.groq.com/keys
//   GROQ_MODEL     (opcional)     padrão: llama-3.3-70b-versatile

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
const MODELO = process.env.GROQ_MODEL || "openai/gpt-oss-120b";

const MAX_HISTORICO = 10; // últimas mensagens enviadas como contexto

// Cole aqui o mesmo system prompt que você usa no node "Assistente1" do n8n.
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

export default async function handler(req, res) {
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  if (!process.env.GROQ_API_KEY) {
    console.error("GROQ_API_KEY não configurada");
    return res.status(500).json({ error: "Servidor sem chave da Groq" });
  }

  try {
    const body =
      typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};

    const pergunta = String(body.chatInput ?? body.message ?? "").trim();
    if (!pergunta) return res.status(400).json({ error: "Mensagem vazia" });

    // Histórico enviado pelo front (mantém o contexto da conversa, papel da
    // "Memoria1" do n8n). Aceita apenas os campos esperados.
    const historico = Array.isArray(body.historico)
      ? body.historico
          .slice(-MAX_HISTORICO)
          .filter((m) => m && typeof m.texto === "string" && m.texto.trim())
          .map((m) => ({
            role: m.autor === "user" ? "user" : "assistant",
            content: String(m.texto).slice(0, 2000),
          }))
      : [];

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
          ...historico,
          { role: "user", content: pergunta.slice(0, 2000) },
        ],
      }),
    });

    if (!resposta.ok) {
      const detalhe = await resposta.text();
      console.error("Erro da Groq:", resposta.status, detalhe);
      return res.status(502).json({ error: "Falha ao gerar resposta" });
    }

    const dados = await resposta.json();
    const texto = dados?.choices?.[0]?.message?.content?.trim() || "";

    // Mesmo formato do n8n ({ output }), então o ChatBot não muda de parser.
    return res.status(200).json({ output: texto });
  } catch (err) {
    console.error("Erro em /api/chat:", err);
    return res.status(500).json({ error: "Erro interno" });
  }
}
