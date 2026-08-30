import './index.css'
import SobreMim from "./components/SobreMim";
import Projetos from "./components/projetos";
import Experiencia from "./components/experiencia";
import Hero from "./components/Hero";
import EstimadorProjeto from "./components/EstimadorProjeto";
import ChatBot from "./components/ChatBot";

function App() {

  return (
    <div>
      <main className="min-w-[301px]">
        <Hero />
        <SobreMim />
        <Projetos />
        <Experiencia />
        <EstimadorProjeto />
        <ChatBot />
      </main>
    </div>
  )
}

export default App