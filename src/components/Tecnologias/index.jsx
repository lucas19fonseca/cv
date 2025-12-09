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
    const techCardsRef = useRef(null);
    
    const technologies = [
        // Frontend
        { name: "HTML", icon: Html, category: "frontend", level: "Avançado", color: "from-orange-500 to-red-500" },
        { name: "CSS", icon: Css, category: "frontend", level: "Avançado", color: "from-blue-500 to-blue-700" },
        { name: "JavaScript", icon: Java, category: "frontend", level: "Intermediário", color: "from-yellow-400 to-yellow-600" },
        { name: "React", icon: React, category: "frontend", level: "Intermediário", color: "from-cyan-400 to-blue-500" },
        { name: "Tailwind", icon: Tw, category: "frontend", level: "Avançado", color: "from-teal-400 to-cyan-500" },
        
        // Backend
        { name: "Python", icon: Py, category: "backend", level: "Intermediário", color: "from-blue-600 to-yellow-400" },
        { name: "Go", icon: "https://img.icons8.com/color/60/000000/golang.png", category: "backend", level: "Básico", color: "from-cyan-500 to-blue-600" },
        { name: "MySQL", icon: Mysql, category: "backend", level: "Intermediário", color: "from-blue-400 to-blue-700" },
        { name: "Firebase", icon: Fire, category: "backend", level: "Básico", color: "from-yellow-400 to-orange-500" },
        
        // Tools & DevOps
        { name: "Git", icon: Git, category: "tools", level: "Avançado", color: "from-orange-500 to-red-600" },
        { name: "GitHub", icon: GitHub, category: "tools", level: "Avançado", color: "from-gray-700 to-gray-900" },
        { name: "Docker", icon: Docker, category: "devops", level: "Intermediário", color: "from-blue-500 to-blue-700" },
        { name: "Ubuntu", icon: Ubuntu, category: "devops", level: "Intermediário", color: "from-orange-500 to-purple-600" },
        
        // Design & Others
        { name: "Figma", icon: Figma, category: "design", level: "Intermediário", color: "from-purple-500 to-pink-500" },
        { name: "VS Code", icon: Vscode, category: "tools", level: "Avançado", color: "from-blue-500 to-blue-600" },
        { name: "Postman", icon: Postman, category: "tools", level: "Intermediário", color: "from-orange-500 to-orange-700" },
        { name: "Power BI", icon: Bi, category: "tools", level: "Básico", color: "from-yellow-500 to-orange-600" },
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

            // Animação dos cards com stagger
            if (techCardsRef.current) {
                gsap.from(techCardsRef.current.children, {
                    scrollTrigger: {
                        trigger: techCardsRef.current,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    },
                    y: 30,
                    opacity: 0,
                    scale: 0.8,
                    stagger: 0.03,
                    duration: 0.6,
                    delay: 0.2,
                    ease: "back.out(1.7)"
                });
            }
        });

        return () => ctx.revert();
    }, []);

    // Agrupar tecnologias por categoria
    const techByCategory = {
        frontend: technologies.filter(t => t.category === "frontend"),
        backend: technologies.filter(t => t.category === "backend"),
        tools: technologies.filter(t => t.category === "tools"),
        devops: technologies.filter(t => t.category === "devops"),
        design: technologies.filter(t => t.category === "design"),
    };

    return (
        <section 
            id="tecnologias"
            ref={sectionRef}
            className="py-20 md:py-32 relative overflow-hidden"
        >
            {/* Background effects */}
            <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-950 to-gray-900" />
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-30" />
            
            {/* Grid pattern */}
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
                {/* Section header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center justify-center gap-3 mb-4">
                        <div className="w-3 h-3 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full animate-pulse"></div>
                        <span className="text-blue-400 font-mono text-sm tracking-widest">TECH STACK</span>
                    </div>
                    
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                        Tecnologias & <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">Ferramentas</span>
                    </h2>
                    
                    <p className="text-gray-400 mt-6 text-lg max-w-2xl mx-auto">
                        Conjunto de tecnologias que utilizo para transformar ideias em realidade digital
                    </p>
                </div>

                {/* Stats bar */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                    <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4 text-center">
                        <div className="text-2xl md:text-3xl font-bold text-white mb-2">{technologies.length}</div>
                        <div className="text-sm text-gray-400">Tecnologias</div>
                    </div>
                    
                    <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4 text-center">
                        <div className="text-2xl md:text-3xl font-bold text-white mb-2">5</div>
                        <div className="text-sm text-gray-400">Categorias</div>
                    </div>
                    
                    <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4 text-center">
                        <div className="text-2xl md:text-3xl font-bold text-white mb-2">2+</div>
                        <div className="text-sm text-gray-400">Anos de XP</div>
                    </div>
                    
                    <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4 text-center">
                        <div className="text-2xl md:text-3xl font-bold text-white mb-2">∞</div>
                        <div className="text-sm text-gray-400">Curiosidade</div>
                    </div>
                </div>

                {/* Category tabs */}
                <div className="flex flex-wrap justify-center gap-3 mb-10">
                    <button className="px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-sm font-medium">
                        Todas
                    </button>
                    {Object.keys(techByCategory).map((category, index) => (
                        <button 
                            key={index}
                            className="px-5 py-2.5 rounded-full bg-gray-800/50 border border-gray-700 text-gray-300 text-sm font-medium hover:border-blue-500 hover:text-white transition-all duration-300"
                        >
                            {category.charAt(0).toUpperCase() + category.slice(1)}
                        </button>
                    ))}
                </div>

                {/* Technologies grid */}
                <div 
                    ref={techCardsRef}
                    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
                >
                    {technologies.map((tech, index) => (
                        <div 
                            key={index}
                            className="group relative"
                        >
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-gray-700 to-gray-900 rounded-2xl blur opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                            
                            <div className="relative bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 rounded-2xl p-6 transition-all duration-300 group-hover:border-blue-500/50 group-hover:scale-105 group-hover:shadow-2xl">
                                {/* Tech icon */}
                                <div className="relative mb-4">
                                    <div className={`absolute -inset-3 bg-gradient-to-r ${tech.color} rounded-full blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300`}></div>
                                    
                                    <div className="relative w-16 h-16 mx-auto rounded-xl bg-gray-800/50 border border-gray-700 flex items-center justify-center p-3">
                                        <img 
                                            src={tech.icon} 
                                            alt={tech.name} 
                                            className="w-full h-full object-contain"
                                        />
                                    </div>
                                    
                                    {/* Level indicator */}
                                    <div className="absolute -top-2 -right-2">
                                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                                            tech.level === "Avançado" ? "bg-green-500/20 text-green-400" :
                                            tech.level === "Intermediário" ? "bg-blue-500/20 text-blue-400" :
                                            "bg-gray-500/20 text-gray-400"
                                        }`}>
                                            {tech.level.charAt(0)}
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Tech name */}
                                <h3 className="text-center text-white font-medium text-lg mb-2">
                                    {tech.name}
                                </h3>
                                
                                {/* Tech category */}
                                <div className="text-center">
                                    <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-gray-800 text-gray-300">
                                        {tech.category}
                                    </span>
                                </div>
                                
                                {/* Progress bar */}
                                <div className="mt-4">
                                    <div className="flex justify-between text-xs text-gray-400 mb-1">
                                        <span>Proficiência</span>
                                        <span>{tech.level}</span>
                                    </div>
                                    <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
                                        <div 
                                            className={`h-full rounded-full bg-gradient-to-r ${tech.color} transition-all duration-500`}
                                            style={{
                                                width: tech.level === "Avançado" ? "90%" : 
                                                       tech.level === "Intermediário" ? "70%" : "50%"
                                            }}
                                        ></div>
                                    </div>
                                </div>
                                
                                {/* Hover effect lines */}
                                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 group-hover:w-3/4 transition-all duration-300"></div>
                            </div>
                            
                            {/* Glow effect on hover */}
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
                        </div>
                    ))}
                </div>

                {/* Categories showcase */}
                <div className="mt-20 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Object.entries(techByCategory).map(([category, techs], index) => (
                        <div 
                            key={index}
                            className="bg-gray-900/30 border border-gray-800 rounded-2xl p-6 hover:border-blue-500/30 transition-all duration-300"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${
                                    category === "frontend" ? "from-blue-500 to-cyan-500" :
                                    category === "backend" ? "from-green-500 to-emerald-500" :
                                    category === "tools" ? "from-orange-500 to-yellow-500" :
                                    category === "devops" ? "from-purple-500 to-pink-500" :
                                    "from-pink-500 to-rose-500"
                                }`}></div>
                                <h3 className="text-xl font-semibold text-white">
                                    {category.charAt(0).toUpperCase() + category.slice(1)}
                                </h3>
                                <span className="ml-auto px-3 py-1 rounded-full text-xs font-medium bg-gray-800 text-gray-300">
                                    {techs.length}
                                </span>
                            </div>
                            
                            <div className="flex flex-wrap gap-2">
                                {techs.map((tech, techIndex) => (
                                    <span 
                                        key={techIndex}
                                        className="px-3 py-1.5 rounded-lg text-sm bg-gray-800/50 border border-gray-700 text-gray-300"
                                    >
                                        {tech.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer note */}
                <div className="mt-16 text-center">
                    <p className="text-gray-500 text-sm">
                        <i className="fas fa-sync-alt mr-2 text-blue-400"></i>
                        Stack em constante evolução • Sempre aprendendo novas tecnologias
                    </p>
                </div>
            </div>
        </section>
    );
}