import { useState } from "react";

export default function ChatBot() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Botão flutuante */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-5 right-5 z-20 bg-blue-600 hover:bg-blue-700 text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-xl"
        aria-label="Abrir chat"
      >
        <i className="fa-solid fa-comments"></i>
      </button>

      {/* Janela do chat */}
      {open && (
        <div className="fixed bottom-24 right-5 z-50 w-80 max-w-[90vw] bg-zinc-900 border border-zinc-700 rounded-2xl shadow-xl">
          
          {/* Header */}
          <div className="flex justify-between items-center p-4 border-b border-zinc-700">
            <h3 className="font-semibold text-white flex items-center gap-2">
              <i className="fa-solid fa-robot"></i>
              ChatBot
            </h3>

            <button
              onClick={() => setOpen(false)}
              className="text-zinc-400 hover:text-white"
              aria-label="Fechar chat"
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>

          {/* Conteúdo */}
          <div className="p-4 text-sm text-zinc-300">
            <p className="mb-2">
              Este site contará com um chatbot futuramente.
            </p>
            <p className="text-zinc-400">
              Em desenvolvimento.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
