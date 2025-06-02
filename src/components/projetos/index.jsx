import { useState } from "react";
import { motion } from "framer-motion";
import shelf from "../../assets/projetos/Andrews.png";
import Cuidado from "../../assets/projetos/cuidado-simples.png";
import Tw from "../../assets/projetos/tailwclones.png";
import Ponto from "../../assets/projetos/ponto.png";
import Kubo from "../../assets/projetos/kubo-tela.png";

export default function Projetos() {
  const [mostrarMais, setMostrarMais] = useState(false);

  const projetos = [
    { nome: "Cuidado Simples", img: Cuidado, link: "https://github.com/lucas19fonseca/cuidado-simples" },
    { nome: "Tailclones", img: Tw, link: "https://github.com/lucas19fonseca/cuidado-simples" },
    { nome: "Kubo", img: Kubo, link: "https://github.com/lucas19fonseca/cuidado-simples" },
    { nome: "Andrews shelf", img: shelf, link: "https://github.com/lucas19fonseca/cuidado-simples" },
    { nome: "Folha de Ponto", img: Ponto, link: "https://github.com/lucas19fonseca/cuidado-simples" },
  ];

  const projetosParaMostrar = mostrarMais ? projetos : projetos.slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projetosParaMostrar.map((projeto, index) => (
          <motion.div
            key={index}
            className="relative w-full h-[200px] bg-white rounded-2xl shadow-[0_0_15px_rgba(0,0,0,0.3)] overflow-hidden group"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: index * 0.1 }}
          >
            {/* Imagem */}
            <div className="absolute top-0 left-0 w-full h-full rounded-2xl overflow-hidden">
              <img src={projeto.img} alt="" className="w-full h-full object-cover rounded-2xl" />
              <div className="absolute top-0 left-0 w-full h-full bg-[#080831] opacity-0 group-hover:opacity-100 transition duration-500"></div>
            </div>

            {/* Conteúdo no hover */}
            <div className="flex flex-col justify-center items-center text-center absolute top-0 left-0 w-full h-full opacity-0 group-hover:opacity-100 transition-all duration-500 p-4">
              <motion.h2
                className="text-white text-2xl mb-4 flex items-center gap-3"
                initial={{ y: 30 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {projeto.nome}
                <a href={projeto.link} target="_blank" rel="noreferrer" className="text-white text-[28px] hover:text-[#afafaf] transition">
                  <i className="fab fa-github"></i>
                </a>
              </motion.h2>
              <p className="text-white text-base text-justify">Conheça o projeto completo no GitHub.</p>
              <div className="flex justify-center gap-6 mt-4 text-white text-[28px]">
                <i className="fab fa-css3-alt hover:text-[#afafaf] transition"></i>
                <i className="fab fa-html5 hover:text-[#afafaf] transition"></i>
              </div>
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
