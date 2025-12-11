import './index.css'
import SobreMim from "./components/SobreMim/index";
import Tecnologia from "./components/Tecnologias/index";
import Certificados from "./components/Certificados/index";
import Contato from "./components/Contato/index";
import Projetos from "./components/projetos/index";
import Experiencia from "./components/experiencia/experiencia";
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
        <Certificados />
        <Contato />
      </main>
    </div>
  )
}

export default App
