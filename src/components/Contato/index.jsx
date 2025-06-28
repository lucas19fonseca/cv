import { useRef } from "react";
import emailjs from "emailjs-com";

export default function Contato() {
  const form = useRef();

  const enviarEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("service_ey0v7lf", "template_9pmqr9p", form.current, "3Q1UnYYGtaM4UmNuS")
      .then(() => {
        alert("Mensagem enviada com sucesso!");
        form.current.reset();
      })
      .catch((error) => {
        console.log("Erro ao enviar", error);
        alert("Erro ao enviar mensagem.");
      });
  };

  return (
    <div className="flex justify-center pb-5 ">
      <div className="grid grid-cols-1 md:grid-cols-2 bg-[#080831] w-full max-w-6xl rounded-xl p-6 gap-8">
        {/* Contato info */}
        <div className="flex justify-center">
          <div className="text-white">
            <h4 className="text-[#ff5403] text-xl md:text-2xl font-Poppin mb-3 mt-6 md:mt-10 md:ml-29">
              Entre em contato
            </h4>

            {/* Redes sociais */}
            <div className="text-2xl ml-7 md:ml-36 flex gap-4 mb-4">
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
            <div className="mt-10 md:mt-20 md:mr-45 ">
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
      </div>
    </div>
  );
}
