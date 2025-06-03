import { useRef } from "react"
import emailjs from 'emailjs-com'


export default function Email() {
    const form = useRef();

    const enviarEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm('service_ey0v7lf', 'template_9pmqr9p', form.current, 'rj12eEppK9YvyXn39')
        .then(() => {
            alert('Mensagem enviada com sucesso!');
            form.current.reset();
        })
        .catch((error) => {
            console.log('Erro ao enviar', error);
            alert('Erro ao enviar mensagem.');
        });
    };

    return(
        <div className="email">
            <h2>Entre em contato!</h2>
            <form ref={form} onSubmit={enviarEmail} className="form">
                <label className="label-name">Nome: </label>
                <input type="text" name="name" className="form-name" required />

                <label className="label-email">Email:</label>
                <input type="email" name="email" className="form-email" required />

                <label className="label-mensagem">Mensagem: </label>
                <textarea name="message" className="form-message" required></textarea>

                <button type="submit" className="botao">Enviar</button>
            </form>
        </div>
    )
}