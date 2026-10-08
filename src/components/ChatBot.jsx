import { useState, useRef, useEffect } from "react";
import Sprite from "./personagem/Sprite";
import { ANIMS, VARIACOES, precarregarSprites } from "./personagem/anims";

// Backend do chat: serverless function em api/chat.js.
//
// O RAG é feito lá dentro — a base de conhecimento é o arquivo
// knowledge/perfil-lucas.md, injetado no system prompt da LLM (Groq).
// A chave de API vive só no servidor, nunca no bundle do front.
//
// Em produção (Vercel) a rota existe nativamente. Em dev, o plugin
// `apiDev` do vite.config.js monta o mesmo handler no dev server, então
// `npm run dev` já funciona — não precisa de `vercel dev`.
const API_CHAT = "/api/chat";

async function chamarApi(payload) {
  const res = await fetch(API_CHAT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const tipo = res.headers.get("content-type") || "";
  const ehJson = tipo.includes("application/json");

  if (!res.ok) {
    if (ehJson) {
      const corpo = await res.json().catch(() => null);
      throw new Error(corpo?.error || `HTTP ${res.status}`);
    }
    // HTML em vez de JSON = a rota /api/chat não existe nesse deploy
    if (res.status === 404) {
      throw new Error(
        "Rota /api/chat não encontrada no deploy. A pasta api/ foi enviada ao Git?"
      );
    }
    throw new Error(`HTTP ${res.status} (resposta não-JSON)`);
  }

  if (!ehJson) {
    throw new Error(
      "A rota /api/chat devolveu HTML em vez de JSON — a serverless function não está ativa."
    );
  }

  return await res.json();
}

// Extrai o texto da resposta, aceitando os formatos mais comuns
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

// Durante o passeio, quando ele vai correndo, dá um pulo antes de voltar.
// Bote false pra tirar o pulo sem mexer no resto.
const COM_PULO = true;

// A partir do texto do bot, escolhe uma reação do personagem (ou null = neutro).
function detectarEmocao(txt) {
  const t = (txt || "").toLowerCase();
  if (
    /😄|😁|😊|🎉|🥳|👍|🙌|😎|legal|[óo]tim|show|maravilh|perfeito|adoro|amei|excelente|parab[eé]|boa!/.test(
      t
    )
  )
    return "happy";
  if (/😠|😡|🚫|n[ãa]o posso|proib|jamais|cuidado|aten[çc][ãa]o/.test(t))
    return "angry";
  if (
    /😢|😞|😔|desculp|infelizmente|n[ãa]o consegui|que pena|triste|erro|falha/.test(
      t
    )
  )
    return "sad";
  if (/😮|😲|🤯|uau|nossa|incr[íi]vel|surpreend|caramba|puxa|s[ée]rio\?/.test(t))
    return "surprise";
  return null;
}

// Primeira fala e teaser mudam conforme a página onde o bot aparece.
const SAUDACAO = {
  home: "E aí! 👋 Sou o El Bigode, assistente do Lucas. Manda a pergunta que eu respondo!",
  filmes:
    "E aí! 👋 Sou o El Bigode. Quer saber se o Lucas já viu algum filme? Pergunta aí! 🍿",
};

const TEASER = {
  home: "Fala comigo! 💬",
  filmes: "Pergunta de filme? 🍿",
};

export default function ChatBot({ contexto = "home" }) {
  const [open, setOpen] = useState(false);
  const [mensagens, setMensagens] = useState([
    {
      autor: "bot",
      texto: SAUDACAO[contexto] ?? SAUDACAO.home,
    },
  ]);
  const [input, setInput] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState(null); // null = sem erro; string = detalhe técnico
  const [teaser, setTeaser] = useState(false);

  // ---- estado das animações do personagem ----
  const [charAnim, setCharAnim] = useState("idle");
  const [playId, setPlayId] = useState(0); // muda a cada pedido: força reiniciar a animação
  const charAnimRef = useRef("idle");
  const baseRef = useRef("idle"); // loop de fundo (idle enquanto parado, typing enquanto responde)
  const fila = useRef([]); // reações one-shot em espera
  const [passeioX, setPasseioX] = useState(0); // deslocamento horizontal do passeio
  const passeioRef = useRef({ ativo: false, cancelar: false });
  const enviandoRef = useRef(false);

  // ---- narração (El Bigode comentando a navegação) ----
  const [narracao, setNarracao] = useState(null);
  const openRef = useRef(false);
  const secAtualRef = useRef(null);
  const projAtualRef = useRef(null);
  const narracaoTimer = useRef(null);

  useEffect(() => {
    charAnimRef.current = charAnim;
  }, [charAnim]);
  useEffect(() => {
    enviandoRef.current = enviando;
  }, [enviando]);

  // Aplica uma animação. O playId muda sempre, então pedir a MESMA animação
  // de novo reinicia a reprodução (sem isso ela congelava no último quadro).
  function aplicar(nome) {
    const n = ANIMS[nome] ? nome : "idle";
    charAnimRef.current = n;
    setCharAnim(n);
    setPlayId((p) => p + 1);
  }
  // Toca a próxima reação da fila; se vazia, volta pro loop de fundo.
  function avancar() {
    if (fila.current.length) aplicar(fila.current.shift());
    else aplicar(baseRef.current);
  }
  // Enfileira reações one-shot; começa na hora se o personagem estiver em loop.
  function reagir(...nomes) {
    for (const n of nomes) {
      if (!ANIMS[n]) continue;
      // não empilha a mesma reação repetida (hover em vários cards, etc.)
      if (fila.current[fila.current.length - 1] === n) continue;
      fila.current.push(n);
    }
    if (fila.current.length > 3) fila.current = fila.current.slice(-3);
    if (ANIMS[charAnimRef.current]?.loop) avancar();
  }
  // Troca o loop de fundo (idle <-> typing/think).
  function definirBase(nome) {
    baseRef.current = nome;
    if (!fila.current.length && ANIMS[charAnimRef.current]?.loop) aplicar(nome);
  }

  // Frases por seção da página (El Bigode como guia).
  const NARR_SECOES = {
    "home-hero": ["Bem-vindo! 👋 Eu sou o El Bigode, seu guia por aqui.", "wave"],
    "sobre-mim": ["Essa é a área Sobre Mim — quem é o Lucas de verdade. Dá uma lida! 👀", "happy"],
    projetos: ["Chegamos nos Projetos! 🚀 Passa o mouse num card que eu te conto sobre ele.", "surprise"],
    experiencia: ["Aqui é a Experiência dele — por onde já passou. 💼", "think"],
    estimador: ["Esse é o Estimador de Projeto — simula um orçamento rapidinho. 🧮", "coffee"],
  };

  // Mostra um balão de narração (só com o chat fechado) e some depois de um tempo.
  function narrar(texto, anim) {
    if (openRef.current) return;
    setTeaser(false);
    setNarracao(texto);
    if (anim) reagir(anim);
    clearTimeout(narracaoTimer.current);
    narracaoTimer.current = setTimeout(() => setNarracao(null), 5200);
  }

  useEffect(() => {
    openRef.current = open;
  }, [open]);

  // Rede de segurança: se uma animação de tiro único não avisar que terminou
  // (aba em segundo plano, quadro perdido), volta sozinha pro estado base.
  useEffect(() => {
    if (ANIMS[charAnim]?.loop) return;
    const t = setTimeout(() => avancar(), 3000);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [charAnim, playId]);

  const scrollRef = useRef(null);
  const inputRef = useRef(null);
  // sessionId estável durante a visita, para identificar a conversa nos logs
  const sessionIdRef = useRef(
    typeof crypto !== "undefined" && crypto.randomUUID
      ? crypto.randomUUID()
      : `sess-${Date.now()}-${Math.random().toString(16).slice(2)}`
  );

  // Pré-carrega os sprites e mostra o teaser depois de um tempinho.
  useEffect(() => {
    precarregarSprites();
    const t = setTimeout(() => setTeaser(true), 1800);
    return () => clearTimeout(t);
  }, []);

  // "Vida" quando parado: de vez em quando dá um aceno/toma um café.
  useEffect(() => {
    const id = setInterval(() => {
      if (
        !enviandoRef.current &&
        fila.current.length === 0 &&
        baseRef.current === "idle" &&
        ANIMS[charAnimRef.current]?.loop &&
        Math.random() < 0.6
      ) {
        reagir(VARIACOES[Math.floor(Math.random() * VARIACOES.length)]);
      }
    }, 9000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // De vez em quando ele sai andando (ou correndo) pela tela e volta pro canto.
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    const espera = (ms) => new Promise((r) => setTimeout(r, ms));

    // desliza de `de` até `para` no tempo pedido, quadro a quadro
    function deslizar(de, para, ms) {
      return new Promise((resolve) => {
        let inicio = 0;
        function passo(ts) {
          if (!inicio) inicio = ts;
          const t = Math.min(1, (ts - inicio) / ms);
          setPasseioX(de + (para - de) * t);
          if (t < 1 && !passeioRef.current.cancelar) requestAnimationFrame(passo);
          else resolve();
        }
        requestAnimationFrame(passo);
      });
    }

    async function passear() {
      const p = passeioRef.current;
      if (p.ativo) return;
      p.ativo = true;
      p.cancelar = false;

      const dist = Math.min(340, Math.max(120, window.innerWidth - 220));
      const correndo = Math.random() < 0.35;
      const vel = correndo ? 210 : 90; // px por segundo
      const dur = (dist / vel) * 1000;

      try {
        definirBase(correndo ? "runLeft" : "walkLeft");
        await deslizar(0, -dist, dur);
        if (p.cancelar) return;

        definirBase("idle");
        await espera(500);
        if (p.cancelar) return;

        if (COM_PULO && correndo) {
          aplicar("jump");
          await espera(720);
          if (p.cancelar) return;
        }

        definirBase(correndo ? "runRight" : "walkRight");
        await deslizar(-dist, 0, dur);
      } finally {
        setPasseioX(0);
        p.ativo = false;
        if (!enviandoRef.current) definirBase("idle");
      }
    }

    const id = setInterval(() => {
      if (
        passeioRef.current.ativo ||
        openRef.current ||
        enviandoRef.current ||
        fila.current.length ||
        baseRef.current !== "idle" ||
        !ANIMS[charAnimRef.current]?.loop ||
        Math.random() > 0.35
      )
        return;
      passear();
    }, 22000);

    return () => {
      passeioRef.current.cancelar = true;
      clearInterval(id);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Abrir o chat interrompe o passeio.
  useEffect(() => {
    if (open) passeioRef.current.cancelar = true;
  }, [open]);

  // Narra a seção que entra na faixa central da tela.
  useEffect(() => {
    const ids = ["home-hero", "sobre-mim", "projetos", "experiencia", "estimador"];
    const els = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    if (!els.length) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && e.target.id !== secAtualRef.current) {
            secAtualRef.current = e.target.id;
            const n = NARR_SECOES[e.target.id];
            if (n) narrar(n[0], n[1]);
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Narra o projeto (ou o filme) sob o mouse.
  useEffect(() => {
    function onOver(e) {
      if (openRef.current) return;
      const card = e.target.closest?.("[data-projeto], [data-filme]");
      if (!card) {
        projAtualRef.current = null;
        return;
      }
      const filme = card.getAttribute("data-filme");
      if (filme) {
        if (filme === projAtualRef.current) return;
        projAtualRef.current = filme;
        const ano = card.getAttribute("data-ano");
        narrar(
          ano
            ? `${filme} (${ano})? Esse o Lucas já viu! 🍿`
            : `${filme}? Esse o Lucas já viu! 🍿`,
          "happy"
        );
        return;
      }
      const nome = card.getAttribute("data-projeto");
      if (!nome || nome === projAtualRef.current) return;
      projAtualRef.current = nome;
      const tecs = card.getAttribute("data-tecs") || "";
      narrar(
        tecs ? `Esse é o ${nome}! Feito com ${tecs}. 🔧` : `Esse é o ${nome}! 🔧`,
        "happy"
      );
    }
    document.addEventListener("mouseover", onOver);
    return () => document.removeEventListener("mouseover", onOver);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Rola pro fim sempre que chega mensagem nova
  useEffect(() => {
    if (scrollRef.current)
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [mensagens, enviando, open]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 120);
  }, [open]);

  function alternar() {
    setTeaser(false);
    setNarracao(null);
    clearTimeout(narracaoTimer.current);
    setOpen((v) => {
      const novo = !v;
      if (novo) reagir("surprise", "wave"); // reação ao abrir
      return novo;
    });
  }

  async function enviarMensagem(e) {
    e?.preventDefault();
    const texto = input.trim();
    if (!texto || enviando) return;

    setMensagens((prev) => [...prev, { autor: "user", texto }]);
    setInput("");
    setEnviando(true);
    setErro(null);

    // pensa e depois "digita"
    definirBase("think");
    reagir("surprise");
    const tTyping = setTimeout(() => {
      if (enviandoRef.current)
        definirBase(Math.random() < 0.5 ? "typing" : "computer");
    }, 900);

    try {
      const data = await chamarApi({
        chatInput: texto,
        sessionId: sessionIdRef.current,
        historico: mensagens.slice(-10),
      });

      const textoExtraido = extrairResposta(data);
      if (!textoExtraido) console.warn("Resposta inesperada da API:", data);

      const respostaBot =
        textoExtraido || "Desculpe, não consegui gerar uma resposta.";

      setMensagens((prev) => [...prev, { autor: "bot", texto: respostaBot }]);

      // reação conforme o tom da resposta
      definirBase("idle");
      const emo = textoExtraido ? detectarEmocao(respostaBot) : "sad";
      reagir(emo || "wave");
    } catch (err) {
      console.error("Erro ao falar com /api/chat:", err);
      const detalhe = err?.message || "erro desconhecido";
      setErro(detalhe);
      setMensagens((prev) => [
        ...prev,
        {
          autor: "bot",
          texto:
            "Não consegui me conectar ao servidor do chat agora. Tenta de novo daqui a pouco.",
        },
      ]);
      definirBase("idle");
      reagir("sad");
    } finally {
      clearTimeout(tTyping);
      setEnviando(false);
    }
  }

  const CHAR = 116; // tamanho do personagem em px

  return (
    <div
      className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2 pointer-events-none"
      style={{ transform: `translateX(${passeioX}px)`, willChange: "transform" }}
    >
      {/* ---------- BALÃO DE HQ (aberto) — cores do site ---------- */}
      {open && (
        <div className="hq-pop pointer-events-auto relative w-[22rem] max-w-[calc(100vw-2rem)] font-hq">
          {/* halo azul, igual aos cards do site */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-[24px] blur opacity-20 pointer-events-none" />

          <div className="relative bg-gradient-to-br from-gray-900 to-gray-950 border-[3px] border-cyan-500/50 rounded-[22px] hq-shadow overflow-hidden">
            {/* linha de scan no topo */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-70" />

            {/* cabeçalho */}
            <div className="flex items-center justify-between px-3.5 py-2.5 border-b border-gray-800">
              <div className="flex items-center gap-2">
                <span className="font-hq-title text-xl leading-none bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  EL BIGODE
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-1.5 py-0.5 rounded">
                  IA
                </span>
                <span className="flex items-center gap-1.5 text-[11px] text-gray-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  online
                </span>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="w-6 h-6 grid place-items-center rounded-full text-gray-500 hover:text-cyan-400 hover:bg-gray-800 transition-colors"
                aria-label="Fechar chat"
              >
                ✕
              </button>
            </div>

            {/* mensagens */}
            <div
              ref={scrollRef}
              className="max-h-[42vh] min-h-[6rem] overflow-y-auto p-3 space-y-2.5"
              style={{
                backgroundImage:
                  "radial-gradient(rgba(6,182,212,0.10) 1px, transparent 1px)",
                backgroundSize: "12px 12px",
              }}
            >
              {mensagens.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${
                    m.autor === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] px-3.5 py-2 text-[15px] font-semibold leading-snug whitespace-pre-wrap break-words ${
                      m.autor === "user"
                        ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-2xl rounded-br-md shadow-lg shadow-blue-500/20"
                        : "bg-gray-900/70 border border-gray-700 text-gray-200 rounded-2xl rounded-bl-md"
                    }`}
                  >
                    {m.texto}
                  </div>
                </div>
              ))}

              {enviando && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-1 bg-gray-900/70 border border-gray-700 rounded-2xl rounded-bl-md px-3 py-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 hq-dot" />
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-cyan-400 hq-dot"
                      style={{ animationDelay: "0.15s" }}
                    />
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-cyan-400 hq-dot"
                      style={{ animationDelay: "0.3s" }}
                    />
                  </div>
                </div>
              )}

              {erro && (
                <p className="text-[11px] text-red-400 font-mono break-words">
                  {erro}
                </p>
              )}
            </div>

            {/* input */}
            <form
              onSubmit={enviarMensagem}
              className="flex items-center gap-2 p-2.5 border-t border-gray-800"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Escreve aqui..."
                className="flex-1 bg-gray-950 text-gray-200 text-[15px] font-semibold placeholder-gray-600 border border-gray-700 rounded-xl px-3 py-2 outline-none focus:border-cyan-500/60 transition-colors"
                disabled={enviando}
              />
              <button
                type="submit"
                disabled={enviando || !input.trim()}
                className="w-10 h-10 grid place-items-center rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white shrink-0 hover:shadow-lg hover:shadow-blue-500/30 active:translate-x-[1px] active:translate-y-[1px] disabled:opacity-40 disabled:hover:shadow-none transition-all"
                aria-label="Enviar mensagem"
              >
                ➤
              </button>
            </form>
          </div>

          {/* rabinho do balão apontando pro personagem */}
          <span className="absolute -bottom-[18px] right-12 w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-t-[21px] border-t-cyan-500/50" />
          <span className="absolute -bottom-[13px] right-[51px] w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[15px] border-t-gray-950" />
        </div>
      )}

      {/* ---------- NARRAÇÃO / TEASER (fechado) ---------- */}
      {!open && (narracao || teaser) && (
        <div
          onClick={alternar}
          role="button"
          tabIndex={0}
          className="hq-pop pointer-events-auto relative mr-1 max-w-[15rem] cursor-pointer font-hq font-bold text-[14px] leading-snug text-cyan-100 bg-gray-900 border-[2px] border-cyan-500/50 rounded-2xl rounded-br-md px-3.5 py-2 hq-shadow"
          aria-label="Abrir chat"
        >
          {narracao || TEASER[contexto] || TEASER.home}
          <span className="absolute -bottom-[13px] right-6 w-0 h-0 border-l-[11px] border-l-transparent border-r-[11px] border-r-transparent border-t-[16px] border-t-cyan-500/50" />
          <span className="absolute -bottom-[9px] right-[29px] w-0 h-0 border-l-[7px] border-l-transparent border-r-[7px] border-r-transparent border-t-[11px] border-t-gray-900" />
        </div>
      )}

      {/* ---------- PERSONAGEM ---------- */}
      <button
        onClick={alternar}
        onMouseEnter={() => {
          if (!open) reagir("wave");
        }}
        className="pointer-events-auto relative grid place-items-end select-none focus:outline-none"
        style={{ width: CHAR, height: CHAR }}
        aria-label={open ? "Fechar chat" : "Abrir chat com o assistente"}
      >
        {!open && (
          <span className="absolute bottom-2 left-1/2 -translate-x-1/2 w-16 h-3 rounded-full bg-cyan-500/30 blur-sm animate-pulse" />
        )}
        <Sprite
          nome={charAnim}
          playId={playId}
          size={CHAR}
          onDone={avancar}
          className="drop-shadow-[0_4px_6px_rgba(0,0,0,0.4)]"
        />
      </button>
    </div>
  );
}
