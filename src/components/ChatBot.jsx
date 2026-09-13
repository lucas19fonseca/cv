import { useState, useRef, useEffect } from "react";

// Backend do chat, por ambiente:
//
// PRODUÇÃO (Vercel) -> /api/chat (serverless function que chama a Groq).
//   localhost:5678 só existe na sua máquina, então o n8n local não serve aqui.
//   Se um dia o n8n ficar exposto na internet, basta definir
//   VITE_N8N_WEBHOOK_URL na Vercel que ele volta a ser usado.
//
// DEV -> n8n local, tentando duas URLs nesta ordem:
//   1. /webhook/      -> funciona sempre que o workflow está ATIVO
//   2. /webhook-test/ -> funciona depois de clicar "Execute workflow"
//                        no n8n (vale para UMA chamada por clique)
//   3. /api/chat      -> fallback (só existe rodando `vercel dev`)
const N8N_BASE = import.meta.env.VITE_N8N_BASE_URL || "http://localhost:5678";
const N8N_WEBHOOK_ID = "02b19a44-a6be-42e8-b1dc-ac69d647111a";
const API_VERCEL = "/api/chat";

const URLS_WEBHOOK = import.meta.env.VITE_N8N_WEBHOOK_URL
  ? [import.meta.env.VITE_N8N_WEBHOOK_URL]
  : import.meta.env.DEV
  ? [
      `${N8N_BASE}/webhook/${N8N_WEBHOOK_ID}`,
      `${N8N_BASE}/webhook-test/${N8N_WEBHOOK_ID}`,
      API_VERCEL,
    ]
  : [API_VERCEL];

// Dispara o POST na primeira URL que responder.
// Um 404 significa "webhook não registrado nessa modalidade" -> tenta a próxima.
async function chamarWebhook(payload) {
  let ultimoErro;

  for (const url of URLS_WEBHOOK) {
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.status === 404) {
        ultimoErro = new Error(`HTTP 404 em ${url}`);
        continue;
      }
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      return await res.json();
    } catch (err) {
      ultimoErro = err;
    }
  }

  throw ultimoErro ?? new Error("Nenhuma URL de webhook respondeu");
}

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [mensagens, setMensagens] = useState([
    {
      autor: "bot",
      texto: "Olá! 👋 Sou o assistente virtual do Lucas. Como posso ajudar?",
    },
  ]);
  const [input, setInput] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState(false);

  const scrollRef = useRef(null);
  const inputRef = useRef(null);
  // sessionId estável durante a visita, para o n8n manter o contexto da conversa
  const sessionIdRef = useRef(
    typeof crypto !== "undefined" && crypto.randomUUID
      ? crypto.randomUUID()
      : `sess-${Date.now()}-${Math.random().toString(16).slice(2)}`
  );

  // Rola pro fim sempre que chega mensagem nova
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [mensagens, enviando]);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  // Extrai o texto da resposta do n8n, aceitando os formatos mais comuns
  function extrairResposta(data) {
    if (data == null) return "";
    if (typeof data === "string") return data;
    if (Array.isArray(data)) return extrairResposta(data[0]);
    return (
      data.output ??
      data.text ??
      data.reply ??
      data.message ??
      data.answer ??
      (data.json ? extrairResposta(data.json) : "") ??
      ""
    );
  }

  async function enviarMensagem(e) {
    e?.preventDefault();
    const texto = input.trim();
    if (!texto || enviando) return;

    setMensagens((prev) => [...prev, { autor: "user", texto }]);
    setInput("");
    setEnviando(true);
    setErro(false);

    try {
      // O node Webhook está como POST: o texto e o sessionId (pra manter o
      // contexto da conversa) vão no corpo em JSON.
      const data = await chamarWebhook({
        chatInput: texto,
        sessionId: sessionIdRef.current,
        // contexto da conversa para o /api/chat (o n8n ignora este campo,
        // lá quem guarda o histórico é o node de memória)
        historico: mensagens.slice(-10),
      });

      const textoExtraido = extrairResposta(data);

      if (!textoExtraido) {
        // Caiu aqui = o n8n respondeu, mas sem o campo de texto do agente.
        // Quase sempre significa que o node Webhook não está ligado ao
        // Assistente, então o n8n devolveu o próprio payload de entrada.
        console.warn("Resposta inesperada do n8n:", data);
      }

      const respostaBot =
        textoExtraido || "Desculpe, não consegui gerar uma resposta.";

      setMensagens((prev) => [...prev, { autor: "bot", texto: respostaBot }]);
    } catch (err) {
      console.error("Erro ao falar com o workflow n8n:", err);
      setErro(true);
      setMensagens((prev) => [
        ...prev,
        {
          autor: "bot",
          texto:
            "Não consegui me conectar ao servidor do chat agora. Tente novamente em instantes.",
        },
      ]);
    } finally {
      setEnviando(false);
    }
  }

  return (
    <>
      {/* Botão flutuante */}
      <button
        onClick={() => setOpen(!open)}
        className="group fixed bottom-5 right-5 z-50 w-14 h-14 rounded-full flex items-center justify-center bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-xl shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/50 hover:scale-105 transition-all duration-300"
        aria-label={open ? "Fechar chat" : "Abrir chat"}
      >
        {!open && (
          <span className="absolute inset-0 rounded-full bg-cyan-500/40 animate-ping" />
        )}
        <i
          className={`relative fa-solid ${
            open ? "fa-xmark" : "fa-comment-dots"
          }`}
        ></i>
      </button>

      {/* Janela do chat */}
      {open && (
        <div className="fixed bottom-24 right-5 z-50 w-[26rem] max-w-[calc(100vw-2.5rem)]">
          {/* Halo do card, igual aos cards do site */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl blur opacity-20 pointer-events-none" />

          <div className="relative h-[28rem] max-h-[75vh] flex flex-col bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 rounded-2xl shadow-2xl overflow-hidden">
            {/* Linha de scan no topo */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-60" />

            {/* Header */}
            <div className="flex justify-between items-center px-4 py-3 border-b border-gray-800 shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center shrink-0">
                  <i className="fa-solid fa-robot text-white text-sm"></i>
                </div>
                <div className="leading-tight">
                  <p className="text-blue-400 font-mono text-[11px] tracking-widest">
                    ASSISTENTE IA
                  </p>
                  <p className="text-gray-500 text-[11px] flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    online
                  </p>
                </div>
              </div>

              <button
                onClick={() => setOpen(false)}
                className="text-gray-500 hover:text-cyan-400 transition-colors"
                aria-label="Fechar chat"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            {/* Mensagens */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 space-y-3 text-sm"
            >
              {mensagens.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${
                    m.autor === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] rounded-xl px-3.5 py-2.5 whitespace-pre-wrap break-words ${
                      m.autor === "user"
                        ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-br-sm shadow-lg shadow-blue-500/20"
                        : "bg-gray-900/60 border border-gray-800 text-gray-300 rounded-bl-sm"
                    }`}
                  >
                    {m.texto}
                  </div>
                </div>
              ))}

              {enviando && (
                <div className="flex justify-start">
                  <div className="bg-gray-900/60 border border-gray-800 rounded-xl rounded-bl-sm px-3 py-2 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce"></span>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <form
              onSubmit={enviarMensagem}
              className="flex items-center gap-2 p-3 border-t border-gray-800 shrink-0"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Digite sua mensagem..."
                className="flex-1 bg-gray-900 border border-gray-800 text-gray-200 text-sm placeholder-gray-600 rounded-lg px-3 py-2 outline-none focus:border-blue-500/60 transition-colors"
                disabled={enviando}
              />
              <button
                type="submit"
                disabled={enviando || !input.trim()}
                className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:shadow-lg hover:shadow-blue-500/30 disabled:opacity-40 disabled:hover:shadow-none text-white w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-all"
                aria-label="Enviar mensagem"
              >
                <i className="fa-solid fa-paper-plane text-sm"></i>
              </button>
            </form>

            {erro && (
              <p className="text-[11px] text-red-400 px-4 pb-2 -mt-1 font-mono">
                Servidor do chat não respondeu. Em dev: ative o workflow do n8n
                (toggle Active) ou clique em "Execute workflow".
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
