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
    const [modalEntrando, setModalEntrando] = useState(false);
    const sectionRef = useRef(null);
    const certificatesRef = useRef(null);
    const buttonRef = useRef(null);
    const modalRef = useRef(null);
    const modalContentRef = useRef(null);

    const certificados = [
        { 
            id: 1,
            img: ReactCert, 
            titulo: "React.js - Fundamentos",
            descricao: "Fundamentos do React.js incluindo componentes, hooks, state management e práticas modernas de desenvolvimento.",
            habilidades: ["Componentes", "Hooks", "State Management", "JSX", "React Router"]
        },
        { 
            id: 2,
            img: Py, 
            titulo: "Python Essentials",
            descricao: "Conceitos essenciais de Python, estruturas de dados, funções e desenvolvimento de scripts.",
            habilidades: ["Estruturas de Dados", "Funções", "OOP", "Scripting", "Bibliotecas"]
        },
        { 
            id: 3,
            img: Git, 
            titulo: "Git & GitHub Mastery",
            descricao: "Controle de versão, branching strategies, GitHub Actions e workflows colaborativos.",
            habilidades: ["Versionamento", "Branching", "Merge", "GitHub Actions", "CI/CD"]
        },
        { 
            id: 4,
            img: Js, 
            titulo: "JavaScript Moderno",
            descricao: "ES6+, promises, async/await, manipulação de DOM e padrões modernos de JavaScript.",
            habilidades: ["ES6+", "Promises", "Async/Await", "DOM", "Modern Patterns"]
        },
        { 
            id: 5,
            img: Tw, 
            titulo: "Tailwind CSS",
            descricao: "Framework CSS utility-first, design responsivo e componentes reutilizáveis.",
            habilidades: ["Utility-First", "Responsive Design", "Components", "Customization", "Plugins"]
        },
        { 
            id: 6,
            img: Linux, 
            titulo: "Linux Administration",
            descricao: "Administração de sistemas Linux, shell scripting e configuração de servidores.",
            habilidades: ["Shell Scripting", "System Admin", "Servers", "Security", "Networking"]
        },
        { 
            id: 7,
            img: Prompt, 
            titulo: "AI & Prompt Engineering",
            descricao: "Engenharia de prompts, utilização de IA generativa e ferramentas de produtividade.",
            habilidades: ["Prompt Design", "AI Tools", "Productivity", "Automation", "Best Practices"]
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
                y: 30,
                opacity: 0,
                duration: 0.8,
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
                    stagger: 0.15,
                    duration: 0.6,
                    ease: "power2.out"
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
                    duration: 0.6,
                    ease: "power2.out"
                });
            }
        });

        return () => ctx.revert();
    }, [mostrarMais]);

    const abrirModal = (certificado) => {
        setCertificadoSelecionado(certificado);
        setImagemModal(certificado.img);
        setModalEntrando(true);
        
        // Animar entrada do modal
        setTimeout(() => {
            if (modalContentRef.current) {
                gsap.fromTo(modalContentRef.current,
                    { scale: 0.9, opacity: 0, y: 50 },
                    { scale: 1, opacity: 1, y: 0, duration: 0.5, ease: "back.out(1.7)" }
                );
            }
        }, 10);
        
        // Bloquear scroll do body quando modal abrir
        document.body.style.overflow = 'hidden';
    };

    const fecharModal = () => {
        // Animar saída do modal
        if (modalContentRef.current) {
            gsap.to(modalContentRef.current, {
                scale: 0.9,
                opacity: 0,
                y: 50,
                duration: 0.3,
                ease: "power2.in",
                onComplete: () => {
                    setModalEntrando(false);
                    setImagemModal(null);
                    setCertificadoSelecionado(null);
                    document.body.style.overflow = 'auto';
                }
            });
        } else {
            setModalEntrando(false);
            setImagemModal(null);
            setCertificadoSelecionado(null);
            document.body.style.overflow = 'auto';
        }
    };

    // Fechar modal com ESC
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape' && imagemModal) {
                fecharModal();
            }
        };

        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [imagemModal]);

    return (
        <section 
            id="certificados"
            ref={sectionRef}
            className="py-20 md:py-32 relative overflow-hidden"
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
                    
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                        Certificações & <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">Cursos</span>
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
                            
                            <div className="relative bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 group-hover:border-blue-500/50 group-hover:scale-[1.02] group-hover:shadow-2xl h-full">
                                
                                {/* Certificate image */}
                                <div className="relative h-48 overflow-hidden">
                                    <img 
                                        src={certificado.img} 
                                        alt={certificado.titulo}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    
                                    {/* Overlay gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent"></div>
                                </div>
                                
                                {/* Certificate info */}
                                <div className="p-6">
                                    {/* Title */}
                                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors duration-300 line-clamp-2">
                                        {certificado.titulo}
                                    </h3>
                                    
                                    {/* Description */}
                                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                                        {certificado.descricao}
                                    </p>
                                    
                                    {/* Click indicator */}
                                    <div className="flex items-center text-xs text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <i className="fas fa-external-link-alt mr-1"></i>
                                        <span>Clique para ver detalhes</span>
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
                                        Ver mais certificados
                                    </>
                                )}
                            </span>
                            
                            {/* Glow effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-blue-600/10 to-cyan-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        </button>
                        
                        <p className="text-gray-500 text-sm mt-4">
                            
                        </p>
                    </div>
                )}

               
            </div>

            {/* Modal */}
            {(imagemModal || modalEntrando) && certificadoSelecionado && (
                <div 
                    ref={modalRef}
                    className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    onClick={(e) => {
                        if (e.target === modalRef.current) {
                            fecharModal();
                        }
                    }}
                >
                    {/* Overlay animado */}
                    <div className="absolute inset-0 bg-black/95 backdrop-blur-sm"></div>
                    
                    {/* Conteúdo do Modal */}
                    <div 
                        ref={modalContentRef}
                        className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl shadow-2xl border border-gray-800 bg-gradient-to-b from-gray-900 to-gray-950"
                    >
                        {/* Header do Modal */}
                        <div className="relative p-6 border-b border-gray-800">
                            {/* Botão fechar */}
                            <button
                                onClick={fecharModal}
                                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-gray-800/80 backdrop-blur-sm border border-gray-700 flex items-center justify-center text-white hover:bg-gray-700 hover:border-blue-500 transition-all duration-300 group"
                            >
                                <i className="fas fa-times text-lg group-hover:scale-110 transition-transform"></i>
                            </button>
                            
                            {/* Título */}
                            <div className="pr-12">
                                <h3 className="text-2xl md:text-3xl font-bold text-white">
                                    {certificadoSelecionado.titulo}
                                </h3>
                            </div>
                        </div>
                        
                        {/* Conteúdo principal do modal */}
                        <div className="p-6 overflow-y-auto max-h-[60vh]">
                            <div className="grid md:grid-cols-2 gap-8">
                                {/* Imagem do certificado */}
                                <div className="relative group">
                                    <div className="relative rounded-xl overflow-hidden border-2 border-gray-800">
                                        <img 
                                            src={imagemModal} 
                                            alt={certificadoSelecionado.titulo}
                                            className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                    </div>
                                </div>
                                
                                {/* Detalhes do certificado */}
                                <div className="space-y-6">
                                    {/* Descrição */}
                                    <div>
                                        <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                                            <i className="fas fa-info-circle text-blue-400"></i>
                                            Sobre o curso
                                        </h4>
                                        <p className="text-gray-300 leading-relaxed">
                                            {certificadoSelecionado.descricao}
                                        </p>
                                    </div>
                                    
                                    {/* Habilidades aprendidas */}
                                    <div>
                                        <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                                            <i className="fas fa-check-circle text-blue-400"></i>
                                            Habilidades Desenvolvidas
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {certificadoSelecionado.habilidades.map((habilidade, index) => (
                                                <span 
                                                    key={index}
                                                    className="px-3 py-1.5 rounded-lg bg-gray-800/50 border border-gray-700 text-gray-300 text-sm hover:border-blue-500 hover:text-blue-400 transition-colors cursor-default"
                                                >
                                                    {habilidade}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Footer do modal */}
                        <div className="p-6 border-t border-gray-800">
                            <button
                                onClick={fecharModal}
                                className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold hover:from-blue-500 hover:to-cyan-400 transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] flex items-center justify-center gap-2"
                            >
                                <i className="fas fa-check"></i>
                                Fechar
                            </button>
                            <p className="text-center text-gray-500 text-sm mt-2">
                                Pressione ESC para fechar
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}