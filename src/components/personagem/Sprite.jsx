import { useEffect, useRef, useState } from "react";
import { ANIMS } from "./anims";

const prefereMenosMovimento =
  typeof window !== "undefined" &&
  window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Duração do cross-fade ao trocar de animação (ms).
const FADE = 130;

/**
 * Renderiza uma animação do personagem a partir de uma sprite sheet horizontal.
 * Percorre os frames deslocando o background-position (1 request por animação).
 *
 * - Timing por requestAnimationFrame (sem acúmulo de atraso do setInterval).
 * - `playId` força reiniciar mesmo quando a MESMA animação é pedida de novo
 *   (sem isso, uma animação de tiro único repetida congelava no último frame).
 * - Cross-fade curto entre animações, pra troca não ser um corte seco.
 *
 * props:
 *  - nome:    chave em ANIMS (ex.: "idle", "wave", "typing")
 *  - playId:  muda a cada pedido de animação; reinicia a reprodução
 *  - size:    tamanho em px do quadro exibido
 *  - flip:    espelha na horizontal
 *  - onDone:  chamado quando uma animação com loop:false termina
 */
export default function Sprite({
  nome = "idle",
  playId = 0,
  size = 120,
  flip = false,
  onDone,
  className = "",
  style = {},
}) {
  const anim = ANIMS[nome] || ANIMS.idle;
  const { frames, fps, loop } = anim;

  const [frame, setFrame] = useState(0);
  // camada que sai, para o cross-fade
  const [anterior, setAnterior] = useState(null);
  const [fade, setFade] = useState(1);

  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;
  const atualRef = useRef({ nome, frame: 0 });

  // Guarda o quadro que estava na tela para desenhar por baixo durante o fade.
  const anteriorRef = useRef(null);
  useEffect(() => {
    const ant = anteriorRef.current;
    if (ant && ant.nome !== nome && !prefereMenosMovimento) {
      setAnterior(ant);
      setFade(0);
      const r = requestAnimationFrame(() => setFade(1));
      const t = setTimeout(() => setAnterior(null), FADE + 40);
      return () => {
        cancelAnimationFrame(r);
        clearTimeout(t);
      };
    }
    setAnterior(null);
    setFade(1);
  }, [nome, playId]);

  useEffect(() => {
    setFrame(0);
    atualRef.current = { nome, frame: 0 };

    if (prefereMenosMovimento) {
      if (!loop) {
        const t = setTimeout(() => onDoneRef.current?.(), 320);
        return () => clearTimeout(t);
      }
      return;
    }

    if (frames <= 1) {
      if (!loop) {
        const t = setTimeout(() => onDoneRef.current?.(), 1000 / fps);
        return () => clearTimeout(t);
      }
      return;
    }

    const passo = 1000 / fps;
    let raf = 0;
    let inicio = 0;
    let ultimo = -1;
    let encerrado = false;

    function tick(ts) {
      if (!inicio) inicio = ts;
      const i = Math.floor((ts - inicio) / passo);
      if (loop) {
        const f = i % frames;
        if (f !== ultimo) {
          ultimo = f;
          setFrame(f);
          atualRef.current = { nome, frame: f };
        }
      } else {
        const f = Math.min(i, frames - 1);
        if (f !== ultimo) {
          ultimo = f;
          setFrame(f);
          atualRef.current = { nome, frame: f };
        }
        if (i >= frames - 1) {
          // segura o último quadro por um passo antes de avisar que acabou
          if (!encerrado && ts - inicio >= passo * frames) {
            encerrado = true;
            onDoneRef.current?.();
            return;
          }
        }
      }
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nome, playId]);

  // mantém o último quadro exibido para o próximo cross-fade
  useEffect(() => {
    anteriorRef.current = { nome, frame };
  }, [nome, frame]);

  const estiloDe = (n, f) => {
    const a = ANIMS[n] || ANIMS.idle;
    return {
      position: "absolute",
      inset: 0,
      backgroundImage: `url(${a.src})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: `${a.frames * 100}% 100%`,
      backgroundPositionX:
        a.frames > 1 ? `${(f / (a.frames - 1)) * 100}%` : "0%",
      backgroundPositionY: "center",
      imageRendering: "pixelated",
    };
  };

  return (
    <div
      className={className}
      aria-hidden="true"
      style={{
        position: "relative",
        width: size,
        height: size,
        transform: flip ? "scaleX(-1)" : "none",
        ...style,
      }}
    >
      {anterior && (
        <div
          style={{
            ...estiloDe(anterior.nome, anterior.frame),
            opacity: 1 - fade,
            transition: `opacity ${FADE}ms linear`,
          }}
        />
      )}
      <div
        style={{
          ...estiloDe(nome, frame),
          opacity: anterior ? fade : 1,
          transition: anterior ? `opacity ${FADE}ms linear` : "none",
        }}
      />
    </div>
  );
}
