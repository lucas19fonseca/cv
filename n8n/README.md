# n8n exposto via Cloudflare Tunnel

Backend do ChatBot do portfólio. O n8n roda em Docker nesta máquina e fica
acessível na internet por um Cloudflare Tunnel, sem abrir porta no roteador.

```
navegador -> lucas-andrade.vercel.app -> /api/chat (Vercel)
                                            |
                                            |-- 1. https://n8n.seudominio.com.br/webhook/<id>
                                            |        (este PC, via tunnel)
                                            `-- 2. Groq API  (fallback)
```

## Setup (uma vez)

**1. Criar o tunnel**

Cloudflare Dashboard → Zero Trust → Networks → Tunnels → *Create a tunnel* →
**Cloudflared** → nome `n8n-local` → **Docker**.

Copie **apenas o token** do comando mostrado (a string longa depois de
`--token`). Não rode o `docker run` sugerido — o compose daqui já faz isso.

**2. Preencher o `.env`**

```powershell
copy .env.example .env
notepad .env
```

**3. Subir**

```powershell
docker compose up -d
docker compose logs -f cloudflared
```

Espere aparecer `Registered tunnel connection`.

**4. Apontar o hostname público**

De volta na página do tunnel → aba **Public Hostname** → *Add a public hostname*:

| Campo     | Valor                |
| --------- | -------------------- |
| Subdomain | `n8n`                |
| Domain    | `seudominio.com.br`  |
| Type      | `HTTP`               |
| URL       | `n8n:5678`           |

`n8n:5678` é o nome do container na rede do compose — **não** use
`localhost:5678`, porque o cloudflared roda em outro container.

Teste abrindo `https://n8n.seudominio.com.br`: deve cair no editor do n8n.

> Não habilite Cloudflare Access neste hostname, ou o webhook passa a exigir
> login e a Vercel recebe uma página de HTML em vez da resposta. Se quiser
> proteger o editor, crie a policy só para o path `/` e deixe `/webhook/*` livre.

## Proteger o webhook

No node **Webhook** do workflow → *Authentication* → **Header Auth** → nova
credencial:

- Name: `x-api-key`
- Value: uma string aleatória sua

Depois copie a **Production URL** do node
(`https://n8n.seudominio.com.br/webhook/<id>`).

## Variáveis na Vercel

Settings → Environment Variables (Production):

```
N8N_WEBHOOK_URL = https://n8n.seudominio.com.br/webhook/<id>
N8N_API_KEY     = <o mesmo valor do Header Auth>
GROQ_API_KEY    = <chave da Groq, usada como fallback>
```

Redeploy depois de salvar.

## Teste rápido

```powershell
curl.exe -X POST https://n8n.seudominio.com.br/webhook/<id> `
  -H "Content-Type: application/json" `
  -H "x-api-key: SUA_CHAVE" `
  -d '{\"chatInput\":\"oi\",\"sessionId\":\"teste\"}'
```

Deve voltar um JSON com o campo `output`.

## O workflow precisa responder JSON

No node **Webhook**: *Respond* = `Using 'Respond to Webhook' node`.
No node **Respond to Webhook**: modo `JSON`, corpo:

```json
{ "output": "{{ $json.output }}" }
```

## Limitação conhecida

Com o n8n rodando aqui, o chat em produção só usa o workflow enquanto este PC
estiver ligado com o Docker de pé. Quando não estiver, a `/api/chat` cai
sozinha na Groq e o chat continua respondendo — a resposta traz
`"fonte": "groq"` para você saber qual rota atendeu.
