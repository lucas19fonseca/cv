import { useRef, useState, useEffect } from "react";
import emailjs from "emailjs-com";

export default function Contato() {
  const form = useRef();
  const [modalAberto, setModalAberto] = useState(false);
  const [modalTipo, setModalTipo] = useState(""); // "sucesso" ou "erro"
  const validarEmail = (email) => {
    // Lista de domínios falsos/temporários comuns
    const dominiosFalsos = [
      'tempmail.com',
      'guerrillamail.com',
      '10minutemail.com',
      'throwaway.email',
      'maildrop.cc',
      'mailinator.com',
      'trashmail.com',
      'yopmail.com',
      'fakeinbox.com',
      'temp-mail.org'
    ];

    // Pega o domínio do email
    const dominio = email.split('@')[1]?.toLowerCase();

    // Verifica se é um domínio falso
    if (dominiosFalsos.includes(dominio)) {
      return false;
    }

    // Verifica padrões suspeitos (emails muito curtos ou aleatórios)
    const parteLocal = email.split('@')[0];

    // Se tem menos de 3 caracteres antes do @
    if (parteLocal.length < 3) {
      return false;
    }

    // Verifica se tem caracteres repetidos demais (ex: aaaa@, bbbb@)
    const caracteresUnicos = new Set(parteLocal.toLowerCase()).size;
    if (caracteresUnicos <= 2 && parteLocal.length > 4) {
      return false;
    }

    return true;
  };

  const enviarEmail = (e) => {
    e.preventDefault();
    const emailInput = form.current.email.value;
    if (!validarEmail(emailInput)) {
      setModalTipo("erro");
      setModalAberto(true);
      return;
    }
    emailjs
      .sendForm("service_ey0v7lf", "template_9pmqr9p", form.current, "3Q1UnYYGtaM4UmNuS")
      .then(() => {
        setModalTipo("sucesso");
        setModalAberto(true);
        form.current.reset();
      })
      .catch((error) => {
        console.log("Erro ao enviar", error);
        setModalTipo("erro");
        setModalAberto(true);
      });
  };

  const fecharModal = () => {
    setModalAberto(false);
  };

  // Fecha o modal automaticamente após 4 segundos
  useEffect(() => {
    if (modalAberto) {
      const timer = setTimeout(() => {
        setModalAberto(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [modalAberto]);
  useEffect(() => {
    if (modalAberto) {
      const timer = setTimeout(() => {
        setModalAberto(false);
      }, 3000); // 4 segundos

      return () => clearTimeout(timer);
    }
  }, [modalAberto]);
  return (
    <div className="flex justify-center pb-5 px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 bg-[#080831] w-full  rounded-xl p-6 gap-8 shadow-[0_0_15px_rgba(0,0,0,0.5)]">
        {/* Contato info */}
        <div className="flex justify-center md:justify-start">
          <div className="text-white ">
            <div className="flex justify-center">
              <h4 className="text-[#ff5403] text-xl md:text-2xl font-Poppin mb-3 mt-6 md:mt-10">
                Entre em contato
              </h4>
            </div>

            {/* Redes sociais */}
            <div className="text-2xl ml-7 flex justify-center gap-4 mb-4 ">
              <a
                href="https://www.instagram.com/lucax.andrade_/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-115 transition duration-500"
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a
                href="https://github.com/lucas19fonseca"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-115 transition duration-500"
              >
                <i className="fab fa-github"></i>
              </a>
              <a
                href="https://www.linkedin.com/in/lucas-andrade-5511022b3/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-115 transition duration-500"
              >
                <i className="fab fa-linkedin"></i>
              </a>
              <a
                href="https://discord.com/channels/@me"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-115 transition duration-500"
              >
                <i className="fab fa-discord"></i>
              </a>
            </div>


            {/* Lista de contatos */}
            <div className="mt-10 md:mt-20 w-full">
              <ul className="space-y-3 text-base md:text-xl ">
                <li>
                  <i className="fas fa-envelope mr-2"></i>lucas19fonseca@gmail.com
                </li>
                <li>
                  <i className="fas fa-phone mr-2"></i>+55 (61) 98346-2252
                </li>
                <li>
                  <i className="fas fa-map-marker-alt mr-2"></i>Brasília, DF
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Formulário */}
        <form
          ref={form}
          onSubmit={enviarEmail}
          className="bg-[#f4f4f4] rounded p-4 space-y-4 w-full"
        >
          <div>
            <label htmlFor="nome" className="block text-sm font-medium text-gray-700">
              Nome
            </label>
            <input
              id="nome"
              type="text"
              name="name"
              placeholder="Seu nome"
              className="w-full bg-white rounded px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#ff5403]"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Seu email"
              className="w-full bg-white rounded px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#ff5403]"
              required
            />
          </div>

          <div>
            <label htmlFor="mensagem" className="block text-sm font-medium text-gray-700">
              Mensagem
            </label>
            <textarea
              id="mensagem"
              name="message"
              placeholder="Digite sua mensagem"
              className="w-full bg-white rounded px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#ff5403] resize-none"
              rows="4"
              required
            ></textarea>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-[#ff5403] text-white rounded-2xl px-6 py-2 font-semibold hover:scale-105 transition duration-400"
            >
              Enviar Mensagem
            </button>
          </div>
        </form>
        {/* Modal */}
        {modalAberto && (
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-10000">
            <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 shadow-2xl transform transition-all">
              <div className="text-center">
                {modalTipo === "sucesso" ? (
                  <>
                    <div className="mb-4">
                      <i className="fas fa-check-circle text-6xl text-green-500"></i>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">
                      Sucesso!
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Sua mensagem foi enviada com sucesso! Entrarei em contato em breve.
                    </p>
                  </>
                ) : (
                  <>
                    <div className="mb-4">
                      <i className="fas fa-times-circle text-6xl text-red-500"></i>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">
                      Ops! Algo deu errado
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Não foi possível enviar sua mensagem. Tente novamente mais tarde.
                    </p>
                  </>
                )}
                <button
                  onClick={fecharModal}
                  className="bg-[#ff5403] text-white px-8 py-2 rounded-lg font-semibold hover:bg-[#e64a03] transition duration-300"
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        )}
        {modalAberto && modalTipo === "erro" && (
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 shadow-2xl transform transition-all">
              <div className="text-center">
                <div className="mb-4">
                  <i className="fas fa-times-circle text-6xl text-red-500"></i>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  Ops! Algo deu errado
                </h3>
                <p className="text-gray-600 mb-6">
                  Não foi possível enviar sua mensagem. Tente novamente mais tarde.
                </p>
                <button
                  onClick={fecharModal}
                  className="bg-[#ff5403] text-white px-8 py-2 rounded-lg font-semibold hover:bg-[#e64a03] transition duration-300"
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
