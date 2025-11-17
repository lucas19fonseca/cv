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

      <div className="w-full flex justify-center pb-4 pt-3 md:pt-15 ">
        <h1 className="font-medium text-2xl md:text-3xl" id="sobre-mim">
          Sobre Mim
        </h1>
      </div>
      <SobreMim />

      <div className="w-full flex justify-center pb-6 pt-8 md:pt-15 md:pb-8 md:mt-20">
        <h1 className="font-medium text-2xl md:text-3xl" id="tecnologias">
          Tecnologias
        </h1>
      </div>
      <Tecnologia />

      <div className="w-full flex justify-center pb-6 pt-11 md:pt-15 md:pb-8 md:mt-20">
        <h1 className="font-medium text-2xl md:text-3xl" id="projetos">
          Projetos
        </h1>
      </div>
      <Projetos />

      <div className="w-full flex justify-center pt-8 md:pt-15 md:pb-3 md:mt-20">
        <h1 className="font-medium text-2xl md:text-3xl" id="certificados">
          Certificados
        </h1>
      </div>
      <Certificados />

      <div className="w-full flex justify-center pb-2 pt-8 md:pt-15 md:pb-8 md:mt-20">
        <h1 className="font-medium text-2xl md:text-3xl" id="contato">
          Contato
        </h1>
      </div>
      <Contato />
    </main>
  );
}
