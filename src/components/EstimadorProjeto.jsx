import { useMemo, useState } from "react";
import ContatoModal from "./ContatoModal";

/* =========================================================================
   REGRA DE NEGÓCIO (escondida no código — o cliente só vê a faixa final)
   Fórmula:
     (horas base + funcionalidades + design + infra)
        x 1.15 (margem técnica)  x valor/hora
        x complexidade  x prazo
   Valor/hora de R$90 = faixa "pleno" de front-end React no Brasil (2026).
   ========================================================================= */

const VALOR_HORA = 90;
const MARGEM_TECNICA = 1.15;

const TIPOS = [
    { id: "landing",       nome: "Landing Page",      horas: 12,  icone: "fa-bolt" },
    { id: "institucional", nome: "Site institucional", horas: 25, icone: "fa-globe" },
    { id: "sistema",       nome: "Sistema Web",       horas: 40,  icone: "fa-window-maximize" },
    { id: "ecommerce",     nome: "E-commerce",        horas: 60,  icone: "fa-cart-shopping" },
    { id: "dashboard",     nome: "Dashboard",         horas: 35,  icone: "fa-chart-line" },
    { id: "backend",       nome: "Backend / API",     horas: 20,  icone: "fa-server" },
    { id: "automacao",     nome: "Automação",         horas: 15,  icone: "fa-gears" },
    { id: "ia",            nome: "IA / Chatbot",      horas: 25,  icone: "fa-brain" },
    { id: "saas",          nome: "SaaS / MVP",        horas: 120, icone: "fa-rocket" },
];

const COMPLEXIDADES = [
    { id: "basica",    nome: "Básica",     mult: 1.0,  ponto: "bg-emerald-500" },
    { id: "media",     nome: "Média",      mult: 1.25, ponto: "bg-yellow-500" },
    { id: "alta",      nome: "Alta",       mult: 1.5,  ponto: "bg-orange-500" },
    { id: "muitoAlta", nome: "Muito alta", mult: 1.8,  ponto: "bg-red-500" },
];

const FUNCIONALIDADES = [
    { id: "login",        nome: "Login/cadastro",     horas: 5 },
    { id: "bancoDados",   nome: "Banco de dados",     horas: 8 },
    { id: "crud",         nome: "CRUD completo",      horas: 8 },
    { id: "busca",        nome: "Busca e filtros",    horas: 6 },
    { id: "adminPanel",   nome: "Painel admin",       horas: 12 },
    { id: "userPanel",    nome: "Painel do usuário",  horas: 8 },
    { id: "relatorios",   nome: "Relatórios",         horas: 8 },
    { id: "pagamento",    nome: "Pagamento",          horas: 10 },
    { id: "assinatura",   nome: "Assinatura",         horas: 12 },
    { id: "apiExterna",   nome: "Integração API",     horas: 5 },
    { id: "whatsapp",     nome: "WhatsApp",           horas: 5 },
    { id: "email",        nome: "E-mail automático",  horas: 3 },
    { id: "notificacoes", nome: "Notificações",       horas: 5 },
    { id: "upload",       nome: "Upload de arquivos", horas: 4 },
    { id: "integracaoIA", nome: "Integração com IA",  horas: 10 },
    { id: "chatbotIA",    nome: "Chatbot com IA",     horas: 15 },
    { id: "rag",          nome: "RAG / base de dados",horas: 20 },
    { id: "n8n",          nome: "Automação n8n",      horas: 8 },
];

const DESIGNS = [
    { id: "base",     nome: "Layout base",             horas: 0 },
    { id: "uiBasica", nome: "UI básica (+5h)",         horas: 5 },
    { id: "uiCustom", nome: "UI personalizada (+10h)", horas: 10 },
    { id: "figma",    nome: "Design completo Figma (+15h)", horas: 15 },
];

const INFRAS = [
    { id: "nenhuma",  nome: "Sem deploy",                 horas: 0 },
    { id: "deploy",   nome: "Deploy simples (+2h)",       horas: 2 },
    { id: "completa", nome: "Deploy + banco (+8h)",       horas: 8 },
    { id: "devops",   nome: "DevOps Docker/CI-CD (+15h)", horas: 15 },
];

const PRAZOS = [
    { id: "normal",      nome: "Normal",      mult: 1.0 },
    { id: "prioridade",  nome: "Prioridade (+15%)", mult: 1.15 },
    { id: "urgente",     nome: "Urgente (+30%)",    mult: 1.3 },
    { id: "emergencial", nome: "Emergencial (+50%)", mult: 1.5 },
];

const FEATURE_HORAS = FUNCIONALIDADES.reduce((a, f) => ((a[f.id] = f.horas), a), {});

const brl = (v) =>
    new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
        maximumFractionDigits: 0,
    }).format(v);

const arredonda = (v) => Math.round(v / 100) * 100;

export default function EstimadorProjeto() {
    const [tipo, setTipo] = useState("");
    const [complexidade, setComplexidade] = useState("");
    const [features, setFeatures] = useState([]);
    const [design, setDesign] = useState("uiBasica");
    const [infra, setInfra] = useState("deploy");
    const [prazo, setPrazo] = useState("normal");
    const [modalAberto, setModalAberto] = useState(false);

    const toggleFeature = (id) =>
        setFeatures((p) => (p.includes(id) ? p.filter((f) => f !== id) : [...p, id]));

    const calc = useMemo(() => {
        const t = TIPOS.find((x) => x.id === tipo);
        if (!t) return null; // sem tipo escolhido, sem estimativa
        const c = COMPLEXIDADES.find((x) => x.id === complexidade);
        const d = DESIGNS.find((x) => x.id === design);
        const inf = INFRAS.find((x) => x.id === infra);
        const p = PRAZOS.find((x) => x.id === prazo);
        const cMult = c ? c.mult : 1;
        const hFeat = features.reduce((s, id) => s + (FEATURE_HORAS[id] || 0), 0);
        const horas = Math.round((t.horas + hFeat + d.horas + inf.horas) * MARGEM_TECNICA);
        const preco = horas * VALOR_HORA * cMult * p.mult;
        return { horas, min: arredonda(preco * 0.92), max: arredonda(preco * 1.08) };
    }, [tipo, complexidade, features, design, infra, prazo]);

    const selectCls =
        "w-full bg-gray-900 border border-gray-800 rounded-lg text-sm text-gray-200 px-3 py-2 focus:border-blue-500/60 focus:outline-none";
    const label = "text-gray-500 text-[11px] font-mono tracking-wider uppercase mb-2 block";

    return (
        <section id="estimador" className="py-12 md:py-20 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-950 to-gray-900" />
            <div className="absolute inset-0 opacity-5">
                <div
                    className="w-full h-full"
                    style={{
                        backgroundImage: `linear-gradient(90deg, rgba(59,130,246,.3) 1px, transparent 1px), linear-gradient(180deg, rgba(59,130,246,.3) 1px, transparent 1px)`,
                        backgroundSize: "50px 50px",
                    }}
                />
            </div>
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-30" />

            <div className="container mx-auto px-4 lg:px-8 relative z-10">
                {/* Header (padrão do site) */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center gap-3 mb-4">
                        <div className="w-3 h-3 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full" />
                        <span className="text-blue-400 font-mono text-sm tracking-widest">
                            MONTE SEU PROJETO
                        </span>
                    </div>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                        Estimador de{" "}
                        <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                            projeto
                        </span>
                    </h2>
                    <p className="text-gray-400 mt-6 text-lg max-w-2xl mx-auto">
                        Selecione o que precisa e veja uma estimativa na hora. Cada item tem um peso — nada de achismo.
                    </p>
                </div>

                <div className="grid lg:grid-cols-[1fr_340px] gap-6 max-w-6xl mx-auto items-start">
                    {/* ===== FORM (um card só, seções por divisória) ===== */}
                    <div className="bg-gray-900/40 border border-gray-800 rounded-2xl p-5 divide-y divide-gray-800">
                        {/* Tipo */}
                        <div className="pb-4">
                            <span className={label}>Tipo de projeto</span>
                            <div className="flex flex-wrap gap-2">
                                {TIPOS.map((t) => {
                                    const on = tipo === t.id;
                                    return (
                                        <button
                                            key={t.id}
                                            type="button"
                                            onClick={() => setTipo(t.id)}
                                            className={`flex items-center gap-1.5 py-1.5 px-2.5 rounded-lg border text-xs transition ${
                                                on
                                                    ? "border-blue-500/70 bg-blue-500/10 text-white"
                                                    : "border-gray-800 bg-gray-900/50 text-gray-300 hover:border-blue-500/40"
                                            }`}
                                        >
                                            <i className={`fas ${t.icone} ${on ? "text-cyan-400" : "text-gray-500"}`} />
                                            {t.nome}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Complexidade */}
                        <div className="py-4">
                            <span className={label}>Complexidade</span>
                            <div className="grid grid-cols-4 gap-2">
                                {COMPLEXIDADES.map((c) => {
                                    const on = complexidade === c.id;
                                    return (
                                        <button
                                            key={c.id}
                                            type="button"
                                            onClick={() => setComplexidade(c.id)}
                                            className={`flex items-center justify-center gap-1.5 py-2 rounded-lg border text-xs font-medium transition ${
                                                on
                                                    ? "border-blue-500/70 bg-blue-500/10 text-white"
                                                    : "border-gray-800 bg-gray-900/50 text-gray-300 hover:border-blue-500/40"
                                            }`}
                                        >
                                            <span className={`w-2 h-2 rounded-full ${c.ponto}`} />
                                            <span className="hidden sm:inline">{c.nome}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Funcionalidades */}
                        <div className="py-4">
                            <span className={label}>Funcionalidades</span>
                            <div className="flex flex-wrap gap-2">
                                {FUNCIONALIDADES.map((f) => {
                                    const on = features.includes(f.id);
                                    return (
                                        <button
                                            key={f.id}
                                            type="button"
                                            onClick={() => toggleFeature(f.id)}
                                            className={`flex items-center gap-1.5 py-1.5 px-2.5 rounded-lg border text-xs transition ${
                                                on
                                                    ? "border-blue-500/70 bg-blue-500/10 text-white"
                                                    : "border-gray-800 bg-gray-900/50 text-gray-300 hover:border-blue-500/40"
                                            }`}
                                        >
                                            <i className={`fas ${on ? "fa-check text-cyan-400" : "fa-plus text-gray-600"} text-[10px]`} />
                                            {f.nome}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Design + Infra + Prazo (dropdowns) */}
                        <div className="pt-4 grid sm:grid-cols-3 gap-3">
                            <div>
                                <span className={label}>Design</span>
                                <select className={selectCls} value={design} onChange={(e) => setDesign(e.target.value)}>
                                    {DESIGNS.map((d) => (
                                        <option key={d.id} value={d.id}>{d.nome}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <span className={label}>Infraestrutura</span>
                                <select className={selectCls} value={infra} onChange={(e) => setInfra(e.target.value)}>
                                    {INFRAS.map((i) => (
                                        <option key={i.id} value={i.id}>{i.nome}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <span className={label}>Prazo</span>
                                <select className={selectCls} value={prazo} onChange={(e) => setPrazo(e.target.value)}>
                                    {PRAZOS.map((p) => (
                                        <option key={p.id} value={p.id}>{p.nome}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* ===== RESUMO (sticky, compacto) ===== */}
                    <div className="lg:sticky lg:top-6">
                        <div className="relative">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl blur opacity-20" />
                            <div className="relative bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 rounded-2xl p-5">
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="w-2 h-2 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full" />
                                    <span className="text-blue-400 font-mono text-[11px] tracking-widest">ESTIMATIVA</span>
                                </div>

                                {calc ? (
                                    <>
                                        <p className="text-gray-400 text-xs mb-1">Investimento estimado</p>
                                        <p className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent leading-tight">
                                            {brl(calc.min)}
                                        </p>
                                        <p className="text-gray-300 text-xs mb-4">
                                            até <span className="font-semibold">{brl(calc.max)}</span>
                                        </p>

                                        <div className="flex items-center gap-4 text-xs text-gray-400 mb-4">
                                            <span className="flex items-center gap-1.5">
                                                <i className="fas fa-clock text-cyan-400" />
                                                ~{calc.horas}h
                                            </span>
                                            <span className="flex items-center gap-1.5">
                                                <i className="fas fa-shield-halved text-cyan-400" />
                                                margem inclusa
                                            </span>
                                        </div>
                                    </>
                                ) : (
                                    <div className="mb-4 py-2">
                                        <p className="text-gray-300 text-sm font-medium mb-1">
                                            Selecione o tipo de projeto
                                        </p>
                                        <p className="text-gray-500 text-xs">
                                            Escolha um tipo acima para ver a estimativa na hora.
                                        </p>
                                    </div>
                                )}

                                <button
                                    onClick={() => setModalAberto(true)}
                                    disabled={!calc}
                                    className={`w-full py-2.5 rounded-lg text-sm font-semibold text-white transition ${
                                        calc
                                            ? "bg-gradient-to-r from-blue-600 to-cyan-500 hover:shadow-lg hover:shadow-blue-500/30"
                                            : "bg-gray-700/50 text-gray-500 cursor-not-allowed"
                                    }`}
                                >
                                    Solicitar orçamento
                                </button>
                                <p className="text-gray-500 text-[11px] leading-snug mt-3 text-center">
                                    <i className="fas fa-lock mr-1" />
                                    Valor final definido após análise do escopo.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <ContatoModal aberto={modalAberto} onFechar={() => setModalAberto(false)} />
        </section>
    );
}
