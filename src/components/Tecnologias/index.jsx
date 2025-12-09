import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Html from "../../assets/tecnologias/html.png"
import Css from "../../assets/tecnologias/css.png"
import Java from "../../assets/tecnologias/Java.sc.png"
import React from "../../assets/tecnologias/react copy.svg"
import Py from "../../assets/tecnologias/py.png"
import GitHub from "../../assets/tecnologias/github.png"
import Git from "../../assets/tecnologias/git.png"
import Vscode from "../../assets/tecnologias/vscode.png"
import Mysql from "../../assets/tecnologias/mysql.svg"
import Figma from "../../assets/tecnologias/figma.png"
import Docker from "../../assets/tecnologias/docker.png"
import Postman from "../../assets/tecnologias/postman.png"
import Tw from "../../assets/tecnologias/tailwind.png"
import Fire from "../../assets/tecnologias/Firebase.png"
import Bi from "../../assets/tecnologias/Bi.svg"
import Ubuntu from "../../assets/tecnologias/ubuntu.png"

// Registrar plugin GSAP
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export default function Tecnologia() {
    const sectionRef = useRef(null);
    const cardsRef = useRef(null);
    
    const technologies = [
        // Frontend
        { name: "HTML", icon: Html, category: "frontend", color: "from-orange-500 to-red-500" },
        { name: "CSS", icon: Css, category: "frontend", color: "from-blue-500 to-blue-700" },
        { name: "JavaScript", icon: Java, category: "frontend", color: "from-yellow-400 to-yellow-600" },
        { name: "React", icon: React, category: "frontend", color: "from-cyan-400 to-blue-500" },
        { name: "Tailwind", icon: Tw, category: "frontend", color: "from-teal-400 to-cyan-500" },
        
        // Backend
        { name: "Python", icon: Py, category: "backend", color: "from-blue-600 to-yellow-400" },
        { name: "Go", icon: "https://img.icons8.com/color/60/000000/golang.png", category: "backend", color: "from-cyan-500 to-blue-600" },
        { name: "MySQL", icon: Mysql, category: "backend", color: "from-blue-400 to-blue-700" },
        { name: "Firebase", icon: Fire, category: "backend", color: "from-yellow-400 to-orange-500" },
        
        // Tools & DevOps
        { name: "Git", icon: Git, category: "tools", color: "from-orange-500 to-red-600" },
        { name: "GitHub", icon: GitHub, category: "tools", color: "from-gray-700 to-gray-900" },
        { name: "Docker", icon: Docker, category: "devops", color: "from-blue-500 to-blue-700" },
        { name: "Ubuntu", icon: Ubuntu, category: "devops", color: "from-orange-500 to-purple-600" },
        
        // Design & Others
        { name: "Figma", icon: Figma, category: "design", color: "from-purple-500 to-pink-500" },
        { name: "VS Code", icon: Vscode, category: "tools", color: "from-blue-500 to-blue-600" },
        { name: "Postman", icon: Postman, category: "tools", color: "from-orange-500 to-orange-700" },
        { name: "Power BI", icon: Bi, category: "tools", color: "from-yellow-500 to-orange-600" },
    ];

    // Agrupar tecnologias por categoria
    const techByCategory = {
        frontend: technologies.filter(t => t.category === "frontend"),
        backend: technologies.filter(t => t.category === "backend"),
        tools: technologies.filter(t => t.category === "tools"),
        devops: technologies.filter(t => t.category === "devops"),
        design: technologies.filter(t => t.category === "design"),
    };

    // Obter ícone para cada categoria
    const getCategoryIcon = (category) => {
        switch(category) {
            case 'frontend': return 'fas fa-code';
            case 'backend': return 'fas fa-server';
            case 'tools': return 'fas fa-tools';
            case 'devops': return 'fas fa-cogs';
            case 'design': return 'fas fa-palette';
            default: return 'fas fa-layer-group';
        }
    };

    // Obter cor para cada categoria
    const getCategoryColor = (category) => {
        switch(category) {
            case 'frontend': return 'from-blue-500 to-cyan-500';
            case 'backend': return 'from-green-500 to-emerald-500';
            case 'tools': return 'from-orange-500 to-yellow-500';
            case 'devops': return 'from-purple-500 to-pink-500';
            case 'design': return 'from-pink-500 to-rose-500';
            default: return 'from-gray-600 to-gray-500';
        }
    };

    // Obter título da categoria
    const getCategoryTitle = (category) => {
        switch(category) {
            case 'frontend': return 'Frontend';
            case 'backend': return 'Backend';
            case 'tools': return 'Ferramentas';
            case 'devops': return 'DevOps';
            case 'design': return 'Design';
            default: return category;
        }
    };

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

            // Animação dos cards
            if (cardsRef.current) {
                gsap.from(cardsRef.current.children, {
                    scrollTrigger: {
                        trigger: cardsRef.current,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    },
                    y: 30,
                    opacity: 0,
                    stagger: 0.1,
                    duration: 0.6,
                    delay: 0.2,
                    ease: "back.out(1.7)"
                });
            }
        });

        return () => ctx.revert();
    }, []);

    return (
        <section 
            id="tecnologias"
            ref={sectionRef}
            className="py-20 md:py-32 relative overflow-hidden"
        >
            {/* Background effects */}
            <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-950 to-gray-900" />
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-30" />
            
            <div className="container mx-auto px-4 lg:px-8 relative z-10">
                {/* Section header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center gap-3 mb-4">
                        <div className="w-3 h-3 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full animate-pulse"></div>
                        <span className="text-blue-400 font-mono text-sm tracking-widest">TECH STACK</span>
                    </div>
                    
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Tecnologias & <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">Ferramentas</span>
                    </h2>
                    
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Tecnologias que utilizo para desenvolvimento de soluções digitais
                    </p>
                </div>

                {/* Category cards grid - COMPACTO */}
                <div 
                    ref={cardsRef}
                    className="grid grid-cols-1 lg:grid-cols-3 gap-6"
                >
                    {/* Card Frontend */}
                    <div className="group relative">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-gray-700 to-gray-900 rounded-xl blur opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                        
                        <div className="relative bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 rounded-xl p-4 transition-all duration-300 group-hover:border-blue-500/50 group-hover:shadow-xl h-full">
                            {/* Category header compacto */}
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
                                    <i className="fas fa-code text-white text-base"></i>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-lg font-bold text-white">Frontend</h3>
                                    <p className="text-gray-400 text-xs">Interface & UX</p>
                                </div>
                                <span className="px-2 py-1 rounded text-xs font-medium bg-gray-800 text-gray-300 flex-shrink-0">
                                    {techByCategory.frontend.length}
                                </span>
                            </div>
                            
                            {/* Technologies grid compacto */}
                            <div className="grid grid-cols-3 gap-3">
                                {techByCategory.frontend.map((tech, index) => (
                                    <div 
                                        key={index}
                                        className="group/tech relative"
                                    >
                                        <div className="relative bg-gray-900/40 border border-gray-700 rounded-lg p-3 transition-all duration-300 group-hover/tech:border-blue-500/50 group-hover/tech:scale-105 group-hover/tech:shadow-md">
                                            {/* Tech icon */}
                                            <div className="relative mb-2">
                                                <div className={`absolute -inset-1 bg-gradient-to-r ${tech.color} rounded-full blur opacity-0 group-hover/tech:opacity-15 transition-opacity duration-300`}></div>
                                                
                                                <div className="relative w-10 h-10 mx-auto rounded-lg bg-gray-800/30 border border-gray-600 flex items-center justify-center p-1.5">
                                                    <img 
                                                        src={tech.icon} 
                                                        alt={tech.name} 
                                                        className="w-full h-full object-contain"
                                                    />
                                                </div>
                                            </div>
                                            
                                            {/* Tech name */}
                                            <h4 className="text-center text-white font-medium text-xs truncate">
                                                {tech.name}
                                            </h4>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Card Backend */}
                    <div className="group relative">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-gray-700 to-gray-900 rounded-xl blur opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                        
                        <div className="relative bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 rounded-xl p-4 transition-all duration-300 group-hover:border-green-500/50 group-hover:shadow-xl h-full">
                            {/* Category header compacto */}
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center flex-shrink-0">
                                    <i className="fas fa-server text-white text-base"></i>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-lg font-bold text-white">Backend</h3>
                                    <p className="text-gray-400 text-xs">Lógica & Dados</p>
                                </div>
                                <span className="px-2 py-1 rounded text-xs font-medium bg-gray-800 text-gray-300 flex-shrink-0">
                                    {techByCategory.backend.length}
                                </span>
                            </div>
                            
                            {/* Technologies grid compacto */}
                            <div className="grid grid-cols-3 gap-3">
                                {techByCategory.backend.map((tech, index) => (
                                    <div 
                                        key={index}
                                        className="group/tech relative"
                                    >
                                        <div className="relative bg-gray-900/40 border border-gray-700 rounded-lg p-3 transition-all duration-300 group-hover/tech:border-green-500/50 group-hover/tech:scale-105 group-hover/tech:shadow-md">
                                            {/* Tech icon */}
                                            <div className="relative mb-2">
                                                <div className={`absolute -inset-1 bg-gradient-to-r ${tech.color} rounded-full blur opacity-0 group-hover/tech:opacity-15 transition-opacity duration-300`}></div>
                                                
                                                <div className="relative w-10 h-10 mx-auto rounded-lg bg-gray-800/30 border border-gray-600 flex items-center justify-center p-1.5">
                                                    <img 
                                                        src={tech.icon} 
                                                        alt={tech.name} 
                                                        className="w-full h-full object-contain"
                                                    />
                                                </div>
                                            </div>
                                            
                                            {/* Tech name */}
                                            <h4 className="text-center text-white font-medium text-xs truncate">
                                                {tech.name}
                                            </h4>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Card Tools & DevOps */}
                    <div className="lg:col-span-1 group relative">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-gray-700 to-gray-900 rounded-xl blur opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                        
                        <div className="relative bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 rounded-xl p-4 transition-all duration-300 group-hover:border-orange-500/50 group-hover:shadow-xl h-full">
                            {/* Category header compacto */}
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-orange-500 to-yellow-500 flex items-center justify-center flex-shrink-0">
                                    <i className="fas fa-tools text-white text-base"></i>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-lg font-bold text-white">Ferramentas</h3>
                                    <p className="text-gray-400 text-xs">Dev & Ops</p>
                                </div>
                                <span className="px-2 py-1 rounded text-xs font-medium bg-gray-800 text-gray-300 flex-shrink-0">
                                    {techByCategory.tools.length + techByCategory.devops.length}
                                </span>
                            </div>
                            
                            {/* Technologies grid compacto - 2 colunas para mais espaço */}
                            <div className="grid grid-cols-3 gap-3">
                                {[...techByCategory.tools, ...techByCategory.devops].map((tech, index) => (
                                    <div 
                                        key={index}
                                        className="group/tech relative"
                                    >
                                        <div className="relative bg-gray-900/40 border border-gray-700 rounded-lg p-3 transition-all duration-300 group-hover/tech:border-orange-500/50 group-hover/tech:scale-105 group-hover/tech:shadow-md">
                                            {/* Tech icon */}
                                            <div className="relative mb-2">
                                                <div className={`absolute -inset-1 bg-gradient-to-r ${tech.color} rounded-full blur opacity-0 group-hover/tech:opacity-15 transition-opacity duration-300`}></div>
                                                
                                                <div className="relative w-10 h-10 mx-auto rounded-lg bg-gray-800/30 border border-gray-600 flex items-center justify-center p-1.5">
                                                    <img 
                                                        src={tech.icon} 
                                                        alt={tech.name} 
                                                        className="w-full h-full object-contain"
                                                    />
                                                </div>
                                            </div>
                                            
                                            {/* Tech name */}
                                            <h4 className="text-center text-white font-medium text-xs truncate">
                                                {tech.name}
                                            </h4>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Card Design */}
                    <div className="lg:col-span-3 group relative">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-gray-700 to-gray-900 rounded-xl blur opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                        
                        <div className="relative bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 rounded-xl p-4 transition-all duration-300 group-hover:border-pink-500/50 group-hover:shadow-xl h-full">
                            {/* Category header compacto */}
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-pink-500 to-rose-500 flex items-center justify-center flex-shrink-0">
                                    <i className="fas fa-palette text-white text-base"></i>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-lg font-bold text-white">Design & Outros</h3>
                                    <p className="text-gray-400 text-xs">UI & Análise</p>
                                </div>
                                <span className="px-2 py-1 rounded text-xs font-medium bg-gray-800 text-gray-300 flex-shrink-0">
                                    {techByCategory.design.length}
                                </span>
                            </div>
                            
                            {/* Technologies grid compacto - linear */}
                            <div className="flex flex-wrap gap-3">
                                {techByCategory.design.map((tech, index) => (
                                    <div 
                                        key={index}
                                        className="group/tech relative flex-1 min-w-[100px]"
                                    >
                                        <div className="relative bg-gray-900/40 border border-gray-700 rounded-lg p-3 transition-all duration-300 group-hover/tech:border-pink-500/50 group-hover/tech:scale-105 group-hover/tech:shadow-md">
                                            {/* Tech icon */}
                                            <div className="relative mb-2">
                                                <div className={`absolute -inset-1 bg-gradient-to-r ${tech.color} rounded-full blur opacity-0 group-hover/tech:opacity-15 transition-opacity duration-300`}></div>
                                                
                                                <div className="relative w-10 h-10 mx-auto rounded-lg bg-gray-800/30 border border-gray-600 flex items-center justify-center p-1.5">
                                                    <img 
                                                        src={tech.icon} 
                                                        alt={tech.name} 
                                                        className="w-full h-full object-contain"
                                                    />
                                                </div>
                                            </div>
                                            
                                            {/* Tech name */}
                                            <h4 className="text-center text-white font-medium text-xs truncate">
                                                {tech.name}
                                            </h4>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer note */}
                <div className="mt-12 text-center">
                    <p className="text-gray-500 text-sm">
                        <i className="fas fa-sync-alt mr-2 text-blue-400"></i>
                        Stack em constante evolução
                    </p>
                </div>
            </div>
        </section>
    );
}