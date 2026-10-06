// Lista os modelos que a sua chave da Groq pode usar.
//   npm run models
import { readFileSync } from "node:fs";

function lerEnv() {
  try {
    const txt = readFileSync(new URL("../.env", import.meta.url), "utf8");
    for (const linha of txt.split("\n")) {
      const m = linha.match(/^\s*([A-Z_]+)\s*=\s*(.*)\s*$/);
      if (m && !process.env[m[1]]) process.env[m[1]] = m[2].trim();
    }
  } catch {
    // sem .env, usa o ambiente
  }
}

lerEnv();

const chave = process.env.GROQ_API_KEY;
const base = process.env.GROQ_BASE_URL || "https://api.groq.com/openai/v1";

if (!chave) {
  console.error("GROQ_API_KEY não definida (.env ou ambiente).");
  process.exit(1);
}

const res = await fetch(`${base}/models`, {
  headers: { Authorization: `Bearer ${chave}` },
});

if (!res.ok) {
  console.error(`HTTP ${res.status}:`, await res.text());
  process.exit(1);
}

const { data = [] } = await res.json();
const descartar = /whisper|tts|embed|guard|safety|moderation|ocr/i;

const chat = data.map((m) => m.id).filter((id) => !descartar.test(id)).sort();
const outros = data.map((m) => m.id).filter((id) => descartar.test(id)).sort();

console.log(`\nModelos de chat disponíveis (${chat.length}):`);
chat.forEach((id) => console.log("  " + id));
if (outros.length) {
  console.log(`\nOutros (áudio/embeddings/guard) (${outros.length}):`);
  outros.forEach((id) => console.log("  " + id));
}
console.log("\nPara fixar um, ponha o ID em GROQ_MODEL no .env.\n");
