import { useState } from "react";
import ContatoModal from "./ContatoModal";

export default function Servicos() {
    const [contatoModalAberto, setContatoModalAberto] = useState(false);

    const servicos = [
        {
            id: 1,
            nome: "Landing Page de Alta Conversão",
            preco: "R$ 1.500",
            prefixo: "a partir de",
            descricao: "Página única focada em conversão, ideal para divulgar um produto, serviço ou captar clientes.",
            recursos: [
                "Design moderno e 100% responsivo",
                "Animações fluidas com GSAP",
                "Otimização de SEO e performance",
                "Formulário de contato integrado",
                "Publicação (deploy) incluída",
            ],
            icone: "fas fa-bolt",
            cor: "from-blue-500 to-cyan-500",
            destaque: false,
        },
        {
            id: 2,
            nome: "Sistema Web com Backend",
            preco: "R$ 5.000",
            prefixo: "a partir de",
            descricao: "Aplicação completa com banco de dados e área administrativa para gerenciar seu negócio.",
            recursos: [
                "Backend + banco de dados",
                "Painel administrativo",
                "Autenticação e área logada",
                "Integrações via API",
                "Design responsivo e otimizado",
            ],
            icone: "fas fa-server",
            cor: "from-indigo-500 to-purple-500",
            destaque: false,
        },
        {
            id: 3,
            nome: "Sistema Sob Medida com Automação",
            preco: "Sob orçamento",
            prefixo: "projetos a partir de R$ 8.000",
            descricao: "Sistemas complexos com backend robusto, banco de dados e automações inteligentes.",
            recursos: [
                "Arquitetura escalável e segura",
                "Automações (n8n, IA, LLM, RAG, MPC)",
                "Integrações (WhatsApp, pagamentos, APIs)",
                "Fluxos e processos personalizados",
                "Suporte e manutenção contínua",
            ],
            icone: "fas fa-robot",
            cor: "from-purple-500 to-pink-500",
            destaque: false,
        },
    ];

    return (
        <section
            id="servicos"
            className="py-16 md:py-24 relative min-h-[300px] overflow-hidden"
        >
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-950 to-gray-900" />

            {/* Grid pattern */}
            <div className="absolute inset-0 opacity-5">
                <div
                    className="w-full h-full"
                    style={{
                        backgroundImage: `
                            linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px),
                            linear-gradient(180deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
                        `,
                        backgroundSize: "50px 50px",
                    }}
                />
            </div>

            {/* Linhas decorativas */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-30" />
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-30" />

            <div className="container mx-auto px-4 lg:px-8 relative z-10">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center gap-3 mb-4">
                        <div className="w-3 h-3 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full" />
                        <span className="text-blue-400 font-mono text-sm tracking-widest">
                            SERVIÇOS E VALORES
                        </span>
                    </div>

                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                        O que eu{" "}
                        <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                            entrego
                        </span>
                    </h2>

                    <p className="text-gray-400 mt-6 text-lg max-w-2xl mx-auto">
                        Da landing page ao sistema completo com backend e automação. Escolha o que faz sentido pro seu projeto.
                    </p>
                </div>

                {/* Cards */}
                <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto items-stretch">
                    {servicos.map((servico) => (
                        <div key={servico.id} className="group relative flex">
                            {servico.destaque && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20">
                                    <span className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs font-semibold px-4 py-1 rounded-full shadow-lg tracking-wide">
                                        MAIS PROCURADO
                                    </span>
                                </div>
                            )}

                            {/* Glow */}
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-gray-700 to-gray-900 rounded-2xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-300" />

                            {/* Card */}
                            <div
                                className={`relative w-full flex flex-col bg-gradient-to-br from-gray-900 to-gray-950 border rounded-2xl p-6 lg:p-8 transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-2xl ${
                                    servico.destaque
                                        ? "border-indigo-500/60 shadow-xl shadow-indigo-500/10"
                                        : "border-gray-800 group-hover:border-blue-500/50"
                                }`}
                            >
                                {/* Ícone */}
                                <div
                                    className={`w-14 h-14 rounded-xl bg-gradient-to-r ${servico.cor} flex items-center justify-center mb-6`}
                                >
                                    <i className={`${servico.icone} text-white text-xl`}></i>
                                </div>

                                {/* Nome */}
                                <h3 className="text-xl font-bold text-white mb-2">
                                    {servico.nome}
                                </h3>

                                {/* Preço */}
                                <div className="mb-4">
                                    <p className="text-gray-500 text-xs font-mono tracking-wide mb-1">
                                        {servico.prefixo}
                                    </p>
                                    <p className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                                        {servico.preco}
                                    </p>
                                </div>

                                <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                                    {servico.descricao}
                                </p>

                                {/* Recursos */}
                                <ul className="space-y-3 mb-8 flex-grow">
                                    {servico.recursos.map((recurso, i) => (
                                        <li key={i} className="flex items-start gap-3 text-gray-300 text-sm">
                                            <i className="fas fa-check text-blue-400 mt-1 flex-shrink-0"></i>
                                            <span>{recurso}</span>
                                        </li>
                                    ))}
                                </ul>

                                {/* CTA */}
                                <button
                                    onClick={() => setContatoModalAberto(true)}
                                    className={`w-full py-3 rounded-xl font-semibold text-white transition-all duration-300 ${
                                        servico.destaque
                                            ? "bg-gradient-to-r from-indigo-500 to-purple-500 hover:shadow-lg hover:shadow-indigo-500/30"
                                            : "bg-gray-800 border border-gray-700 hover:border-blue-500/50 hover:bg-gray-700"
                                    }`}
                                >
                                    Solicitar orçamento
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Nota */}
                <p className="text-center text-gray-500 text-sm mt-10 max-w-2xl mx-auto">
                    Cada projeto é único. Os valores são pontos de partida e podem variar conforme o escopo. Fale comigo pra um orçamento sob medida.
                </p>
            </div>

            <ContatoModal
                aberto={contatoModalAberto}
                onFechar={() => setContatoModalAberto(false)}
            />
        </section>
    );
}
