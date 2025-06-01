import ImgDev from "../../assets/programador.png"

export default function SobreMim() {
    return (
        <div class="flex justify-center items-center gap-4">
            <img src={ImgDev} alt="Paragrafo" className=" h-10 md:h-95 " />
            <p class=" text-xs md:text-base md:w-150 text-justify font-Poppin">
                Olá! Meu nome é Lucas Andrade, tenho 20 anos e estou no 5º semestre de Ciências da Computação. Sou uma
                pessoa comunicativa, com facilidade para trabalhar em equipe e colaborar em projetos, o que contribui positivamente
                no ambiente acadêmico. <br/><br/>
                Meu principal objetivo é crescer profissionalmente na área de tecnologia, contribuindo com
                soluções criativas e eficientes enquanto desenvolvo continuamente minhas habilidades. Tenho grande interesse em
                participar de projetos desafiadores que me permitam aprender na prática, expandir meus conhecimentos e agregar
                valor à equipe da qual eu fizer parte.  Estou em constante busca por aprendizado, tanto no aspecto técnico quanto
                interpessoal, e me mantenho motivado a evoluir a cada nova oportunidade.
            </p>
        </div>

    );
}
