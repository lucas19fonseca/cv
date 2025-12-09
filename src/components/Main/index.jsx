import { useEffect, useRef } from "react";
import SobreMim from "../../components/SobreMim/index";
import Tecnologia from "../Tecnologias/index";
import Certificados from "../Certificados/index";
import Contato from "../Contato/index";
import Projetos from "../projetos/index";
import Hero from "../Hero/index";
import { gsap } from "gsap";

export default function Main() {
  const main = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(main.current, {
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 0.4,
        ease: "power3.out",
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <main
      ref={main} // <-- A ref precisa estar aqui!!
      className="bg-[#f4f4f4] min-w-[301px]"
    >
      <Hero />

     
      <SobreMim />

    
      <Tecnologia />

      
      <Projetos />

     
      <Certificados />

      
      <Contato />
    </main>
  );
}