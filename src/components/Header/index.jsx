import { useEffect, useRef } from 'react';
import { gsap } from "gsap";

export default function Header() {

  const headerRef = useRef(null);

  useEffect(() => {

    // === ANIMAÇÃO DO HEADER ===
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        y: -20,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.5
      });
    });
    

    // === BOTÃO DE VOLTAR AO TOPO ===
    const button = document.getElementById('lucas');
    if (button) {
      button.addEventListener('click', () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    }

    // === ROLAGEM SUAVE PARA ÂNCORAS ===
    const anchors = document.querySelectorAll('a[href^="#"]');
    anchors.forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href && href.startsWith("#")) {
          e.preventDefault();
          const targetElement = document.querySelector(href);
          if (targetElement) {
            window.scrollTo({
              top: targetElement.offsetTop - 115,
              behavior: 'smooth'
            });
          }
        }
      });
    });

    // === CLEANUP ===
    return () => {
      ctx.revert(); // Remove a animação corretamente

      if (button) {
        button.removeEventListener('click', () => { });
      }

      anchors.forEach(anchor => {
        anchor.removeEventListener('click', () => { });
      });
    }

  }, []);


  return (
    <header
      ref={headerRef}  // <-- A animação é aplicada aqui!
      className='bg-[#080831d9] backdrop-blur-md text-white text-2xl fixed w-full py-4 px-8 font-medium z-100 hidden
      sm:text-sm
      md:text-2xl lg:block'
    >
      <div className='flex flex-row justify-between'>
        <div>
          <a id="lucas" href="#Lucas Andrade Fonseca" className='hover:text-[#ff5403] border-b-2 border-transparent hover:border-white transition duration-600'>
            Lucas Andrade Fonseca
          </a>
        </div>
        <nav>
          <ul className='flex gap-9'>
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
            <li>
              <a href="#contato" className='hover:text-[#ff5403] border-b-2 border-transparent hover:border-white transition duration-600'>
                Contato
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
