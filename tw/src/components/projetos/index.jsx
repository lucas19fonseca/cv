import shelf from "../../assets/projetos/Andrews.png"
import Cuidado from "../../assets/projetos/cuidado-simples.png"
import Tw from "../../assets/projetos/tailwclones.png"
import Ponto from "../../assets/projetos/ponto.png"
import Kubo from "../../assets/projetos/kubo-tela.png"



export default function Projetos() {
    return (
        <div className="grid grid-cols-3 ">
            {/*cuidado simples*/}
            <div class="relative w-[400px] h-[200px] bg-white rounded-2xl shadow-lg transition duration-300 ease-in-out hover:bg-white overflow-hidden group">
                <div class="absolute top-0 left-0 w-full h-full transition duration-500 z-10 rounded-2xl overflow-hidden">
                    <img src={Cuidado} alt="" class="w-full h-full object-cover rounded-2xl" />
                    <div class="absolute top-0 left-0 w-full h-full bg-[#080831] opacity-0 transition duration-500 group-hover:opacity-100 rounded-2xl"></div>
                </div>

                <div class="flex flex-col absolute bottom-0 w-full text-center h-0 overflow-hidden transition-all duration-500 z-20 group-hover:h-[260px] p-4">
                    <h2 class="text-white text-2xl flex items-center justify-center gap-4">
                        Cuidado Simples
                        <a href="https://github.com/lucas19fonseca/cuidado-simples" target="_blank" class="text-white text-[28px] hover:text-[#afafaf] transition">
                            <i class="fab fa-github"></i>
                        </a>
                    </h2>
                    <p class="text-white text-base text-justify mt-4">Conheça o cuidado simples...</p>
                    <div class="flex justify-center gap-6 mt-4 text-white text-[28px]">
                        <i class="fab fa-css3-alt hover:text-[#afafaf] transition"></i>
                        <i class="fab fa-html5 hover:text-[#afafaf] transition"></i>
                    </div>
                </div>
            </div>
{/*tailclone*/}
           <div class="relative w-[400px] h-[200px] bg-white rounded-2xl shadow-lg transition duration-300 ease-in-out hover:bg-white overflow-hidden group">
                <div class="absolute top-0 left-0 w-full h-full transition duration-500 z-10 rounded-2xl overflow-hidden">
                    <img src={Tw} alt="" class="w-full h-full object-cover rounded-2xl" />
                    <div class="absolute top-0 left-0 w-full h-full bg-[#080831] opacity-0 transition duration-500 group-hover:opacity-100 rounded-2xl"></div>
                </div>

                <div class="flex flex-col absolute bottom-0 w-full text-center h-0 overflow-hidden transition-all duration-500 z-20 group-hover:h-[260px] p-4">
                    <h2 class="text-white text-2xl flex items-center justify-center gap-4">
                        tailclones
                        <a href="https://github.com/lucas19fonseca/cuidado-simples" target="_blank" class="text-white text-[28px] hover:text-[#afafaf] transition">
                            <i class="fab fa-github"></i>
                        </a>
                    </h2>
                    <p class="text-white text-base text-justify mt-4">Conheça o cuidado simples...</p>
                    <div class="flex justify-center gap-6 mt-4 text-white text-[28px]">
                        <i class="fab fa-css3-alt hover:text-[#afafaf] transition"></i>
                        <i class="fab fa-html5 hover:text-[#afafaf] transition"></i>
                    </div>
                </div>
            </div>
{/*kubo*/}
            <div class="relative w-[400px] h-[200px] bg-white rounded-2xl shadow-lg transition duration-300 ease-in-out hover:bg-white overflow-hidden group">
                <div class="absolute top-0 left-0 w-full h-full transition duration-500 z-10 rounded-2xl overflow-hidden">
                    <img src={Kubo} alt="" class="w-full h-full object-cover rounded-2xl" />
                    <div class="absolute top-0 left-0 w-full h-full bg-[#080831] opacity-0 transition duration-500 group-hover:opacity-100 rounded-2xl"></div>
                </div>

                <div class="flex flex-col absolute bottom-0 w-full text-center h-0 overflow-hidden transition-all duration-500 z-20 group-hover:h-[260px] p-4">
                    <h2 class="text-white text-2xl flex items-center justify-center gap-4">
                        Kubo
                        <a href="https://github.com/lucas19fonseca/cuidado-simples" target="_blank" class="text-white text-[28px] hover:text-[#afafaf] transition">
                            <i class="fab fa-github"></i>
                        </a>
                    </h2>
                    <p class="text-white text-base text-justify mt-4">Conheça o cuidado simples...</p>
                    <div class="flex justify-center gap-6 mt-4 text-white text-[28px]">
                        <i class="fab fa-css3-alt hover:text-[#afafaf] transition"></i>
                        <i class="fab fa-html5 hover:text-[#afafaf] transition"></i>
                    </div>
                </div>
            </div>
{/*Andrew shelf*/}
               <div class="relative w-[400px] h-[200px] bg-white rounded-2xl shadow-lg transition duration-300 ease-in-out hover:bg-white overflow-hidden group">
                <div class="absolute top-0 left-0 w-full h-full transition duration-500 z-10 rounded-2xl overflow-hidden">
                    <img src={shelf} alt="" class="w-full h-full object-cover rounded-2xl" />
                    <div class="absolute top-0 left-0 w-full h-full bg-[#080831] opacity-0 transition duration-500 group-hover:opacity-100 rounded-2xl"></div>
                </div>

                <div class="flex flex-col absolute bottom-0 w-full text-center h-0 overflow-hidden transition-all duration-500 z-20 group-hover:h-[260px] p-4">
                    <h2 class="text-white text-2xl flex items-center justify-center gap-4">
                        Andrews shelf
                        <a href="https://github.com/lucas19fonseca/cuidado-simples" target="_blank" class="text-white text-[28px] hover:text-[#afafaf] transition">
                            <i class="fab fa-github"></i>
                        </a>
                    </h2>
                    <p class="text-white text-base text-justify mt-4">Conheça o cuidado simples...</p>
                    <div class="flex justify-center gap-6 mt-4 text-white text-[28px]">
                        <i class="fab fa-css3-alt hover:text-[#afafaf] transition"></i>
                        <i class="fab fa-html5 hover:text-[#afafaf] transition"></i>
                    </div>
                </div>
            </div>
{/*ponto*/}
             <div class="relative w-[400px] h-[200px] bg-white rounded-2xl shadow-lg transition duration-300 ease-in-out hover:bg-white overflow-hidden group">
                <div class="absolute top-0 left-0 w-full h-full transition duration-500 z-10 rounded-2xl overflow-hidden">
                    <img src={Ponto} alt="" class="w-full h-full object-cover rounded-2xl" />
                    <div class="absolute top-0 left-0 w-full h-full bg-[#080831] opacity-0 transition duration-500 group-hover:opacity-100 rounded-2xl"></div>
                </div>

                <div class="flex flex-col absolute bottom-0 w-full text-center h-0 overflow-hidden transition-all duration-500 z-20 group-hover:h-[260px] p-4">
                    <h2 class="text-white text-2xl flex items-center justify-center gap-4">
                        Ponto
                        <a href="https://github.com/lucas19fonseca/cuidado-simples" target="_blank" class="text-white text-[28px] hover:text-[#afafaf] transition">
                            <i class="fab fa-github"></i>
                        </a>
                    </h2>
                    <p class="text-white text-base text-justify mt-4">Conheça o cuidado simples...</p>
                    <div class="flex justify-center gap-6 mt-4 text-white text-[28px]">
                        <i class="fab fa-css3-alt hover:text-[#afafaf] transition"></i>
                        <i class="fab fa-html5 hover:text-[#afafaf] transition"></i>
                    </div>
                </div>
            </div>
        </div>

    );
}