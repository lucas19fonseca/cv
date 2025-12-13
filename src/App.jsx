import { useEffect } from 'react';
import { gsap } from 'gsap';
import './index.css'
import SobreMim from "./components/SobreMim/index";
import Tecnologia from "./components/Tecnologias/index";
import Certificados from "./components/Certificados/index";
import Contato from "./components/Contato/index";
import Projetos from "./components/projetos/index";
import Experiencia from "./components/experiencia/index";
import Hero from "./components/Hero/index";

function App() {
  useEffect(() => {
    // Animação de entrada do conteúdo principal
    gsap.fromTo('main',
      {
        opacity: 0,
        y: 20
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.3 // Pequeno delay para carregamento
      }
    );

    // Animação sequencial das seções (opcional)
    gsap.utils.toArray('section').forEach((section, i) => {
      gsap.fromTo(section,
        {
          opacity: 0,
          y: 30
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );
    });
  }, []);

  return (
    <div>
      <main className="min-w-[301px]">
        <Hero />
        <SobreMim />
        <Tecnologia />
        <Projetos />
        <Experiencia />
        <Certificados />
        <Contato />
      </main>
    </div>
  )
}

export default App