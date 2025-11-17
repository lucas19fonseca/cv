import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import FotoLucas from "../../assets/comum/lucas.jpg";
import curriculo from "../../assets/comum/Lucas_Andrade_web_junior.pdf";
import Wave from "../Wave/index.jsx";

export default function Hero() {

    const heroRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(heroRef.current, {
                y: 30,
                opacity: 0,
                duration: 1,
                delay: 0.2,
                ease: "power3.out"
            });
        });

        return () => ctx.revert();
    }, []);



    return (
        <div className="bg-[#080831] min-h-screen flex flex-col relative overflow-hidden ">

            {/* Conteúdo principal */}
            <div
                ref={heroRef}
                className="flex-grow flex items-center justify-center pt-16 pb-32 lg:pt-0 lg:pb-0"
            >
                <div className="container mx-auto px-4">

                    {/* Layout Mobile/Tablet */}
                    <div className="lg:hidden flex flex-col items-center space-y-8 text-center">

                        {/* Ícones sociais */}
                        <div className="w-full flex justify-center">
                            <ul className="flex justify-center gap-5 text-3xl md:text-4xl text-white">
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
                        </div>

                        {/* Foto */}
                        <div className="flex justify-center w-full">
                            <img
                                src={FotoLucas}
                                alt="Foto Lucas"
                                className="rounded-full w-64 h-64 md:w-80 md:h-80 object-cover"
                            />
                        </div>

                        {/* Nome */}
                        <div className="w-full flex justify-center">
                            <h1 className="text-4xl md:text-5xl font-medium text-white">
                                Olá! Eu sou o <span className="text-[#0969CC] font-semibold bg-gradient-to-r from-[#0969CC] to-[#b7cce2] bg-clip-text text-transparent">Lucas Andrade</span>
                            </h1>
                        </div>

                        {/* Curso */}
                        <div className="w-full flex justify-center">
                            <p className="text-white text-xl md:text-2xl px-4">
                                Tenho 20 anos, sou estudante de <span className="text-[#0969CC] font-semibold bg-gradient-to-r from-[#0969CC] to-[#b7cce2] bg-clip-text text-transparent">Ciências da Computação!</span>
                            </p>
                        </div>

                        {/* Botão */}
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

                    {/* Layout Desktop */}
                    <div className="hidden lg:grid grid-cols-2 items-center gap-8">

                        {/* Texto lado esquerdo */}
                        <div className="space-y-6 text-center lg:text-left">
                            <div className="w-full flex justify-center">
                                <ul className="flex justify-center gap-5 text-4xl text-white lg:justify-center lg:mr-16">
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
                            </div>

                            <div className="w-full flex justify-center">
                                <h1 className="text-6xl font-medium text-white">
                                    Olá! Eu sou o <br />
                                    <span className="text-[#0969CC] font-semibold bg-gradient-to-r from-[#0969CC] to-[#b7cce2] bg-clip-text text-transparent">Lucas Andrade</span>
                                </h1>
                            </div>

                            <div className="w-full flex justify-center lg:w-160">
                                <p className="text-white text-2xl ">
                                    Tenho 20 anos, sou estudante de <span className="text-[#0969CC] font-semibold bg-gradient-to-r from-[#0969CC] to-[#b7cce2] bg-clip-text text-transparent">Ciências da Computação!</span>
                                </p>
                            </div>

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

                        {/* Foto lado direito */}
                        <div className="flex justify-center lg:justify-end">
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