// Configuração das animações do personagem pixel art.
// Cada animação é uma sprite sheet horizontal em /public/personagem/<nome>.png
// (uma tira com N frames de 160x160). O componente <Sprite> percorre os frames
// deslocando o background-position, então aqui só descrevemos a tira.
//
// Só constam as animações realmente usadas pelo ChatBot.
const BASE = import.meta.env.BASE_URL || "/";
const url = (nome) => `${BASE}personagem/${nome}.png`;

// frames = nº de quadros na tira | fps = velocidade | loop = repete ou toca 1x
export const ANIMS = {
  idle:     { src: url("idle"),     frames: 4, fps: 3, loop: true },
  think:    { src: url("think"),    frames: 4, fps: 4, loop: true },
  typing:   { src: url("typing"),   frames: 4, fps: 8, loop: true },
  wave:     { src: url("wave"),     frames: 4, fps: 6, loop: false },
  happy:    { src: url("happy"),    frames: 4, fps: 6, loop: false },
  sad:      { src: url("sad"),      frames: 4, fps: 4, loop: false },
  angry:    { src: url("angry"),    frames: 4, fps: 6, loop: false },
  surprise: { src: url("surprise"), frames: 2, fps: 5, loop: false },
  coffee:   { src: url("coffee"),   frames: 4, fps: 4, loop: false },
};

// Pré-carrega todas as tiras pra troca de animação não piscar.
let precarregado = false;
export function precarregarSprites() {
  if (precarregado || typeof Image === "undefined") return;
  precarregado = true;
  Object.values(ANIMS).forEach((a) => {
    const img = new Image();
    img.src = a.src;
  });
}
