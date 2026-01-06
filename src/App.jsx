import './index.css'
import SobreMim from "./components/SobreMim";
import Tecnologia from "./components/Tecnologias";
import Contato from "./components/Contato";
import Projetos from "./components/projetos";
import Experiencia from "./components/experiencia";
import Hero from "./components/Hero";
import ChatBot from "./components/ChatBot";

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
        <ChatBot />
      </main>
    </div>
  )
}

export default App