// Configuração das animações do personagem pixel art.
// Cada animação é uma sprite sheet horizontal em /public/personagem/<nome>.png
// (uma tira com N frames de 160x160). O componente <Sprite> percorre os frames
// deslocando o background-position, então aqui só descrevemos a tira.
//
// As tiras vêm dos frames separados em sprites_personagem/: poses em pé têm a
// mesma altura, então trocar de animação não "encolhe" o personagem.
const BASE = import.meta.env.BASE_URL || "/";
const url = (nome) => `${BASE}personagem/${nome}.png`;

// frames = nº de quadros na tira | fps = velocidade | loop = repete ou toca 1x
export const ANIMS = {
  // --- estados de fundo (ficam em loop) ---
  idle:      { src: url("idle"),      frames: 4, fps: 3,  loop: true },
  think:     { src: url("think"),     frames: 4, fps: 4,  loop: true },
  typing:    { src: url("typing"),    frames: 4, fps: 8,  loop: true },
  computer:  { src: url("computer"),  frames: 4, fps: 5,  loop: true },

  // --- locomoção (loop enquanto a página rola) ---
  walkRight: { src: url("walkRight"), frames: 6, fps: 8,  loop: true },
  walkLeft:  { src: url("walkLeft"),  frames: 6, fps: 8,  loop: true },
  runRight:  { src: url("runRight"),  frames: 6, fps: 12, loop: true },
  runLeft:   { src: url("runLeft"),   frames: 6, fps: 12, loop: true },

  // --- reações de tiro único ---
  jump:      { src: url("jump"),      frames: 5, fps: 9,  loop: false },
  crouch:    { src: url("crouch"),    frames: 4, fps: 6,  loop: false },
  lying:     { src: url("lying"),     frames: 4, fps: 4,  loop: false },
  wave:      { src: url("wave"),      frames: 4, fps: 6,  loop: false },
  happy:     { src: url("happy"),     frames: 4, fps: 6,  loop: false },
  sad:       { src: url("sad"),       frames: 4, fps: 4,  loop: false },
  angry:     { src: url("angry"),     frames: 4, fps: 6,  loop: false },
  surprise:  { src: url("surprise"),  frames: 2, fps: 5,  loop: false },
  coffee:    { src: url("coffee"),    frames: 4, fps: 4,  loop: false },
};

// Reações curtas que o personagem solta sozinho enquanto está parado.
export const VARIACOES = ["wave", "coffee", "crouch", "lying", "happy"];

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
