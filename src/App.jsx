import { useEffect } from 'react';
import { gsap } from 'gsap';
import './index.css'
import SobreMim from "./components/SobreMim/index";
import Tecnologia from "./components/Tecnologias/index";
import Contato from "./components/Contato/index";
import Projetos from "./components/projetos/index";
import Experiencia from "./components/experiencia/index";
import Hero from "./components/Hero/index";

function App() {

  return (
    <div>
      <main className="min-w-[301px]">
        <Hero />
        <SobreMim />
        <Tecnologia />
        <Projetos />
        <Experiencia />
        <Contato />
      </main>
    </div>
  )
}

export default App