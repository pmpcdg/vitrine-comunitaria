ARQUITETURA.md na raiz do seu projeto no GitHub:md# Arquitetura - Vitrine Comunitária v1.0
> Documentado em: 24/08/2026 - Maricá/RJ
> Stack: GitHub + Vercel + n8n (Render)

## 1. Visão Geral

Projeto criado para integrar o site da Vitrine Comunitária com automações de WhatsApp, Instagram e gestão de lojistas.
[ Usuário / Lojista ]
       ↓
[Vercel - Frontend Next.js] 
       ↓ (git push)
[GitHub - Código Fonte] ←→ [Vercel - Deploy Automático]
       ↓ (Webhook / API)
[n8n - Render] → WhatsApp / Instagram / Google Sheets / DB
       ↑
[n8n - Local (Casa)] - ambiente de desenvolvimentojavascript
## 2. Componentes

### A) GitHub
- **Função:** Cofre do código e versionamento
- **Repo:** `vitrine-comunitaria`
- **Fluxo:** Todo `git push` na branch `main` dispara deploy na Vercel

### B) Vercel
- **Função:** Hospedagem do site (Frontend)
- **Integração:** Conectada diretamente ao GitHub
- **Env Vars:** `N8N_WEBHOOK_URL=https://vitrine-n8n.onrender.com`

### C) n8n - Cérebro da Automação
- **URL Produção:** https://vitrine-n8n.onrender.com
- **Hospedagem:** Render.com (Plano Free)
- **Versão:** 1.55.3 (versão leve otimizada para Free Tier)
- **Login:** Basic Auth + Owner Account criado em 24/08/2026

**Por que v1.55.3 e não a última?**
A versão 1.120+ exige >1GB RAM e falha com erro 502 no Render Free. A 1.55.3 roda com ~400MB e é 100% estável para o MVP.

**Variáveis de Ambiente no Render:**N8N_BASIC_AUTH_ACTIVE=true
N8N_BASIC_AUTH_USER=admin
N8N_BASIC_AUTH_PASSWORD=_ (definida por você)
N8N_ENCRYPTION_KEY=_ (NUNCA PERDER - criptografa credenciais)
N8N_HOST=vitrine-n8n.onrender.com
N8N_PROTOCOL=https
WEBHOOK_URL=https://vitrine-n8n.onrender.com
GENERIC_TIMEZONE=America/Sao_Paulojavascript
## 3. Fluxo de Trabalho Diário

### Atualizar o Site:
```bash
git add .
git commit -m "feat: nova vitrine"
git push origin main
# Vercel faz deploy automático em ~1minUsar o n8n:
Acessar https://vitrine-n8n.onrender.comSe der 502/503: Aguardar 50 segundos e dar F5 (Render Free dorme após 15min)Home > Create Workflow > Salvar > Ativar (toggle no topo)Migrar Workflow Casa -> Nuvem:
Em casa: Abra workflow > ... > Export > DownloadNa nuvem: ... > Import from File4. Troubleshooting (O que aprendemos hoje)ErroCausaSolução502 Bad GatewayRender Free dormindo ou sem RAMAguardar 50s + F5. Se persistir, usar Start Command npx n8n@1.55.3 startSetup Screen não abreCookie / cacheAba anônima ou limpar cookies"Critical Update"Versão antigaIgnorar no MVP. Atualizar só ao migrar para Railway/Plano Pago5. Próximos Passos (Roadmap)
Importar workflow iniciado hoje (casa -> nuvem)Criar Webhook: Vercel -> n8n para receber pedidosConectar Evolution API / WhatsAppQuando faturar: Migrar n8n para Railway.app (US$5/mês) com versão mais nova e sem dormirMantido por: Paulo - Vitrine Comunitária Maricá
