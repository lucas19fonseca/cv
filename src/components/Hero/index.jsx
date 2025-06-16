import FotoLucas from "../../assets/comum/lucas.jpg";
import curriculo from "../../assets/comum/curriculo.pdf";
import Wave from "../Wave/index.jsx";

export default function Hero() {
    return (
        <div className="bg-[#080831] h-screen flex flex-col overflow-hidden">
            {/* Conteúdo principal */}
            <div className="flex-grow flex items-center pt-16 md:pt-0">
                <div className="container mx-auto px-4">
                    <div className="md:grid grid-cols-2 items-center gap-8">
                        {/* Conteúdo do lado esquerdo */}
                        <div className="space-y-6 text-center md:text-left">
                            {/* Ícones sociais */}
                            <ul className="flex justify-center gap-5 text-3xl text-white
                            md:justify-center md:mr-16 md:text-4xl
                            ">
                                <li>
                                    <a href="https://www.instagram.com/lucax.andrade_/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-300 transition-colors">
                                        <i className="fa-brands fa-instagram"></i>
                                    </a>
                                </li>
                                <li>
                                    <a href="https://github.com/lucas19fonseca" target="_blank" rel="noopener noreferrer" className="hover:text-blue-300 transition-colors">
                                        <i className="fa-brands fa-github"></i>
                                    </a>
                                </li>
                                <li>
                                    <a href="https://www.linkedin.com/in/lucas-andrade-5511022b3/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-300 transition-colors">
                                        <i className="fa-brands fa-linkedin"></i>
                                    </a>
                                </li>
                                <li>
                                    <a href="https://discord.com/channels/@me" target="_blank" rel="noopener noreferrer" className="hover:text-blue-300 transition-colors">
                                        <i className="fa-brands fa-discord"></i>
                                    </a>
                                </li>
                            </ul>
                            
                            {/* Textos e botão */}
                            <h1 className="text-4xl font-medium text-white
                            md:text-6xl md:w-100 md:ml-25
                            ">
                                Olá! Eu sou o <span className="text-blue-300">Lucas Andrade</span>
                            </h1>
                            
                            <p className="text-white text-xl 
                            md:text-2xl md:w-156
                            ">
                                Tenho 20 anos, sou estudante de <span className="text-blue-300">Ciências da Computação!</span>
                            </p>
                            
                            <div className="pt-4 w-full flex justify-center -ml-6">
                                <a
                                    href={curriculo}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-white text-black rounded-full px-8 py-2 text-xl font-medium hover:scale-105 transition duration-300 inline-block
                                    md:px-15
                                    "
                                > 
                                    Currículo
                                </a>
                            </div>
                        </div>

                        {/* Imagem do lado direito */}
                        <div className="flex justify-center md:justify-end mt-10 md:mt-0">
                            <img 
                                src={FotoLucas} 
                                alt="Foto Lucas" 
                                className="rounded-full w-64 h-64 md:w-[23rem] md:h-[23rem] object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Wave posicionada na base */}
            <div className="relative w-full mt-auto">
                <div className="absolute bottom-0 w-full">
                    <Wave />
                </div>
            </div>
        </div>
    );
}