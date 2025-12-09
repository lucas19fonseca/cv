import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ImgDev from "../../assets/comum/programador.png";

// Registrar plugin GSAP
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export default function SobreMim() {
    const [idade, setIdade] = useState(null);
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
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                },
                y: 50,
                opacity: 0,
                duration: 1,
                ease: "power3.out"
            });

            // Animação da imagem
            if (imageRef.current) {
                gsap.from(imageRef.current, {
                    scrollTrigger: {
                        trigger: imageRef.current,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    },
                    x: -100,
                    opacity: 0,
                    duration: 1.2,
                    ease: "power3.out",
                    delay: 0.2
                });
            }

            // Animação do texto
            if (textRef.current) {
                gsap.from(textRef.current.children, {
                    scrollTrigger: {
                        trigger: textRef.current,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    },
                    y: 30,
                    opacity: 0,
                    stagger: 0.1,
                    duration: 0.8,
                    delay: 0.4,
                    ease: "power3.out"
                });
            }

            // Animação dos stats
            if (statsRef.current) {
                gsap.from(statsRef.current.children, {
                    scrollTrigger: {
                        trigger: statsRef.current,
                        start: "top 90%",
                        toggleActions: "play none none reverse"
                    },
                    scale: 0,
                    opacity: 0,
                    stagger: 0.1,
                    duration: 0.6,
                    delay: 0.6,
                    ease: "back.out(1.7)"
                });
            }
        });

        return () => ctx.revert();
    }, []);

    return (
        <section 
            id="sobre-mim"
            ref={sectionRef}
            className="py-20 md:py-32 relative overflow-hidden"
        >
            {/* Background effects */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/10 to-transparent" />
            <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl" />
            
            <div className="container mx-auto px-4 lg:px-8 relative z-10">
                {/* Section header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                        Sobre <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">Mim</span>
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-cyan-500 mx-auto rounded-full"></div>
                    <p className="text-gray-400 mt-6 text-lg max-w-2xl mx-auto">
                        Conheça um pouco mais sobre minha jornada e objetivos
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Left side - Image */}
                    <div 
                        ref={imageRef}
                        className="relative order-2 lg:order-1"
                    >
                        <div className="relative">
                            {/* Glow effect */}
                            <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/20 to-cyan-500/20 rounded-2xl blur-xl opacity-50" />
                            
                            {/* Main image container */}
                            <div className="relative rounded-2xl overflow-hidden border border-gray-800 bg-gradient-to-br from-gray-900 to-black p-1">
                                <img
                                    src={ImgDev}
                                    alt="Lucas Andrade - Desenvolvedor"
                                    className="w-full h-auto rounded-xl"
                                />
                                
                                {/* Overlay effects */}
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 via-transparent to-transparent" />
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-cyan-500/10" />
                                
                                {/* Scan lines effect */}
                                <div className="absolute inset-0 opacity-5">
                                    <div className="h-full w-full" style={{
                                        backgroundImage: 'linear-gradient(0deg, transparent 50%, rgba(255,255,255,0.1) 50%)',
                                        backgroundSize: '100% 4px',
                                        animation: 'scan 2s linear infinite'
                                    }}></div>
                                </div>
                            </div>
                            
                            {/* Floating badge */}
                            <div className="absolute -bottom-4 -right-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-3 rounded-full font-bold text-sm shadow-lg animate-float">
                                <i className="fas fa-code mr-2"></i>
                                Developer
                            </div>
                            
                            {/* Tech grid pattern */}
                            <div className="absolute -inset-4 -z-10 opacity-10">
                                <div className="w-full h-full" style={{
                                    backgroundImage: `
                                        linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px),
                                        linear-gradient(180deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
                                    `,
                                    backgroundSize: '30px 30px'
                                }}></div>
                            </div>
                        </div>
                    </div>

                    {/* Right side - Content */}
                    <div 
                        ref={textRef}
                        className="order-1 lg:order-2"
                    >
                        {/* Intro */}
                        <div className="mb-8">
                            <div className="inline-flex items-center gap-3 mb-4">
                                <div className="w-3 h-3 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full animate-pulse"></div>
                                <span className="text-blue-400 font-mono text-sm">$ whoami</span>
                            </div>
                            
                            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                                Lucas <span className="text-blue-400">Andrade</span>
                            </h3>
                            
                            <div className="flex items-center gap-4 mb-6">
                                <span className="px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-full text-sm text-gray-300">
                                    <i className="fas fa-graduation-cap mr-2 text-blue-400"></i>
                                    Ciência da Computação
                                </span>
                                <span className="px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-full text-sm text-gray-300">
                                    <i className="fas fa-calendar-alt mr-2 text-cyan-400"></i>
                                    {idade ?? "..."} anos
                                </span>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="space-y-6 mb-10">
                            <p className="text-gray-300 leading-relaxed text-lg">
                                Sou um desenvolvedor <span className="text-white font-semibold">Full Stack</span> apaixonado por tecnologia e inovação. 
                                Atualmente no 6º semestre de <span className="text-blue-400">Ciências da Computação</span>, combino conhecimentos 
                                teóricos com experiência prática para criar soluções digitais eficientes e escaláveis.
                            </p>
                            
                            <p className="text-gray-300 leading-relaxed text-lg">
                                Minha abordagem é centrada na <span className="text-white font-semibold">colaboração</span> e na 
                                <span className="text-white font-semibold"> comunicação eficaz</span>. Acredito que o trabalho em equipe 
                                é essencial para desenvolver projetos de alto impacto, onde diferentes perspectivas se unem para 
                                criar algo maior do que a soma das partes.
                            </p>
                            
                            <p className="text-gray-300 leading-relaxed text-lg">
                                Estou constantemente buscando novos <span className="text-white font-semibold">desafios</span> que me permitam 
                                expandir minhas habilidades e contribuir com soluções inovadoras. Meu objetivo é crescer profissionalmente 
                                enquanto ajudo a transformar ideias em realidade através da tecnologia.
                            </p>
                        </div>

                        {/* Stats */}
                        <div 
                            ref={statsRef}
                            className="grid grid-cols-2 md:grid-cols-4 gap-4"
                        >
                            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4 text-center group hover:border-blue-500/50 transition-all duration-300">
                                <div className="text-2xl md:text-3xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors duration-300">
                                    6º
                                </div>
                                <div className="text-sm text-gray-400">Semestre</div>
                            </div>
                            
                            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4 text-center group hover:border-blue-500/50 transition-all duration-300">
                                <div className="text-2xl md:text-3xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors duration-300">
                                    2+
                                </div>
                                <div className="text-sm text-gray-400">Anos de estudo</div>
                            </div>
                            
                            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4 text-center group hover:border-blue-500/50 transition-all duration-300">
                                <div className="text-2xl md:text-3xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors duration-300">
                                    10+
                                </div>
                                <div className="text-sm text-gray-400">Projetos</div>
                            </div>
                            
                            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4 text-center group hover:border-blue-500/50 transition-all duration-300">
                                <div className="text-2xl md:text-3xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors duration-300">
                                    ∞
                                </div>
                                <div className="text-sm text-gray-400">Curiosidade</div>
                            </div>
                        </div>

                        {/* Skills highlight */}
                        <div className="mt-10 pt-8 border-t border-gray-800/50">
                            <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                <i className="fas fa-bolt text-yellow-400"></i>
                                Principais Qualidades
                            </h4>
                            <div className="flex flex-wrap gap-3">
                                {['Comunicativo', 'Colaborativo', 'Proativo', 'Curioso', 'Adaptável', 'Resiliente'].map((skill, index) => (
                                    <span 
                                        key={index}
                                        className="px-4 py-2 bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700 rounded-full text-sm text-gray-300 hover:border-blue-500/50 hover:text-white transition-all duration-300"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}