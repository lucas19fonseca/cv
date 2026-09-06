// Dados aleatórios (placeholder) — troque pelos seus filmes reais depois.
// poster: cole aqui a URL da imagem do pôster (ex.: "https://image.tmdb.org/t/p/w500/xxxx.jpg").
//         Se ficar null/vazio, o card mostra um pôster estilizado automático.
export const filmes = [
  { id: 1,  titulo: "Interestelar",             ano: 2014, genero: "Ficção Científica", duracao: "2h49", emoji: "🪐", cor: "from-indigo-600 to-blue-900",    poster: "https://image.tmdb.org/t/p/w500/yQvGrMoipbRoddT0ZR8tPoR7NfX.jpg", sinopse: "Um grupo de exploradores atravessa um buraco de minhoca em busca de um novo lar para a humanidade — enquanto o tempo corre diferente para quem ficou na Terra." },
  { id: 2,  titulo: "Cidade de Deus",           ano: 2002, genero: "Drama / Crime",       duracao: "2h10", emoji: "🔫", cor: "from-amber-600 to-red-900",     poster: "https://image.tmdb.org/t/p/w500/k7eYdWvhYQyRQoU2TB2A2Xu2TfD.jpg", sinopse: "A ascensão do crime organizado numa favela do Rio, contada pelo olhar de um jovem que sonha em ser fotógrafo." },
  { id: 3,  titulo: "Duna",                     ano: 2021, genero: "Ficção Científica", duracao: "2h35", emoji: "🏜️", cor: "from-orange-500 to-amber-900",   poster: "https://image.tmdb.org/t/p/w500/v1tRXZ4JtD2Iv6fjkPvT4GiwslV.jpg", sinopse: "Paul Atreides é levado ao planeta desértico Arrakis, onde disputas por um recurso raríssimo decidem o destino do universo." },
  { id: 4,  titulo: "Parasita",                 ano: 2019, genero: "Suspense / Drama",    duracao: "2h12", emoji: "🏠", cor: "from-emerald-600 to-slate-900",  poster: "https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg", sinopse: "Uma família pobre se infiltra aos poucos na casa de uma família rica — até que um segredo vem à tona." },
  { id: 5,  titulo: "Whiplash",                 ano: 2014, genero: "Drama / Música",      duracao: "1h46", emoji: "🥁", cor: "from-yellow-600 to-neutral-900", poster: "https://image.tmdb.org/t/p/w500/7fn624j5lj3xTme2SgiLCeuedmO.jpg", sinopse: "Um jovem baterista é levado ao limite por um maestro implacável em busca da perfeição." },
  { id: 6,  titulo: "Blade Runner 2049",        ano: 2017, genero: "Ficção Científica", duracao: "2h44", emoji: "🌆", cor: "from-orange-600 to-cyan-900",    poster: "https://image.tmdb.org/t/p/w500/gajva2L0rPYkEWjzgFlBXCAVBE5.jpg", sinopse: "Um novo blade runner descobre um segredo enterrado capaz de mergulhar o que restou da sociedade no caos." },
  { id: 7,  titulo: "O Poderoso Chefão",        ano: 1972, genero: "Crime / Drama",       duracao: "2h55", emoji: "🎩", cor: "from-red-800 to-neutral-900",   poster: "https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg", sinopse: "A saga da família Corleone e a transformação de Michael, de herói de guerra a chefe impiedoso da máfia." },
  { id: 8,  titulo: "Bacurau",                  ano: 2019, genero: "Suspense / Faroeste",  duracao: "2h11", emoji: "🌵", cor: "from-lime-600 to-red-900",     poster: "https://image.tmdb.org/t/p/w500/tBa4zMGzZUco26XT3WfZZCwQ76i.jpg", sinopse: "Um vilarejo no sertão some do mapa e passa a ser alvo de forasteiros — e reage de forma inesperada." },
  { id: 10, titulo: "A Origem",                 ano: 2010, genero: "Ficção Científica", duracao: "2h28", emoji: "🌀", cor: "from-blue-700 to-slate-900",    poster: "https://image.tmdb.org/t/p/w500/xlaY2zyzMfkhk0HSC5VUwzoZPU1.jpg", sinopse: "Um ladrão que invade sonhos recebe a missão inversa: plantar uma ideia na mente de um alvo." },
  { id: 12, titulo: "Mad Max: Estrada da Fúria",ano: 2015, genero: "Ação",               duracao: "2h00", emoji: "🏎️", cor: "from-orange-700 to-red-950",  poster: "https://image.tmdb.org/t/p/w500/ulcAi4dKpAjHwYGS08vNyx9H6I9.jpg", sinopse: "Num deserto pós-apocalíptico, Max e Furiosa fogem de um tirano numa perseguição alucinante por liberdade." },
];

// Soma automática da duração (formato "2h49", "1h46"...) → total de minutos.
const totalMinutos = filmes.reduce((acc, f) => {
  const m = /(\d+)h(\d+)?/.exec(f.duracao || "");
  if (!m) return acc;
  return acc + Number(m[1]) * 60 + (m[2] ? Number(m[2]) : 0);
}, 0);

export const estatisticas = {
  total: filmes.length,
  minutos: totalMinutos,
  horas: Math.floor(totalMinutos / 60),
  // rótulo compacto tipo "27h49" — atualiza sozinho conforme filmes entram
  horasLabel: `${Math.floor(totalMinutos / 60)}h${String(totalMinutos % 60).padStart(2, "0")}`,
  generos: new Set(filmes.flatMap((f) => f.genero.split(" / ").map((g) => g.trim()))).size,
  favorito: "O Poderoso Chefão",
};
