import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Registrar plugin GSAP
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export default function Experiencia() {
    const sectionRef = useRef(null);
    const cardsRef = useRef(null);

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

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animação suave da seção
            gsap.from(sectionRef.current, {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                },
                y: 20,
                opacity: 0,
                duration: 0.6,
                ease: "power2.out"
            });

            // Animação dos cards
            if (cardsRef.current) {
                gsap.from(cardsRef.current.children, {
                    scrollTrigger: {
                        trigger: cardsRef.current,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    },
                    y: 20,
                    opacity: 0,
                    stagger: 0.2,
                    duration: 0.5,
                    ease: "power2.out"
                });
            }
        });

        return () => ctx.revert();
    }, []);

    return (
        <section 
            id="experiencia"
            ref={sectionRef}
            className="py-16 md:py-24 relative"
        >
            {/* Background minimalista */}
            <div className="absolute inset-0 bg-gray-50 dark:bg-gray-900" />
            
            <div className="container mx-auto px-4 lg:px-8 relative z-10">
                {/* Section header - Minimalista */}
                <div className="text-center mb-12">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-medium mb-4">
                        EXPERIÊNCIA
                    </span>
                    
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        Trajetória <span className="text-blue-600 dark:text-blue-400">Profissional</span>
                    </h2>
                    
                    <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Desenvolvimento frontend combinado com inovação em inteligência artificial
                    </p>
                </div>

                {/* Experience cards - Layout simples */}
                <div ref={cardsRef} className="max-w-4xl mx-auto space-y-8">
                    {experiencias.map((exp) => (
                        <div 
                            key={exp.id}
                            className="group relative"
                        >
                            {/* Card */}
                            <div className="relative bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 transition-all duration-300 hover:shadow-lg hover:border-blue-200 dark:hover:border-blue-700">
                                
                                {/* Header com linha colorida */}
                                <div className="flex items-start justify-between mb-6 pb-6 border-b border-gray-100 dark:border-gray-700">
                                    <div className="flex items-start gap-4">
                                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${exp.cor} flex items-center justify-center flex-shrink-0`}>
                                            <i className={`${exp.icone} text-white text-lg`}></i>
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                                                {exp.cargo}
                                            </h3>
                                            <p className="text-gray-700 dark:text-gray-300">{exp.empresa}</p>
                                        </div>
                                    </div>
                                    
                                    {/* Period */}
                                    <div className="text-right">
                                        <span className="inline-block px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-medium">
                                            {exp.periodo}
                                        </span>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{exp.tipo} • {exp.local}</p>
                                    </div>
                                </div>
                                
                                {/* Description */}
                                <div className="mb-6">
                                    <ul className="space-y-3">
                                        {exp.descricao.map((item, i) => (
                                            <li key={i} className="flex items-start gap-3 text-gray-600 dark:text-gray-300">
                                                <i className="fas fa-check text-blue-500 dark:text-blue-400 mt-1 text-sm"></i>
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                
                                {/* Technologies */}
                                <div>
                                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">TECNOLOGIAS</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {exp.tecnologias.map((tech, i) => (
                                            <span 
                                                key={i}
                                                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                
                                {/* Hover effect line */}
                                <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 group-hover:w-full transition-all duration-500 rounded-b-xl"></div>
                            </div>
                        </div>
                    ))}
                </div>
               
            </div>
        </section>
    );
}