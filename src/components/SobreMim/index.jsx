import ImgDev from "../../assets/comum/programador.png";

export default function SobreMim() {
  return (
    <div className="flex flex-col md:flex-row justify-center items-center gap-6 p-4 max-w-6xl mx-auto">
      <img
        src={ImgDev}
        alt="Programador"
        className="h-54 md:h-98 w-auto"
      />
      <p className="text-xs md:text-base text-justify font-Poppin max-w-xl">
        Olá! Meu nome é Lucas Andrade, tenho 20 anos e estou no 5º semestre de Ciências da Computação. Sou uma
        pessoa comunicativa, com facilidade para trabalhar em equipe e colaborar em projetos, o que contribui positivamente
        no ambiente acadêmico. <br /><br />
        Meu principal objetivo é crescer profissionalmente na área de tecnologia, contribuindo com
        soluções criativas e eficientes enquanto desenvolvo continuamente minhas habilidades. Tenho grande interesse em
        participar de projetos desafiadores que me permitam aprender na prática, expandir meus conhecimentos e agregar
        valor à equipe da qual eu fizer parte. Estou em constante busca por aprendizado, tanto no aspecto técnico quanto
        interpessoal, e me mantenho motivado a evoluir a cada nova oportunidade.
      </p>
    </div>
  );
}
