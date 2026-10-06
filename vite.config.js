import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Faz /api/chat funcionar no `npm run dev`, montando a mesma serverless
// function da Vercel como middleware do dev server. Sem isso, /api só
// existe em produção ou rodando `vercel dev`.
function apiDev() {
  return {
    name: 'api-dev',
    configureServer(server) {
      server.middlewares.use('/api/chat', async (req, res, next) => {
        try {
          const mod = await server.ssrLoadModule('/api/chat.js')
          await mod.default(req, res)
        } catch (err) {
          server.config.logger.error(`[api-dev] ${err?.stack || err}`)
          if (!res.headersSent) {
            res.statusCode = 500
            res.setHeader('Content-Type', 'application/json; charset=utf-8')
            res.end(JSON.stringify({ error: 'Erro interno no /api/chat (dev).' }))
          } else {
            next(err)
          }
        }
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Carrega o .env inteiro (inclusive sem prefixo VITE_) para process.env,
  // para que api/chat.js enxergue GROQ_API_KEY em desenvolvimento.
  Object.assign(process.env, loadEnv(mode, process.cwd(), ''))

  return {
    plugins: [react(), tailwindcss(), apiDev()],
  }
})
