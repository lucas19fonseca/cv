import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import shelf from "../../assets/projetos/Andrews.png";
import Tw from "../../assets/projetos/tailwclones.png";
import Ponto from "../../assets/projetos/ponto.png";
import Kubo from "../../assets/projetos/kubo-tela.png";
import Reactlb from "../../assets/projetos/react-lab.png";
import Pac from "../../assets/projetos/pacman.png";

import { FaReact, FaNodeJs, FaHtml5, FaCss3Alt, FaJs, FaGithub, FaBootstrap, FaPython, FaExternalLinkAlt } from 'react-icons/fa';
import { SiTailwindcss, SiMongodb } from 'react-icons/si';
import { DiGo } from 'react-icons/di';

// Registrar plugin GSAP
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export default function Projetos() {
    const [mostrarMais, setMostrarMais] = useState(false);
    const sectionRef = useRef(null);
    const projectsRef = useRef(null);
    const buttonRef = useRef(null);

    const projetos = [
        { 
            nome: "React Labs", 
            img: Reactlb, 
            link: "https://github.com/lucas19fonseca/react-labs",
            demo: null,
            descricao: "Todas as minhas atividades do curso de react reunidas em um único lugar.",
            tecnologias: [
                { nome: "HTML", icone: <FaHtml5/>, color: "text-orange-500" },
                { nome: "CSS", icone: <FaCss3Alt/>, color: "text-blue-500" },
                { nome: "JavaScript", icone: <FaJs />, color: "text-yellow-400" },
                { nome: "React", icone: <FaReact/>, color: "text-cyan-400" },
                { nome: "Tailwind", icone: <SiTailwindcss/>, color: "text-teal-400" }
            ],
            destaque: true
        },
        { 
            nome: "Tailclones", 
            img: Tw, 
            link: "https://github.com/lucas19fonseca/tailclones",
            demo: null,
            descricao: "Coleção de clones de interfaces populares construídos com Tailwind CSS para fins de estudo.",
            tecnologias: [
                { nome: "React", icone: <FaReact/>, color: "text-cyan-400" },
                { nome: "Tailwind", icone: <SiTailwindcss/>, color: "text-teal-400" }
            ],
            destaque: true
        },
        { 
            nome: "Kubo", 
            img: Kubo, 
            link: "https://github.com/Kubo-Architecture",
            demo: null,
            descricao: "Plataforma de arquitetura 3D que permite visualização imersiva de projetos arquitetônicos.",
            tecnologias: [
                { nome: "MongoDB", icone: <SiMongodb/>, color: "text-green-500" },
                { nome: "React", icone: <FaReact/>, color: "text-cyan-400" },
                { nome: "Golang", icone: <DiGo/>, color: "text-cyan-600" }
            ],
            destaque: true
        },
        { 
            nome: "Andrews shelf", 
            img: shelf, 
            link: "https://github.com/lucas19fonseca/Andrew-s-shelf",
            demo: null,
            descricao: "Sistema de gerenciamento de biblioteca pessoal com catalogação de livros e controle de empréstimos.",
            tecnologias: [
                { nome: "JavaScript", icone: <FaJs />, color: "text-yellow-400" },
                { nome: "CSS", icone: <FaCss3Alt/>, color: "text-blue-500" },
                { nome: "Bootstrap", icone: <FaBootstrap/>, color: "text-purple-500" },
                { nome: "HTML", icone: <FaHtml5/>, color: "text-orange-500" }
            ],
            destaque: false
        },
        { 
            nome: "Folha de Ponto", 
            img: Ponto, 
            link: "https://github.com/lucas19fonseca/ponto-eletronico",
            demo: null,
            descricao: "Sistema de controle de ponto eletrônico com relatórios e gestão de horas trabalhadas.",
            tecnologias: [
                { nome: "HTML", icone: <FaHtml5/>, color: "text-orange-500" },
                { nome: "CSS", icone: <FaCss3Alt/>, color: "text-blue-500" },
                { nome: "JavaScript", icone: <FaJs />, color: "text-yellow-400" },
            ],
            destaque: false
        },
        { 
            nome: "Pac Man", 
            img: Pac, 
            link: "https://github.com/lucas19fonseca/PacSurvivor",
            demo: null,
            descricao: "Implementação do algoritmo Minimax para o jogo Pacman, com heurísticas inteligentes e poda Alpha-Beta para tomada de decisões estratégicas.",
            tecnologias: [
                { nome: "Python", icone: <FaPython/>, color: "text-blue-600" },
            ],
            destaque: true
        },
    ];

    const projetosIniciais = 3;
    const projetosParaMostrar = mostrarMais ? projetos : projetos.slice(0, projetosIniciais);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animação da seção - REMOVIDO O EFEITO DE FADE IN BRANCO
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

            // Animação dos projetos - ANIMAÇÃO MAIS SUAVE
            if (projectsRef.current) {
                gsap.from(projectsRef.current.children, {
                    scrollTrigger: {
                        trigger: projectsRef.current,
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

            // Animação do botão - REMOVIDO DELAY LONGO
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

    return (
        <section 
            id="projetos"
            ref={sectionRef}
            className="py-20 md:py-32 relative overflow-hidden"
        >
            {/* Background effects - AGORA JÁ COM FUNDO VISÍVEL IMEDIATAMENTE */}
            <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-950 to-gray-900" />
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-30" />
            
            {/* Grid pattern - VISÍVEL DESDE O INÍCIO */}
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
                {/* Section header - SEM ANIMAÇÃO DE ENTRADA BRANCA */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center justify-center gap-3 mb-4">
                        <div className="w-3 h-3 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full"></div>
                        <span className="text-blue-400 font-mono text-sm tracking-widest">PORTFOLIO</span>
                    </div>
                    
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                        Meus <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">Projetos</span>
                    </h2>
                    
                    <p className="text-gray-400 mt-6 text-lg max-w-2xl mx-auto">
                        Uma seleção dos projetos mais relevantes que desenvolvi ao longo da minha jornada
                    </p>
                </div>

                {/* Projects grid - CONTENT JÁ VISÍVEL */}
                <div 
                    ref={projectsRef}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {projetosParaMostrar.map((projeto, index) => (
                        <div 
                            key={index}
                            className="group relative"
                        >
                            {/* Glow effect */}
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-gray-700 to-gray-900 rounded-2xl blur opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                            
                            <div className="relative bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 rounded-2xl overflow-hidden transition-all duration-300 group-hover:border-blue-500/50 group-hover:scale-[1.02] group-hover:shadow-2xl h-full flex flex-col">
                                
                                {/* Project image */}
                                <div className="relative h-48 overflow-hidden">
                                    <img 
                                        src={projeto.img} 
                                        alt={`Imagem do projeto ${projeto.nome}`}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    
                                    {/* Overlay gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
                                    
                                    {/* GitHub link - AGORA SEM CATEGORIA */}
                                    <div className="absolute top-4 right-4">
                                        <a 
                                            href={projeto.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-10 h-10 rounded-full bg-gray-900/90 backdrop-blur-sm border border-gray-700 flex items-center justify-center text-white hover:bg-gray-800 hover:border-blue-500 transition-all duration-300"
                                            aria-label={`Ver código do projeto ${projeto.nome} no GitHub`}
                                        >
                                            <FaGithub className="text-lg" />
                                        </a>
                                    </div>
                                    
                                    {/* Hover effect */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-blue-600/10 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                </div>
                                
                                {/* Project content */}
                                <div className="flex-1 p-6 flex flex-col">
                                    {/* Project title */}
                                    <div className="flex items-center justify-between mb-3">
                                        <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300">
                                            {projeto.nome}
                                        </h3>
                                        
                                        {/* External link icon */}
                                        {projeto.demo && (
                                            <a 
                                                href={projeto.demo}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
                                                aria-label={`Ver demo do projeto ${projeto.nome}`}
                                            >
                                                <FaExternalLinkAlt />
                                            </a>
                                        )}
                                    </div>
                                    
                                    {/* Project description */}
                                    <p className="text-gray-400 text-sm mb-4 flex-1">
                                        {projeto.descricao}
                                    </p>
                                    
                                    {/* Technologies */}
                                    <div className="mt-4 pt-4 border-t border-gray-800">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-xs text-gray-500 font-medium">TECNOLOGIAS</span>
                                        </div>
                                        
                                        <div className="flex flex-wrap gap-2">
                                            {projeto.tecnologias.map((tech, i) => (
                                                <div 
                                                    key={i}
                                                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-800/50 border border-gray-700 group/tech hover:border-blue-500/50 transition-all duration-300"
                                                    title={tech.nome}
                                                >
                                                    <div className={`text-lg ${tech.color}`}>
                                                        {tech.icone}
                                                    </div>
                                                    <span className="text-xs text-gray-300">
                                                        {tech.nome}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    
                                    {/* Project footer */}
                                    <div className="mt-6 pt-4 border-t border-gray-800/50">
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs text-gray-500">
                                                <i className="fas fa-code-branch mr-1"></i>
                                                Open Source
                                            </span>
                                            <a 
                                                href={projeto.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-sm text-blue-400 hover:text-blue-300 transition-colors duration-300 flex items-center gap-1"
                                            >
                                                Ver código
                                                <FaGithub className="text-sm" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Hover line effect */}
                                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 group-hover:w-full transition-all duration-500"></div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Show more/less button - Mostrar apenas se houver mais de 3 projetos */}
                {projetos.length > projetosIniciais && (
                    <div className="text-center mt-12" ref={buttonRef}>
                        <button
                            onClick={() => setMostrarMais(!mostrarMais)}
                            className="group relative px-8 py-4 rounded-full bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700 text-white font-medium hover:border-blue-500 hover:bg-gray-800/80 transition-all duration-300 overflow-hidden"
                        >
                            <span className="relative z-10 flex items-center gap-3">
                                {mostrarMais ? (
                                    <>
                                        <i className="fas fa-chevron-up"></i>
                                        Ver menos projetos
                                    </>
                                ) : (
                                    <>
                                        <i className="fas fa-chevron-down"></i>
                                        Ver mais projetos
                                    </>
                                )}
                            </span>
                            
                            {/* Glow effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-blue-600/10 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        </button>
                        
                        <p className="text-gray-500 text-sm mt-4">
                           
                        </p>
                    </div>
                )}

                {/* GitHub note */}
                <div className="mt-16 text-center border-t border-gray-800/30 pt-8">
                    <p className="text-gray-500 text-sm flex items-center justify-center gap-2">
                        <i className="fab fa-github text-lg"></i>
                        Todos os projetos estão disponíveis no GitHub • Contribuições são bem-vindas!
                    </p>
                </div>
            </div>
        </section>
    );
}