import { useRef, useState, useEffect } from "react";
import emailjs from "emailjs-com";

export default function Contato() {
    const form = useRef();
    const sectionRef = useRef(null);
    
    const [modalAberto, setModalAberto] = useState(false);
    const [modalTipo, setModalTipo] = useState(""); // "sucesso" ou "erro"
    const [modalTitulo, setModalTitulo] = useState("");
    const [modalMensagem, setModalMensagem] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const contactInfo = [
        { 
            icon: "fas fa-envelope", 
            label: "Email", 
            value: "lucas19fonseca@gmail.com", 
            link: "mailto:lucas19fonseca@gmail.com" 
        },
        { 
            icon: "fab fa-whatsapp",
            label: "Telefone", 
            value: "+55 (61) 98346-2252", 
            link: "https://wa.me/5561983462252"
        },
        { 
            icon: "fas fa-map-marker-alt", 
            label: "Localização", 
            value: "Brasília, DF", 
            link: null 
        },
    ];

    const socialLinks = [
        { icon: "fab fa-github", label: "GitHub", url: "https://github.com/lucas19fonseca", color: "from-gray-700 to-gray-900" },
        { icon: "fab fa-linkedin", label: "LinkedIn", url: "https://www.linkedin.com/in/lucas-andrade-5511022b3/", color: "from-blue-700 to-blue-900" },
        { icon: "fab fa-instagram", label: "Instagram", url: "https://www.instagram.com/lucax.andrade_/", color: "from-pink-600 to-purple-600" },
        { icon: "fab fa-discord", label: "Discord", url: "https://discord.com/channels/@me", color: "from-indigo-600 to-blue-600" },
    ];

    const validarEmail = (email) => {
        const dominiosFalsos = [
            'tempmail.com', 'guerrillamail.com', '10minutemail.com',
            'throwaway.email', 'maildrop.cc', 'mailinator.com',
            'trashmail.com', 'yopmail.com', 'fakeinbox.com', 'temp-mail.org'
        ];

        const dominio = email.split('@')[1]?.toLowerCase();
        const parteLocal = email.split('@')[0];

        if (!dominio || !parteLocal) return false;
        if (dominiosFalsos.includes(dominio)) return false;
        if (parteLocal.length < 3) return false;

        const caracteresUnicos = new Set(parteLocal.toLowerCase()).size;
        if (caracteresUnicos <= 2 && parteLocal.length > 4) return false;

        return true;
    };

    const enviarEmail = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const emailInput = form.current.email.value;
        if (!validarEmail(emailInput)) {
            setModalTipo("erro");
            setModalTitulo("Email inválido");
            setModalMensagem("Por favor, use um endereço de email válido e permanente.");
            setModalAberto(true);
            setIsLoading(false);
            return;
        }

        try {
            await emailjs.sendForm(
                "service_ey0v7lf",
                "template_9pmqr9p",
                form.current,
                "3Q1UnYYGtaM4UmNuS"
            );
            
            setModalTipo("sucesso");
            setModalTitulo("Mensagem enviada!");
            setModalMensagem("Obrigado pelo contato! Responderei em breve.");
            setModalAberto(true);
            form.current.reset();
        } catch (error) {
            console.error("Erro ao enviar:", error);
            setModalTipo("erro");
            setModalTitulo("Erro ao enviar");
            setModalMensagem("Ocorreu um erro ao enviar sua mensagem. Tente novamente.");
            setModalAberto(true);
        } finally {
            setIsLoading(false);
        }
    };

    const fecharModal = () => {
        setModalAberto(false);
        if (modalTipo === "sucesso") {
            form.current.reset();
        }
    };

    // Fechar modal com ESC
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape' && modalAberto) {
                fecharModal();
            }
        };

        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [modalAberto]);

    // Fechar modal automaticamente após sucesso
    useEffect(() => {
        if (modalAberto && modalTipo === "sucesso") {
            const timer = setTimeout(() => {
                fecharModal();
            }, 4000);
            return () => clearTimeout(timer);
        }
    }, [modalAberto, modalTipo]);

    return (
        <section 
            id="contato"
            ref={sectionRef}
            className="py-20 md:py-32 relative overflow-hidden min-h-[600px]"
        >
            {/* Background effects */}
            <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-950 to-gray-900" />
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-30" />
            
            {/* Grid pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="w-full h-full" style={{
                    backgroundImage: `
                        linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px),
                        linear-gradient(180deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
                    `,
                    backgroundSize: '50px 50px'
                }}></div>
            </div>

            <div className="container mx-auto px-4 lg:px-8 relative z-10">
                {/* Section header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center justify-center gap-3 mb-4">
                        <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"></div>
                        <span className="text-blue-400 font-mono text-sm tracking-widest">CONTACT</span>
                    </div>
                    
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                        Vamos <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">Conversar</span>
                    </h2>
                    
                    <p className="text-gray-400 mt-6 text-lg max-w-2xl mx-auto">
                        Estou disponível para novas oportunidades, projetos interessantes ou apenas uma conversa sobre tecnologia
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    {/* Contact Info */}
                    <div className="space-y-8">
                        <div className="bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 rounded-2xl p-8">
                            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                                <i className="fas fa-info-circle text-blue-400"></i>
                                Informações de Contato
                            </h3>
                            
                            <div className="space-y-6">
                                {contactInfo.map((info, index) => (
                                    <div key={index} className="group">
                                        <div className="flex items-center gap-4">
                                            <div className={`w-12 h-12 rounded-lg bg-gray-800 border border-gray-700 flex items-center justify-center group-hover:border-blue-500 transition-all duration-300 ${
                                                info.icon.includes('whatsapp') ? 'group-hover:border-green-500' : ''
                                            }`}>
                                                <i className={`${info.icon} text-blue-400 text-xl ${
                                                    info.icon.includes('whatsapp') ? 'group-hover:text-green-400' : ''
                                                }`}></i>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-400">{info.label}</p>
                                                {info.link ? (
                                                    <a 
                                                        href={info.link}
                                                        target={info.icon.includes('whatsapp') ? "_blank" : "_self"}
                                                        rel={info.icon.includes('whatsapp') ? "noopener noreferrer" : ""}
                                                        className={`text-white font-medium transition-colors duration-300 ${
                                                            info.icon.includes('whatsapp') 
                                                                ? 'hover:text-green-400' 
                                                                : 'hover:text-blue-400'
                                                        }`}
                                                    >
                                                        {info.value}
                                                        {info.icon.includes('whatsapp') && (
                                                            <span className="ml-2 text-xs text-green-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                                <i className="fab fa-whatsapp"></i> WhatsApp
                                                            </span>
                                                        )}
                                                    </a>
                                                ) : (
                                                    <p className="text-white font-medium">{info.value}</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 rounded-2xl p-8">
                            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                                <i className="fas fa-share-alt text-blue-400"></i>
                                Conecte-se
                            </h3>
                            
                            <div className="grid grid-cols-2 gap-4">
                                {socialLinks.map((social, index) => (
                                    <a
                                        key={index}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`group relative p-4 rounded-xl border border-gray-700 bg-gradient-to-br from-gray-800/50 to-gray-900/50 hover:border-blue-500 transition-all duration-300 overflow-hidden`}
                                    >
                                        <div className="relative z-10 flex flex-col items-center text-center">
                                            <i className={`${social.icon} text-2xl text-white mb-2`}></i>
                                            <span className="text-sm text-gray-300">{social.label}</span>
                                        </div>
                                        
                                        {/* Hover effect */}
                                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-cyan-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div>
                        <div className="bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 rounded-2xl p-8">
                            <h3 className="text-2xl font-bold text-white mb-10 flex items-center gap-3">
                                <i className="fas fa-paper-plane text-blue-400"></i>
                                Envie uma Mensagem
                            </h3>
                            
                            <form
                                ref={form}
                                onSubmit={enviarEmail}
                                className="space-y-6"
                            >
                                <div className="group">
                                    <label htmlFor="nome" className="block text-sm font-medium text-gray-400 mb-2 group-hover:text-blue-400 transition-colors duration-300">
                                        <i className="fas fa-user mr-2"></i>
                                        Nome
                                    </label>
                                    <input
                                        id="nome"
                                        type="text"
                                        name="name"
                                        placeholder="Como posso te chamar?"
                                        className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-5 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                                        required
                                    />
                                </div>

                                <div className="group">
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2 group-hover:text-blue-400 transition-colors duration-300">
                                        <i className="fas fa-envelope mr-2"></i>
                                        Email
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        name="email"
                                        placeholder="seu@email.com"
                                        className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-5 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                                        required
                                    />
                                </div>

                                <div className="group">
                                    <label htmlFor="mensagem" className="block text-sm font-medium text-gray-400 mb-2 group-hover:text-blue-400 transition-colors duration-300">
                                        <i className="fas fa-comment-alt mr-2"></i>
                                        Mensagem
                                    </label>
                                    <textarea
                                        id="mensagem"
                                        name="message"
                                        placeholder="Conte-me sobre seu projeto ou ideia..."
                                        className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 resize-none transition-all duration-300"
                                        rows="5"
                                        required
                                    ></textarea>
                                </div>

                                <div className="pt-4">
                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className={`w-full py-4 rounded-xl font-bold text-white transition-all duration-300 ${
                                            isLoading 
                                                ? 'bg-gray-700 cursor-not-allowed' 
                                                : 'bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 hover:shadow-[0_0_30px_rgba(59,130,246,0.3)]'
                                        }`}
                                    >
                                        {isLoading ? (
                                            <div className="flex items-center justify-center gap-3">
                                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                <span>Enviando...</span>
                                            </div>
                                        ) : (
                                            <div className="flex items-center justify-center gap-3">
                                                <i className="fas fa-paper-plane"></i>
                                                <span>Enviar Mensagem</span>
                                            </div>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {modalAberto && (
                <div 
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                    onClick={(e) => {
                        if (e.target === e.currentTarget) {
                            fecharModal();
                        }
                    }}
                >
                    <div className={`relative max-w-md w-full rounded-2xl overflow-hidden shadow-2xl transform transition-all ${
                        modalTipo === "sucesso" 
                            ? 'bg-gradient-to-br from-gray-900 to-blue-900/20' 
                            : 'bg-gradient-to-br from-gray-900 to-red-900/20'
                    } border ${modalTipo === "sucesso" ? 'border-blue-500/30' : 'border-red-500/30'}`}>
                        
                        {/* Close button */}
                        <button
                            onClick={fecharModal}
                            className="absolute top-4 right-4 text-white/60 hover:text-white text-xl transition-colors duration-300 z-10"
                        >
                            <i className="fas fa-times"></i>
                        </button>
                        
                        {/* Modal content */}
                        <div className="p-8 text-center">
                            <div className="mb-6">
                                <div className={`w-20 h-20 rounded-full ${modalTipo === "sucesso" ? 'bg-blue-500/20' : 'bg-red-500/20'} flex items-center justify-center mx-auto`}>
                                    <i className={`fas fa-${modalTipo === "sucesso" ? 'check' : 'exclamation'}-circle text-4xl ${
                                        modalTipo === "sucesso" ? 'text-blue-400' : 'text-red-400'
                                    }`}></i>
                                </div>
                            </div>
                            
                            <h3 className="text-2xl font-bold text-white mb-3">
                                {modalTitulo}
                            </h3>
                            
                            <p className="text-gray-300 mb-8">
                                {modalMensagem}
                            </p>
                            
                            <button
                                onClick={fecharModal}
                                className={`px-8 py-3 rounded-lg font-medium text-white transition-colors duration-300 ${
                                    modalTipo === "sucesso" 
                                        ? 'bg-blue-600 hover:bg-blue-500' 
                                        : 'bg-red-600 hover:bg-red-500'
                                }`}
                            >
                                {modalTipo === "sucesso" ? 'Ótimo!' : 'Entendi'}
                            </button>
                            
                            {modalTipo === "sucesso" && (
                                <div className="mt-6 pt-6 border-t border-gray-800">
                                    <p className="text-sm text-gray-400">
                                        <i className="fas fa-clock mr-2"></i>
                                        Fechando automaticamente em 4 segundos...
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}