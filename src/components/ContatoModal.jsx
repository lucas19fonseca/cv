import { useRef, useState, useEffect } from "react";
import emailjs from "emailjs-com";

export default function ContatoModal({ aberto, onFechar }) {
    const form = useRef();
    const dialogRef = useRef(null);

    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState(null); // { tipo: "sucesso" | "erro", titulo, mensagem }

    const validarEmail = (email) => {
        const dominiosFalsos = [
            "tempmail.com", "guerrillamail.com", "10minutemail.com",
            "throwaway.email", "maildrop.cc", "mailinator.com",
            "trashmail.com", "yopmail.com", "fakeinbox.com", "temp-mail.org"
        ];

        const dominio = email.split("@")[1]?.toLowerCase();
        const parteLocal = email.split("@")[0];

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
        setStatus(null);

        const emailInput = form.current.email.value;
        if (!validarEmail(emailInput)) {
            setStatus({
                tipo: "erro",
                titulo: "Email inválido",
                mensagem: "Use um endereço de email válido e permanente."
            });
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

            setStatus({
                tipo: "sucesso",
                titulo: "Mensagem enviada!",
                mensagem: "Obrigado pelo contato! Responderei em breve."
            });
            form.current.reset();
        } catch (error) {
            console.error("Erro ao enviar:", error);
            setStatus({
                tipo: "erro",
                titulo: "Erro ao enviar",
                mensagem: "Ocorreu um erro. Tente novamente."
            });
        } finally {
            setIsLoading(false);
        }
    };

    const fechar = () => {
        setStatus(null);
        onFechar();
    };

    // Fechar com ESC + travar o scroll do fundo enquanto o modal está aberto
    useEffect(() => {
        if (!aberto) return;

        const handleEsc = (e) => {
            if (e.key === "Escape") fechar();
        };

        window.addEventListener("keydown", handleEsc);
        const overflowAnterior = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        dialogRef.current?.focus();

        return () => {
            window.removeEventListener("keydown", handleEsc);
            document.body.style.overflow = overflowAnterior;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [aberto]);

    if (!aberto) return null;

    return (
        <div
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md contato-modal-overlay"
            onClick={(e) => {
                if (e.target === e.currentTarget) fechar();
            }}
        >
            <div
                ref={dialogRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby="contato-modal-titulo"
                tabIndex={-1}
                className="contato-modal-card relative w-full max-w-md rounded-3xl border border-white/10 bg-gray-950/95 shadow-2xl outline-none overflow-hidden"
            >
                {/* Brilho decorativo no topo */}
                <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full bg-blue-600/20 blur-3xl" />
                <div className="pointer-events-none absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/60 to-transparent" />

                {/* Botão fechar */}
                <button
                    onClick={fechar}
                    aria-label="Fechar"
                    className="absolute top-4 right-4 z-10 flex h-9 w-9 items-center justify-center rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-all duration-300"
                >
                    <i className="fas fa-times"></i>
                </button>

                <div className="relative p-6 sm:p-7">
                    {/* Cabeçalho */}
                    <div className="mb-5 flex items-center gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg shadow-blue-500/30">
                            <i className="fas fa-paper-plane text-white text-lg"></i>
                        </div>
                        <div>
                            <h3 id="contato-modal-titulo" className="text-xl font-bold text-white leading-tight">
                                Vamos conversar
                            </h3>
                            <p className="text-gray-400 text-sm">
                                Respondo o mais rápido possível.
                            </p>
                        </div>
                    </div>

                    {/* Atalhos rápidos */}
                    <div className="mb-5 grid grid-cols-2 gap-3">
                        <a
                            href="https://wa.me/5561983462252"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-white transition-all duration-300 hover:border-green-500/60 hover:bg-green-500/10"
                        >
                            <i className="fab fa-whatsapp text-green-400"></i>
                            <span className="text-sm font-medium">WhatsApp</span>
                        </a>
                        <a
                            href="mailto:lucas19fonseca@gmail.com"
                            className="group flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-white transition-all duration-300 hover:border-blue-500/60 hover:bg-blue-500/10"
                        >
                            <i className="fas fa-envelope text-blue-400"></i>
                            <span className="text-sm font-medium">Email</span>
                        </a>
                    </div>

                    <div className="mb-5 flex items-center gap-3">
                        <div className="h-px flex-1 bg-white/10"></div>
                        <span className="text-[11px] text-gray-500 uppercase tracking-widest">ou envie uma mensagem</span>
                        <div className="h-px flex-1 bg-white/10"></div>
                    </div>

                    {/* Feedback de status */}
                    {status && (
                        <div
                            className={`mb-4 flex items-start gap-3 rounded-xl border p-3 ${
                                status.tipo === "sucesso"
                                    ? "border-blue-500/30 bg-blue-500/10"
                                    : "border-red-500/30 bg-red-500/10"
                            }`}
                        >
                            <i
                                className={`fas ${
                                    status.tipo === "sucesso" ? "fa-check-circle text-blue-400" : "fa-exclamation-circle text-red-400"
                                } mt-0.5`}
                            ></i>
                            <div>
                                <p className="text-white font-semibold text-sm">{status.titulo}</p>
                                <p className="text-gray-300 text-xs">{status.mensagem}</p>
                            </div>
                        </div>
                    )}

                    {/* Formulário */}
                    <form ref={form} onSubmit={enviarEmail} className="space-y-3.5">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                            <div>
                                <label htmlFor="modal-nome" className="mb-1.5 block text-xs font-medium text-gray-400">
                                    Nome
                                </label>
                                <input
                                    id="modal-nome"
                                    type="text"
                                    name="name"
                                    placeholder="Seu nome"
                                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-gray-500 transition-all duration-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="modal-email" className="mb-1.5 block text-xs font-medium text-gray-400">
                                    Email
                                </label>
                                <input
                                    id="modal-email"
                                    type="email"
                                    name="email"
                                    placeholder="seu@email.com"
                                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-gray-500 transition-all duration-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="modal-mensagem" className="mb-1.5 block text-xs font-medium text-gray-400">
                                Mensagem
                            </label>
                            <textarea
                                id="modal-mensagem"
                                name="message"
                                placeholder="Conte-me sobre seu projeto ou ideia..."
                                rows="3"
                                className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-gray-500 transition-all duration-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                required
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full rounded-xl py-3.5 text-sm font-bold text-white transition-all duration-300 ${
                                isLoading
                                    ? "cursor-not-allowed bg-gray-700"
                                    : "bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 hover:shadow-[0_0_30px_rgba(59,130,246,0.35)]"
                            }`}
                        >
                            {isLoading ? (
                                <span className="flex items-center justify-center gap-3">
                                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                                    Enviando...
                                </span>
                            ) : (
                                <span className="flex items-center justify-center gap-2">
                                    <i className="fas fa-paper-plane"></i>
                                    Enviar Mensagem
                                </span>
                            )}
                        </button>
                    </form>
                </div>
            </div>

            <style>{`
                @keyframes contatoOverlayIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes contatoCardIn {
                    from { opacity: 0; transform: translateY(16px) scale(0.97); }
                    to { opacity: 1; transform: translateY(0) scale(1); }
                }
                .contato-modal-overlay { animation: contatoOverlayIn 0.25s ease-out; }
                .contato-modal-card { animation: contatoCardIn 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
            `}</style>
        </div>
    );
}
