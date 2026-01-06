import { useRef } from "react";

export default function Experiencia() {
    const sectionRef = useRef(null);

    const experiencias = [
        {
            id: 1,
            cargo: "Estagiário em Inteligência Artificial",
            empresa: "Ministério da Gestão e Inovação (CGIA)",
            periodo: "Atual",
            local: "Governo Federal",
            tipo: "Estágio",
            descricao: [
                "Desenvolvimento de interfaces web para sistemas de IA governamentais",
                "Criação de componentes com HTML, CSS e JavaScript",
                "Trabalho com Plone (framework governamental)",
                "Desenvolvimento de agentes de IA com RAG (Retrieval-Augmented Generation)",
                "Implementação de soluções com LLMs (Large Language Models)",
                "Participação em projetos de inovação com inteligência artificial"
            ],
            tecnologias: ["HTML", "CSS", "JavaScript", "Plone", "Python", "LLM", "RAG", "IA Generativa"],
            cor: "from-indigo-500 to-purple-500",
            icone: "fas fa-robot"
        },
        {
            id: 2,
            cargo: "Desenvolvedor Frontend Freelancer",
            empresa: "Projetos Autônomos",
            periodo: "2025",
            local: "Remoto",
            tipo: "Freelance/Projetos",
            descricao: [
                "Desenvolvimento de sites responsivos para clientes diversos",
                "Otimização de sites para SEO e performance",
                "Criação de identidades visuais simples",
                "Suporte técnico e manutenção para clientes",
                "Implementação de designs modernos com foco em UX/UI"
            ],
            tecnologias: ["HTML", "CSS", "JavaScript", "Bootstrap", "Tailwind", "SEO", "GitHub Pages", "Vercel","Gsap"],
            cor: "from-blue-500 to-cyan-500",
            icone: "fas fa-briefcase"
        }
    ];

    return (
        <section 
            id="experiencia"
            ref={sectionRef}
            className="py-16 md:py-24 relative min-h-[300px] overflow-hidden"
        >
            {/* Background effects */}
            <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-950 to-gray-900" />
            
            {/* Grid pattern - similar ao da seção de projetos */}
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
            
            {/* Linha decorativa no topo */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-30" />
            
            {/* Linha decorativa na base */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-30" />

            <div className="container mx-auto px-4 lg:px-8 relative z-10">
                {/* Section header - Minimalista */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center gap-3 mb-4">
                        <div className="w-3 h-3 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full" />
                        <span className="text-blue-400 font-mono text-sm tracking-widest">
                            EXPERIÊNCIA
                        </span>
                    </div>
                    
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                        Trajetória{" "}
                        <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                            Profissional
                        </span>
                    </h2>
                    
                    <p className="text-gray-400 mt-6 text-lg max-w-2xl mx-auto">
                        Desenvolvimento frontend combinado com inovação em inteligência artificial
                    </p>
                </div>

                {/* Experience cards - Layout simples */}
                <div className="max-w-4xl mx-auto space-y-8">
                    {experiencias.map((exp) => (
                        <div 
                            key={exp.id}
                            className="group relative"
                        >
                            {/* Glow effect para hover */}
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-gray-700 to-gray-900 rounded-2xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
                            
                            {/* Card principal */}
                            <div className="relative bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 rounded-2xl p-6 transition-all duration-300 group-hover:border-blue-500/50 group-hover:scale-[1.02] group-hover:shadow-2xl">
                                
                                {/* Header com linha colorida */}
                                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-6 pb-6 border-b border-gray-700">
                                    <div className="flex items-start gap-4">
                                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${exp.cor} flex items-center justify-center flex-shrink-0`}>
                                            <i className={`${exp.icone} text-white text-lg`}></i>
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-white mb-1">
                                                {exp.cargo}
                                            </h3>
                                            <p className="text-gray-300">{exp.empresa}</p>
                                        </div>
                                    </div>
                                    
                                    {/* Period */}
                                    <div className="text-right">
                                        <span className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-blue-900/30 to-cyan-900/30 text-blue-400 text-sm font-medium border border-blue-800/50">
                                            {exp.periodo}
                                        </span>
                                        <p className="text-sm text-gray-400 mt-2">
                                            {exp.tipo} • {exp.local}
                                        </p>
                                    </div>
                                </div>
                                
                                {/* Description */}
                                <div className="mb-8">
                                    <ul className="space-y-3">
                                        {exp.descricao.map((item, i) => (
                                            <li key={i} className="flex items-start gap-3 text-gray-300">
                                                <div className="w-2 h-2 mt-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex-shrink-0" />
                                                <span className="text-gray-300">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                
                                {/* Technologies */}
                                <div>
                                    <div className="mb-4">
                                        <span className="text-xs text-gray-500 font-medium">
                                            TECNOLOGIAS UTILIZADAS
                                        </span>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {exp.tecnologias.map((tech, i) => (
                                            <span 
                                                key={i}
                                                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-gray-800/50 text-gray-300 border border-gray-700 hover:border-blue-500/50 transition-all duration-300"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            
            {/* Fade out na base */}
            <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-gray-900 to-transparent" />
        </section>
    );
}