import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FotoLucas from "../../assets/comum/programador.png";

// Registrar plugin GSAP
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export default function SobreMim() {
    const [idade, setIdade] = useState(null);
    const [hoveredQuality, setHoveredQuality] = useState(null);
    const sectionRef = useRef(null);
    const imageRef = useRef(null);
    const textRef = useRef(null);
    const statsRef = useRef(null);

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

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animação da seção
            gsap.from(sectionRef.current, {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                },
                y: 40,
                opacity: 0,
                duration: 1,
                ease: "power3.out"
            });

            // Animação da imagem com efeito de flutuação
            if (imageRef.current) {
                gsap.fromTo(imageRef.current,
                    {
                        x: -80,
                        opacity: 0,
                        rotateY: 15
                    },
                    {
                        x: 0,
                        opacity: 1,
                        rotateY: 0,
                        duration: 1.2,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: imageRef.current,
                            start: "top 80%",
                            toggleActions: "play none none reverse"
                        }
                    }
                );

                // Efeito de flutuação contínua
                gsap.to(imageRef.current.querySelector('.floating-image'), {
                    y: -10,
                    duration: 2,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut"
                });
            }

            // Animação do texto em cascata
            if (textRef.current) {
                gsap.from(textRef.current.children, {
                    scrollTrigger: {
                        trigger: textRef.current,
                        start: "top 75%",
                        toggleActions: "play none none reverse"
                    },
                    y: 30,
                    opacity: 0,
                    stagger: 0.1,
                    duration: 0.8,
                    ease: "back.out(1.2)"
                });
            }

            // Animação dos stats com contagem
            if (statsRef.current) {
                gsap.from(statsRef.current.children, {
                    scrollTrigger: {
                        trigger: statsRef.current,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    },
                    scale: 0.8,
                    opacity: 0,
                    stagger: 0.15,
                    duration: 0.6,
                    ease: "elastic.out(1, 0.5)"
                });
            }
        });

        return () => ctx.revert();
    }, []);

    const stats = [
        { value: "6º", label: "Semestre", icon: "fas fa-graduation-cap", color: "from-blue-500 to-blue-600" },
        { value: `${idade ?? "..."}`, label: "Anos", icon: "fas fa-birthday-cake", color: "from-cyan-500 to-cyan-600" },
        { value: "15+", label: "Projetos", icon: "fas fa-code-branch", color: "from-purple-500 to-purple-600" },
        { value: "100%", label: "Dedicado", icon: "fas fa-bolt", color: "from-orange-500 to-orange-600" }
    ];

    const qualities = [
        { name: "Comunicativo", icon: "fas fa-comments", desc: "Clareza e objetividade" },
        { name: "Colaborativo", icon: "fas fa-users", desc: "Trabalho em equipe" },
        { name: "Proativo", icon: "fas fa-rocket", desc: "Iniciativa própria" },
        { name: "Curioso", icon: "fas fa-search", desc: "Sempre aprendendo" },
        { name: "Adaptável", icon: "fas fa-random", desc: "Flexibilidade" },
        { name: "Resiliente", icon: "fas fa-shield-alt", desc: "Persistência" }
    ];

    return (
        <section 
            id="sobre-mim"
            ref={sectionRef}
            className="min-h-screen w-full relative bg-gradient-to-br from-gray-50 via-white to-blue-50/30 flex items-center justify-center"
        >
            {/* Background elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-20 -right-20 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl" />
                <div className="absolute top-1/2 left-1/4 w-1 h-64 bg-gradient-to-b from-transparent via-blue-500/10 to-transparent" />
                <div className="absolute bottom-1/4 right-1/4 w-64 h-1 bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent" />
                
                {/* Grid pattern */}
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `linear-gradient(to right, #3b82f6 1px, transparent 1px),
                                      linear-gradient(to bottom, #3b82f6 1px, transparent 1px)`,
                        backgroundSize: '50px 50px'
                    }} />
                </div>
            </div>

            <div className="container mx-auto px-4 lg:px-8 relative z-10 py-8 md:py-12">
                {/* Header Section - Mais compacto */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center gap-3 mb-4">
                        <div className="w-8 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
                        <span className="text-blue-600 font-mono text-xs md:text-sm tracking-wider font-semibold uppercase bg-white/80 backdrop-blur-sm px-4 py-1.5 rounded-full border border-blue-100">
                            <i className="fas fa-user mr-2"></i>
                            Sobre Mim
                        </span>
                        <div className="w-8 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
                    </div>
                    
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                        Minha <span className="relative">
                            <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 bg-clip-text text-transparent">
                                Jornada
                            </span>
                            <div className="absolute -bottom-2 left-1/4 right-1/4 h-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full"></div>
                        </span>
                    </h2>
                    
                    <p className="text-gray-600 text-sm md:text-base max-w-xl mx-auto leading-relaxed bg-white/60 backdrop-blur-sm px-4 py-2 rounded-lg inline-block">
                        Desenvolvedor Full Stack • Estudante de Ciência da Computação
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                    {/* Image Section - Mais compacto */}
                    <div 
                        ref={imageRef}
                        className="relative order-2 lg:order-1"
                    >
                        <div className="relative max-w-xs md:max-w-sm mx-auto">
                            {/* Glow effect */}
                            <div className="absolute -inset-3 bg-gradient-to-r from-blue-500/15 via-cyan-500/15 to-blue-500/15 rounded-3xl blur-xl"></div>
                            
                            {/* Main image container */}
                            <div className="relative rounded-2xl overflow-hidden border-6 border-white shadow-2xl floating-image">
                                <div className="relative group">
                                    <img
                                        src={FotoLucas}
                                        alt="Lucas Andrade - Desenvolvedor Full Stack"
                                        className="w-full h-auto object-cover aspect-[4/5] group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                </div>
                                
                                {/* Animated border */}
                                <div className="absolute inset-0 border-2 border-transparent rounded-2xl animate-border"></div>
                            </div>
                            
                            {/* Experience badge */}
                            <div className="absolute -top-3 -right-3 animate-bounce-slow">
                                <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg flex items-center gap-2 transform hover:scale-105 transition-transform">
                                    <i className="fas fa-code"></i>
                                    <span>Full Stack</span>
                                </div>
                            </div>
                            
                            {/* Stats floating card */}
                            <div className="absolute -left-4 bottom-8 bg-white rounded-lg p-3 shadow-lg border border-gray-100">
                                <div className="text-xl font-bold text-gray-900">15+</div>
                                <div className="text-[10px] text-gray-500">Projetos</div>
                            </div>
                        </div>
                    </div>

                    {/* Content Section - Layout mais denso */}
                    <div 
                        ref={textRef}
                        className="order-1 lg:order-2 space-y-6"
                    >
                        {/* Personal Info */}
                        <div className="space-y-3">
                            <div>
                                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                                    Lucas <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">Andrade</span>
                                </h3>
                                <p className="text-gray-600 text-sm md:text-base">Desenvolvedor • Estudante • Inovador</p>
                            </div>
                            
                            {/* Tags */}
                            <div className="flex flex-wrap gap-2">
                                <span className="px-3 py-1.5 bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-100 rounded-full text-xs text-blue-700 font-medium flex items-center gap-1.5 hover:border-blue-300 hover:shadow-sm transition-all">
                                    <i className="fas fa-graduation-cap text-blue-500"></i>
                                    6º Semestre
                                </span>
                                <span className="px-3 py-1.5 bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-100 rounded-full text-xs text-cyan-700 font-medium flex items-center gap-1.5 hover:border-cyan-300 hover:shadow-sm transition-all">
                                    <i className="fas fa-calendar-alt text-cyan-500"></i>
                                    {idade ?? "..."} anos
                                </span>
                                <span className="px-3 py-1.5 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-100 rounded-full text-xs text-purple-700 font-medium flex items-center gap-1.5 hover:border-purple-300 hover:shadow-sm transition-all">
                                    <i className="fas fa-map-marker-alt text-purple-500"></i>
                                    Brasília, DF
                                </span>
                            </div>
                        </div>

                        {/* Description - Mais compacto */}
                        <div className="space-y-4">
                            <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex items-start gap-2 mb-3">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
                                        <i className="fas fa-road text-white text-sm"></i>
                                    </div>
                                    <div>
                                        <h4 className="text-gray-900 font-bold text-base mb-1">Minha Jornada</h4>
                                        <p className="text-gray-700 text-sm leading-relaxed">
                                            Sou um <span className="text-blue-600 font-semibold">desenvolvedor Full Stack</span> com 
                                            paixão por tecnologia e inovação. Atualmente no 6º semestre de 
                                            <span className="text-cyan-600 font-semibold"> Ciência da Computação</span>.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex items-start gap-2 mb-3">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                                        <i className="fas fa-bullseye text-white text-sm"></i>
                                    </div>
                                    <div>
                                        <h4 className="text-gray-900 font-bold text-base mb-1">Minha Abordagem</h4>
                                        <p className="text-gray-700 text-sm leading-relaxed">
                                            Foco em <span className="text-purple-600 font-semibold">colaboração</span> e 
                                            <span className="text-pink-600 font-semibold"> comunicação eficaz</span>. 
                                            Acredito no poder do trabalho em equipe para criar soluções inovadoras.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Stats Grid */}
                        <div 
                            ref={statsRef}
                            className="grid grid-cols-2 md:grid-cols-4 gap-3"
                        >
                            {stats.map((stat, index) => (
                                <div 
                                    key={index}
                                    className="bg-gradient-to-br from-white to-gray-50 border border-gray-100 rounded-xl p-3 text-center hover:shadow-lg hover:border-transparent hover:scale-105 transition-all duration-300 cursor-pointer group"
                                >
                                    <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${stat.color} mx-auto mb-2 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                                        <i className={`${stat.icon} text-white text-base`}></i>
                                    </div>
                                    <div className="text-xl font-bold text-gray-900 mb-1">{stat.value}</div>
                                    <div className="text-[10px] text-gray-500 font-medium uppercase tracking-wider">{stat.label}</div>
                                </div>
                            ))}
                        </div>

                        {/* Qualities Grid */}
                        <div className="space-y-3">
                            <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center">
                                    <i className="fas fa-star text-white text-xs"></i>
                                </div>
                                <h4 className="text-gray-900 font-bold text-base">Principais Qualidades</h4>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                {qualities.map((quality, index) => (
                                    <div 
                                        key={index}
                                        className="relative bg-white border border-gray-200 rounded-lg p-3 text-center hover:border-blue-300 hover:shadow-md transition-all duration-300 cursor-pointer group"
                                        onMouseEnter={() => setHoveredQuality(index)}
                                        onMouseLeave={() => setHoveredQuality(null)}
                                    >
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-100 to-cyan-100 mx-auto mb-1.5 flex items-center justify-center group-hover:scale-110 transition-transform">
                                            <i className={`${quality.icon} text-blue-600 text-sm`}></i>
                                        </div>
                                        <div className="font-semibold text-gray-900 text-sm mb-0.5">{quality.name}</div>
                                        <div className="text-[10px] text-gray-600 opacity-80">{quality.desc}</div>
                                        
                                        {/* Hover effect */}
                                        {hoveredQuality === index && (
                                            <div className="absolute inset-0 border-2 border-blue-400 rounded-lg animate-pulse"></div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* CTA Section */}
                        <div className="pt-4 border-t border-gray-100">
                            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                    <span className="text-xs text-gray-600 font-medium">
                                        Disponível para oportunidades
                                    </span>
                                </div>
                                <div className="flex gap-2">
                                    <a 
                                        href="#contato"
                                        className="px-4 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg text-sm font-semibold hover:from-blue-500 hover:to-cyan-500 hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center gap-1.5 group"
                                    >
                                        <i className="fas fa-paper-plane group-hover:rotate-12 transition-transform text-xs"></i>
                                        Vamos Conversar
                                    </a>
                                    <a 
                                        href="#projetos"
                                        className="px-4 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm font-semibold hover:border-blue-400 hover:text-blue-600 hover:shadow-lg transition-all duration-300 flex items-center gap-1.5"
                                    >
                                        <i className="fas fa-eye text-xs"></i>
                                        Projetos
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Scroll indicator */}
                        <div className="pt-2 text-center">
                            <div className="inline-flex flex-col items-center gap-1 text-gray-400">
                                <span className="text-xs">Scroll</span>
                                <div className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center">
                                    <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-scroll"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Adicionar estilos CSS para animações */}
            <style jsx>{`
                @keyframes border {
                    0%, 100% { border-color: rgba(59, 130, 246, 0.2); }
                    50% { border-color: rgba(6, 182, 212, 0.4); }
                }
                .animate-border {
                    animation: border 2s ease-in-out infinite;
                }
                @keyframes bounce-slow {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-8px); }
                }
                .animate-bounce-slow {
                    animation: bounce-slow 3s ease-in-out infinite;
                }
                @keyframes scroll {
                    0% { transform: translateY(0); opacity: 1; }
                    100% { transform: translateY(10px); opacity: 0; }
                }
                .animate-scroll {
                    animation: scroll 1.5s ease-in-out infinite;
                }
            `}</style>
        </section>
    );
}