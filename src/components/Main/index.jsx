import FotoLucas from "../../assets/lucas.jpg";
import SobreMim from "../../components/SobreMim/index"
import Tecnologia from "../Tecnologias/index";
import Certificados from "../Certificados/index";
import Contato from "../Contato/index";
import Projetos from "../projetos/index";
import curriculo from "../../assets/curriculo.pdf"
import Wave from "../Wave/index"

export default function Main() {
  return (
    <main className=" bg-[#f4f4f4]">
      <div className="bg-[#080831] h-screen md:pt-40 overflow-hidden">
        <div className="grid grid-cols-2">
          <div className="md:pl-35 md:space-y-6 md:pt-5">
            <div>
              <ul className="flex justify-center md:justify-start gap-5 text-3xl md:text-4xl md:pl-18 text-white">
                <li>
                  <a href="https://www.instagram.com/lucax.andrade_/" target="_blank" rel="noopener noreferrer">
                    <i className="fa-brands fa-instagram hover:scale-125 transition duration-500"></i>
                  </a>
                </li>
                <li>
                  <a href="https://github.com/lucas19fonseca" target="_blank" rel="noopener noreferrer">
                    <i className="fa-brands fa-github hover:scale-125 transition duration-500"></i>
                  </a>
                </li>
                <li>
                  <a href="https://www.linkedin.com/in/lucas-andrade-5511022b3/" target="_blank" rel="noopener noreferrer">
                    <i className="fa-brands fa-linkedin hover:scale-125 transition duration-500"></i>
                  </a>
                </li>
                <li>
                  {/* arrumar link discord*/}
                  <a href="https://discord.com/channels/@me" target="_blank" rel="noopener noreferrer">
                    <i className="fa-brands fa-discord hover:scale-125 transition duration-500"></i>
                  </a>
                </li>
              </ul>
            </div>

            <div className="md:text-6xl md:w-100">
              <p className="text-white md:font-medium leading-18">Olá! Eu sou o <span className="text-blue-300">Lucas Andrade</span></p>
            </div>

            <div className="flex md:w-160 md:-ml-20">
              <p className=" text-white md:text-2xl ">
                Tenho 20 anos, sou estudante de <span className="text-blue-300">Ciências da Computação!</span>
              </p>
            </div>


            <div className="flex justify-center mr-34">
              <a
                href={curriculo}
                target="_blank"
                rel="noopener noreferrer"
                className=" bg-white text-black rounded-3xl px-15 font-medium py-2 inline-block text-xl hover:scale-110 transition duration-500"
              > 
                Currículo
              </a>
            </div>

          </div>

          <div className="flex justify-center">
            <img src={FotoLucas} alt="Foto Lucas" className=" object-cover rounded-full h-10 md:h-90 md:w-90 md:ml-40" />
          </div>
          
        </div>
      </div>
      <div className="w-full flex justify-center md:pt-8">
        <h1 className="font-medium md:text-2xl" id="sobre-mim">Sobre Mim</h1>
      </div>
      <SobreMim />
      <div className="w-full flex justify-center md:pt-6 md:pb-8">
        <h1 className="font-medium md:text-2xl" id="tecnologias">Tecnologias</h1>
      </div>
      <Tecnologia/>
      <div className="w-full flex justify-center md:pt-6 md:pb-8">
        <h1 className="font-medium md:text-2xl" id="projetos">Projetos</h1>
      </div>
      <Projetos/>
      <div className="w-full flex justify-center md:pt-6 md:pb-8">
        <h1 className="font-medium md:text-2xl" id="certificados">Certificados</h1>
      </div>
        <Certificados/>
      <div className="w-full flex justify-center md:pt-6 md:pb-8">
        <h1 className="font-medium md:text-2xl" id="contato">Contato</h1>
      </div>
      <Contato/>
    </main >
  );
}
