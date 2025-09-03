import { useState, useEffect } from "react";
import ImgDev from "../../assets/comum/programador.png";

export default function SobreMim() {
  const [idade, setIdade] = useState(null);

  function calcularIdade(dataNascimento) {
    const hoje = new Date();
    const nascimento = new Date(dataNascimento);
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const aniversarioEsteAno = new Date(hoje.getFullYear(), nascimento.getMonth(), nascimento.getDate());

    if (hoje < aniversarioEsteAno) {
      idade--;
    }

    return idade;
  }

  useEffect(() => {
    const idadeCalculada = calcularIdade("2004-07-19");
    setIdade(idadeCalculada);
  }, []);

  return (
    <div className="flex flex-col w-full lg:flex-row justify-center items-center gap-6 p-4 max-w-6xl mx-auto min-w-[301px] px-8 md:px-0">
      <figure>
        <img
          src={ImgDev}
          alt="Programador"
          className="h-54 md:h-98 w-auto"
        />
      </figure>
      <p className="text-xs md:text-base text-justify font-Poppin max-w-xl">
        Olá! Meu nome é Lucas Andrade, tenho {idade ?? "..."} anos e estou no 6º semestre de Ciências da Computação. <br /><br />
        Sou uma pessoa comunicativa, com facilidade para trabalhar em equipe e colaborar em projetos, o que contribui
        positivamente no ambiente acadêmico. <br /><br />
        Meu principal objetivo é crescer profissionalmente na área de tecnologia, contribuindo com
        soluções criativas e eficientes enquanto desenvolvo continuamente minhas habilidades. Tenho grande interesse em
        participar de projetos desafiadores que me permitam aprender na prática, expandir meus conhecimentos e agregar
        valor à equipe da qual eu fizer parte. Estou em constante busca por aprendizado, tanto no aspecto técnico quanto
        interpessoal, e me mantenho motivado a evoluir a cada nova oportunidade.
      </p>
    </div>
  );
}
