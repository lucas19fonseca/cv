import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactCert from "../../assets/certificados/react-curso.png";
import Py from "../../assets/certificados/py.jpeg";
import Js from "../../assets/certificados/java.jpeg";
import Git from "../../assets/certificados/git-certificado.png";
import Tw from "../../assets/certificados/curso-tw.jpg";

export default function Certificados() {
  const [mostrarMais, setMostrarMais] = useState(false);
  const [imagemModal, setImagemModal] = useState(null);

  const abrirModal = (img) => {
    setImagemModal(img);
  };

  const fecharModal = () => {
    setImagemModal(null);
  };

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-8 mt-10">
        <motion.button onClick={() => abrirModal(ReactCert)}>
          <img
            src={ReactCert}
            alt="curso react"
            className="w-full cursor-pointer shadow-[0_0_15px_rgba(0,0,0,0.3)] rounded-lg"
          />
        </motion.button>

        <motion.button onClick={() => abrirModal(Py)}>
          <img
            src={Py}
            alt="Curso Python"
            className="w-full cursor-pointer shadow-[0_0_15px_rgba(0,0,0,0.3)] rounded-lg"
          />
        </motion.button>

        <motion.button onClick={() => abrirModal(Git)}>
          <img
            src={Git}
            alt="curso Git"
            className="w-full cursor-pointer shadow-[0_0_15px_rgba(0,0,0,0.3)] rounded-lg"
          />
        </motion.button>

        <AnimatePresence>
          {mostrarMais && (
            <motion.div
              className="col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.4 }}
            >
              <motion.button onClick={() => abrirModal(Js)}>
                <img
                  src={Js}
                  alt="curso JavaScript"
                  className="w-full cursor-pointer shadow-[0_0_15px_rgba(0,0,0,0.3)] rounded-lg"
                />
              </motion.button>

              <motion.button onClick={() => abrirModal(Tw)}>
                <img
                  src={Tw}
                  alt="curso Tailwind"
                  className="w-full cursor-pointer shadow-[0_0_15px_rgba(0,0,0,0.3)] rounded-lg"
                />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex justify-center mt-10">
        <motion.button
          onClick={() => setMostrarMais(!mostrarMais)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-[#080831] backdrop-blur-lg text-white rounded-3xl px-18 py-1 text-lg md:text-xl hover:scale-103 transition duration-500 bg-gradient-to-r from-[#0f0f5c] to-[#080831] hover:from-[#1a1a75] hover:to-[#0f0f5c] flex items-center gap-2"
        >
          {mostrarMais ? <>ver menos</> : <>ver mais</>}
        </motion.button>
      </div>

      <AnimatePresence>
        {imagemModal && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="relative">
              <button
                onClick={fecharModal}
                className="absolute top-[-30px] right-[-30px] text-white text-3xl font-bold"
              >
                &times;
              </button>
              <motion.img
                src={imagemModal}
                alt="certificado ampliado"
                className="max-w-[90vw] max-h-[80vh] rounded-xl shadow-lg"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
