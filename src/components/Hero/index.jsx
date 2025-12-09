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
    const [isMenuOpen, setIsMenuOpen] = useState(false);

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

    // Itens do menu (incluindo experiência)
    const menuItems = [
        { id: 'home-hero', label: 'Início' },
        { id: 'sobre-mim', label: 'Sobre' },
        { id: 'tecnologias', label: 'Tech' },
        { id: 'experiencia', label: 'Experiência' },
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

        for (let i = 0; i < 30; i++) { // Reduzido para melhor performance
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
                
                // Animação de digitação
                let i = 0;
                const typeWriter = () => {
                    if (i < originalText.length) {
                        titleRef.current.textContent += originalText.charAt(i);
                        i++;
                        setTimeout(typeWriter, 30);
                    }
                };
                setTimeout(typeWriter, 500);
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
            const sections = menuItems.map(item => item.id);
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
                            // Fechar menu mobile se aberto
                            setIsMenuOpen(false);
                            
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

    // Toggle menu mobile
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    // Fechar menu ao clicar em um item (mobile)
    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    // Componente Header
    const Header = () => (
        <header
            ref={headerRef}
            className={`fixed top-0 w-full z-50 transition-all duration-300 ${
                isScrolled 
                    ? 'bg-gray-950/95 backdrop-blur-lg py-3 border-b border-gray-800/30' 
                    : 'bg-transparent py-4'
            }`}
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    
                    {/* Logo */}
                    <a 
                        href="#home-hero"
                        className="group flex items-center gap-2 sm:gap-3"
                        onClick={closeMenu}
                    >
                        {/* Símbolo tech */}
                        <div className="relative">
                            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 flex items-center justify-center">
                                <div className="w-4 h-4 sm:w-5 sm:h-5 border border-blue-500/50 rounded flex items-center justify-center">
                                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500 rounded-full"></div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Texto */}
                        <div>
                            <span className="text-white font-medium text-sm sm:text-base tracking-tight block">LUCAS ANDRADE</span>
                            <span className="text-gray-500 text-[10px] sm:text-[11px] font-normal tracking-widest block">• DEVELOPER</span>
                        </div>
                    </a>

                    {/* Navegação desktop */}
                    <nav className="hidden lg:block">
                        <ul className="flex items-center gap-4 xl:gap-6">
                            {menuItems.map((item, index) => {
                                const isActive = activeSection === item.id;
                                return (
                                    <li key={index} className="relative">
                                        <a 
                                            href={`#${item.id}`}
                                            className={`text-xs xl:text-[13px] font-medium tracking-wider uppercase transition-all duration-300 ${
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
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>
                    
                    {/* Menu mobile clean */}
                    <button 
                        className="lg:hidden group z-50"
                        onClick={toggleMenu}
                        aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
                    >
                        <div className="w-8 h-8 flex flex-col items-center justify-center gap-1.5">
                            <div className={`w-6 h-[2px] bg-gray-500 group-hover:bg-white transition-all duration-300 ${isMenuOpen ? 'translate-y-2 rotate-45' : ''}`}></div>
                            <div className={`w-6 h-[2px] bg-gray-500 group-hover:bg-white transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></div>
                            <div className={`w-6 h-[2px] bg-gray-500 group-hover:bg-white transition-all duration-300 ${isMenuOpen ? '-translate-y-2 -rotate-45' : ''}`}></div>
                        </div>
                    </button>
                </div>
            </div>
            
            {/* Menu mobile dropdown */}
            <div className={`lg:hidden absolute top-full left-0 w-full bg-gray-950/95 backdrop-blur-lg border-b border-gray-800/30 transition-all duration-300 ${
                isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
            }`}>
                <ul className="py-4 px-4 space-y-3">
                    {menuItems.map((item, index) => {
                        const isActive = activeSection === item.id;
                        return (
                            <li key={index}>
                                <a 
                                    href={`#${item.id}`}
                                    className={`block py-2.5 text-sm font-medium tracking-wider uppercase transition-all duration-300 ${
                                        isActive 
                                            ? 'text-white pl-4 border-l-4 border-blue-500' 
                                            : 'text-gray-500 hover:text-white hover:pl-4 hover:border-l-4 border-gray-700'
                                    }`}
                                    onClick={closeMenu}
                                >
                                    {item.label}
                                </a>
                            </li>
                        );
                    })}
                </ul>
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
            
            <div className="absolute top-1/4 left-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-blue-500/5 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-cyan-500/5 rounded-full blur-3xl" />

            {/* Componentes organizados */}
            <Header />
            
            {/* Hero Section */}
            <div
                ref={heroRef}
                className="relative z-10 flex items-center justify-center min-h-screen pt-16 pb-32 sm:pb-24"
                id="home-hero"
            >
                <div className="container mx-auto px-4 sm:px-6 relative">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 xl:gap-20">
                        
                        {/* Conteúdo de texto (esquerda) */}
                        <div className="w-full lg:w-1/2 text-center lg:text-left order-2 lg:order-1">
                            {/* Indicador de console */}
                            <div className="mb-6 lg:mb-8 lg:ml-0">
                                <span className="text-[#0969CC] font-mono text-sm sm:text-base">
                                    $ whoami
                                </span>
                            </div>

                            {/* Nome */}
                            <div className="mb-6 lg:mb-8">
                                <h1 
                                    ref={titleRef}
                                    className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight"
                                >
                                    Olá! Eu sou o <br className="hidden sm:block" />
                                    <span className="font-black bg-gradient-to-r from-[#0969CC] via-cyan-400 to-[#0969CC] bg-[length:200%_auto] bg-clip-text text-transparent animate-gradient">
                                        Lucas Andrade
                                    </span>
                                </h1>
                            </div>

                            {/* Descrição */}
                            <div className="mb-8 lg:mb-12">
                                <p className="text-white/90 text-lg sm:text-xl lg:text-2xl font-light leading-relaxed max-w-2xl mx-auto lg:mx-0">
                                    Desenvolvedor Full Stack & Estudante de{" "}
                                    <span className="text-[#0969CC] font-semibold relative">
                                        Ciências da Computação
                                        <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-gradient-to-r from-[#0969CC] to-cyan-500" />
                                    </span>
                                </p>
                            </div>

                            {/* Ícones sociais */}
                            <div ref={socialRef} className="mb-8 lg:mb-12">
                                <ul className="flex justify-center lg:justify-start gap-4 sm:gap-6 text-xl sm:text-2xl">
                                    {socialLinks.map((social, index) => (
                                        <li key={index} className="group">
                                            <a
                                                href={social.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="relative w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 flex items-center justify-center rounded-xl lg:rounded-2xl bg-gradient-to-br from-gray-900/30 to-black/30 border border-[#0969CC]/20 hover:border-[#0969CC]/50 transition-all duration-300 hover:scale-110 hover:shadow-[0_0_20px_rgba(9,105,204,0.4)]"
                                                title={social.label}
                                                aria-label={social.label}
                                            >
                                                <i className={`fa-brands fa-${social.icon} text-white/80 group-hover:text-white text-base sm:text-xl lg:text-2xl transition-colors duration-300`} />
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Botão */}
                            <div className="flex justify-center lg:justify-start">
                                <a
                                    ref={btnRef}
                                    href={curriculo}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group relative bg-gradient-to-r from-[#0969CC] to-cyan-600 text-white rounded-full px-6 py-3.5 sm:px-8 sm:py-4 lg:px-10 lg:py-5 text-base sm:text-lg lg:text-xl font-bold shadow-lg sm:shadow-xl lg:shadow-2xl hover:shadow-[0_0_30px_rgba(9,105,204,0.5)] transition-all duration-500 inline-flex items-center gap-2 sm:gap-3 lg:gap-4 backdrop-blur-sm border border-[#0969CC]/30 hover:border-white/30 min-w-[180px] sm:min-w-[200px] lg:min-w-[240px] justify-center"
                                >
                                    <span className="relative z-10 tracking-wide">Baixar Currículo</span>
                                    <i className="fa-solid fa-download text-sm sm:text-base lg:text-lg group-hover:translate-y-0.5 transition-transform duration-300" />
                                </a>
                            </div>
                        </div>

                        {/* Foto (direita) */}
                        <div ref={imageRef} className="w-full lg:w-1/2 order-1 lg:order-2 mb-8 lg:mb-0 flex justify-center">
                            <div className="relative">
                                {/* Efeito de brilho */}
                                <div className="absolute -inset-4 sm:-inset-6 bg-gradient-to-r from-[#0969CC] to-cyan-500 rounded-full opacity-20 blur-xl animate-pulse" />
                                
                                {/* Container da foto */}
                                <div className="relative rounded-full overflow-hidden border-2 sm:border-3 lg:border-4 border-[#0969CC]/20 p-1.5 sm:p-2 lg:p-2.5 bg-gradient-to-br from-gray-900 to-black shadow-xl sm:shadow-2xl">
                                    <img
                                        src={FotoLucas}
                                        alt="Lucas Andrade - Desenvolvedor Full Stack"
                                        className="rounded-full w-64 h-64 sm:w-80 sm:h-80 lg:w-[23rem] lg:h-[23rem] xl:w-[25rem] xl:h-[25rem] object-cover relative z-10"
                                        loading="eager"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0969CC]/10 to-transparent animate-scan" />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <Wave />
            
            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden lg:block animate-bounce">
                <div className="flex flex-col items-center gap-2">
                    <span className="text-gray-400 text-sm tracking-widest">SCROLL</span>
                    <div className="w-[1px] h-12 bg-gradient-to-b from-[#0969CC] to-transparent"></div>
                </div>
            </div>
        </div>
    );
}