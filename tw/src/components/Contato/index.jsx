export default function Contato() {
    return (
        <div className="flex justify-center pb-10">
            <div className="grid grid-cols-2 bg-[#080831] w-240 h-110 rounded-xl p-6 gap-4">
                <div className="flex justify-center">
                    <div className="flex justify-center">
                        <div className="text-white">
                            <h4 className="text-[#ff5403] text-2xl font-Poppin  ml-20 mb-3 mt-10">Entre em contato</h4>

                            {/* Redes sociais */}
                            <div className="text-2xl flex gap-4 mb-4 ml-27">
                                <a href="https://www.instagram.com/lucax.andrade_/" target="_blank" rel="noopener noreferrer" className="hover:scale-125 transition duration-500">
                                    <i className="fab fa-instagram"></i>
                                </a>
                                <a href="https://github.com/lucas19fonseca" target="_blank" rel="noopener noreferrer" className="hover:scale-125 transition duration-500">
                                    <i className="fab fa-github"></i>
                                </a>
                                <a href="https://www.linkedin.com/in/lucas-andrade-5511022b3/" target="_blank" rel="noopener noreferrer" className="hover:scale-125 transition duration-500">
                                    <i className="fab fa-linkedin"></i>
                                </a>
                                <a href="https://discord.com/channels/@me" target="_blank" rel="noopener noreferrer" className="hover:scale-125 transition duration-500">
                                    <i className="fab fa-discord"></i>
                                </a>
                            </div>
                            {/* Lista de contatos */}

                            <div className="mt-20 pr-33">
                                <ul className="space-y-3 text-xl">
                                    <li><i className="fas fa-envelope mr-2"></i>lucas19fonseca@gmail.com</li>
                                    <li><i className="fas fa-phone mr-2"></i>+55 (61) 98346-2252</li>
                                    <li><i className="fas fa-map-marker-alt mr-2"></i>Brasília, DF</li>
                                </ul>
                            </div>

                        </div>
                    </div>
                </div>

                <form className="bg-[#f4f4f4] rounded p-4 space-y-4">
                    <div>
                        <label htmlFor="nome" className="block text-sm font-medium text-gray-700">Nome</label>
                        <input
                            id="nome"
                            type="text"
                            placeholder="Seu nome"
                            className="w-full bg-white rounded px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#ff5403]"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Seu email"
                            className="w-full bg-white rounded px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#ff5403]"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="mensagem" className="block text-sm font-medium text-gray-700">Mensagem</label>
                        <textarea
                            id="mensagem"
                            placeholder="Digite sua mensagem"
                            className="w-full bg-white rounded px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#ff5403] resize-none"
                            rows="4"
                            required
                        ></textarea>
                    </div>

                    <div className="flex justify-center">
                        <button type="submit" className="bg-[#ff5403] text-white rounded-2xl px-6 py-2 font-semibold hover:scale-105 transition">
                            Enviar Mensagem
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
