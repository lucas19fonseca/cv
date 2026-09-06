import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import SpaceBackground from "../components/SpaceBackground";
import { perfil, vitais, sangue, osseo, mente, STATUS } from "../data/avaliacao";

const ATLAS_URL = "https://open-anatomy-atlas.vercel.app";

const StatusDot = ({ status }) => {
  const s = STATUS[status] || STATUS.ok;
  return <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: s.cor }} title={s.label} />;
};

// Cabeçalho enxuto de cartão
const CardHead = ({ icon, titulo, extra }) => (
  <div className="flex items-center justify-between mb-3">
    <div className="flex items-center gap-2">
      <i className={`fa-solid ${icon} text-[#0969CC] text-xs`} />
      <h3 className="font-medium text-[13px] tracking-wide text-white/90">{titulo}</h3>
    </div>
    {extra}
  </div>
);

const card = "rounded-xl bg-white/[0.03] border border-white/[0.07] p-3.5";

// Exame: linhas valor + ref + status
const ExamCard = ({ icon, titulo, itens }) => (
  <div className={card}>
    <CardHead icon={icon} titulo={titulo} />
    <ul className="divide-y divide-white/[0.05]">
      {itens.map((it, i) => (
        <li key={i} className="flex items-center justify-between gap-3 py-1.5 first:pt-0 last:pb-0">
          <span className="text-[13px] text-white/70 truncate">{it.label}</span>
          <div className="flex items-center gap-2 shrink-0">
            {it.ref && <span className="text-[10px] text-white/25 tabular-nums hidden sm:inline">{it.ref}</span>}
            <span className="font-semibold tabular-nums text-[13px]">{it.valor}<span className="text-white/35 text-[10px] font-normal ml-0.5">{it.unidade}</span></span>
            <StatusDot status={it.status} />
          </div>
        </li>
      ))}
    </ul>
  </div>
);

// Scores /100 (mente)
const ScoreCard = ({ icon, titulo, itens }) => (
  <div className={card}>
    <CardHead icon={icon} titulo={titulo} />
    <ul className="space-y-2.5">
      {itens.map((it, i) => {
        const s = STATUS[it.status] || STATUS.ok;
        return (
          <li key={i}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-[12px] text-white/60">{it.label}</span>
              <span className="text-[11px] font-semibold tabular-nums" style={{ color: s.cor }}>{it.valor}</span>
            </div>
            <div className="h-1 rounded-full bg-white/[0.06] overflow-hidden">
              <div className="h-full rounded-full" style={{ width: `${it.valor}%`, background: s.cor }} />
            </div>
          </li>
        );
      })}
    </ul>
  </div>
);

// Sinais vitais compactos
const VitaisCard = ({ itens }) => (
  <div className={card}>
    <CardHead icon="fa-heart-pulse" titulo="Sinais vitais" />
    <div className="grid grid-cols-2 gap-2">
      {itens.map((it, i) => (
        <div key={i} className="rounded-lg bg-white/[0.02] border border-white/[0.05] px-3 py-2">
          <div className="flex items-center gap-1.5 text-white/40 text-[10px] mb-0.5">
            <i className={`fa-solid ${it.icon} text-cyan-300/60`} /> {it.label}
          </div>
          <div className="font-semibold tabular-nums text-[15px] leading-none">{it.valor}<span className="text-white/35 text-[10px] font-normal ml-0.5">{it.unidade}</span></div>
        </div>
      ))}
    </div>
  </div>
);

export default function Avaliacao() {
  const [ativo3D, setAtivo3D] = useState(false); // só carrega o WebGL sob demanda
  const [carregando, setCarregando] = useState(true);

  const resumo = useMemo(() => {
    const todos = [...vitais, ...sangue, ...osseo, ...mente];
    return {
      ok: todos.filter((i) => i.status === "ok").length,
      atencao: todos.filter((i) => i.status === "atencao").length,
      alto: todos.filter((i) => i.status === "alto").length,
    };
  }, []);

  const stats = [
    { label: "Idade", valor: perfil.idade, un: "anos" },
    { label: "Altura", valor: perfil.altura, un: "cm" },
    { label: "Peso", valor: perfil.peso, un: "kg" },
    { label: "IMC", valor: perfil.imc, un: "" },
    { label: "Sangue", valor: perfil.tipoSanguineo, un: "" },
  ];

  const badges = [
    { n: resumo.ok, ...STATUS.ok },
    { n: resumo.atencao, ...STATUS.atencao },
    { n: resumo.alto, ...STATUS.alto },
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#080831] via-[#0a0a2a] to-[#001233] text-white overflow-hidden">
      {/* Fundo mais leve nesta tela (menos elementos animados) */}
      <SpaceBackground stars={22} particles={6} />

      <main className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 py-6">
        {/* Barra superior compacta */}
        <header className="flex items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-3 min-w-0">
            <Link
              to="/"
              className="flex items-center justify-center w-8 h-8 rounded-lg text-white/60 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors shrink-0"
              aria-label="Voltar"
            >
              <i className="fa-solid fa-arrow-left text-xs" />
            </Link>
            <div className="min-w-0">
              <h1 className="text-base sm:text-lg font-semibold leading-tight truncate">
                {perfil.nome} <span className="text-white/30 font-normal">/ panorama</span>
              </h1>
              <p className="text-white/35 text-[11px] leading-tight">Indicadores gerais · dados de exemplo</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            {badges.map((r) => (
              <span key={r.label} className="inline-flex items-center gap-1.5 text-[11px] font-medium px-2 py-1 rounded-md bg-white/[0.03] border border-white/[0.07]">
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: r.cor }} />
                <span className="tabular-nums">{r.n}</span>
                <span className="text-white/40 hidden sm:inline">{r.label}</span>
              </span>
            ))}
          </div>
        </header>

        {/* Faixa de dados básicos */}
        <div className="flex flex-wrap items-stretch rounded-xl bg-white/[0.03] border border-white/[0.07] divide-x divide-white/[0.06] mb-4 overflow-hidden">
          {stats.map((s, i) => (
            <div key={i} className="flex-1 min-w-[70px] px-3.5 py-2.5">
              <div className="text-white/40 text-[10px] uppercase tracking-wide">{s.label}</div>
              <div className="text-[15px] font-semibold tabular-nums leading-tight">{s.valor}<span className="text-white/35 text-[10px] font-normal ml-0.5">{s.un}</span></div>
            </div>
          ))}
        </div>

        {/* Grade principal */}
        <div className="grid lg:grid-cols-2 gap-3">
          {/* Modelo 3D — carregado sob demanda */}
          <div className="lg:row-span-2 rounded-xl border border-white/[0.07] bg-black/40 overflow-hidden flex flex-col">
            <div className="flex items-center justify-between px-3.5 py-2 border-b border-white/[0.07]">
              <span className="flex items-center gap-2 text-[13px] font-medium"><i className="fa-solid fa-cube text-[#0969CC] text-xs" /> Modelo anatômico 3D</span>
              <a href={ATLAS_URL} target="_blank" rel="noopener noreferrer" className="text-white/35 hover:text-white text-[11px] flex items-center gap-1">
                Abrir <i className="fa-solid fa-up-right-from-square text-[9px]" />
              </a>
            </div>
            <div className="relative flex-1 min-h-[420px]">
              {!ativo3D ? (
                <button
                  type="button"
                  onClick={() => setAtivo3D(true)}
                  className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#0a0a2a]/60 hover:bg-[#0a0a2a]/40 transition-colors group"
                >
                  <span className="w-14 h-14 rounded-full bg-[#0969CC]/15 border border-[#0969CC]/40 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <i className="fa-solid fa-play text-[#0969CC] text-lg ml-0.5" />
                  </span>
                  <span className="text-white/70 text-[13px] font-medium">Carregar modelo 3D</span>
                  <span className="text-white/30 text-[11px]">Renderização interativa (WebGL) sob demanda</span>
                </button>
              ) : (
                <>
                  {carregando && (
                    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 bg-[#0a0a2a]/90">
                      <i className="fa-solid fa-spinner fa-spin text-[#0969CC] text-2xl" />
                      <span className="text-white/50 text-xs">Carregando modelo…</span>
                    </div>
                  )}
                  <iframe
                    src={ATLAS_URL}
                    title="Modelo anatômico 3D"
                    onLoad={() => setCarregando(false)}
                    loading="lazy"
                    allow="fullscreen; xr-spatial-tracking"
                    className="absolute inset-0 w-full h-full border-0 bg-black"
                  />
                </>
              )}
            </div>
            <p className="px-3.5 py-2 text-white/30 text-[10px] border-t border-white/[0.07]">
              Arraste para girar · role para zoom · clique nas estruturas.
            </p>
          </div>

          {/* Indicadores */}
          <ExamCard icon="fa-droplet" titulo="Exame de sangue" itens={sangue} />
          <ScoreCard icon="fa-brain" titulo="Mente & bem-estar" itens={mente} />
          <ExamCard icon="fa-bone" titulo="Sistema ósseo" itens={osseo} />
          <VitaisCard itens={vitais} />
        </div>
      </main>
    </div>
  );
}
