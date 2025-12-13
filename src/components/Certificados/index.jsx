import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ReactCert from "../../assets/certificados/react-curso.png";
import Py from "../../assets/certificados/py.jpeg";
import Js from "../../assets/certificados/java.jpeg";
import Git from "../../assets/certificados/git-certificado.png";
import Tw from "../../assets/certificados/curso-tw.jpg";
import Linux from "../../assets/certificados/curso-linux.jpg";
import Prompt from "../../assets/certificados/curso-prompt.png";

// Registrar plugin GSAP
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export default function Certificados() {
    const [mostrarMais, setMostrarMais] = useState(false);
    const sectionRef = useRef(null);
    const certificatesRef = useRef(null);
    const buttonRef = useRef(null);

    const certificados = [
        { 
            id: 1,
            img: ReactCert, 
            titulo: "React.js - Fundamentos",
            descricao: "Fundamentos do React.js incluindo componentes, hooks, state management e práticas modernas de desenvolvimento.",
            destaque: false
        },
        { 
            id: 2,
            img: Py, 
            titulo: "Python Essentials",
            descricao: "Conceitos essenciais de Python, estruturas de dados, funções e desenvolvimento de scripts.",
            destaque: false
        },
        { 
            id: 3,
            img: Git, 
            titulo: "Git & GitHub Mastery",
            descricao: "Controle de versão, branching strategies, GitHub Actions e workflows colaborativos.",
            destaque: false
        },
        { 
            id: 4,
            img: Js, 
            titulo: "JavaScript Moderno",
            descricao: "ES6+, promises, async/await, manipulação de DOM e padrões modernos de JavaScript.",
        },
        { 
            id: 5,
            img: Tw, 
            titulo: "Tailwind CSS Pro",
            descricao: "Framework CSS utility-first, design responsivo e componentes reutilizáveis.",
        },
        { 
            id: 6,
            img: Linux, 
            titulo: "Linux Administration",
            descricao: "Administração de sistemas Linux, shell scripting e configuração de servidores.",
        },
        { 
            id: 7,
            img: Prompt, 
            titulo: "AI & Prompt Engineering",
            descricao: "Engenharia de prompts, utilização de IA generativa e ferramentas de produtividade.",
        }
    ];

    // Ordenar: destaques primeiro
    const certificadosOrdenados = [...certificados].sort((a, b) => {
        if (a.destaque && !b.destaque) return -1;
        if (!a.destaque && b.destaque) return 1;
        return 0;
    });

    const certificadosParaMostrar = mostrarMais ? certificadosOrdenados : certificadosOrdenados.slice(0, 3);

    useEffect(() => {
        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
            // Animação da seção
            gsap.fromTo(sectionRef.current,
                {
                    y: 40,
                    opacity: 0
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 85%",
                        toggleActions: "play none none none",
                    }
                }
            );

            // Animação dos cards
            if (certificatesRef.current) {
                gsap.fromTo(certificatesRef.current.children,
                    {
                        y: 30,
                        opacity: 0,
                        scale: 0.95
                    },
                    {
                        y: 0,
                        opacity: 1,
                        scale: 1,
                        duration: 0.6,
                        stagger: 0.08,
                        ease: "back.out(1.2)",
                        scrollTrigger: {
                            trigger: certificatesRef.current,
                            start: "top 80%",
                            toggleActions: "play none none none",
                        }
                    }
                );
            }

            // Animação do botão
            if (buttonRef.current && certificados.length > 3) {
                gsap.fromTo(buttonRef.current,
                    {
                        y: 20,
                        opacity: 0
                    },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.5,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: buttonRef.current,
                            start: "top 90%",
                            toggleActions: "play none none none",
                        }
                    }
                );
            }

        }, sectionRef);

        return () => ctx.revert();
    }, [mostrarMais, certificados.length]);

    return (
        <section 
            id="certificados"
            ref={sectionRef}
            className="py-20 md:py-28 relative overflow-hidden"
        >
            {/* Background effects */}
            <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-950 to-gray-900" />
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-30" />
            
            {/* Grid pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="w-full h-full" style={{
                    backgroundImage: `
                        linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px),
                        linear-gradient(180deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
                    `,
                    backgroundSize: '50px 50px'
                }}></div>
            </div>

            <div className="container mx-auto px-4 lg:px-8 relative z-10">
                {/* Section header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center justify-center gap-3 mb-4">
                        <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"></div>
                        <span className="text-blue-400 font-mono text-sm tracking-widest">CERTIFICATIONS</span>
                    </div>
                    
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Certificações & <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">Cursos</span>
                    </h2>
                    
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Investimento contínuo em aprendizado e validação de conhecimentos técnicos
                    </p>
                </div>

                {/* Certificates grid */}
                <div 
                    ref={certificatesRef}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {certificadosParaMostrar.map((certificado) => (
                        <div 
                            key={certificado.id}
                            className="group relative"
                        >
                            {/* Glow effect */}
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-gray-700 to-gray-900 rounded-2xl blur opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                            
                            <div className="relative bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 rounded-2xl overflow-hidden transition-all duration-300 group-hover:border-blue-500/50 group-hover:scale-[1.02] group-hover:shadow-2xl h-full">
                                
                                {/* Badge destaque */}
                                {certificado.destaque && (
                                    <div className="absolute top-4 left-4 z-10">
                                        <span className="px-3 py-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-bold rounded-full flex items-center gap-1">
                                            <i className="fas fa-star text-xs"></i>
                                            Destaque
                                        </span>
                                    </div>
                                )}

                                {/* Certificate image */}
                                <div className="relative h-44 overflow-hidden">
                                    <img 
                                        src={certificado.img} 
                                        alt={certificado.titulo}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        loading="lazy"
                                    />
                                    
                                    {/* Overlay gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent"></div>
                                    
                                   
                                </div>
                                
                                {/* Certificate info */}
                                <div className="p-5">
                                    {/* Title and level */}
                                    <div className="mb-3">
                                        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors duration-300 line-clamp-2">
                                            {certificado.titulo}
                                        </h3>
                                        
                                    </div>
                                    
                                    {/* Description */}
                                    <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                                        {certificado.descricao}
                                    </p>
                                    
                                    {/* Footer info */}
                                    <div className="flex items-center justify-between pt-3 border-t border-gray-800/50">
                                        <span className="text-xs text-gray-500">{certificado.data}</span>
                                        <div className="flex items-center text-xs text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <i className="fas fa-certificate mr-1"></i>
                                            <span>Certificado verificado</span>
                                        </div>
                                    </div>
                                    
                                    {/* Hover effect line */}
                                    <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 group-hover:w-full transition-all duration-500"></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Show more/less button */}
                {certificados.length > 3 && (
                    <div className="text-center mt-12" ref={buttonRef}>
                        <button
                            onClick={() => setMostrarMais(!mostrarMais)}
                            className="group relative px-8 py-4 rounded-full bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700 text-white font-medium hover:border-blue-500 hover:bg-gray-800/80 transition-all duration-300 overflow-hidden"
                        >
                            <span className="relative z-10 flex items-center gap-3">
                                {mostrarMais ? (
                                    <>
                                        <i className="fas fa-chevron-up"></i>
                                        Ver menos certificados
                                    </>
                                ) : (
                                    <>
                                        <i className="fas fa-chevron-down"></i>
                                        Ver mais certificados ({certificados.length - 3})
                                    </>
                                )}
                            </span>
                            
                            {/* Glow effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-blue-600/10 to-cyan-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        </button>
                    </div>
                )}

                {/* Stats note */}
                <div className="text-center mt-10 pt-8 border-t border-gray-800/30">
                    <p className="text-gray-500 text-sm flex items-center justify-center gap-2">
                        <i className="fas fa-chart-line"></i>
                        <span>{certificados.length} certificados • 245+ horas de aprendizado • 4 áreas de conhecimento</span>
                    </p>
                </div>
            </div>
            
            {/* Bottom decorative elements */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-30" />
            <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-gray-900 to-transparent" />
        </section>
    );
}