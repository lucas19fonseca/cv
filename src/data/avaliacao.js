// Dados aleatórios (placeholder) — troque pelos seus valores/exames reais depois.
export const perfil = {
  nome: "Lucas Andrade",
  idade: 27,
  altura: 178,        // cm
  peso: 74,           // kg
  tipoSanguineo: "O+",
  get imc() { return +(this.peso / Math.pow(this.altura / 100, 2)).toFixed(1); },
};

// status: "ok" (verde) | "atencao" (amarelo) | "alto" (vermelho)
export const vitais = [
  { label: "Pressão arterial", valor: "120/80", unidade: "mmHg", status: "ok",      icon: "fa-heart-pulse" },
  { label: "Freq. cardíaca",   valor: 68,       unidade: "bpm",  status: "ok",      icon: "fa-heart" },
  { label: "Saturação O₂",     valor: 98,       unidade: "%",    status: "ok",      icon: "fa-lungs" },
  { label: "Temperatura",      valor: 36.5,     unidade: "°C",   status: "ok",      icon: "fa-temperature-half" },
];

export const sangue = [
  { label: "Glicose",        valor: 92,  unidade: "mg/dL", ref: "70–99",   status: "ok" },
  { label: "Colesterol tot.",valor: 205, unidade: "mg/dL", ref: "< 200",   status: "atencao" },
  { label: "HDL",            valor: 58,  unidade: "mg/dL", ref: "> 40",    status: "ok" },
  { label: "LDL",            valor: 128, unidade: "mg/dL", ref: "< 130",   status: "atencao" },
  { label: "Triglicerídeos", valor: 110, unidade: "mg/dL", ref: "< 150",   status: "ok" },
  { label: "Hemoglobina",    valor: 15.1,unidade: "g/dL",  ref: "13–17",   status: "ok" },
  { label: "Vitamina D",     valor: 24,  unidade: "ng/mL", ref: "30–100",  status: "alto" },
];

export const osseo = [
  { label: "Densidade óssea (T-score)", valor: -0.4, unidade: "", ref: "> -1.0", status: "ok" },
  { label: "Massa óssea",               valor: 3.1,  unidade: "kg", ref: "2.9–3.4", status: "ok" },
  { label: "Postura / coluna",          valor: "Boa", unidade: "", ref: "—",     status: "ok" },
  { label: "Idade óssea estimada",      valor: 26,   unidade: "anos", ref: "≈ idade", status: "ok" },
];

export const mente = [
  { label: "Qualidade do sono", valor: 78, unidade: "/100", status: "ok" },
  { label: "Nível de estresse", valor: 62, unidade: "/100", status: "atencao" },
  { label: "Foco / cognição",   valor: 84, unidade: "/100", status: "ok" },
  { label: "Humor",             valor: 71, unidade: "/100", status: "ok" },
];

// frequency: 1 = ok (verde), 2 = atenção (amarelo), 3 = alto/risco (vermelho)
export const corpoAnterior = [
  { name: "Mente / cognição",  muscles: ["head"],                          frequency: 1 },
  { name: "Cardiovascular",    muscles: ["chest", "front-deltoids"],       frequency: 1 },
  { name: "Metabolismo",       muscles: ["abs", "obliques"],               frequency: 2 },
  { name: "Força — braços",    muscles: ["biceps", "forearm"],             frequency: 1 },
  { name: "Ósseo — pernas",    muscles: ["quadriceps", "calves"],          frequency: 1 },
];

export const corpoPosterior = [
  { name: "Postura / coluna",  muscles: ["upper-back", "lower-back"],      frequency: 1 },
  { name: "Força — costas",    muscles: ["trapezius", "back-deltoids"],    frequency: 2 },
  { name: "Ósseo — glúteos",   muscles: ["gluteal", "hamstring"],          frequency: 1 },
  { name: "Panturrilhas",      muscles: ["calves"],                        frequency: 1 },
];

export const STATUS = {
  ok:      { cor: "#22c55e", label: "Normal",  chip: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30" },
  atencao: { cor: "#eab308", label: "Atenção", chip: "bg-yellow-500/15 text-yellow-300 border-yellow-500/30" },
  alto:    { cor: "#ef4444", label: "Alterado",chip: "bg-red-500/15 text-red-300 border-red-500/30" },
};

// índice = frequency - 1  → usado pelo react-body-highlighter
export const CORES_CORPO = ["#22c55e", "#eab308", "#ef4444"];
