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
    const [imagemModal, setImagemModal] = useState(null);
    const [certificadoSelecionado, setCertificadoSelecionado] = useState(null);
    const sectionRef = useRef(null);
    const certificatesRef = useRef(null);
    const buttonRef = useRef(null);
    const modalRef = useRef(null);

    const certificados = [
        { 
            id: 1,
            img: ReactCert, 
            titulo: "React.js - Fundamentos",
            plataforma: "Rocketseat",
            categoria: "frontend",
            horas: 8,
            ano: 2024,
            descricao: "Fundamentos do React.js incluindo componentes, hooks, state management e práticas modernas de desenvolvimento."
        },
        { 
            id: 2,
            img: Py, 
            titulo: "Python Essentials",
            plataforma: "Coursera",
            categoria: "backend",
            horas: 12,
            ano: 2023,
            descricao: "Conceitos essenciais de Python, estruturas de dados, funções e desenvolvimento de scripts."
        },
        { 
            id: 3,
            img: Git, 
            titulo: "Git & GitHub Mastery",
            plataforma: "Alura",
            categoria: "devops",
            horas: 6,
            ano: 2024,
            descricao: "Controle de versão, branching strategies, GitHub Actions e workflows colaborativos."
        },
        { 
            id: 4,
            img: Js, 
            titulo: "JavaScript Moderno",
            plataforma: "Rocketseat",
            categoria: "frontend",
            horas: 10,
            ano: 2023,
            descricao: "ES6+, promises, async/await, manipulação de DOM e padrões modernos de JavaScript."
        },
        { 
            id: 5,
            img: Tw, 
            titulo: "Tailwind CSS",
            plataforma: "Udemy",
            categoria: "frontend",
            horas: 5,
            ano: 2024,
            descricao: "Framework CSS utility-first, design responsivo e componentes reutilizáveis."
        },
        { 
            id: 6,
            img: Linux, 
            titulo: "Linux Administration",
            plataforma: "Cisco",
            categoria: "devops",
            horas: 15,
            ano: 2023,
            descricao: "Administração de sistemas Linux, shell scripting e configuração de servidores."
        },
        { 
            id: 7,
            img: Prompt, 
            titulo: "AI & Prompt Engineering",
            plataforma: "Google",
            categoria: "tools",
            horas: 4,
            ano: 2024,
            descricao: "Engenharia de prompts, utilização de IA generativa e ferramentas de produtividade."
        }
    ];

    const certificadosParaMostrar = mostrarMais ? certificados : certificados.slice(0, 3);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animação da seção
            gsap.from(sectionRef.current, {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                },
                y: 50,
                opacity: 0,
                duration: 1,
                ease: "power3.out"
            });

            // Animação dos certificados
            if (certificatesRef.current) {
                gsap.from(certificatesRef.current.children, {
                    scrollTrigger: {
                        trigger: certificatesRef.current,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    },
                    y: 30,
                    opacity: 0,
                    scale: 0.9,
                    stagger: 0.1,
                    duration: 0.6,
                    delay: 0.2,
                    ease: "back.out(1.7)"
                });
            }

            // Animação do botão
            if (buttonRef.current) {
                gsap.from(buttonRef.current, {
                    scrollTrigger: {
                        trigger: buttonRef.current,
                        start: "top 90%",
                        toggleActions: "play none none reverse"
                    },
                    y: 20,
                    opacity: 0,
                    duration: 0.8,
                    delay: 0.6,
                    ease: "power3.out"
                });
            }
        });

        return () => ctx.revert();
    }, [mostrarMais]);

    const abrirModal = (certificado) => {
        setCertificadoSelecionado(certificado);
        setImagemModal(certificado.img);
        
        // Bloquear scroll do body quando modal abrir
        document.body.style.overflow = 'hidden';
    };

    const fecharModal = () => {
        setImagemModal(null);
        setCertificadoSelecionado(null);
        
        // Liberar scroll do body quando modal fechar
        document.body.style.overflow = 'auto';
    };

    // Fechar modal com ESC
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') {
                fecharModal();
            }
        };

        if (imagemModal) {
            window.addEventListener('keydown', handleEsc);
        }

        return () => {
            window.removeEventListener('keydown', handleEsc);
        };
    }, [imagemModal]);

    const getCategoryColor = (category) => {
        switch(category) {
            case 'frontend': return 'bg-gradient-to-r from-blue-500 to-cyan-500';
            case 'backend': return 'bg-gradient-to-r from-green-500 to-emerald-500';
            case 'devops': return 'bg-gradient-to-r from-purple-500 to-pink-500';
            case 'tools': return 'bg-gradient-to-r from-orange-500 to-yellow-500';
            default: return 'bg-gradient-to-r from-gray-600 to-gray-500';
        }
    };

    const getCategoryIcon = (category) => {
        switch(category) {
            case 'frontend': return 'fas fa-code';
            case 'backend': return 'fas fa-server';
            case 'devops': return 'fas fa-cogs';
            case 'tools': return 'fas fa-tools';
            default: return 'fas fa-certificate';
        }
    };

    return (
        <section 
            id="certificados"
            ref={sectionRef}
            className="py-20 md:py-32 relative overflow-hidden"
        >
            {/* Background effects */}
            <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-950 to-gray-900" />
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent opacity-30" />
            
            {/* Grid pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="w-full h-full" style={{
                    backgroundImage: `
                        linear-gradient(90deg, rgba(251, 191, 36, 0.3) 1px, transparent 1px),
                        linear-gradient(180deg, rgba(251, 191, 36, 0.3) 1px, transparent 1px)
                    `,
                    backgroundSize: '50px 50px'
                }}></div>
            </div>

            <div className="container mx-auto px-4 lg:px-8 relative z-10">
                {/* Section header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center justify-center gap-3 mb-4">
                        <div className="w-3 h-3 bg-gradient-to-r from-yellow-500 to-yellow-300 rounded-full animate-pulse"></div>
                        <span className="text-yellow-400 font-mono text-sm tracking-widest">CERTIFICATIONS</span>
                    </div>
                    
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                        Certificações & <span className="bg-gradient-to-r from-yellow-500 to-yellow-300 bg-clip-text text-transparent">Cursos</span>
                    </h2>
                    
                    <p className="text-gray-400 mt-6 text-lg max-w-2xl mx-auto">
                        Investimento contínuo em aprendizado e validação de conhecimentos técnicos
                    </p>
                </div>

                {/* Certificates grid */}
                <div 
                    ref={certificatesRef}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {certificadosParaMostrar.map((certificado) => (
                        <div 
                            key={certificado.id}
                            className="group relative"
                            onClick={() => abrirModal(certificado)}
                        >
                            {/* Glow effect */}
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-gray-700 to-gray-900 rounded-2xl blur opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                            
                            <div className="relative bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 group-hover:border-yellow-500/50 group-hover:scale-[1.02] group-hover:shadow-2xl h-full">
                                
                                {/* Certificate image */}
                                <div className="relative h-48 overflow-hidden">
                                    <img 
                                        src={certificado.img} 
                                        alt={certificado.titulo}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    
                                    {/* Overlay gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent"></div>
                                    
                                    {/* Category badge */}
                                    <div className="absolute top-4 left-4">
                                        <span className={`px-3 py-1.5 rounded-full text-xs font-medium text-white ${getCategoryColor(certificado.categoria)} flex items-center gap-2`}>
                                            <i className={getCategoryIcon(certificado.categoria)}></i>
                                            {certificado.categoria.charAt(0).toUpperCase() + certificado.categoria.slice(1)}
                                        </span>
                                    </div>
                                    
                                    {/* View certificate badge */}
                                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <span className="px-3 py-1.5 rounded-full text-xs font-medium text-white bg-gray-900/90 backdrop-blur-sm border border-gray-700">
                                            <i className="fas fa-expand mr-1"></i>
                                            Visualizar
                                        </span>
                                    </div>
                                    
                                    {/* Year badge */}
                                    <div className="absolute bottom-4 left-4">
                                        <span className="px-2 py-1 rounded text-xs font-medium text-white bg-gray-900/90 backdrop-blur-sm">
                                            {certificado.ano}
                                        </span>
                                    </div>
                                </div>
                                
                                {/* Certificate info */}
                                <div className="p-6">
                                    {/* Title */}
                                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors duration-300 line-clamp-1">
                                        {certificado.titulo}
                                    </h3>
                                    
                                    {/* Platform */}
                                    <div className="flex items-center gap-2 mb-3">
                                        <i className="fas fa-graduation-cap text-gray-500 text-sm"></i>
                                        <span className="text-gray-400 text-sm">{certificado.plataforma}</span>
                                    </div>
                                    
                                    {/* Description */}
                                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                                        {certificado.descricao}
                                    </p>
                                    
                                    {/* Stats */}
                                    <div className="flex items-center justify-between text-xs text-gray-500">
                                        <div className="flex items-center gap-1">
                                            <i className="fas fa-clock"></i>
                                            <span>{certificado.horas}h</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <i className="fas fa-calendar"></i>
                                            <span>{certificado.ano}</span>
                                        </div>
                                    </div>
                                    
                                    {/* Hover effect line */}
                                    <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-yellow-500 to-yellow-300 group-hover:w-full transition-all duration-500"></div>
                                </div>
                                
                                {/* Click indicator */}
                                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-300 flex items-center justify-center text-white">
                                        <i className="fas fa-eye text-sm"></i>
                                    </div>
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
                            className="group relative px-8 py-4 rounded-full bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700 text-white font-medium hover:border-yellow-500 hover:bg-gray-800/80 transition-all duration-300 overflow-hidden"
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
                                        Ver mais certificados
                                    </>
                                )}
                            </span>
                            
                            {/* Glow effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-yellow-600/0 via-yellow-600/10 to-yellow-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        </button>
                        
                        <p className="text-gray-500 text-sm mt-4">
                            {mostrarMais 
                                ? `Mostrando todos os certificados` 
                                : `Mostrando 3 certificados`
                            }
                        </p>
                    </div>
                )}

                {/* Learning note */}
                <div className="mt-16 text-center border-t border-gray-800/30 pt-8">
                    <p className="text-gray-500 text-sm flex items-center justify-center gap-2">
                        <i className="fas fa-brain text-lg text-yellow-400"></i>
                        Aprendizado contínuo é fundamental para evolução na tecnologia • Sempre estudando!
                    </p>
                </div>
            </div>

            {/* Modal */}
            {imagemModal && certificadoSelecionado && (
                <div 
                    ref={modalRef}
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-sm"
                    onClick={(e) => {
                        if (e.target === modalRef.current) {
                            fecharModal();
                        }
                    }}
                >
                    {/* Close button */}
                    <button
                        onClick={fecharModal}
                        className="absolute top-6 right-6 md:top-8 md:right-8 text-white text-3xl md:text-4xl hover:text-yellow-400 transition-colors duration-300 z-10"
                    >
                        <i className="fas fa-times"></i>
                    </button>
                    
                    {/* Modal content */}
                    <div className="relative max-w-6xl w-full bg-gradient-to-br from-gray-900 to-gray-950 rounded-2xl border border-gray-800 overflow-hidden shadow-2xl">
                        {/* Modal header */}
                        <div className="p-6 border-b border-gray-800">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-2xl font-bold text-white">{certificadoSelecionado.titulo}</h3>
                                    <div className="flex items-center gap-4 mt-2">
                                        <span className="text-gray-400">
                                            <i className="fas fa-graduation-cap mr-2"></i>
                                            {certificadoSelecionado.plataforma}
                                        </span>
                                        <span className="text-gray-400">
                                            <i className="fas fa-calendar mr-2"></i>
                                            {certificadoSelecionado.ano}
                                        </span>
                                        <span className="text-gray-400">
                                            <i className="fas fa-clock mr-2"></i>
                                            {certificadoSelecionado.horas}h
                                        </span>
                                    </div>
                                </div>
                                <span className={`px-4 py-2 rounded-full text-sm font-medium text-white ${getCategoryColor(certificadoSelecionado.categoria)}`}>
                                    {certificadoSelecionado.categoria.charAt(0).toUpperCase() + certificadoSelecionado.categoria.slice(1)}
                                </span>
                            </div>
                        </div>
                        
                        {/* Certificate image */}
                        <div className="p-6 max-h-[60vh] overflow-y-auto">
                            <img 
                                src={imagemModal} 
                                alt={certificadoSelecionado.titulo}
                                className="w-full h-auto rounded-lg shadow-lg"
                            />
                        </div>
                        
                        {/* Modal footer */}
                        <div className="p-6 border-t border-gray-800">
                            <p className="text-gray-300 mb-4">{certificadoSelecionado.descricao}</p>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-500">
                                    <i className="fas fa-info-circle mr-2"></i>
                                    Certificado válido e verificável
                                </span>
                                <button
                                    onClick={fecharModal}
                                    className="px-6 py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-700 transition-colors duration-300"
                                >
                                    Fechar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}