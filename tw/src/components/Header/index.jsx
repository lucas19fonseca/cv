import curriculo from "../../assets/curriculo.pdf"
export default function Header() {
  return (
    <header className='bg-[#080831d9] backdrop-blur-md text-white text-2xl fixed w-full py-4 px-8 font-medium not-sm:hidden z-100'>
      <div className='flex flex-row justify-between'>
        <div>
          <a href="#Lucas Andrade Fonseca" className='hover:text-[#ff5403] border-b-2 border-transparent hover:border-white transition duration-600'>
            Lucas Andrade Fonseca
          </a>
        </div>
        <nav>
          <ul className='flex gap-9'>
            <li>
              <a
                href={curriculo}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#ff5403] border-b-2 border-transparent hover:border-white transition duration-600"
              > 
                Currículo
              </a>
            </li>

            <li>
              <a href="#sobre-mim" className='hover:text-[#ff5403] border-b-2 border-transparent hover:border-white transition duration-600'>
                Sobre mim
              </a>
            </li>
            <li>
              <a href="#tecnologias" className='hover:text-[#ff5403] border-b-2 border-transparent hover:border-white transition duration-600'>
                Tecnologias
              </a>
            </li>
            <li>
              <a href="#projetos" className='hover:text-[#ff5403] border-b-2 border-transparent hover:border-white transition duration-600'>
                Projetos
              </a>
            </li>
            <li>
              <a href="#certificados" className='hover:text-[#ff5403] border-b-2 border-transparent hover:border-white transition duration-600'>
                Certificados
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
