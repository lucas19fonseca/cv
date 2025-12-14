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
    const titleContainerRef = useRef(null);
    const imageRef = useRef(null);
    const socialRef = useRef(null);
    const btnRef = useRef(null);
    const particlesRef = useRef(null);
    const waveRef = useRef(null);
    const menuRef = useRef(null);
    
    // Refs para as linhas do hamburguer
    const topLineRef = useRef(null);
    const middleLineRef = useRef(null);
    const bottomLineRef = useRef(null);
    
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
        { id: 'tecnologias', label: 'Tecnologias ' },
        { id: 'projetos', label: 'Projetos' },
        { id: 'experiencia', label: 'Experiência' },
        { id: 'certificados', label: 'Certificados' },
        { id: 'contato', label: 'Contato' }
    ];

    // Animação do hamburguer para X - VERSÃO CORRIGIDA
    useEffect(() => {
        if (!topLineRef.current || !middleLineRef.current || !bottomLineRef.current) return;

        const topLine = topLineRef.current;
        const middleLine = middleLineRef.current;
        const bottomLine = bottomLineRef.current;

        if (isMenuOpen) {
            // Animação para X (menu aberto)
            gsap.to(topLine, {
                rotation: 45,
                y: 8,
                duration: 0.3,
                ease: "power2.out",
                overwrite: true
            });
            
            gsap.to(middleLine, {
                opacity: 0,
                duration: 0.2,
                ease: "power2.out",
                overwrite: true
            });
            
            gsap.to(bottomLine, {
                rotation: -45,
                y: -8,
                duration: 0.3,
                ease: "power2.out",
                overwrite: true
            });
        } else {
            // Animação para hamburguer (menu fechado)
            gsap.to(topLine, {
                rotation: 0,
                y: 0,
                duration: 0.3,
                ease: "power2.out",
                overwrite: true
            });
            
            gsap.to(middleLine, {
                opacity: 1,
                duration: 0.2,
                delay: 0.1,
                ease: "power2.out",
                overwrite: true
            });
            
            gsap.to(bottomLine, {
                rotation: 0,
                y: 0,
                duration: 0.3,
                ease: "power2.out",
                overwrite: true
            });
        }
    }, [isMenuOpen]);

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

        for (let i = 0; i < 30; i++) {
            createParticle();
        }

        return () => {
            if (particlesRef.current) {
                particlesRef.current.innerHTML = '';
            }
        };
    }, []);

    // Animação do menu dropdown
    useEffect(() => {
        if (!menuRef.current || typeof window === 'undefined') return;

        if (isMenuOpen) {
            // Animação de abertura do menu
            gsap.fromTo(menuRef.current,
                {
                    height: 0,
                    opacity: 0,
                    y: -20
                },
                {
                    height: 'auto',
                    opacity: 1,
                    y: 0,
                    duration: 0.4,
                    ease: "power2.out"
                }
            );

            // Animar os itens do menu
            const menuItems = menuRef.current.querySelectorAll('li');
            gsap.fromTo(menuItems,
                {
                    opacity: 0,
                    x: -20
                },
                {
                    opacity: 1,
                    x: 0,
                    stagger: 0.1,
                    duration: 0.3,
                    ease: "power2.out",
                    delay: 0.1
                }
            );
        } else {
            // Animação de fechamento do menu
            gsap.to(menuRef.current, {
                height: 0,
                opacity: 0,
                y: -20,
                duration: 0.3,
                ease: "power2.in"
            });
        }
    }, [isMenuOpen]);

    // Detectar scroll e animação de entrada do header
    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            setIsScrolled(scrollY > 50);
            
            // Atualizar barra de progresso
            const progressBar = document.querySelector('.progress-bar-fill');
            if (progressBar) {
                const windowHeight = window.innerHeight;
                const documentHeight = document.documentElement.scrollHeight;
                const scrollTop = window.scrollY;
                const scrollPercent = (scrollTop / (documentHeight - windowHeight)) * 100;
                progressBar.style.width = `${Math.min(scrollPercent, 100)}%`;
            }
            
            // Detectar seção ativa
            const sections = menuItems.map(item => item.id);
            let current = '';
            
            sections.forEach(section => {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top <= 100 && rect.bottom >= 100) {
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
                            setIsMenuOpen(false);
                            
                            const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;
                            const headerHeight = 70; // Altura do header fixo
                            
                            window.scrollTo({
                                top: targetPosition - headerHeight,
                                behavior: 'smooth'
                            });
                        }
                    }
                });
            });
        };

        // Animação de entrada inicial
        const ctx = gsap.context(() => {
            // Animação de entrada do header (suave e elegante)
            if (headerRef.current) {
                gsap.fromTo(headerRef.current,
                    {
                        y: -100,
                        opacity: 0,
                        backdropFilter: "blur(0px)"
                    },
                    {
                        y: 0,
                        opacity: 1,
                        backdropFilter: "blur(16px)",
                        duration: 1,
                        ease: "power4.out",
                        delay: 0.2
                    }
                );

                // Animar os elementos internos do header em sequência
                const logo = headerRef.current.querySelector('.header-logo');
                const nav = headerRef.current.querySelector('nav');
                const menuBtn = headerRef.current.querySelector('.lg\\:hidden');

                if (logo) {
                    gsap.from(logo, {
                        x: -30,
                        opacity: 0,
                        duration: 0.8,
                        ease: "power3.out",
                        delay: 0.5
                    });
                }

                if (nav) {
                    const navItems = nav.querySelectorAll('li');
                    gsap.from(navItems, {
                        y: -20,
                        opacity: 0,
                        stagger: 0.08,
                        duration: 0.6,
                        ease: "power2.out",
                        delay: 0.7
                    });
                }

                if (menuBtn) {
                    gsap.from(menuBtn, {
                        x: 30,
                        opacity: 0,
                        duration: 0.8,
                        ease: "power3.out",
                        delay: 0.6
                    });
                }
            }

            // Animação principal usando timeline
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

            // Animação do título
            if (titleContainerRef.current) {
                tl.from(titleContainerRef.current, {
                    opacity: 0,
                    y: 20,
                    duration: 0.8,
                    ease: "power3.out"
                }, 0.5);
            }

            // Ícones sociais
            if (socialRef.current && socialRef.current.children) {
                tl.from(socialRef.current.children, {
                    y: 20,
                    opacity: 0,
                    stagger: 0.1,
                    duration: 0.6,
                    ease: "back.out(1.7)"
                }, 0.8);
            }

            // Botão PRINCIPAL
            if (btnRef.current) {
                tl.from(btnRef.current, {
                    opacity: 0,
                    scale: 0.8,
                    duration: 0.8,
                    ease: "back.out(1.7)"
                }, 1.0);
            }

            // Wave animation
            if (waveRef.current) {
                tl.from(waveRef.current, {
                    y: 100,
                    opacity: 0,
                    duration: 1.5,
                    ease: "power2.out"
                }, 0.5);
            }
        });

        // Adicionar listeners
        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', handleScroll, { passive: true });
        
        // Executar uma vez para estado inicial
        handleScroll();
        setupSmoothScroll();

        return () => {
            ctx.revert();
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleScroll);
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

    // Função auxiliar para obter ícones do menu
    const getIconForMenuItem = (id) => {
        switch(id) {
            case 'home-hero': return 'fa-home';
            case 'sobre-mim': return 'fa-user';
            case 'tecnologias': return 'fa-code';
            case 'projetos': return 'fa-folder';
            case 'experiencia': return 'fa-briefcase';
            case 'certificados': return 'fa-certificate';
            case 'contato': return 'fa-envelope';
            default: return 'fa-circle';
        }
    };

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

            {/* HEADER FIXO */}
            <header
                ref={headerRef}
                className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-out ${
                    isScrolled 
                        ? 'bg-gray-950/95 backdrop-blur-md py-3 shadow-lg shadow-black/20' 
                        : 'bg-transparent py-4'
                }`}
                style={{ 
                    transform: 'translate3d(0,0,0)', 
                    willChange: 'transform, opacity',
                    WebkitBackfaceVisibility: 'hidden',
                    backfaceVisibility: 'hidden'
                }}
            >
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between">
                        
                        {/* Logo */}
                        <a 
                            href="#home-hero"
                            className="header-logo group flex items-center gap-2 sm:gap-3"
                            onClick={closeMenu}
                        >
                            <div className="relative">
                                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 flex items-center justify-center">
                                    <i className="fas fa-code text-blue-500 text-sm"></i>
                                </div>
                            </div>
                            
                            <div className="hidden sm:block">
                                <span className="text-white font-medium text-sm sm:text-base tracking-tight block">LUCAS ANDRADE FONSECA</span>
                                <span className="text-gray-500 text-[10px] sm:text-[11px] font-normal tracking-widest block">• DEVELOPER</span>
                            </div>
                            <div className="block sm:hidden">
                                <span className="text-white font-medium text-xs tracking-tight">LUCAS</span>
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
                                                className={`text-xs xl:text-[13px] font-medium tracking-wider uppercase transition-all duration-300 px-1 ${
                                                    isActive 
                                                        ? 'text-white' 
                                                        : 'text-gray-500 hover:text-gray-300'
                                                }`}
                                            >
                                                <span className="relative pb-1">
                                                    {item.label}
                                                    {isActive && (
                                                        <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-blue-500 to-cyan-500"></span>
                                                    )}
                                                </span>
                                            </a>
                                        </li>
                                    );
                                })}
                            </ul>
                        </nav>
                        
                        {/* Menu mobile hamburger */}
                        <button 
                            className="lg:hidden group z-50 relative w-10 h-10 flex items-center justify-center"
                            onClick={toggleMenu}
                            aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
                            aria-expanded={isMenuOpen}
                        >
                            <div className="relative w-6 h-6 flex flex-col items-center justify-center gap-1.5">
                                <div 
                                    ref={topLineRef}
                                    className="w-6 h-0.5 bg-gray-400 group-hover:bg-white transition-colors duration-300 rounded-full transform origin-center"
                                />
                                <div 
                                    ref={middleLineRef}
                                    className="w-6 h-0.5 bg-gray-400 group-hover:bg-white transition-colors duration-300 rounded-full transform origin-center"
                                />
                                <div 
                                    ref={bottomLineRef}
                                    className="w-6 h-0.5 bg-gray-400 group-hover:bg-white transition-colors duration-300 rounded-full transform origin-center"
                                />
                            </div>
                        </button>
                    </div>
                </div>
                
                {/* Menu mobile dropdown */}
                <div 
                    ref={menuRef}
                    className={`lg:hidden absolute top-full left-0 w-full bg-gray-950/98 backdrop-blur-lg border-b border-gray-800/30 overflow-hidden`}
                    style={{ 
                        display: isMenuOpen ? 'block' : 'none',
                        boxShadow: isMenuOpen ? '0 10px 30px rgba(0,0,0,0.3)' : 'none'
                    }}
                >
                    <ul className="py-4 px-4 space-y-2">
                        {menuItems.map((item, index) => {
                            const isActive = activeSection === item.id;
                            return (
                                <li key={index}>
                                    <a 
                                        href={`#${item.id}`}
                                        className={`block py-3 px-4 text-sm font-medium tracking-wider uppercase rounded-lg transition-all duration-300 ${
                                            isActive 
                                                ? 'text-white bg-blue-900/30 border-l-4 border-blue-500' 
                                                : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                                        }`}
                                        onClick={closeMenu}
                                    >
                                        <span className="flex items-center gap-3">
                                            <i className={`fas ${getIconForMenuItem(item.id)} text-xs ${isActive ? 'text-blue-400' : 'text-gray-500'}`}></i>
                                            {item.label}
                                        </span>
                                    </a>
                                </li>
                            );
                        })}
                    </ul>
                </div>
                
                {/* Barra de progresso sutil */}
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gray-900/50">
                    <div 
                        className="progress-bar-fill h-full bg-gradient-to-r from-blue-600/80 to-cyan-500/80 transition-all duration-300"
                        style={{ width: '0%' }}
                    ></div>
                </div>
            </header>

            {/* Hero Section */}
            <div
                ref={heroRef}
                className="relative z-20 flex items-center justify-center min-h-screen pt-20 pb-20 px-4"
                id="home-hero"
            >
                <div className="container mx-auto relative">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-12 xl:gap-16">
                        
                        {/* Conteúdo de texto (esquerda) */}
                        <div className="w-full lg:w-1/2 text-center lg:text-left order-2 lg:order-1">
                            {/* Nome */}
                            <div ref={titleContainerRef} className="mb-6 lg:mb-8">
                                <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight">
                                    Olá! Eu sou o <br className="hidden sm:block" />
                                    <span className="font-black bg-gradient-to-r from-[#0969CC] via-cyan-400 to-[#0969CC] bg-[length:200%_auto] bg-clip-text text-transparent animate-gradient">
                                        Lucas Andrade
                                    </span>
                                </h1>
                            </div>

                            {/* Descrição */}
                            <div
                            ref={titleContainerRef} 
                            className="mb-6 lg:mb-8">
                                <p className="text-white/90 text-base sm:text-lg lg:text-xl font-light leading-relaxed max-w-2xl mx-auto lg:mx-0">
                                    Desenvolvedor Full Stack & Estudante de{" "}
                                    <span className="text-[#0969CC] font-semibold relative">
                                        Ciências da Computação
                                        <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-gradient-to-r from-[#0969CC] to-cyan-500" />
                                    </span>
                                </p>
                            </div>

                            {/* Ícones sociais */}
                            <div ref={socialRef} className="mb-8 lg:mb-10">
                                <ul className="flex justify-center lg:justify-start gap-3 sm:gap-4 lg:gap-5">
                                    {socialLinks.map((social, index) => (
                                        <li key={index} className="group">
                                            <a
                                                href={social.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="relative w-10 h-10 sm:w-11 sm:h-11 lg:w-12 lg:h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-gray-900/30 to-black/30 border border-[#0969CC]/20 hover:border-[#0969CC]/50 transition-all duration-300 hover:scale-110 hover:shadow-[0_0_20px_rgba(9,105,204,0.4)]"
                                                title={social.label}
                                                aria-label={social.label}
                                            >
                                                <i className={`fa-brands fa-${social.icon} text-white/80 group-hover:text-white text-base sm:text-lg lg:text-xl transition-colors duration-300`} />
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Botão ÚNICO */}
                            <div className="flex justify-center lg:justify-start pt-4">
                                <a
                                    ref={btnRef}
                                    href={curriculo}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group relative bg-gradient-to-r from-[#0969CC] to-cyan-600 text-white rounded-full px-6 py-3 sm:px-8 sm:py-4 lg:px-10 lg:py-4 text-sm sm:text-base lg:text-lg font-bold shadow-xl hover:shadow-[0_0_30px_rgba(9,105,204,0.6)] transition-all duration-500 inline-flex items-center gap-2 sm:gap-3 lg:gap-4 backdrop-blur-sm border border-[#0969CC]/30 hover:border-white/30 min-w-[180px] sm:min-w-[200px] lg:min-w-[240px] justify-center animate-fade-in"
                                >
                                    <span className="relative z-10 tracking-wide">Baixar Currículo</span>
                                    <i className="fa-solid fa-download text-sm sm:text-base lg:text-lg group-hover:translate-y-0.5 transition-transform duration-300" />
                                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600/0 via-blue-600/20 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                    <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-blue-600/20 to-cyan-500/20 blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                </a>
                            </div>
                        </div>

                        {/* Foto (direita) */}
                        <div ref={imageRef} className="w-full lg:w-1/2 order-1 lg:order-2 mb-8 lg:mb-0 flex justify-center relative">
                            <div className="relative">
                                <div className="absolute -inset-3 sm:-inset-4 lg:-inset-5 bg-gradient-to-r from-[#0969CC] to-cyan-500 rounded-full opacity-20 blur-xl animate-pulse" />
                                
                                <div className="relative rounded-full overflow-hidden border-2 sm:border-3 lg:border-3 border-[#0969CC]/20 p-1.5 sm:p-2 lg:p-2 bg-gradient-to-br from-gray-900 to-black shadow-xl sm:shadow-2xl">
                                    <img
                                        src={FotoLucas}
                                        alt="Lucas Andrade - Desenvolvedor Full Stack"
                                        className="rounded-full w-56 h-56 sm:w-64 sm:h-64 lg:w-72 lg:h-72 xl:w-80 xl:h-80 object-cover relative z-10"
                                        loading="eager"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0969CC]/10 to-transparent animate-scan" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Wave */}
            <div 
                ref={waveRef}
                className="waves absolute bottom-0 w-full overflow-hidden pointer-events-none z-10"
                style={{ 
                    height: '15vh',
                    minHeight: '120px',
                    maxHeight: '180px',
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
                        <use href="#gentle-wave" x="48" y="7" fill="#ffffff" />
                    </g>
                </svg>
            </div>

            {/* CSS inline para animação */}
            <style jsx global>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: scale(0.9);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1);
                    }
                }
                
                .animate-fade-in {
                    animation: fadeIn 0.8s ease-out forwards;
                    animation-delay: 1s;
                    opacity: 0;
                }
                
                @keyframes gradient {
                    0% {
                        background-position: 0% 50%;
                    }
                    50% {
                        background-position: 100% 50%;
                    }
                    100% {
                        background-position: 0% 50%;
                    }
                }
                
                .animate-gradient {
                    animation: gradient 3s ease infinite;
                    background-size: 200% auto;
                }
                
                @keyframes scan {
                    0% {
                        transform: translateY(-100%);
                    }
                    100% {
                        transform: translateY(100%);
                    }
                }
                
                .animate-scan {
                    animation: scan 2s linear infinite;
                }
                
                /* Melhorias para mobile */
                @media (max-width: 640px) {
                    .waves {
                        min-height: 100px !important;
                    }
                }
            `}</style>
        </div>
    );
}