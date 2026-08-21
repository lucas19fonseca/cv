import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ImgDev from "../assets/comum/programador.webp";
import curriculo from "../assets/comum/Lucas_Andrade_web_junior.pdf";

import ReactCert from "../assets/certificados/react-curso.png";
import Py from "../assets/certificados/py.jpeg";
import Js from "../assets/certificados/java.jpeg";
import Git from "../assets/certificados/git-certificado.png";
import Tw from "../assets/certificados/curso-tw.jpg";
import Linux from "../assets/certificados/curso-linux.jpg";
import Prompt from "../assets/certificados/curso-prompt.png";

// Ícones das tecnologias (mesmos usados na section Tecnologias)
import HtmlIcon from "../assets/tecnologias/html.png";
import CssIcon from "../assets/tecnologias/css.png";
import JsIcon from "../assets/tecnologias/Java.sc.png";
import ReactIcon from "../assets/tecnologias/react copy.svg";
import PyIcon from "../assets/tecnologias/py.png";
import GitHubIcon from "../assets/tecnologias/github.png";
import GitIcon from "../assets/tecnologias/git.png";
import VscodeIcon from "../assets/tecnologias/vscode.png";
import MysqlIcon from "../assets/tecnologias/mysql.svg";
import FigmaIcon from "../assets/tecnologias/figma.png";
import DockerIcon from "../assets/tecnologias/docker.png";
import PostmanIcon from "../assets/tecnologias/postman.png";
import TwIcon from "../assets/tecnologias/tailwind.png";
import FireIcon from "../assets/tecnologias/Firebase.png";
import BiIcon from "../assets/tecnologias/Bi.svg";
import UbuntuIcon from "../assets/tecnologias/ubuntu.png";
import BootstrapIcon from "../assets/tecnologias/bootstrap.png";
import GoIcon from "../assets/tecnologias/golang.png";

export default function SobreMim() {
    const [modalAberto, setModalAberto] = useState(false);
    const [techModalAberto, setTechModalAberto] = useState(false);
    const sectionRef = useRef(null);
    const imageRef = useRef(null);
    const textRef = useRef(null);
    const buttonRef = useRef(null);
    const particlesRef = useRef(null);
    const dialogRef = useRef(null);
    const techDialogRef = useRef(null);

    // Array de certificados SIMPLIFICADO
    const certificados = [
        { 
            id: 1,
            img: ReactCert,
            titulo: "React.js",
            descricao: "Fundamentos do React.js incluindo componentes, hooks, state management e práticas modernas de desenvolvimento.",
            link: "#"
        },
        { 
            id: 2,
            img: Py,
            titulo: "Python",
            descricao: "Conceitos essenciais de Python, estruturas de dados, funções e desenvolvimento de scripts.",
            link: "#"
        },
        { 
            id: 3,
            img: Git,
            titulo: "Git & GitHub",
            descricao: "Controle de versão, branching strategies, GitHub Actions e workflows colaborativos.",
            link: "#"
        },
        { 
            id: 4,
            img: Js,
            titulo: "JavaScript",
            descricao: "ES6+, promises, async/await, manipulação de DOM e padrões modernos de JavaScript.",
            link: "#"
        },
        { 
            id: 5,
            img: Tw,
            titulo: "Tailwind CSS",
            descricao: "Framework CSS utility-first, design responsivo e componentes reutilizáveis.",
            link: "https://www.udemy.com/certificate/UC-6cc09705-d9e3-4474-a7d6-9b08832f01a1/"
        },
        { 
            id: 6,
            img: Linux,
            titulo: "Linux",
            descricao: "Administração de sistemas Linux, shell scripting e configuração de servidores.",
            link: "https://www.udemy.com/certificate/UC-6403bf3c-dab4-4f7a-9151-62f64872cba0/"
        },
        { 
            id: 7,
            img: Prompt,
            titulo: "Prompt Engineering",
            descricao: "Engenharia de prompts, utilização de IA generativa e ferramentas de produtividade.",
            link: "#"
        }
    ];

    // Tecnologias agrupadas por categoria (espelha a section Tecnologias)
    const grupos = [
        {
            id: "frontend",
            titulo: "Frontend",
            subtitulo: "Interface & UX",
            icone: "fa-code",
            gradiente: "from-blue-500 to-cyan-500",
            borda: "hover:border-blue-500/60",
            techs: [
                { name: "HTML", icon: HtmlIcon },
                { name: "CSS", icon: CssIcon },
                { name: "JavaScript", icon: JsIcon },
                { name: "React", icon: ReactIcon },
                { name: "Tailwind", icon: TwIcon },
                { name: "Bootstrap", icon: BootstrapIcon },
            ],
        },
        {
            id: "backend",
            titulo: "Backend",
            subtitulo: "Lógica & Dados",
            icone: "fa-server",
            gradiente: "from-green-500 to-emerald-500",
            borda: "hover:border-green-500/60",
            techs: [
                { name: "Golang", icon: GoIcon },
                { name: "Python", icon: PyIcon },
                { name: "MySQL", icon: MysqlIcon },
                { name: "Firebase", icon: FireIcon },
            ],
        },
        {
            id: "tools",
            titulo: "Ferramentas",
            subtitulo: "Dev & Ops",
            icone: "fa-tools",
            gradiente: "from-orange-500 to-yellow-500",
            borda: "hover:border-orange-500/60",
            techs: [
                { name: "Git", icon: GitIcon },
                { name: "GitHub", icon: GitHubIcon },
                { name: "VS Code", icon: VscodeIcon },
                { name: "Postman", icon: PostmanIcon },
                { name: "Power BI", icon: BiIcon },
                { name: "Docker", icon: DockerIcon },
                { name: "Ubuntu", icon: UbuntuIcon },
            ],
        },
        {
            id: "design",
            titulo: "Design & Outros",
            subtitulo: "UI & Análise",
            icone: "fa-palette",
            gradiente: "from-pink-500 to-rose-500",
            borda: "hover:border-pink-500/60",
            techs: [
                { name: "Figma", icon: FigmaIcon },
            ],
        },
    ];

    const abrirModal = () => {
        setModalAberto(true);
    };

    const fecharModal = () => {
        setModalAberto(false);
    };

    const abrirTechModal = () => {
        setTechModalAberto(true);
    };

    const fecharTechModal = () => {
        setTechModalAberto(false);
    };

    // Acessibilidade do modal: ESC para fechar, foco inicial e travar o scroll do fundo
    useEffect(() => {
        if (!modalAberto) return;

        const handleEsc = (e) => {
            if (e.key === "Escape") fecharModal();
        };

        window.addEventListener("keydown", handleEsc);
        const overflowAnterior = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        dialogRef.current?.focus();

        return () => {
            window.removeEventListener("keydown", handleEsc);
            document.body.style.overflow = overflowAnterior;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [modalAberto]);

    // Acessibilidade do modal de tecnologias
    useEffect(() => {
        if (!techModalAberto) return;

        const handleEsc = (e) => {
            if (e.key === "Escape") fecharTechModal();
        };

        window.addEventListener("keydown", handleEsc);
        const overflowAnterior = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        techDialogRef.current?.focus();

        return () => {
            window.removeEventListener("keydown", handleEsc);
            document.body.style.overflow = overflowAnterior;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [techModalAberto]);

    // Registrar GSAP apenas no client-side
    useEffect(() => {
        if (typeof window !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger);
        }
    }, []);

    // Criar partículas para o fundo
    useEffect(() => {
        if (typeof window === 'undefined' || !particlesRef.current) return;

        const createParticle = () => {
            const particle = document.createElement('div');
            particle.className = 'absolute w-[1px] h-[1px] bg-gradient-to-r from-blue-400/30 to-cyan-400/30 rounded-full';
            
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            
            particle.style.left = `${posX}%`;
            particle.style.top = `${posY}%`;
            
            gsap.to(particle, {
                x: (Math.random() - 0.5) * 50,
                y: (Math.random() - 0.5) * 50,
                duration: Math.random() * 15 + 10,
                opacity: Math.random() * 0.3 + 0.1,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                delay: Math.random() * 3
            });
            
            particlesRef.current.appendChild(particle);
        };

        for (let i = 0; i < 20; i++) {
            createParticle();
        }

        return () => {
            if (particlesRef.current) {
                particlesRef.current.innerHTML = '';
            }
        };
    }, []);

    useEffect(() => {
        // Verificar se estamos no client-side
        if (typeof window === 'undefined') return;

        // Forçar visibilidade inicial
        if (sectionRef.current) {
            gsap.set(sectionRef.current, { opacity: 1, visibility: "visible" });
        }

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
                        end: "bottom 70%",
                        toggleActions: "play none none none",
                        markers: false,
                        immediateRender: false
                    }
                }
            );

            // Animação da imagem
            if (imageRef.current) {
                gsap.fromTo(imageRef.current,
                    {
                        x: -30,
                        opacity: 0
                    },
                    {
                        x: 0,
                        opacity: 1,
                        duration: 0.7,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: imageRef.current,
                            start: "top 85%",
                            end: "top 60%",
                            toggleActions: "play none none none",
                            immediateRender: false
                        }
                    }
                );
            }

            // Animação do texto
            if (textRef.current) {
                gsap.fromTo(textRef.current,
                    {
                        x: 20,
                        opacity: 0
                    },
                    {
                        x: 0,
                        opacity: 1,
                        duration: 0.7,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: textRef.current,
                            start: "top 85%",
                            end: "top 60%",
                            toggleActions: "play none none none",
                            immediateRender: false
                        }
                    }
                );
            }

            setTimeout(() => {
                ScrollTrigger.refresh();
            }, 100);
        });

        return () => {
            ctx.revert();
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    return (
        <>
            <section 
                id="sobre-mim"
                ref={sectionRef}
                className="min-h-[80vh] w-full flex items-center justify-center py-16 md:py-24 relative overflow-hidden"
                style={{ 
                    opacity: 1,
                    visibility: 'visible',
                    willChange: 'transform, opacity'
                }}
            >
                {/* Background effects */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
                    <div 
                        className="absolute inset-0 opacity-20"
                        style={{
                            backgroundImage: `
                                linear-gradient(90deg, rgba(9, 105, 204, 0.1) 1px, transparent 1px),
                                linear-gradient(180deg, rgba(9, 105, 204, 0.1) 1px, transparent 1px)
                            `,
                            backgroundSize: '50px 50px',
                            maskImage: 'radial-gradient(circle at center, black 40%, transparent 70%)'
                        }}
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/40 to-white/80"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-50/10 via-transparent to-cyan-50/10"></div>
                    
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
                    <div className="absolute top-1/3 left-1/4 w-60 h-60 bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-full blur-3xl"></div>
                    
                    <div className="absolute inset-0">
                        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-200/30 to-transparent"></div>
                        <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-200/30 to-transparent"></div>
                    </div>
                    
                    <div ref={particlesRef} className="absolute inset-0 pointer-events-none" />
                    
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-64 bg-gradient-to-r from-blue-400/5 via-cyan-400/5 to-blue-400/5 rounded-full blur-3xl"></div>
                </div>
                
                <div className="absolute inset-0 overflow-hidden opacity-20">
                    <svg className="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
                                <path d="M 80 0 L 0 0 0 80" fill="none" stroke="rgba(9, 105, 204, 0.1)" strokeWidth="1"/>
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#grid)" />
                    </svg>
                    
                    <div className="absolute top-20 left-10 w-64 h-px bg-gradient-to-r from-transparent via-blue-300/20 to-transparent transform rotate-45"></div>
                    <div className="absolute bottom-20 right-10 w-64 h-px bg-gradient-to-r from-transparent via-cyan-300/20 to-transparent transform -rotate-45"></div>
                </div>

                <div className="container mx-auto px-6 lg:px-8 relative z-10">
                    {/* Header maior */}
                    <div className="text-center mb-12 md:mb-16">
                        <div className="inline-flex items-center gap-3 mb-3">
                            <div className="w-8 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
                            <span className="text-blue-600 font-mono text-sm tracking-wider font-semibold uppercase">
                                CONHEÇA-ME
                            </span>
                            <div className="w-8 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
                        </div>
                        
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
                            Sobre <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">Mim</span>
                        </h2>
                        <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
                            Conheça um pouco da minha trajetória e objetivos
                        </p>
                    </div>

                    {/* Layout horizontal com mais espaço */}
                    <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 max-w-6xl mx-auto">
                        {/* Imagem maior */}
                        <div 
                            ref={imageRef}
                            className="lg:w-1/3 flex-shrink-0 flex flex-col items-center"
                        >
                            <div className="relative w-full">
                                <div className="relative bg-gradient-to-br from-white to-gray-50 rounded-xl p-1 shadow-lg shadow-blue-100/50">
                                    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500/5 to-cyan-500/5"></div>
                                    <img
                                        src={ImgDev}
                                        alt="Ilustração de um programador representando Lucas Andrade"
                                        className="relative rounded-lg w-full h-auto"
                                        loading="lazy"
                                        decoding="async"
                                    />
                                </div>
                            </div>

                            {/* Botões - Empilhados */}
                            <div className="mt-8 w-full max-w-xl space-y-3">
                                {/* Botão Ver Currículo */}
                                <a
                                    href={curriculo}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group relative overflow-hidden inline-flex items-center justify-center gap-3 w-full px-6 py-4 bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-600 text-white rounded-xl text-base font-semibold hover:shadow-2xl shadow-lg shadow-blue-500/30 transform hover:-translate-y-1 transition-all duration-500"
                                >
                                    <span className="absolute inset-0 bg-gradient-to-r from-blue-500 via-blue-400 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                                    <i className="fas fa-file-lines text-lg group-hover:rotate-12 transition-transform duration-300 relative z-10"></i>
                                    <span className="relative z-10 text-base">Ver Currículo</span>
                                    <i className="fas fa-arrow-right text-sm ml-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300 relative z-10"></i>
                                    
                                    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-400/30 via-cyan-400/30 to-blue-400/30 blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                </a>

                                {/* Botão Ver Certificados */}
                                <button
                                    ref={buttonRef}
                                    onClick={abrirModal}
                                    className="group relative overflow-hidden inline-flex items-center justify-center gap-3 w-full px-6 py-4 bg-white border-2 border-blue-500 text-blue-600 rounded-xl text-base font-semibold hover:bg-blue-50 hover:shadow-xl shadow-md shadow-blue-200/30 transform hover:-translate-y-1 transition-all duration-500"
                                >
                                    <i className="fas fa-certificate text-lg group-hover:scale-110 transition-transform duration-300"></i>
                                    <span className="text-base">Ver Certificados</span>
                                    <i className="fas fa-arrow-right text-sm opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300"></i>
                                </button>

                                {/* Botão Ver Tecnologias */}
                                <button
                                    onClick={abrirTechModal}
                                    className="group relative overflow-hidden inline-flex items-center justify-center gap-3 w-full px-6 py-4 bg-white border-2 border-cyan-500 text-cyan-600 rounded-xl text-base font-semibold hover:bg-cyan-50 hover:shadow-xl shadow-md shadow-cyan-200/30 transform hover:-translate-y-1 transition-all duration-500"
                                >
                                    <i className="fas fa-layer-group text-lg group-hover:scale-110 transition-transform duration-300"></i>
                                    <span className="text-base">Tecnologias & Ferramentas</span>
                                    <i className="fas fa-arrow-right text-sm opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300"></i>
                                </button>
                            </div>
                        </div>

                        {/* Texto maior */}
                        <div 
                            ref={textRef}
                            className="lg:w-2/3 flex-1 min-w-0"
                        >
                            <div className="w-full space-y-6 md:space-y-8">
                                {/* Texto principal */}
                                <div className="bg-white/80 backdrop-blur-sm border border-gray-200/70 rounded-xl p-6 md:p-8 shadow-lg shadow-gray-200/30 hover:shadow-xl hover:shadow-blue-100/30 transition-all duration-300">
                                    <div className="text-gray-800 text-base md:text-lg leading-relaxed space-y-4 md:space-y-6">
                                        <p className="text-justify">
                                            Sou formado em Ciência da Computação, com experiência em desenvolvimento de software e Inteligência Artificial. Atualmente, busco aprofundar meus conhecimentos em IA, com foco em LLMs, Transformers, embeddings, bancos de dados vetoriais, RAG, MCP e IA generativa, além de aprimorar meu inglês e continuar evoluindo profissionalmente.
                                        </p>

                                        <p className="text-justify">
                                            Também atuo como freelancer, desenvolvendo soluções personalizadas para diferentes necessidades e utilizando tecnologia para solucionar problemas de forma prática, eficiente e inovadora. Tenho facilidade para aprender novas tecnologias, trabalhar em equipe e transformar desafios em soluções que agreguem valor a projetos e negócios.
                                        </p>
                                    </div>
                                </div>

                                {/* Soft Skills */}
                                <div className="bg-white/80 backdrop-blur-sm border border-gray-200/70 rounded-xl p-6 md:p-8 shadow-lg shadow-gray-200/30 hover:shadow-xl hover:shadow-cyan-100/30 transition-all duration-300">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center shadow-md">
                                            <i className="fas fa-users text-white"></i>
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-bold text-gray-900">Soft Skills</h4>
                                            <p className="text-gray-600 text-sm">Habilidades interpessoais</p>
                                        </div>
                                    </div>
                                    
                                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                                        <div className="group relative">
                                            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg blur opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                                            <div className="relative bg-white border border-gray-200 rounded-lg p-3 text-center group-hover:border-blue-300 transition-all duration-300 shadow-sm">
                                                <i className="fas fa-comments text-blue-500 text-lg mb-2"></i>
                                                <h5 className="text-sm font-medium text-gray-800">Comunicativo</h5>
                                            </div>
                                        </div>
                                        
                                        <div className="group relative">
                                            <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg blur opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                                            <div className="relative bg-white border border-gray-200 rounded-lg p-3 text-center group-hover:border-cyan-300 transition-all duration-300 shadow-sm">
                                                <i className="fas fa-users text-cyan-500 text-lg mb-2"></i>
                                                <h5 className="text-sm font-medium text-gray-800">Colaborativo</h5>
                                            </div>
                                        </div>
                                        
                                        <div className="group relative">
                                            <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-lg blur opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                                            <div className="relative bg-white border border-gray-200 rounded-lg p-3 text-center group-hover:border-orange-300 transition-all duration-300 shadow-sm">
                                                <i className="fas fa-rocket text-orange-500 text-lg mb-2"></i>
                                                <h5 className="text-sm font-medium text-gray-800">Proativo</h5>
                                            </div>
                                        </div>
                                        
                                        <div className="group relative">
                                            <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg blur opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                                            <div className="relative bg-white border border-gray-200 rounded-lg p-3 text-center group-hover:border-green-300 transition-all duration-300 shadow-sm">
                                                <i className="fas fa-search text-green-500 text-lg mb-2"></i>
                                                <h5 className="text-sm font-medium text-gray-800">Curioso</h5>
                                            </div>
                                        </div>
                                        
                                        <div className="group relative">
                                            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg blur opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                                            <div className="relative bg-white border border-gray-200 rounded-lg p-3 text-center group-hover:border-purple-300 transition-all duration-300 shadow-sm">
                                                <i className="fas fa-random text-purple-500 text-lg mb-2"></i>
                                                <h5 className="text-sm font-medium text-gray-800">Adaptável</h5>
                                            </div>
                                        </div>
                                        
                                        <div className="group relative">
                                            <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg blur opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                                            <div className="relative bg-white border border-gray-200 rounded-lg p-3 text-center group-hover:border-red-300 transition-all duration-300 shadow-sm">
                                                <i className="fas fa-shield-alt text-red-500 text-lg mb-2"></i>
                                                <h5 className="text-sm font-medium text-gray-800">Resiliente</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Estilos CSS */}
                <style jsx>{`
                    @keyframes float {
                        0%, 100% { transform: translateY(0px); }
                        50% { transform: translateY(-10px); }
                    }
                    
                    .animate-float {
                        animation: float 3s ease-in-out infinite;
                    }
                `}</style>
            </section>

            {/* Modal de Certificados */}
            {modalAberto && (
                <div
                    className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md cert-modal-overlay"
                    onClick={(e) => {
                        if (e.target === e.currentTarget) fecharModal();
                    }}
                >
                    <div
                        ref={dialogRef}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="cert-modal-titulo"
                        tabIndex={-1}
                        className="cert-modal-card relative w-full max-w-md max-h-[90vh] flex flex-col rounded-3xl border border-white/10 bg-gray-950/95 shadow-2xl outline-none overflow-hidden"
                    >
                        {/* Brilho decorativo no topo */}
                        <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full bg-blue-600/20 blur-3xl" />
                        <div className="pointer-events-none absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/60 to-transparent" />

                        {/* Botão fechar */}
                        <button
                            onClick={fecharModal}
                            aria-label="Fechar"
                            className="absolute top-4 right-4 z-10 flex h-9 w-9 items-center justify-center rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-all duration-300"
                        >
                            <i className="fas fa-times"></i>
                        </button>

                        {/* Cabeçalho */}
                        <div className="relative p-6 sm:p-7 pb-4">
                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg shadow-blue-500/30">
                                    <i className="fas fa-certificate text-white text-lg"></i>
                                </div>
                                <div>
                                    <h2 id="cert-modal-titulo" className="text-xl font-bold text-white leading-tight">
                                        Meus Certificados
                                    </h2>
                                    <p className="text-gray-400 text-sm">
                                        Cursos e formações concluídas.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Lista de certificados */}
                        <div className="cert-modal-scroll relative px-6 sm:px-7 pb-6 sm:pb-7 overflow-y-auto space-y-3.5">
                            {certificados.map((cert) => (
                                <div
                                    key={cert.id}
                                    className="rounded-xl p-3.5 border border-white/10 bg-white/5 hover:border-blue-500/60 hover:bg-white/[0.07] transition-all duration-300"
                                >
                                    <div className="flex items-center gap-3.5">
                                        <img
                                            src={cert.img}
                                            alt={`Certificado: ${cert.titulo}`}
                                            className="h-14 w-14 shrink-0 rounded-lg border border-white/10 object-cover"
                                            loading="lazy"
                                            decoding="async"
                                        />
                                        <div className="min-w-0 flex-1">
                                            <h3 className="text-sm font-semibold text-white truncate">
                                                {cert.titulo}
                                            </h3>
                                            <p className="text-gray-400 text-xs line-clamp-2">
                                                {cert.descricao}
                                            </p>
                                        </div>
                                        <a
                                            href={cert.link !== "#" ? cert.link : cert.img}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={`Ver certificado de ${cert.titulo}`}
                                            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 text-white transition-all duration-300 hover:from-blue-500 hover:to-cyan-400 hover:shadow-[0_0_20px_rgba(59,130,246,0.35)]"
                                        >
                                            <i className={`fas ${cert.link !== "#" ? "fa-external-link-alt" : "fa-expand"} text-xs`}></i>
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Modal de Tecnologias & Ferramentas */}
            {techModalAberto && (
                <div
                    className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md cert-modal-overlay"
                    onClick={(e) => {
                        if (e.target === e.currentTarget) fecharTechModal();
                    }}
                >
                    <div
                        ref={techDialogRef}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="tech-modal-titulo"
                        tabIndex={-1}
                        className="cert-modal-card relative w-full max-w-3xl max-h-[90vh] flex flex-col rounded-3xl border border-white/10 bg-gray-950/95 shadow-2xl outline-none overflow-hidden"
                    >
                        {/* Brilho decorativo no topo */}
                        <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full bg-cyan-600/20 blur-3xl" />
                        <div className="pointer-events-none absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/60 to-transparent" />

                        {/* Botão fechar */}
                        <button
                            onClick={fecharTechModal}
                            aria-label="Fechar"
                            className="absolute top-4 right-4 z-10 flex h-9 w-9 items-center justify-center rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-all duration-300"
                        >
                            <i className="fas fa-times"></i>
                        </button>

                        {/* Cabeçalho */}
                        <div className="relative p-6 sm:p-7 pb-4">
                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg shadow-cyan-500/30">
                                    <i className="fas fa-layer-group text-white text-lg"></i>
                                </div>
                                <div>
                                    <h2 id="tech-modal-titulo" className="text-xl font-bold text-white leading-tight">
                                        Tecnologias & <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">Ferramentas</span>
                                    </h2>
                                    <p className="text-gray-400 text-sm">
                                        Tecnologias que utilizo no dia a dia.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Categorias */}
                        <div className="cert-modal-scroll relative px-6 sm:px-7 pb-6 sm:pb-7 overflow-y-auto space-y-5">
                            {grupos.map((grupo) => (
                                <div key={grupo.id}>
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className={`w-9 h-9 rounded-lg bg-gradient-to-r ${grupo.gradiente} flex items-center justify-center flex-shrink-0`}>
                                            <i className={`fas ${grupo.icone} text-white text-sm`}></i>
                                        </div>
                                        <div>
                                            <h3 className="text-base font-bold text-white leading-tight">{grupo.titulo}</h3>
                                            <p className="text-gray-500 text-xs">{grupo.subtitulo}</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                                        {grupo.techs.map((tech) => (
                                            <div
                                                key={tech.name}
                                                className={`rounded-xl border border-white/10 bg-white/5 p-3 transition-all duration-300 hover:bg-white/[0.08] hover:scale-105 ${grupo.borda}`}
                                            >
                                                <div className="w-10 h-10 mx-auto mb-2 rounded-lg bg-gray-900/60 border border-white/10 flex items-center justify-center p-1.5">
                                                    <img
                                                        src={tech.icon}
                                                        alt={tech.name}
                                                        className="w-full h-full object-contain"
                                                        loading="lazy"
                                                        decoding="async"
                                                    />
                                                </div>
                                                <h4 className="text-center text-white font-medium text-xs truncate">
                                                    {tech.name}
                                                </h4>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            <style>{`
                @keyframes certOverlayIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes certCardIn {
                    from { opacity: 0; transform: translateY(16px) scale(0.97); }
                    to { opacity: 1; transform: translateY(0) scale(1); }
                }
                .cert-modal-overlay { animation: certOverlayIn 0.25s ease-out; }
                .cert-modal-card { animation: certCardIn 0.3s cubic-bezier(0.16, 1, 0.3, 1); }

                /* Scrollbar fina e minimalista */
                .cert-modal-scroll {
                    scrollbar-width: thin;
                    scrollbar-color: rgba(255, 255, 255, 0.15) transparent;
                }
                .cert-modal-scroll::-webkit-scrollbar {
                    width: 5px;
                }
                .cert-modal-scroll::-webkit-scrollbar-track {
                    background: transparent;
                }
                .cert-modal-scroll::-webkit-scrollbar-thumb {
                    background-color: rgba(255, 255, 255, 0.15);
                    border-radius: 9999px;
                }
                .cert-modal-scroll::-webkit-scrollbar-thumb:hover {
                    background-color: rgba(255, 255, 255, 0.3);
                }
            `}</style>
        </>
    );
}