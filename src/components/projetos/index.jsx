import { useState } from "react";
import { motion } from "framer-motion";
import shelf from "../../assets/projetos/Andrews.png";
import Tw from "../../assets/projetos/tailwclones.png";
import Ponto from "../../assets/projetos/ponto.png";
import Kubo from "../../assets/projetos/kubo-tela.png";
import Reactlb from "../../assets/projetos/react-lab.png";
import Pac from "../../assets/projetos/pacman.png";

import { FaReact, FaNodeJs, FaHtml5, FaCss3Alt, FaJs, FaGithub, FaBootstrap, FaPython } from 'react-icons/fa';
import { SiTailwindcss, SiMongodb } from 'react-icons/si';
import { DiGo } from 'react-icons/di';

export default function Projetos() {
  const [mostrarMais, setMostrarMais] = useState(false);

  const projetos = [
    { 
      nome: "React Labs", 
      img: Reactlb, 
      link: "https://github.com/lucas19fonseca/react-labs",
      descricao: "Todas as minhas atividades do curso de react reunidas em um único lugar.",
      tecnologias: [
        { nome: "HTML", icone: <FaHtml5/> },
        { nome: "CSS", icone: <FaCss3Alt/> },
        { nome: "JavaScript", icone: <FaJs /> },
        { nome: "React", icone: <FaReact/> },
        { nome: "Tailwind", icone: <SiTailwindcss/> }
      ]
    },
    { 
      nome: "Tailclones", 
      img: Tw, 
      link: "https://github.com/lucas19fonseca/tailclones",
      descricao: "Coleção de clones de interfaces populares construídos com Tailwind CSS para fins de estudo.",
      tecnologias: [
        { nome: "React", icone: <FaReact/> },
        { nome: "Tailwind", icone: <SiTailwindcss/> }
      ]
    },
    { 
      nome: "Kubo", 
      img: Kubo, 
      link: "https://github.com/Kubo-Architecture",
      descricao: "Plataforma de arquitetura 3D que permite visualização imersiva de projetos arquitetônicos.",
      tecnologias: [
        { nome: "MongoDB", icone: <SiMongodb/> },
        { nome: "React", icone: <FaReact/> },
        { nome: "Golang", icone: <DiGo/> }
      ]
    },
    { 
      nome: "Andrews shelf", 
      img: shelf, 
      link: "https://github.com/lucas19fonseca/Andrew-s-shelf",
      descricao: "Sistema de gerenciamento de biblioteca pessoal com catalogação de livros e controle de empréstimos.",
      tecnologias: [
        { nome: "JavaScript", icone: <FaJs /> },
        { nome: "CSS", icone: <FaCss3Alt/> },
        { nome: "Bootstrap", icone: <FaBootstrap/> },
        { nome: "HTML", icone: <FaHtml5/> }
      ]
    },
    { 
      nome: "Folha de Ponto", 
      img: Ponto, 
      link: "https://github.com/lucas19fonseca/ponto-eletronico",
      descricao: "Sistema de controle de ponto eletrônico com relatórios e gestão de horas trabalhadas.",
      tecnologias: [
        { nome: "HTML", icone: <FaHtml5/> },
        { nome: "CSS", icone: <FaCss3Alt/> },
        { nome: "JavaScript", icone: <FaJs /> },
      ]
    },
    { 
      nome: "Pac Man", 
      img: Pac, 
      link: "https://github.com/lucas19fonseca/PacSurvivor",
      descricao: "O Minimax ajuda o Pacman a prever movimentos ótimos, maximizando sua pontuação enquanto os fantasmas tentam minimizá-la. Com heurísticas inteligentes e poda Alpha-Beta, o agente toma decisões estratégicas para vencer.",
      tecnologias: [
        { nome: "Python", icone: <FaPython/> },
      ]
    },
  ];

  const projetosParaMostrar = mostrarMais ? projetos : projetos.slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projetosParaMostrar.map((projeto, index) => (
          <motion.div
            key={index}
            className="relative w-full h-[210px] bg-white rounded-2xl shadow-[0_0_15px_rgba(0,0,0,0.3)] overflow-hidden group"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: index * 0.1 }}
          >
            {/* Image container filling 100% without borders */}
            <div className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden">
              <img 
                src={projeto.img} 
                alt={`Imagem do projeto ${projeto.nome}`} 
                className="w-full h-full object-cover" 
              />
              <div className="absolute inset-0 bg-[#080831] opacity-0 group-hover:opacity-90 transition duration-700"></div>
            </div>

            {/* Hover content */}
            <div className="flex flex-col justify-center items-center text-center absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 p-4">
              <motion.h2
                className="text-white text-2xl mb-2 flex items-center gap-3"
                initial={{ y: 30 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {projeto.nome}
                <a 
                  href={projeto.link} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="text-white text-[28px] hover:text-[#afafaf] transition"
                  aria-label={`Link para o repositório do projeto ${projeto.nome}`}
                >
                  <FaGithub />
                </a>
              </motion.h2>
              
              <motion.p 
                className="text-white text-sm text-justify mb-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {projeto.descricao}
              </motion.p>
              
              <motion.div 
                className="flex flex-wrap justify-center gap-3 mt-2 text-white text-2xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {projeto.tecnologias.map((tech, i) => (
                  <div 
                    key={i} 
                    className="flex flex-col items-center group/tech"
                    title={tech.nome}
                  >
                    <div className="hover:text-[#afafaf] transition cursor-default">
                      {tech.icone}
                    </div>
                    <span className="text-xs opacity-0 group-hover/tech:opacity-100 transition">
                      {tech.nome}
                    </span>
                  </div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-center mt-8 gap-4">
        {!mostrarMais ? (
          <motion.button
            onClick={() => setMostrarMais(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#080831] backdrop-blur-lg text-white rounded-3xl px-20 py-1 md:mt-4 text-lg md:text-2xl hover:scale-103 transition duration-500 bg-gradient-to-r from-[#0f0f5c] to-[#080831] hover:from-[#1a1a75] hover:to-[#0f0f5c] flex items-center gap-2"
          >
            Ver mais
          </motion.button>
        ) : (
          <motion.button
            onClick={() => setMostrarMais(false)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#080831] backdrop-blur-lg text-white rounded-3xl px-18 py-1 text-xl hover:scale-103 transition duration-500 bg-gradient-to-r from-[#0f0f5c] to-[#080831] hover:from-[#1a1a75] hover:to-[#0f0f5c] flex items-center gap-2">
            Ver menos
          </motion.button>
        )}
      </div>
    </div>
  );
}