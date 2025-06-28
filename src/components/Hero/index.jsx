import FotoLucas from "../../assets/comum/lucas.jpg";
import curriculo from "../../assets/comum/curriculo.pdf";
import Wave from "../Wave/index.jsx";

export default function Hero() {
    return (
        <div className="bg-[#080831] min-h-screen flex flex-col relative overflow-hidden">
            {/* Conteúdo principal */}
            <div className="flex-grow flex items-center justify-center pt-16 pb-32 md:pt-0 md:pb-0">
                <div className="container mx-auto px-4">
                    {/* Layout Mobile - Coluna única */}
                    <div className="md:hidden flex flex-col items-center space-y-8 text-center">
                        {/* Ícones sociais - Mobile primeiro */}
                        <ul className="flex justify-center gap-5 text-3xl text-white">
                            <li className="hover:scale-110 transition duration-300">
                                <a href="https://www.instagram.com/lucax.andrade_/" target="_blank" rel="noopener noreferrer">
                                    <i className="fa-brands fa-instagram"></i>
                                </a>
                            </li>
                            <li className="hover:scale-110 transition duration-300">
                                <a href="https://github.com/lucas19fonseca" target="_blank" rel="noopener noreferrer">
                                    <i className="fa-brands fa-github"></i>
                                </a>
                            </li>
                            <li className="hover:scale-110 transition duration-300">
                                <a href="https://www.linkedin.com/in/lucas-andrade-5511022b3/" target="_blank" rel="noopener noreferrer">
                                    <i className="fa-brands fa-linkedin"></i>
                                </a>
                            </li>
                            <li className="hover:scale-110 transition duration-300">
                                <a href="https://discord.com/channels/@me" target="_blank" rel="noopener noreferrer">
                                    <i className="fa-brands fa-discord"></i>
                                </a>
                            </li>
                        </ul>

                        {/* Foto - Mobile */}
                        <div className="flex justify-center">
                            <img 
                                src={FotoLucas} 
                                alt="Foto Lucas" 
                                className="rounded-full w-64 h-64 object-cover"
                            />
                        </div>

                        {/* Nome - Mobile */}
                        <h1 className="text-4xl font-medium text-white">
                            Olá! Eu sou o <span className="text-[#0969CC] font-semibold bg-gradient-to-r from-[#0969CC] to-[#b7cce2] bg-clip-text text-transparent">Lucas Andrade</span>
                        </h1>
                        
                        {/* Curso - Mobile */}
                        <p className="text-white text-xl px-4">
                            Tenho 20 anos, sou estudante de <span className="text-[#0969CC] font-semibold bg-gradient-to-r from-[#0969CC] to-[#b7cce2] bg-clip-text text-transparent">Ciências da Computação!</span>
                        </p>
                        
                        {/* Botão - Mobile */}
                        <div>
                            <a
                                href={curriculo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-white text-black rounded-full px-8 py-2 text-xl font-medium hover:scale-110 transition duration-700 inline-block"
                            > 
                                Currículo
                            </a>
                        </div>
                    </div>

                    {/* Layout Desktop - Grid */}
                    <div className="hidden md:grid grid-cols-2 items-center gap-8">
                        {/* Conteúdo do lado esquerdo - Desktop */}
                        <div className="space-y-6 text-center md:text-left">
                            {/* Ícones sociais - Desktop */}
                            <ul className="flex justify-center gap-5 text-4xl text-white md:justify-center md:mr-16">
                                <li className="hover:scale-110 transition duration-300">
                                    <a href="https://www.instagram.com/lucax.andrade_/" target="_blank" rel="noopener noreferrer">
                                        <i className="fa-brands fa-instagram"></i>
                                    </a>
                                </li>
                                <li className="hover:scale-110 transition duration-300">
                                    <a href="https://github.com/lucas19fonseca" target="_blank" rel="noopener noreferrer">
                                        <i className="fa-brands fa-github"></i>
                                    </a>
                                </li>
                                <li className="hover:scale-110 transition duration-300">
                                    <a href="https://www.linkedin.com/in/lucas-andrade-5511022b3/" target="_blank" rel="noopener noreferrer">
                                        <i className="fa-brands fa-linkedin"></i>
                                    </a>
                                </li>
                                <li className="hover:scale-110 transition duration-300">
                                    <a href="https://discord.com/channels/@me" target="_blank" rel="noopener noreferrer">
                                        <i className="fa-brands fa-discord"></i>
                                    </a>
                                </li>
                            </ul>
                            
                            {/* Nome - Desktop */}
                            <h1 className="text-6xl font-medium text-white md:w-100 md:ml-25">
                                Olá! Eu sou o <span className="text-[#0969CC] font-semibold bg-gradient-to-r from-[#0969CC] to-[#b7cce2] bg-clip-text text-transparent">Lucas Andrade</span>
                            </h1>
                            
                            {/* Curso - Desktop */}
                            <p className="text-white text-2xl md:w-158">
                                Tenho 20 anos, sou estudante de <span className="text-[#0969CC] font-semibold bg-gradient-to-r from-[#0969CC] to-[#b7cce2] bg-clip-text text-transparent">Ciências da Computação!</span>
                            </p>
                            
                            {/* Botão - Desktop */}
                            <div className="pt-6 w-full flex justify-center">
                                <a
                                    href={curriculo}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group relative bg-gradient-to-r from-white to-gray-100 text-black rounded-full px-12 py-2 text-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-500 inline-flex items-center gap-4 border-2 border-transparent hover:border-white/20 backdrop-blur-sm"
                                > 
                                    <span className="relative z-10">Currículo</span>
                                    <i className="fa-solid fa-download  group-hover:translate-y-[-2px] transition-transform duration-300"></i>
                                    <div className="absolute inset-0 bg-gradient-to-r from-[#0969CC]/10 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </a>
                            </div>
                        </div>

                        {/* Imagem do lado direito - Desktop */}
                        <div className="flex justify-center md:justify-end">
                            <img 
                                src={FotoLucas} 
                                alt="Foto Lucas" 
                                className="rounded-full w-[23rem] h-[23rem] object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Wave sempre no bottom */}
            <div className="absolute bottom-0 w-full">
                <Wave />
            </div>
        </div>
    );
}