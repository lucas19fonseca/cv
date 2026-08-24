import { useState, useRef } from "react";

// Importar todas as imagens
import shelf from "../assets/projetos/Andrews.webp";
import Tw from "../assets/projetos/tailwclones.webp";
import Ponto from "../assets/projetos/ponto.webp";
import Kubo from "../assets/projetos/kubo-tela.webp";
import Reactlb from "../assets/projetos/react-lab.webp";
import Chris from "../assets/projetos/chris.webp";
import Dell from "../assets/projetos/dell.webp";
import Diogo from "../assets/projetos/diogo.webp";
import Eixo from "../assets/projetos/eixo.webp";
import Let from "../assets/projetos/let.webp";
import List from "../assets/projetos/list.webp";
import Plix from "../assets/projetos/plix.webp";
import Spider from "../assets/projetos/spider.webp";
import Lucas from "../assets/projetos/lucas.webp";
import VemComigo from "../assets/projetos/vem-comigo.webp";
import Governo from "../assets/projetos/governo.webp";

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
        /* {
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
        }, */
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
        /* {
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
        }, */
        /* {
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
        }, */
        /* {
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
        }, */
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
        /* {
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
        }, */
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
        /* {
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
        }, */
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
            className="py-16 md:py-24 relative overflow-hidden"
        >
            {/* Background effects */}
            <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-950 to-gray-900" />

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
                />
            </div>

            {/* Linha decorativa no topo */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-30" />

            {/* Linha decorativa na base */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-30" />

            <div className="container mx-auto max-w-6xl px-6 lg:px-8 relative z-10">
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projetosParaMostrar.map((projeto, index) => (
                        <article
                            key={index}
                            className="group flex flex-col overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] transition-colors duration-300 hover:border-white/10"
                        >
                            {/* Project image */}
                            <div className="relative aspect-[16/10] overflow-hidden">
                                <img
                                    src={projeto.img}
                                    alt={`Captura de tela do projeto ${projeto.nome}`}
                                    className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                                    loading="lazy"
                                    decoding="async"
                                    width="640"
                                    height="360"
                                    onError={(e) => {
                                        const repoName = projeto.link.split('/').pop() ||
                                            projeto.nome.toLowerCase().replace(/\s+/g, '-');
                                        e.target.src = `https://opengraph.githubassets.com/1/lucas19fonseca/${repoName}`;
                                    }}
                                />

                                {/* Site link */}
                                {projeto.site && (
                                    <a
                                        href={projeto.site}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-gray-950/70 px-3 py-1.5 text-xs font-medium text-white opacity-0 backdrop-blur-sm transition-opacity duration-300 hover:bg-gray-950/90 group-hover:opacity-100"
                                    >
                                        <FaExternalLinkAlt className="text-[10px]" />
                                        Ver site
                                    </a>
                                )}
                            </div>

                            {/* Project content */}
                            <div className="flex flex-1 flex-col p-5">
                                <h3 className="text-lg font-semibold text-white">
                                    {projeto.nome}
                                </h3>

                                <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-400">
                                    {projeto.descricao}
                                </p>

                                {/* Technologies */}
                                <div className="mt-5 flex flex-wrap gap-1.5">
                                    {projeto.tecnologias.map((tech, i) => (
                                        <span
                                            key={i}
                                            className="inline-flex items-center gap-1.5 rounded-md bg-white/[0.03] px-2.5 py-1 text-xs text-gray-300"
                                            title={tech.nome}
                                        >
                                            <span className={`text-sm ${tech.color}`}>
                                                {tech.icone}
                                            </span>
                                            {tech.nome}
                                        </span>
                                    ))}
                                </div>

                                {/* Footer */}
                                <div className="mt-5 border-t border-white/5 pt-4">
                                    <a
                                        href={projeto.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 text-sm text-gray-400 transition-colors duration-300 hover:text-white"
                                    >
                                        <FaGithub className="text-base" />
                                        Ver repositório
                                    </a>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                {/* Show more/less button */}
                {hasMoreProjects && (
                    <div className="mt-12 text-center">
                        <button
                            onClick={carregarMaisProjetos}
                            className="inline-flex items-center gap-2 rounded-full border border-white/10 px-6 py-3 text-sm font-medium text-gray-300 transition-colors duration-300 hover:border-white/20 hover:text-white"
                        >
                            Ver mais projetos
                            <span className="text-xs text-gray-500">
                                ({projetosMostrados}/{projetos.length})
                            </span>
                        </button>
                    </div>
                )}

                {/* Reset button quando todos visíveis */}
                {!hasMoreProjects && projetosMostrados > projetosPorVez && (
                    <div className="mt-12 text-center">
                        <button
                            onClick={resetarProjetos}
                            className="inline-flex items-center gap-2 rounded-full border border-white/10 px-6 py-3 text-sm font-medium text-gray-300 transition-colors duration-300 hover:border-white/20 hover:text-white"
                        >
                            Ver menos
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}
