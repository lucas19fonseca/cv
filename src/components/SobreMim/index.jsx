import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ImgDev from "../../assets/comum/programador.png";

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export default function SobreMim() {
    const [idade, setIdade] = useState(null);
    const sectionRef = useRef(null);
    const imageRef = useRef(null);
    const textRef = useRef(null);
    const buttonRef = useRef(null);
    const particlesRef = useRef(null);

    function calcularIdade(dataNascimento) {
        const hoje = new Date();
        const nascimento = new Date(dataNascimento);
        let idade = hoje.getFullYear() - nascimento.getFullYear();
        const aniversarioEsteAno = new Date(hoje.getFullYear(), nascimento.getMonth(), nascimento.getDate());

        if (hoje < aniversarioEsteAno) {
            idade--;
        }

        return idade;
    }

    useEffect(() => {
        const idadeCalculada = calcularIdade("2004-07-19");
        setIdade(idadeCalculada);
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
        const ctx = gsap.context(() => {
            gsap.from(sectionRef.current, {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                },
                y: 30,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out"
            });

            if (imageRef.current) {
                gsap.from(imageRef.current, {
                    x: -50,
                    opacity: 0,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: imageRef.current,
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    }
                });
            }

            if (textRef.current) {
                gsap.from(textRef.current, {
                    x: 30,
                    opacity: 0,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: textRef.current,
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    }
                });
            }

            if (buttonRef.current) {
                gsap.from(buttonRef.current, {
                    scale: 0.8,
                    opacity: 0,
                    duration: 0.8,
                    delay: 0.3,
                    ease: "back.out(1.7)",
                    scrollTrigger: {
                        trigger: buttonRef.current,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    }
                });
            }
        });

        return () => ctx.revert();
    }, []);

    return (
        <section 
            id="sobre-mim"
            ref={sectionRef}
            className="min-h-[80vh] w-full flex items-center justify-center py-16 md:py-24 relative overflow-hidden"
        >
            {/* ============ NOVO BACKGROUND MODERNO ============ */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
                {/* Grid pattern sutil */}
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
                
                {/* Overlay gradients */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/40 to-white/80"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-50/10 via-transparent to-cyan-50/10"></div>
                
                {/* Animated gradient orbs */}
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/3 left-1/4 w-60 h-60 bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-full blur-3xl"></div>
                
                {/* Diagonal lines sutil */}
                <div className="absolute inset-0">
                    <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-200/30 to-transparent"></div>
                    <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-200/30 to-transparent"></div>
                </div>
                
                {/* Partículas flutuantes */}
                <div ref={particlesRef} className="absolute inset-0 pointer-events-none" />
                
                {/* Efeito de brilho central */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-64 bg-gradient-to-r from-blue-400/5 via-cyan-400/5 to-blue-400/5 rounded-full blur-3xl"></div>
            </div>
            
            {/* Linhas de conexão decorativas */}
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
                    {/* Imagem maior - Alinhada com o texto */}
                    <div 
                        ref={imageRef}
                        className="lg:w-1/3 flex-shrink-0 flex flex-col items-center"
                    >
                        <div className="relative w-full group">
                            {/* Glow effect */}
                            <div className="absolute -inset-3 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            
                            {/* Image container with subtle border */}
                            <div className="relative bg-gradient-to-br from-white to-gray-50 rounded-xl p-1 shadow-lg shadow-blue-100/50">
                                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500/5 to-cyan-500/5"></div>
                                <img
                                    src={ImgDev}
                                    alt="Lucas Andrade"
                                    className="relative rounded-lg w-full h-auto"
                                />
                            </div>
                        </div>
                        
                        {/* Info badges maiores abaixo da imagem */}
                        <div className="flex flex-wrap justify-center gap-3 mt-6">
                            <span className="px-4 py-2 bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-lg text-sm text-blue-700 font-medium shadow-sm shadow-blue-200/50">
                                <i className="fas fa-birthday-cake mr-2"></i>
                                {idade ?? "..."} anos
                            </span>
                            <span className="px-4 py-2 bg-gradient-to-r from-cyan-50 to-cyan-100 border border-cyan-200 rounded-lg text-sm text-cyan-700 font-medium shadow-sm shadow-cyan-200/50">
                                <i className="fas fa-graduation-cap mr-2"></i>
                                6º Semestre
                            </span>
                            <span className="px-4 py-2 bg-gradient-to-r from-purple-50 to-purple-100 border border-purple-200 rounded-lg text-sm text-purple-700 font-medium shadow-sm shadow-purple-200/50">
                                <i className="fas fa-code mr-2"></i>
                                Full Stack
                            </span>
                        </div>
                        
                        {/* Botão de contato - Centralizado e destacado */}
                        <div 
                            ref={buttonRef}
                            className="mt-8 w-full max-w-xl"
                        >
                            <a 
                                href="#contato"
                                className="group relative overflow-hidden inline-flex items-center justify-center gap-3 w-full px-6 py-4 bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-600 text-white rounded-xl text-base font-semibold hover:shadow-2xl shadow-lg shadow-blue-500/30 transform hover:-translate-y-1 transition-all duration-500"
                            >
                                <span className="absolute inset-0 bg-gradient-to-r from-blue-500 via-blue-400 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                                <i className="fas fa-paper-plane text-lg group-hover:rotate-12 transition-transform duration-300 relative z-10"></i>
                                <span className="relative z-10 text-base">Entre em contato</span>
                                <i className="fas fa-arrow-right text-sm ml-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300 relative z-10"></i>
                                
                                {/* Efeito de brilho */}
                                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-400/30 via-cyan-400/30 to-blue-400/30 blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            </a>
                        </div>
                    </div>

                    {/* Texto maior - Alinhado com a imagem */}
                    <div 
                        ref={textRef}
                        className="lg:w-2/3 flex-1 min-w-0"
                    >
                        <div className="w-full space-y-6 md:space-y-8">
                            {/* Texto principal maior com card styling */}
                            <div className="bg-white/80 backdrop-blur-sm border border-gray-200/70 rounded-xl p-6 md:p-8 shadow-lg shadow-gray-200/30 hover:shadow-xl hover:shadow-blue-100/30 transition-all duration-300">
                                <div className="text-gray-800 text-base md:text-lg leading-relaxed space-y-4 md:space-y-6">
                                    <p className="text-justify">
                                        Olá! Meu nome é Lucas Andrade, tenho {idade ?? "..."} anos e estou no 6º semestre de Ciências da Computação. Sou apaixonado por tecnologia e desenvolvimento de software.
                                    </p>
                                    
                                    <p className="text-justify">
                                        Sou uma pessoa comunicativa, com facilidade para trabalhar em equipe e colaborar em projetos, o que contribui positivamente no ambiente acadêmico e profissional. Acredito que a colaboração é essencial para criar soluções inovadoras.
                                    </p>
                                    
                                    <p className="text-justify">
                                        Meu principal objetivo é crescer profissionalmente na área de tecnologia, contribuindo com soluções criativas e eficientes enquanto desenvolvo continuamente minhas habilidades. Tenho grande interesse em participar de projetos desafiadores que me permitam aprender na prática, expandir meus conhecimentos e agregar valor às equipes com as quais trabalho.
                                    </p>
                                </div>
                            </div>

                            {/* Soft Skills com card styling */}
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

            {/* Estilos CSS para animações */}
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
    );
}