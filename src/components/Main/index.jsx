import { useEffect, useRef } from "react";
import SobreMim from "../../components/SobreMim/index";
import Tecnologia from "../Tecnologias/index";
import Certificados from "../Certificados/index";
import Contato from "../Contato/index";
import Projetos from "../projetos/index";
import Experiencia from "../experiencia/experiencia";
import Hero from "../Hero/index";

export default function Main() {
  return (
    <main className="min-w-[301px]">
      <Hero />
      <SobreMim />
      <Tecnologia />
      <Projetos />
      <Experiencia/>
      <Certificados />
      <Contato />
    </main>
  );
}