import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Registrar plugin GSAP
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export default function Experiencia() {
    const sectionRef = useRef(null);
    const timelineRef = useRef(null);
    const cardsRef = useRef(null);

    const experiencias = [
        {
            id: 1,
            cargo: "Desenvolvedor Frontend",
            empresa: "Tech Solutions Inc.",
            periodo: "Jan 2023 - Presente",
            local: "São Paulo, SP",
            tipo: "Tempo Integral",
            descricao: [
                "Desenvolvimento de aplicações web responsivas utilizando React.js e TypeScript",
                "Implementação de designs system com Tailwind CSS e Storybook",
                "Colaboração com equipes de UX/UI para criar interfaces intuitivas",
                "Otimização de performance e SEO das aplicações",
                "Participação em code reviews e mentoring de desenvolvedores júniores"
            ],
            tecnologias: ["React", "TypeScript", "Tailwind CSS", "GraphQL", "Jest", "Git"],
            cor: "from-blue-500 to-cyan-500",
            icone: "fas fa-code"
        },
        {
            id: 2,
            cargo: "Desenvolvedor Full Stack",
            empresa: "Startup Inovadora",
            periodo: "Mar 2022 - Dez 2022",
            local: "Remoto",
            tipo: "Contrato",
            descricao: [
                "Desenvolvimento de MVP para plataforma SaaS",
                "Implementação de backend em Node.js com Express e MongoDB",
                "Criação de APIs RESTful e documentação com Swagger",
                "Configuração de pipelines CI/CD com GitHub Actions",
                "Deploy em ambiente cloud (AWS)"
            ],
            tecnologias: ["Node.js", "Express", "MongoDB", "React", "AWS", "Docker"],
            cor: "from-purple-500 to-pink-500",
            icone: "fas fa-layer-group"
        },
        {
            id: 3,
            cargo: "Estagiário em Desenvolvimento",
            empresa: "Digital Agency",
            periodo: "Jun 2021 - Fev 2022",
            local: "Campinas, SP",
            tipo: "Estágio",
            descricao: [
                "Desenvolvimento de landing pages e sites institucionais",
                "Manutenção de aplicações existentes em WordPress",
                "Implementação de animações com CSS e JavaScript",
                "Suporte em projetos de e-commerce",
                "Aprendizado de boas práticas de desenvolvimento"
            ],
            tecnologias: ["HTML", "CSS", "JavaScript", "WordPress", "PHP", "jQuery"],
            cor: "from-green-500 to-emerald-500",
            icone: "fas fa-graduation-cap"
        },
        {
            id: 4,
            cargo: "Freelancer",
            empresa: "Projetos Autônomos",
            periodo: "2020 - 2021",
            local: "Freelance",
            tipo: "Projetos",
            descricao: [
                "Desenvolvimento de sites para pequenos negócios",
                "Consultoria em presença digital",
                "Otimização de sites para SEO",
                "Criação de identidades visuais simples",
                "Suporte técnico para clientes"
            ],
            tecnologias: ["HTML", "CSS", "JavaScript", "Bootstrap", "SEO", "GitHub Pages"],
            cor: "from-orange-500 to-yellow-500",
            icone: "fas fa-briefcase"
        }
    ];

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

            // Animação da linha do tempo
            if (timelineRef.current) {
                gsap.from(timelineRef.current, {
                    scrollTrigger: {
                        trigger: timelineRef.current,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    },
                    height: 0,
                    duration: 1.5,
                    ease: "power3.out"
                });
            }

            // Animação dos cards
            if (cardsRef.current) {
                gsap.from(cardsRef.current.children, {
                    scrollTrigger: {
                        trigger: cardsRef.current,
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    },
                    x: -50,
                    opacity: 0,
                    stagger: 0.2,
                    duration: 0.8,
                    ease: "power3.out"
                });
            }
        });

        return () => ctx.revert();
    }, []);

    return (
        <section 
            id="experiencia"
            ref={sectionRef}
            className="py-20 md:py-32 relative overflow-hidden"
        >
            {/* Background effects */}
            <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-950 to-gray-900" />
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-30" />
            
            {/* Grid pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="w-full h-full" style={{
                    backgroundImage: `
                        linear-gradient(90deg, rgba(16, 185, 129, 0.3) 1px, transparent 1px),
                        linear-gradient(180deg, rgba(16, 185, 129, 0.3) 1px, transparent 1px)
                    `,
                    backgroundSize: '50px 50px'
                }}></div>
            </div>

            <div className="container mx-auto px-4 lg:px-8 relative z-10">
                {/* Section header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center justify-center gap-3 mb-4">
                        <div className="w-3 h-3 bg-gradient-to-r from-emerald-500 to-cyan-400 rounded-full animate-pulse"></div>
                        <span className="text-emerald-400 font-mono text-sm tracking-widest">JOURNEY</span>
                    </div>
                    
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                        Experiência <span className="bg-gradient-to-r from-emerald-500 to-cyan-400 bg-clip-text text-transparent">Profissional</span>
                    </h2>
                    
                    <p className="text-gray-400 mt-6 text-lg max-w-2xl mx-auto">
                        Minha trajetória de crescimento e aprendizado na área de desenvolvimento
                    </p>
                </div>

                <div className="relative max-w-6xl mx-auto">
                    {/* Timeline line */}
                    <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-1 h-full">
                        <div 
                            ref={timelineRef}
                            className="absolute top-0 left-0 w-full h-0 bg-gradient-to-b from-emerald-500 via-cyan-400 to-transparent"
                        ></div>
                        
                        {/* Timeline nodes */}
                        {experiencias.map((exp, index) => (
                            <div 
                                key={exp.id}
                                className={`absolute ${index % 2 === 0 ? 'md:left-full' : 'md:right-full'} left-1/2 transform -translate-x-1/2 md:transform-none md:translate-x-0`}
                                style={{ top: `${(index * 25) + 10}%` }}
                            >
                                <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${exp.cor} shadow-lg`}></div>
                            </div>
                        ))}
                    </div>

                    {/* Experience cards */}
                    <div ref={cardsRef} className="space-y-16">
                        {experiencias.map((exp, index) => (
                            <div 
                                key={exp.id}
                                className={`relative ${index % 2 === 0 ? 'md:ml-0 md:mr-auto md:pr-16' : 'md:ml-auto md:pl-16'} ml-0 w-full md:w-1/2`}
                                style={{ marginTop: index === 0 ? 0 : '-4rem' }}
                            >
                                {/* Card */}
                                <div className="group relative">
                                    {/* Glow effect */}
                                    <div className="absolute -inset-0.5 bg-gradient-to-r from-gray-700 to-gray-900 rounded-2xl blur opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                                    
                                    <div className="relative bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 rounded-2xl p-6 transition-all duration-300 group-hover:border-emerald-500/50 group-hover:scale-[1.02] group-hover:shadow-2xl">
                                        
                                        {/* Header */}
                                        <div className="flex items-start justify-between mb-6">
                                            <div>
                                                {/* Icon */}
                                                <div className="flex items-center gap-3 mb-2">
                                                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${exp.cor} flex items-center justify-center`}>
                                                        <i className={`${exp.icone} text-white text-lg`}></i>
                                                    </div>
                                                    <div>
                                                        <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors duration-300">
                                                            {exp.cargo}
                                                        </h3>
                                                        <p className="text-gray-300 text-sm">{exp.empresa}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            {/* Period badge */}
                                            <div className="px-3 py-1.5 rounded-full bg-gray-800/50 border border-gray-700">
                                                <span className="text-sm text-emerald-400 font-medium">{exp.periodo}</span>
                                            </div>
                                        </div>
                                        
                                        {/* Location and type */}
                                        <div className="flex items-center gap-4 mb-6 text-sm text-gray-400">
                                            <div className="flex items-center gap-2">
                                                <i className="fas fa-map-marker-alt"></i>
                                                <span>{exp.local}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <i className="fas fa-clock"></i>
                                                <span>{exp.tipo}</span>
                                            </div>
                                        </div>
                                        
                                        {/* Description */}
                                        <div className="mb-6">
                                            <h4 className="text-sm font-medium text-gray-300 mb-3">RESPONSABILIDADES</h4>
                                            <ul className="space-y-2">
                                                {exp.descricao.map((item, i) => (
                                                    <li key={i} className="flex items-start gap-3 text-gray-400 text-sm">
                                                        <i className="fas fa-check text-emerald-400 mt-1 text-xs"></i>
                                                        <span>{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        
                                        {/* Technologies */}
                                        <div>
                                            <h4 className="text-sm font-medium text-gray-300 mb-3">TECNOLOGIAS</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {exp.tecnologias.map((tech, i) => (
                                                    <span 
                                                        key={i}
                                                        className="px-3 py-1.5 rounded-lg text-xs font-medium bg-gray-800/50 border border-gray-700 text-gray-300 hover:border-emerald-500/50 hover:text-emerald-300 transition-all duration-300"
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        
                                        {/* Timeline connector for mobile */}
                                        <div className={`absolute top-8 ${index % 2 === 0 ? '-left-8' : '-right-8'} md:hidden`}>
                                            <div className="w-8 h-0.5 bg-gradient-to-r from-gray-700 to-emerald-500"></div>
                                        </div>
                                        
                                        {/* Hover line effect */}
                                        <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-500 to-cyan-400 group-hover:w-full transition-all duration-500"></div>
                                    </div>
                                    
                                    {/* Year indicator */}
                                    <div className={`absolute top-6 ${index % 2 === 0 ? 'md:-left-24' : 'md:-right-24'} hidden md:block`}>
                                        <div className="px-4 py-2 rounded-full bg-gray-900/80 backdrop-blur-sm border border-gray-800">
                                            <span className="text-sm text-gray-300 font-medium">
                                                {exp.periodo.split(' - ')[0]}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Start and end markers */}
                    <div className="flex justify-between items-center mt-4">
                        <div className="flex items-center gap-3">
                            <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                            <span className="text-sm text-gray-400">Início da Jornada</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="text-sm text-gray-400">Atual</span>
                            <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></div>
                        </div>
                    </div>
                </div>

                {/* Skills summary */}
                <div className="mt-20 grid md:grid-cols-3 gap-8">
                    <div className="bg-gradient-to-br from-gray-900/50 to-gray-950/50 border border-gray-800 rounded-2xl p-6 hover:border-emerald-500/30 transition-all duration-300">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                                <i className="fas fa-code text-white text-lg"></i>
                            </div>
                            <div>
                                <h4 className="text-lg font-bold text-white">Frontend</h4>
                                <p className="text-sm text-gray-400">Interface & UX</p>
                            </div>
                        </div>
                        <p className="text-gray-400 text-sm">
                            Especialização em desenvolvimento de interfaces modernas, responsivas e acessíveis com foco em experiência do usuário.
                        </p>
                    </div>
                    
                    <div className="bg-gradient-to-br from-gray-900/50 to-gray-950/50 border border-gray-800 rounded-2xl p-6 hover:border-emerald-500/30 transition-all duration-300">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                                <i className="fas fa-server text-white text-lg"></i>
                            </div>
                            <div>
                                <h4 className="text-lg font-bold text-white">Full Stack</h4>
                                <p className="text-sm text-gray-400">End-to-end</p>
                            </div>
                        </div>
                        <p className="text-gray-400 text-sm">
                            Experiência completa no ciclo de desenvolvimento, desde o backend até a interface, garantindo soluções integradas.
                        </p>
                    </div>
                    
                    <div className="bg-gradient-to-br from-gray-900/50 to-gray-950/50 border border-gray-800 rounded-2xl p-6 hover:border-emerald-500/30 transition-all duration-300">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
                                <i className="fas fa-cogs text-white text-lg"></i>
                            </div>
                            <div>
                                <h4 className="text-lg font-bold text-white">DevOps</h4>
                                <p className="text-sm text-gray-400">Infra & Deploy</p>
                            </div>
                        </div>
                        <p className="text-gray-400 text-sm">
                            Conhecimento em CI/CD, containerização e deploy em cloud, focando em eficiência e escalabilidade.
                        </p>
                    </div>
                </div>

                {/* Footer note */}
                <div className="mt-16 text-center border-t border-gray-800/30 pt-8">
                    <p className="text-gray-500 text-sm flex items-center justify-center gap-2">
                        <i className="fas fa-seedling text-lg text-emerald-400"></i>
                        Sempre em busca de novos desafios e oportunidades de crescimento profissional
                    </p>
                </div>
            </div>
        </section>
    );
}