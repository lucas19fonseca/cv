import FotoLucas from "../../assets/comum/lucas.jpg";
import curriculo from "../../assets/comum/curriculo.pdf"
import Wave from "../Wave/index.jsx"


export default function hero(){
    return(
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
        
        
                    <div className="flex justify-center mr-34 lg:mr:20">
                      <a
                        href={curriculo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className=" bg-white text-black rounded-3xl px-15 font-medium py-2 inline-block text-xl hover:scale-107 transition duration-500"
                      > 
                        Currículo
                      </a>
                    </div>
        
                  </div>
        
                  <div className="flex justify-center">
                    <img src={FotoLucas} alt="Foto Lucas" className=" object-cover rounded-full h-10 md:h-90 md:w-90 md:ml-40" />
                  </div>
                </div>
                <Wave/>
              </div>
    );
}