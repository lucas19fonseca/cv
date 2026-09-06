import { useMemo } from "react";

// Fundo "espaço" reutilizável — mesma pegada do Hero (grid + orbes + estrelas).
// Aceita densidade menor p/ telas onde performance importa mais (ex.: Avaliação).
export default function SpaceBackground({ stars = 60, particles = 14, orbs = true }) {
  const estrelas = useMemo(
    () =>
      Array.from({ length: stars }).map(() => ({
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: Math.random() * 2 + 0.5,
        delay: Math.random() * 6,
        dur: Math.random() * 3 + 2,
      })),
    [stars]
  );

  const particulas = useMemo(
    () =>
      Array.from({ length: particles }).map(() => ({
        top: Math.random() * 100,
        left: Math.random() * 100,
        delay: Math.random() * 8,
        dur: Math.random() * 12 + 10,
        drift: (Math.random() - 0.5) * 120,
      })),
    [particles]
  );

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      {/* Grade sutil */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(90deg, rgba(9,105,204,0.3) 1px, transparent 1px),
            linear-gradient(180deg, rgba(9,105,204,0.3) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />

      {/* Orbes de brilho */}
      {orbs && (
        <>
          <div className="absolute top-1/4 left-1/5 w-72 h-72 sm:w-96 sm:h-96 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/5 w-72 h-72 sm:w-96 sm:h-96 bg-cyan-500/10 rounded-full blur-3xl" />
          <div className="absolute top-2/3 left-1/2 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl" />
        </>
      )}

      {/* Estrelas */}
      {estrelas.map((e, i) => (
        <span
          key={`s-${i}`}
          className="sb-anim absolute rounded-full bg-white"
          style={{
            top: `${e.top}%`,
            left: `${e.left}%`,
            width: `${e.size}px`,
            height: `${e.size}px`,
            willChange: "transform, opacity",
            animation: `sb-twinkle ${e.dur}s ease-in-out ${e.delay}s infinite`,
          }}
        />
      ))}

      {/* Partículas flutuantes */}
      {particulas.map((p, i) => (
        <span
          key={`p-${i}`}
          className="sb-anim absolute w-[2px] h-[2px] rounded-full bg-gradient-to-r from-[#0969CC] to-cyan-400"
          style={{
            top: `${p.top}%`,
            left: `${p.left}%`,
            "--drift": `${p.drift}px`,
            willChange: "transform, opacity",
            animation: `sb-float ${p.dur}s ease-in-out ${p.delay}s infinite`,
          }}
        />
      ))}

      <style>{`
        @keyframes sb-twinkle {
          0%, 100% { opacity: 0.15; transform: scale(1); }
          50%      { opacity: 0.9;  transform: scale(1.4); }
        }
        @keyframes sb-float {
          0%   { transform: translate(0, 0); opacity: 0; }
          20%  { opacity: 0.8; }
          80%  { opacity: 0.8; }
          100% { transform: translate(var(--drift), -80px); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .sb-anim { animation: none !important; opacity: 0.4 !important; }
        }
      `}</style>
    </div>
  );
}
