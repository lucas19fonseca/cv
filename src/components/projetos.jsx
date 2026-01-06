import { useState, useRef } from "react";

// Importar todas as imagens
import shelf from "../assets/projetos/Andrews.png";
import Tw from "../assets/projetos/tailwclones.png";
import Ponto from "../assets/projetos/ponto.png";
import Kubo from "../assets/projetos/kubo-tela.png";
import Reactlb from "../assets/projetos/react-lab.png";
import Chris from "../assets/projetos/chris.png";
import Dell from "../assets/projetos/dell.png";
import Diogo from "../assets/projetos/diogo.png";
import Eixo from "../assets/projetos/eixo.png";
import Let from "../assets/projetos/let.png";
import List from "../assets/projetos/list.png";
import Plix from "../assets/projetos/plix.png";
import Spider from "../assets/projetos/spider.png";
import Lucas from "../assets/projetos/lucas.png";
import VemComigo from "../assets/projetos/vem-comigo.png";
import Governo from "../assets/projetos/governo.png";

import {
    FaReact,
    FaHtml5,
    FaCss3Alt,
    FaJs,
    FaGithub,
    FaBootstrap,
    FaPython,
    FaDocker,
    FaExternalLinkAlt,
} from "react-icons/fa";
import { SiTailwindcss, SiMongodb, SiVite } from "react-icons/si";
import { DiGo } from "react-icons/di";
import { TbBrandFramerMotion } from "react-icons/tb";

export default function Projetos() {
    const [projetosMostrados, setProjetosMostrados] = useState(6);
    const sectionRef = useRef(null);

    // Mapeamento de imagens locais
    const imagensLocais = {
        "React Labs": Reactlb,
        "Tailclones": Tw,
        "Kubo": Kubo,
        "Andrews shelf": shelf,
        "Folha de Ponto": Ponto,
        "Chris - Landing Page": Chris,
        "Diego - Landing Page": Diogo,
        "Dell - Landing Page": Dell,
        "ListFy": List,
        "Let Let Go": Let,
        "Eixo": Eixo,
        "Spiderverse": Spider,
        "PlixGames": Plix,
        "Portfólio React": Lucas,
        "Vem Comigo": VemComigo,
        "Guia Prático de Prompt - Governo": Governo,
    };

    // Links dos sites para cada projeto
    const siteLinks = {
        "React Labs": "https://react-labss.vercel.app/",
        "Tailclones": "https://tailclones.vercel.app/",
        "Kubo": "https://kubo-frontend.vercel.app/",
        "Vem Comigo": "https://vemcomigo.vercel.app/",
        "Portfólio React": "https://lucas-andrade.vercel.app/",
        "Andrews shelf": "https://andrew-s-shelf.vercel.app/",
        "PlixGames": "https://lucas19fonseca.github.io/PlixGames/",
        "Chris - Landing Page": "https://christian-miranda.vercel.app/",
        "Diego - Landing Page": "https://diego-soares.vercel.app/",
        "Dell - Landing Page": "https://dell-massoterapia.vercel.app/",
        "ListFy": "https://list-fy.vercel.app/",
        "Let Let Go": "https://leticia-andrade.vercel.app/",
        "Eixo": "https://eixo.vercel.app/",
        "Spiderverse": "https://lucas19fonseca.github.io/spiderverse-bootstrap/",
        "Folha de Ponto": "https://lucas19fonseca.github.io/ponto-eletronico/",
        "Guia Prático de Prompt - Governo": "https://www.gov.br/governodigital/pt-br/infraestrutura-nacional-de-dados/inteligencia-artificial-1/publicacoes/guia-pratico-de-prompt-e-pesquisa-com-ia-para-servidores-publicos/",
    };

    // Função para obter imagem - prioriza local, depois GitHub
    const getImagemProjeto = (nomeProjeto, repoName) => {
        if (imagensLocais[nomeProjeto]) {
            return imagensLocais[nomeProjeto];
        }
        
        return `https://opengraph.githubassets.com/1/lucas19fonseca/${repoName}`;
    };

    // Função para obter link do site
    const getSiteLink = (nomeProjeto) => {
        return siteLinks[nomeProjeto] || null;
    };

    const projetos = [
        {
            nome: "React Labs",
            img: getImagemProjeto("React Labs", "react-labs"),
            link: "https://github.com/lucas19fonseca/react-labs",
            site: getSiteLink("React Labs"),
            descricao: "Todas as minhas atividades do curso de react reunidas em um único lugar.",
            tecnologias: [
                { nome: "HTML", icone: <FaHtml5 />, color: "text-orange-500" },
                { nome: "CSS", icone: <FaCss3Alt />, color: "text-blue-500" },
                { nome: "JavaScript", icone: <FaJs />, color: "text-yellow-400" },
                { nome: "React", icone: <FaReact />, color: "text-cyan-400" },
                { nome: "Tailwind", icone: <SiTailwindcss />, color: "text-teal-400" },
            ],
            destaque: true,
        },
        {
            nome: "Tailclones",
            img: getImagemProjeto("Tailclones", "tailclones"),
            link: "https://github.com/lucas19fonseca/tailclones",
            site: getSiteLink("Tailclones"),
            descricao: "Coleção de clones de interfaces populares construídos com Tailwind CSS para fins de estudo.",
            tecnologias: [
                { nome: "React", icone: <FaReact />, color: "text-cyan-400" },
                { nome: "Tailwind", icone: <SiTailwindcss />, color: "text-teal-400" },
                { nome: "Vite", icone: <SiVite />, color: "text-purple-500" },
            ],
            destaque: true,
        },
        {
            nome: "Kubo",
            img: getImagemProjeto("Kubo", "Kubo-Architecture"),
            link: "https://github.com/Kubo-Architecture",
            site: getSiteLink("Kubo"),
            descricao: "Plataforma de arquitetura 3D que permite visualização imersiva de projetos arquitetônicos.",
            tecnologias: [
                { nome: "MongoDB", icone: <SiMongodb />, color: "text-green-500" },
                { nome: "React", icone: <FaReact />, color: "text-cyan-400" },
                { nome: "Golang", icone: <DiGo />, color: "text-cyan-600" },
                { nome: "Tailwind", icone: <SiTailwindcss />, color: "text-teal-400" },
            ],
            destaque: true,
        },
        {
            nome: "Guia Prático de Prompt - Governo",
            img: getImagemProjeto("Guia Prático de Prompt - Governo", "guia-prompt-governo"),
            link: "https://github.com/lucas19fonseca/guia-prompt-governo",
            site: getSiteLink("Guia Prático de Prompt - Governo"),
            descricao: "Guia prático desenvolvido para o governo brasileiro usando Plone framework, HTML e CSS para auxiliar servidores públicos no uso de LLMs.",
            tecnologias: [
                { nome: "Plone", icone: <FaPython />, color: "text-blue-400" },
                { nome: "HTML", icone: <FaHtml5 />, color: "text-orange-500" },
                { nome: "CSS", icone: <FaCss3Alt />, color: "text-blue-500" },
                { nome: "JavaScript", icone: <FaJs />, color: "text-yellow-400" },
            ],
            destaque: true,
        },
        {
            nome: "Vem Comigo",
            img: getImagemProjeto("Vem Comigo", "vem-comigo"),
            link: "https://github.com/lucas19fonseca/vem-comigo",
            site: getSiteLink("Vem Comigo"),
            descricao: "Projeto educacional em escolas públicas do DF com foco em saúde mental, combate ao bullying e promoção do bem-estar entre estudantes.",
            tecnologias: [
                { nome: "React", icone: <FaReact />, color: "text-cyan-400" },
                { nome: "Tailwind", icone: <SiTailwindcss />, color: "text-teal-400" },
                { nome: "HTML", icone: <FaHtml5 />, color: "text-orange-500" },
                { nome: "GSAP", icone: <FaJs />, color: "text-green-500" },
                { nome: "n8n", icone: <FaJs />, color: "text-purple-400" },
                { nome: "Docker", icone: <FaDocker />, color: "text-blue-500" },
            ],
            destaque: false,
        },
        {
            nome: "Portfólio React",
            img: getImagemProjeto("Portfólio React", "cv"),
            link: "https://github.com/lucas19fonseca/cv",
            site: getSiteLink("Portfólio React"),
            descricao: "Meu portfólio pessoal desenvolvido com React, Tailwind CSS e animações GSAP.",
            tecnologias: [
                { nome: "React", icone: <FaReact />, color: "text-cyan-400" },
                { nome: "Tailwind", icone: <SiTailwindcss />, color: "text-teal-400" },
                { nome: "GSAP", icone: <FaJs />, color: "text-green-500" },
                { nome: "HTML", icone: <FaHtml5 />, color: "text-orange-500" },
            ],
            destaque: true,
        },
        {
            nome: "Andrews shelf",
            img: getImagemProjeto("Andrews shelf", "Andrew-s-shelf"),
            link: "https://github.com/lucas19fonseca/Andrew-s-shelf",
            site: getSiteLink("Andrews shelf"),
            descricao: "Sistema de gerenciamento de biblioteca pessoal com catalogação de livros,minha primeira página web,guardando pra ver a minha evolução futuramente.",
            tecnologias: [
                { nome: "JavaScript", icone: <FaJs />, color: "text-yellow-400" },
                { nome: "CSS", icone: <FaCss3Alt />, color: "text-blue-500" },
                { nome: "Bootstrap", icone: <FaBootstrap />, color: "text-purple-500" },
                { nome: "HTML", icone: <FaHtml5 />, color: "text-orange-500" },
            ],
            destaque: false,
        },
        {
            nome: "PlixGames",
            img: getImagemProjeto("PlixGames", "PlixGames"),
            link: "https://github.com/lucas19fonseca/PlixGames",
            site: getSiteLink("PlixGames"),
            descricao: "Plataforma de desenvolvimento de jogos com inteligência artificial (em desenvolvimento).",
            tecnologias: [
                { nome: "JavaScript", icone: <FaJs />, color: "text-yellow-400" },
                { nome: "Tailwind", icone: <SiTailwindcss />, color: "text-teal-400" },
                { nome: "GSAP", icone: <FaJs />, color: "text-green-500" },
                { nome: "HTML", icone: <FaHtml5 />, color: "text-orange-500" },
            ],
            destaque: false,
        },
        {
            nome: "Chris - Landing Page",
            img: getImagemProjeto("Chris - Landing Page", "cv-chris"),
            link: "https://github.com/lucas19fonseca/cv-chris",
            site: getSiteLink("Chris - Landing Page"),
            descricao: "Landing page freelance desenvolvida com Tailwind CSS e animações GSAP.",
            tecnologias: [
                { nome: "Tailwind", icone: <SiTailwindcss />, color: "text-teal-400" },
                { nome: "HTML", icone: <FaHtml5 />, color: "text-orange-500" },
                { nome: "GSAP", icone: <FaJs />, color: "text-green-500" },
                { nome: "CSS", icone: <FaCss3Alt />, color: "text-blue-500" },
            ],
            destaque: false,
        },
        {
            nome: "Diego - Landing Page",
            img: getImagemProjeto("Diego - Landing Page", "cv-diego"),
            link: "https://github.com/lucas19fonseca/cv-diego",
            site: getSiteLink("Diego - Landing Page"),
            descricao: "Landing page freelance com design moderno e animações suaves usando GSAP.",
            tecnologias: [
                { nome: "Tailwind", icone: <SiTailwindcss />, color: "text-teal-400" },
                { nome: "HTML", icone: <FaHtml5 />, color: "text-orange-500" },
                { nome: "GSAP", icone: <FaJs />, color: "text-green-500" },
            ],
            destaque: false,
        },
        {
            nome: "Dell - Landing Page",
            img: getImagemProjeto("Dell - Landing Page", "landingPage-Dell"),
            link: "https://github.com/lucas19fonseca/landingPage-Dell",
            site: getSiteLink("Dell - Landing Page"),
            descricao: "Landing page freelance para a marca Dell desenvolvida com React e Tailwind CSS.",
            tecnologias: [
                { nome: "React", icone: <FaReact />, color: "text-cyan-400" },
                { nome: "Tailwind", icone: <SiTailwindcss />, color: "text-teal-400" },
                { nome: "HTML", icone: <FaHtml5 />, color: "text-orange-500" },
                { nome: "Vite", icone: <SiVite />, color: "text-purple-500" },
            ],
            destaque: false,
        },
        {
            nome: "ListFy",
            img: getImagemProjeto("ListFy", "ListFy"),
            link: "https://github.com/lucas19fonseca/ListFy",
            site: getSiteLink("ListFy"),
            descricao: "Projeto Vibe Code - Aplicação para criação e gerenciamento de listas interativas.",
            tecnologias: [
                { nome: "React", icone: <FaReact />, color: "text-cyan-400" },
                { nome: "Tailwind", icone: <SiTailwindcss />, color: "text-teal-400" },
                { nome: "HTML", icone: <FaHtml5 />, color: "text-orange-500" },
                { nome: "JavaScript", icone: <FaJs />, color: "text-yellow-400" },
            ],
            destaque: false,
        },
        {
            nome: "Let Let Go",
            img: getImagemProjeto("Let Let Go", "let-let-go"),
            link: "https://github.com/lucas19fonseca/let-let-go",
            site: getSiteLink("Let Let Go"),
            descricao: "Landing page freelance com design responsivo e interações JavaScript.",
            tecnologias: [
                { nome: "HTML", icone: <FaHtml5 />, color: "text-orange-500" },
                { nome: "CSS", icone: <FaCss3Alt />, color: "text-blue-500" },
                { nome: "JavaScript", icone: <FaJs />, color: "text-yellow-400" },
            ],
            destaque: false,
        },
        {
            nome: "Eixo",
            img: getImagemProjeto("Eixo", "Eixo"),
            link: "https://github.com/lucas19fonseca/Eixo",
            site: getSiteLink("Eixo"),
            descricao: "Projeto Vibe Code aplicação web com foco em design responsivo e experiência do usuário.",
            tecnologias: [
                { nome: "HTML", icone: <FaHtml5 />, color: "text-orange-500" },
                { nome: "CSS", icone: <FaCss3Alt />, color: "text-blue-500" },
                { nome: "JavaScript", icone: <FaJs />, color: "text-yellow-400" },
            ],
            destaque: false,
        },
        {
            nome: "Spiderverse",
            img: getImagemProjeto("Spiderverse", "spiderverse-bootstrap"),
            link: "https://github.com/lucas19fonseca/spiderverse-bootstrap",
            site: getSiteLink("Spiderverse"),
            descricao: "Site responsivo inspirado no universo do Aranhaverso, desenvolvido com Bootstrap 5.",
            tecnologias: [
                { nome: "HTML", icone: <FaHtml5 />, color: "text-orange-500" },
                { nome: "CSS", icone: <FaCss3Alt />, color: "text-blue-500" },
                { nome: "Bootstrap", icone: <FaBootstrap />, color: "text-purple-500" },
            ],
            destaque: false,
        },
        {
            nome: "Folha de Ponto",
            img: getImagemProjeto("Folha de Ponto", "ponto-eletronico"),
            link: "https://github.com/lucas19fonseca/ponto-eletronico",
            site: getSiteLink("Folha de Ponto"),
            descricao: "Sistema de controle de ponto eletrônico com relatórios e gestão de horas trabalhadas.",
            tecnologias: [
                { nome: "HTML", icone: <FaHtml5 />, color: "text-orange-500" },
                { nome: "CSS", icone: <FaCss3Alt />, color: "text-blue-500" },
                { nome: "JavaScript", icone: <FaJs />, color: "text-yellow-400" },
            ],
            destaque: false,
        },
    ];

    const projetosPorVez = 6;
    const hasMoreProjects = projetos.length > projetosMostrados;
    
    // Slice para mostrar apenas os projetos necessários
    const projetosParaMostrar = projetos.slice(0, projetosMostrados);

    const carregarMaisProjetos = () => {
        setProjetosMostrados(prev => prev + projetosPorVez);
    };

    const resetarProjetos = () => {
        setProjetosMostrados(projetosPorVez);
    };

    return (
        <section
            id="projetos"
            ref={sectionRef}
            className="py-20 md:py-32 relative overflow-hidden"
        >
            {/* Background effects */}
            <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-950 to-gray-900" />
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-30" />

            {/* Grid pattern */}
            <div className="absolute inset-0 opacity-5">
                <div
                    className="w-full h-full"
                    style={{
                        backgroundImage: `
              linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px),
              linear-gradient(180deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
            `,
                        backgroundSize: "50px 50px",
                    }}
                ></div>
            </div>

            <div className="container mx-auto px-4 lg:px-8 relative z-10">
                {/* Section header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center justify-center gap-3 mb-4">
                        <div className="w-3 h-3 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full"></div>
                        <span className="text-blue-400 font-mono text-sm tracking-widest">
                            PORTFÓLIO
                        </span>
                    </div>

                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                        Meus{" "}
                        <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                            Projetos
                        </span>
                    </h2>

                    <p className="text-gray-400 mt-6 text-lg max-w-2xl mx-auto">
                        Explore minha jornada através de projetos freelance, estudos
                        pessoais e soluções inovadoras
                    </p>
                </div>

                {/* Projects grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projetosParaMostrar.map((projeto, index) => (
                        <div key={index} className="group relative">
                            {/* Glow effect */}
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-gray-700 to-gray-900 rounded-2xl blur opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>

                            <div className="relative bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 rounded-2xl overflow-hidden transition-all duration-300 group-hover:border-blue-500/50 group-hover:scale-[1.02] group-hover:shadow-2xl h-full flex flex-col">
                                {/* Project image */}
                                <div className="relative h-48 overflow-hidden">
                                    <img
                                        src={projeto.img}
                                        alt={`Imagem do projeto ${projeto.nome}`}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        loading="lazy"
                                        onError={(e) => {
                                            const repoName = projeto.link.split('/').pop() || 
                                                          projeto.nome.toLowerCase().replace(/\s+/g, '-');
                                            e.target.src = `https://opengraph.githubassets.com/1/lucas19fonseca/${repoName}`;
                                        }}
                                    />

                                    {/* Overlay gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>

                                    {/* Site link badge (se disponível) */}
                                    {projeto.site && (
                                        <div className="absolute top-4 right-4">
                                            <a
                                                href={projeto.site}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-xs font-medium rounded-lg hover:opacity-90 transition-opacity"
                                            >
                                                <FaExternalLinkAlt className="text-xs" />
                                                Ver Site
                                            </a>
                                        </div>
                                    )}
                                </div>

                                {/* Project content */}
                                <div className="flex-1 p-6 flex flex-col">
                                    {/* Project title */}
                                    <div className="flex items-center justify-between mb-3">
                                        <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300">
                                            {projeto.nome}
                                        </h3>
                                    </div>

                                    {/* Project description */}
                                    <p className="text-gray-400 text-sm mb-6 flex-1">
                                        {projeto.descricao}
                                    </p>

                                    {/* Technologies */}
                                    <div className="mt-2 pt-4 border-t border-gray-800">
                                        <div className="mb-3">
                                            <span className="text-xs text-gray-500 font-medium">
                                                TECNOLOGIAS UTILIZADAS
                                            </span>
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
                                                Disponível no GitHub
                                            </span>
                                            <a
                                                href={projeto.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-sm text-blue-400 hover:text-blue-300 transition-colors duration-300 flex items-center gap-1.5 group/link"
                                            >
                                                <span>Acessar repositório</span>
                                                <FaGithub className="text-sm group-hover/link:translate-x-1 transition-transform" />
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

                {/* Show more/less button */}
                {hasMoreProjects && (
                    <div className="text-center mt-12">
                        <button
                            onClick={carregarMaisProjetos}
                            className="group relative px-8 py-4 rounded-full bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700 text-white font-medium hover:border-blue-500 hover:bg-gray-800/80 transition-all duration-300 overflow-hidden"
                        >
                            {/* Glow effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-blue-600/10 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            
                            <span className="relative z-10 flex items-center gap-3">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                                Ver mais {Math.min(projetosPorVez, projetos.length - projetosMostrados)} projetos
                                <span className="text-xs text-gray-400 ml-2">
                                    ({projetosMostrados}/{projetos.length})
                                </span>
                            </span>
                        </button>
                        
                        {/* Botão para resetar (opcional) - aparece quando todos os projetos estão sendo mostrados */}
                        {projetosMostrados > projetosPorVez && (
                            <button
                                onClick={resetarProjetos}
                                className="mt-4 text-sm text-gray-400 hover:text-white transition-colors duration-300"
                            >
                                Mostrar menos
                            </button>
                        )}
                    </div>
                )}

                {/* Mostrar contagem quando todos os projetos estão visíveis */}
                {!hasMoreProjects && projetosMostrados > projetosPorVez && (
                    <div className="text-center mt-12">
                        <p className="text-gray-400 mb-4">
                            Todos os {projetos.length} projetos estão sendo exibidos
                        </p>
                        <button
                            onClick={resetarProjetos}
                            className="group relative px-6 py-3 rounded-full bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700 text-white font-medium hover:border-blue-500 hover:bg-gray-800/80 transition-all duration-300"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                                </svg>
                                Ver menos projetos
                            </span>
                        </button>
                    </div>
                )}

                {/* GitHub note */}
                <div className="mt-16 text-center border-t border-gray-800/30 pt-8">
                    <p className="text-gray-500 text-sm flex items-center justify-center gap-2 mb-4">
                        <FaGithub className="text-lg" />
                        Todos os projetos são open-source e estão disponíveis no GitHub
                    </p>
                </div>
            </div>
            
            {/* Bottom decorative elements */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-30" />
            <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-gray-900 to-transparent" />
        </section>
    );
}