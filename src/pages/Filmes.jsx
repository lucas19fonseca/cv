import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import SpaceBackground from "../components/SpaceBackground";
import { filmes, estatisticas } from "../data/filmes";

// Área do pôster: usa a imagem se houver e carregar; senão, pôster estilizado.
function Poster({ filme }) {
  const [erro, setErro] = useState(false);
  const mostrarImg = filme.poster && !erro;
  return (
    <div className={`relative aspect-[2/3] overflow-hidden bg-gradient-to-br ${filme.cor}`}>
      {mostrarImg ? (
        <img
          src={filme.poster}
          alt={`Pôster de ${filme.titulo}`}
          loading="lazy"
          onError={() => setErro(true)}
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
          <div className="absolute inset-0 opacity-25" style={{ backgroundImage: "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.5) 0.5px, transparent 1px)", backgroundSize: "16px 16px" }} />
          <span className="text-6xl drop-shadow-lg">{filme.emoji}</span>
          <span className="px-3 text-center text-xs font-semibold tracking-wide text-white/70 uppercase">{filme.titulo}</span>
        </div>
      )}

      {/* Scrim + infos sobre o pôster */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/85 to-transparent" />
      <span className="absolute bottom-2.5 left-2.5 right-2.5 text-[10px] font-medium text-cyan-100 bg-cyan-500/20 border border-cyan-400/30 rounded-full px-2 py-1 backdrop-blur-sm inline-flex items-center gap-1.5 w-fit">
        <i className="fa-solid fa-clapperboard text-[9px]" /> {filme.genero}
      </span>
    </div>
  );
}

export default function Filmes() {
  const [genero, setGenero] = useState("Todos");
  const [ordem, setOrdem] = useState("ano");

  const generos = useMemo(() => {
    const set = new Set();
    filmes.forEach((f) => f.genero.split(" / ").forEach((g) => set.add(g.trim())));
    const base = ["Todos", ...Array.from(set).sort()];
    // franquias (Marvel/DC) como filtros extras, no fim
    // Marvel e DC ficam fixos mesmo sem filmes; demais franquias entram automaticamente
    const franquias = Array.from(new Set([...filmes.map((f) => f.franquia).filter(Boolean), "Marvel", "DC"]));
    return [...base, ...franquias];
  }, []);

  const lista = useMemo(() => {
    const arr = filmes.filter((f) => genero === "Todos" || f.genero.includes(genero) || f.franquia === genero);
    const ordenar = {
      ano: (a, b) => b.ano - a.ano,
      titulo: (a, b) => a.titulo.localeCompare(b.titulo),
      duracao: (a, b) => b.duracao.localeCompare(a.duracao),
    };
    return [...arr].sort(ordenar[ordem]);
  }, [genero, ordem]);

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#080831] via-[#0a0a2a] to-[#001233] text-white overflow-hidden">
      <SpaceBackground />

      {/* Botão voltar flutuante (sem header) */}
      <Link
        to="/"
        className="absolute top-5 left-5 z-40 flex items-center gap-2 text-sm text-white/70 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-full pl-3 pr-4 py-2 backdrop-blur-md transition-colors"
      >
        <i className="fa-solid fa-arrow-left" /> Voltar
      </Link>

      <main className="relative z-10 container mx-auto px-4 sm:px-6 pt-8 pb-16">
        {/* Título */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
            Minha{" "}
            <span className="bg-gradient-to-r from-[#0969CC] via-cyan-400 to-[#0969CC] bg-[length:200%_auto] bg-clip-text text-transparent animate-gradient">
              Filmoteca
            </span>
          </h1>

          {/* Estatísticas minimalistas (atualizam sozinhas) */}
          <div className="flex items-center justify-center gap-2.5 mt-6 text-xs">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-white/60">
              <i className="fa-solid fa-film text-[#0969CC] text-[10px]" />
              <b className="text-white tabular-nums">{estatisticas.total}</b> filmes
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-white/60">
              <i className="fa-regular fa-clock text-[#0969CC] text-[10px]" />
              <b className="text-white tabular-nums">{estatisticas.horasLabel}</b> assistidas
            </span>
          </div>
        </div>

        {/* Filtros + ordenação */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap gap-2">
            {generos.map((g) => (
              <button
                key={g}
                onClick={() => setGenero(g)}
                className={`text-xs font-medium px-3.5 py-1.5 rounded-full border transition-all duration-300 ${
                  genero === g
                    ? "bg-[#0969CC] border-[#0969CC] text-white shadow-[0_0_15px_rgba(9,105,204,0.5)]"
                    : "bg-white/5 border-white/10 text-white/60 hover:text-white hover:border-white/30"
                }`}
              >
                {g}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-white/40 text-xs uppercase tracking-wider">Ordenar</span>
            {[
              { k: "ano", label: "Ano" },
              { k: "titulo", label: "A-Z" },
              { k: "duracao", label: "Duração" },
            ].map((o) => (
              <button
                key={o.k}
                onClick={() => setOrdem(o.k)}
                className={`text-xs font-medium px-3 py-1.5 rounded-lg border transition-colors ${
                  ordem === o.k ? "bg-white/10 border-white/30 text-white" : "bg-transparent border-white/10 text-white/50 hover:text-white"
                }`}
              >
                {o.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grid de filmes */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
          {lista.map((f, i) => (
            <article
              key={f.id}
              className="filme-card relative rounded-2xl overflow-hidden bg-white/[0.04] border border-white/10 flex flex-col"
              style={{ animationDelay: `${i * 55}ms` }}
            >
              <Poster filme={f} />
              <div className="p-4 flex flex-col gap-2.5 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-bold leading-tight text-sm sm:text-base">{f.titulo}</h3>
                  <span className="shrink-0 text-white/45 text-[11px] flex items-center gap-1"><i className="fa-regular fa-clock" /> {f.duracao}</span>
                </div>
                <p className="text-white/60 text-xs leading-relaxed">{f.sinopse}</p>
              </div>
            </article>
          ))}
        </div>
      </main>

      <style>{`
        .animate-gradient { animation: sb-grad 3s ease infinite; background-size: 200% auto; }
        @keyframes sb-grad {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .filme-card { opacity: 0; animation: card-in 0.55s ease forwards; }
        @keyframes card-in {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
              `}</style>
    </div>
  );
}
