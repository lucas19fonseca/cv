// src/components/HomeHero/index.jsx
import { useEffect, useRef, useState } from 'react';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FotoLucas from "../../assets/comum/lucas.jpg";
import curriculo from "../../assets/comum/Lucas_Andrade_web_junior.pdf";

// Registrar plugin GSAP
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export default function HomeHero() {
    const heroRef = useRef(null);
    const headerRef = useRef(null);
    const titleRef = useRef(null);
    const imageRef = useRef(null);
    const socialRef = useRef(null);
    const btnRef = useRef(null);
    const particlesRef = useRef(null);
    const waveRef = useRef(null);
    
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('');

    // Dados dos ícones sociais
    const socialLinks = [
        { 
            icon: "instagram", 
            url: "https://www.instagram.com/lucax.andrade_/", 
            label: "Instagram" 
        },
        { 
            icon: "github", 
            url: "https://github.com/lucas19fonseca", 
            label: "GitHub" 
        },
        { 
            icon: "linkedin", 
            url: "https://www.linkedin.com/in/lucas-andrade-5511022b3/", 
            label: "LinkedIn" 
        },
        { 
            icon: "discord", 
            url: "https://discord.com/channels/@me", 
            label: "Discord" 
        }
    ];

    // Itens do menu
    const menuItems = [
        { id: 'home-hero', label: 'Início' },
        { id: 'sobre-mim', label: 'Sobre' },
        { id: 'tecnologias', label: 'Tech' },
        { id: 'projetos', label: 'Projetos' },
        { id: 'certificados', label: 'Certificados' },
        { id: 'contato', label: 'Contato' }
    ];

    // Criar partículas flutuantes
    useEffect(() => {
        if (typeof window === 'undefined' || !particlesRef.current) return;

        const createParticle = () => {
            const particle = document.createElement('div');
            particle.className = 'absolute w-[1px] h-[1px] bg-gradient-to-r from-[#0969CC] to-cyan-400 rounded-full';
            
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            
            particle.style.left = `${posX}%`;
            particle.style.top = `${posY}%`;
            
            gsap.to(particle, {
                x: (Math.random() - 0.5) * 100,
                y: (Math.random() - 0.5) * 100,
                duration: Math.random() * 10 + 10,
                opacity: 0,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                delay: Math.random() * 5
            });
            
            particlesRef.current.appendChild(particle);
        };

        for (let i = 0; i < 50; i++) {
            createParticle();
        }

        return () => {
            if (particlesRef.current) {
                particlesRef.current.innerHTML = '';
            }
        };
    }, []);

    useEffect(() => {
        // Animação de entrada do header
        const headerCtx = gsap.context(() => {
            gsap.from(headerRef.current, {
                y: -100,
                opacity: 0,
                duration: 1,
                ease: "power4.out",
                delay: 0.3
            });
        });

        // Animação da hero section
        const heroCtx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

            // Foto com efeito especial
            if (imageRef.current) {
                const imgElement = imageRef.current.querySelector('img');
                tl.from(imageRef.current, {
                    scale: 0.8,
                    opacity: 0,
                    duration: 1.2,
                    rotateY: -30
                }, 0);
                
                if (imgElement) {
                    tl.from(imgElement, {
                        scale: 1.2,
                        duration: 1.5,
                        filter: "blur(10px)",
                        ease: "power4.out"
                    }, 0.2);
                }
            }

            // Título
            if (titleRef.current) {
                const originalText = titleRef.current.textContent;
                titleRef.current.textContent = '';
                
                gsap.fromTo(titleRef.current,
                    { opacity: 0 },
                    {
                        opacity: 1,
                        duration: 0.5,
                        onComplete: () => {
                            let i = 0;
                            const typeWriter = () => {
                                if (i < originalText.length) {
                                    titleRef.current.textContent += originalText.charAt(i);
                                    i++;
                                    setTimeout(typeWriter, 30);
                                }
                            };
                            typeWriter();
                        }
                    }
                );
            }

            // Ícones sociais
            if (socialRef.current && socialRef.current.children) {
                gsap.from(socialRef.current.children, {
                    y: 30,
                    opacity: 0,
                    stagger: 0.1,
                    duration: 0.8,
                    delay: 0.8,
                    ease: "back.out(1.7)"
                });
            }

            // Botão
            if (btnRef.current) {
                gsap.from(btnRef.current, {
                    y: 20,
                    opacity: 0,
                    scale: 0.9,
                    duration: 1,
                    delay: 1.2,
                    ease: "elastic.out(1, 0.5)"
                });
            }

            // Wave animation
            if (waveRef.current) {
                gsap.from(waveRef.current, {
                    y: 100,
                    opacity: 0,
                    duration: 1.5,
                    delay: 0.5,
                    ease: "power2.out"
                });
            }
        });

        // Detectar scroll
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
            
            // Detectar seção ativa
            const sections = ['home-hero', 'sobre-mim', 'tecnologias', 'projetos', 'certificados', 'contato'];
            let current = '';
            
            sections.forEach(section => {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top <= 150 && rect.bottom >= 150) {
                        current = section;
                    }
                }
            });
            
            setActiveSection(current);
        };

        // Configurar rolagem suave
        const setupSmoothScroll = () => {
            const anchors = document.querySelectorAll('a[href^="#"]');
            anchors.forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    const href = this.getAttribute('href');
                    if (href && href.startsWith("#") && href !== "#") {
                        e.preventDefault();
                        const targetElement = document.querySelector(href);
                        if (targetElement) {
                            gsap.to(window, {
                                scrollTo: { 
                                    y: targetElement, 
                                    offsetY: 80,
                                    autoKill: false 
                                },
                                duration: 1.5,
                                ease: "power3.inOut"
                            });
                        }
                    }
                });
            });
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();
        setupSmoothScroll();

        return () => {
            headerCtx.revert();
            heroCtx.revert();
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Componente Header
    const Header = () => (
    <header
        ref={headerRef}
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
            isScrolled 
                ? 'bg-gray-950/95 backdrop-blur-lg py-4 border-b border-gray-800/30' 
                : 'bg-transparent py-5'
        }`}
    >
        <div className="container mx-auto px-6 lg:px-8">
            <div className="flex items-center justify-between">
                
                {/* Logo com identidade tech */}
                <a 
                    href="#home-hero"
                    className="group flex items-center gap-3"
                >
                    {/* Símbolo tech */}
                    <div className="relative">
                        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 flex items-center justify-center">
                            <div className="w-5 h-5 border border-blue-500/50 rounded flex items-center justify-center">
                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            </div>
                        </div>
                        {/* Efeito de brilho azul */}
                        <div className="absolute inset-0 rounded-lg bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                    
                    {/* Texto */}
                    <div>
                        <span className="text-white font-medium text-base tracking-tight block">LUCAS ANDRADE</span>
                        <span className="text-gray-500 text-[11px] font-normal tracking-widest block">• DEVELOPER</span>
                    </div>
                </a>

                {/* Navegação profissional */}
                <nav className="hidden lg:block">
                    <ul className="flex items-center gap-6">
                        {menuItems.map((item, index) => {
                            const isActive = activeSection === item.id;
                            return (
                                <li key={index} className="relative">
                                    <a 
                                        href={`#${item.id}`}
                                        className={`text-[13px] font-medium tracking-wider uppercase transition-all duration-300 ${
                                            isActive 
                                                ? 'text-white' 
                                                : 'text-gray-500 hover:text-gray-300'
                                        }`}
                                    >
                                        <span className="relative">
                                            {item.label}
                                            {isActive && (
                                                <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-gradient-to-r from-blue-500 to-cyan-500"></span>
                                            )}
                                        </span>
                                    </a>
                                    
                                    {/* Indicador sutil */}
                                    {isActive && (
                                        <div className="absolute -top-1 -right-2 w-1 h-1 bg-blue-500 rounded-full animate-pulse"></div>
                                    )}
                                </li>
                            );
                        })}
                        
                        {/* Separador */}
                        <div className="w-px h-4 bg-gray-800"></div>
                        
                        {/* Call to action clean */}
                        <li>
                            <a 
                                href="#contato"
                                className="text-[13px] font-medium tracking-wider uppercase text-blue-400 hover:text-blue-300 transition-colors duration-300 flex items-center gap-2"
                            >
                                <i className="fas fa-arrow-right text-xs"></i>
                                CONTATO
                            </a>
                        </li>
                    </ul>
                </nav>
                
                {/* Menu mobile clean */}
                <button className="lg:hidden group">
                    <div className="w-8 h-8 flex flex-col items-center justify-center gap-1">
                        <div className={`w-5 h-[2px] bg-gray-500 group-hover:bg-white transition-all duration-300 ${activeSection ? 'translate-y-1.5 rotate-45' : ''}`}></div>
                        <div className={`w-5 h-[2px] bg-gray-500 group-hover:bg-white transition-all duration-300 ${activeSection ? 'opacity-0' : ''}`}></div>
                        <div className={`w-5 h-[2px] bg-gray-500 group-hover:bg-white transition-all duration-300 ${activeSection ? '-translate-y-1.5 -rotate-45' : ''}`}></div>
                    </div>
                </button>
            </div>
        </div>
        
        {/* Barra de progresso sutil */}
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gray-900/50">
            <div 
                className="h-full bg-gradient-to-r from-blue-600/80 to-cyan-500/80 transition-all duration-500"
                style={{ 
                    width: `${Math.min((window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100, 100)}%` 
                }}
            ></div>
        </div>
    </header>
);

    // Componente Wave
    const Wave = () => (
        <div 
            ref={waveRef}
            className="waves absolute bottom-0 w-full overflow-hidden pointer-events-none"
            style={{ 
                height: '15vh',
                minHeight: '145px',
                maxHeight: '200px',
            }}
        >
            <svg 
                className="w-full h-full"
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 24 150 28" 
                preserveAspectRatio="none" 
                shapeRendering="auto"
            >
                <defs>
                    <path 
                        id="gentle-wave" 
                        d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" 
                    />
                </defs>
                <g className="parallax">
                    <use href="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.7)" />
                    <use href="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.5)" />
                    <use href="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.3)" />
                    <use href="#gentle-wave" x="48" y="7" fill="#E2E2E2" />
                </g>
            </svg>
        </div>
    );

    // Componente Hero
    const Hero = () => (
        <div
            ref={heroRef}
            className="relative z-10 flex-grow flex items-center justify-center min-h-screen pt-16"
            id="home-hero"
        >
            <div className="container mx-auto px-4 relative">
                {/* Layout Mobile/Tablet */}
                <div className="lg:hidden flex flex-col items-center space-y-8 text-center relative z-20">
                    {/* Indicador de console */}
                    <div className="mb-4 self-start ml-4">
                        <span className="text-[#0969CC] font-mono text-sm">
                            $ whoami
                        </span>
                    </div>

                    {/* Foto */}
                    <div ref={imageRef} className="relative">
                        <div className="absolute -inset-4 bg-gradient-to-r from-[#0969CC] to-cyan-500 rounded-full opacity-20 blur-xl animate-pulse" />
                        <div className="relative rounded-full overflow-hidden border-2 border-[#0969CC]/30 p-1 bg-gradient-to-br from-gray-900 to-black">
                            <img
                                src={FotoLucas}
                                alt="Lucas Andrade - Desenvolvedor"
                                className="rounded-full w-64 h-64 md:w-80 md:h-80 object-cover relative z-10"
                            />
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0969CC]/10 to-transparent animate-scan" />
                        </div>
                    </div>

                    {/* Nome */}
                    <div className="w-full flex justify-center">
                        <h1 
                            ref={titleRef}
                            className="text-4xl md:text-5xl font-bold text-white leading-tight"
                        >
                            Olá! Eu sou o <br />
                            <span className="font-black bg-gradient-to-r from-[#0969CC] via-cyan-400 to-[#0969CC] bg-[length:200%_auto] bg-clip-text text-transparent animate-gradient">
                                Lucas Andrade
                            </span>
                        </h1>
                    </div>

                    {/* Descrição */}
                    <div className="w-full flex justify-center">
                        <p className="text-white/90 text-lg md:text-xl px-4 font-light leading-relaxed max-w-md">
                            Desenvolvedor Full Stack •{" "}
                            <span className="text-[#0969CC] font-semibold">
                                Ciências da Computação
                            </span>
                        </p>
                    </div>

                    {/* Ícones sociais */}
                    <div ref={socialRef} className="w-full flex justify-center pt-4">
                        <ul className="flex justify-center gap-6 text-2xl md:text-3xl">
                            {socialLinks.map((social, index) => (
                                <li key={index} className="group">
                                    <a
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="relative w-14 h-14 flex items-center justify-center rounded-xl bg-gradient-to-br from-gray-900/50 to-black/50 border border-[#0969CC]/20 hover:border-[#0969CC]/50 transition-all duration-300 hover:scale-110 hover:shadow-[0_0_20px_rgba(9,105,204,0.3)]"
                                    >
                                        <i className={`fa-brands fa-${social.icon} text-white/80 group-hover:text-white transition-colors duration-300`} />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Botão */}
                    <div className="pt-8 w-full flex justify-center">
                        <a
                            ref={btnRef}
                            href={curriculo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative bg-gradient-to-r from-[#0969CC] to-cyan-600 text-white rounded-full px-8 py-4 text-lg font-bold shadow-xl hover:shadow-2xl transition-all duration-500 inline-flex items-center gap-3 backdrop-blur-sm border border-[#0969CC]/30 hover:border-white/30 min-w-[200px] justify-center"
                        >
                            <span className="relative z-10 tracking-wide">Baixar CV</span>
                            <i className="fa-solid fa-download group-hover:translate-y-1 transition-transform duration-300" />
                        </a>
                    </div>
                </div>

                {/* Layout Desktop */}
                <div className="hidden lg:grid grid-cols-1 lg:grid-cols-2 items-center gap-12 lg:gap-20 relative z-20 min-h-[80vh]">
                    {/* Texto lado esquerdo */}
                    <div className="space-y-8 text-center lg:text-left">
                        <div>
                            <h1 
                                ref={titleRef}
                                className="text-5xl lg:text-7xl font-bold text-white leading-tight"
                            >
                                Olá! Eu sou o <br />
                                <span className="font-black bg-gradient-to-r from-[#0969CC] via-cyan-400 to-[#0969CC] bg-[length:200%_auto] bg-clip-text text-transparent animate-gradient">
                                    Lucas Andrade
                                </span>
                            </h1>
                        </div>

                        <div>
                            <p className="text-white/90 text-2xl lg:text-3xl font-light leading-relaxed max-w-2xl">
                                Desenvolvedor Full Stack & Estudante de{" "}
                                <span className="text-[#0969CC] font-semibold relative">
                                    Ciências da Computação
                                    <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-gradient-to-r from-[#0969CC] to-cyan-500" />
                                </span>
                            </p>
                        </div>

                        {/* Ícones sociais */}
                        <div ref={socialRef} className="pt-4">
                            <ul className="flex gap-6 text-2xl lg:justify-start justify-center">
                                {socialLinks.map((social, index) => (
                                    <li key={index} className="group">
                                        <a
                                            href={social.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="relative w-16 h-16 flex items-center justify-center rounded-2xl bg-gradient-to-br from-gray-900/30 to-black/30 border border-[#0969CC]/20 hover:border-[#0969CC]/50 transition-all duration-300 hover:scale-110 hover:shadow-[0_0_30px_rgba(9,105,204,0.4)]"
                                            title={social.label}
                                        >
                                            <i className={`fa-brands fa-${social.icon} text-white/80 group-hover:text-white text-2xl transition-colors duration-300`} />
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Botão */}
                        <div className="pt-8">
                            <a
                                ref={btnRef}
                                href={curriculo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative bg-gradient-to-r from-[#0969CC] to-cyan-600 text-white rounded-full px-10 py-5 text-xl font-bold shadow-2xl hover:shadow-[0_0_40px_rgba(9,105,204,0.5)] transition-all duration-500 inline-flex items-center gap-4 backdrop-blur-sm border border-[#0969CC]/40 hover:border-white/40 min-w-[240px] justify-center lg:justify-start"
                            >
                                <span className="relative z-10 tracking-wider">Baixar Currículo</span>
                                <i className="fa-solid fa-download group-hover:translate-y-1 transition-transform duration-300" />
                            </a>
                        </div>
                    </div>

                    {/* Foto lado direito */}
                    <div ref={imageRef} className="relative flex justify-center lg:justify-end">
                        <div className="relative">
                            <div className="relative rounded-full overflow-hidden border-4 border-[#0969CC]/20 p-2 bg-gradient-to-br from-gray-900 to-black shadow-2xl">
                                <img
                                    src={FotoLucas}
                                    alt="Lucas Andrade - Desenvolvedor Full Stack"
                                    className="rounded-full w-[23rem] h-[23rem] object-cover relative z-10"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#080831] via-[#0a0a2a] to-[#001233]">
            {/* Efeitos de fundo */}
            <div ref={particlesRef} className="absolute inset-0 pointer-events-none" />
            
            <div 
                className="absolute inset-0 opacity-10"
                style={{
                    backgroundImage: `
                        linear-gradient(90deg, rgba(9, 105, 204, 0.3) 1px, transparent 1px),
                        linear-gradient(180deg, rgba(9, 105, 204, 0.3) 1px, transparent 1px)
                    `,
                    backgroundSize: '50px 50px'
                }}
            />
            
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />

            {/* Componentes organizados */}
            <Header />
            <Hero />
            <Wave />
        </div>
    );
}