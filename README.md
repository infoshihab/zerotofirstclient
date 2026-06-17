# Dream Customer Finder

Solvetech tool, Impact design system, powered by Masud's AI Team.

## What's inside

```
dream-customer-vercel/
├── public/index.html      Frontend (4-step interactive tool)
├── api/claude.js          Serverless proxy to Anthropic API
├── vercel.json            Vercel routing config
└── package.json
```

The frontend calls `/api/claude` (same domain). The serverless function holds your `ANTHROPIC_API_KEY` and forwards requests to `api.anthropic.com`. Your API key never touches the browser.

---

## Deploy to Vercel — 3 options

### Option A: Vercel CLI (fastest, ~2 minutes)

```bash
# 1. Install Vercel CLI if you don't have it
npm i -g vercel

# 2. From inside the dream-customer-vercel folder
cd dream-customer-vercel
vercel

# 3. Follow prompts. When asked about project settings, accept defaults.
# 4. After first deploy, add your API key:
vercel env add ANTHROPIC_API_KEY
# Paste your key, select "Production" + "Preview" + "Development"

# 5. Redeploy so the env var takes effect
vercel --prod
```

### Option B: GitHub + Vercel (recommended for ongoing edits)

1. Create a new GitHub repo, push this folder to it.
2. Go to vercel.com → New Project → Import the repo.
3. In project settings → Environment Variables, add:
   - Key: `ANTHROPIC_API_KEY`
   - Value: `sk-ant-api03-...` (your real key)
   - Environments: Production, Preview, Development
4. Click Deploy. Done.

### Option C: Vercel Dashboard Drag-Drop

1. Zip the entire `dream-customer-vercel` folder.
2. vercel.com → New Project → Deploy → drag-drop the zip.
3. Add env var as in Option B step 3.
4. Redeploy.

---

## Required: Set your API key

Get your key from console.anthropic.com → API Keys.

In Vercel project → Settings → Environment Variables, add:

| Name | Value | Environments |
|---|---|---|
| `ANTHROPIC_API_KEY` | `sk-ant-api03-...` | Production, Preview, Development |

After adding, redeploy once so the function picks it up.

---

## Custom domain

In Vercel project → Settings → Domains, add `dreamcustomer.solvetechsolutions.com` or whatever subdomain you want. Vercel handles the SSL.

---

## Tradeoffs to know

| Decision | Why | When to change |
|---|---|---|
| Browser → serverless → Anthropic | Keeps API key server-side | Never expose key in frontend |
| No rate limiting | Simpler v1 | If usage spikes, add Vercel KV-based rate limit per IP |
| Free Vercel Hobby tier | Fine for < ~100K monthly invocations | Move to Pro if traffic grows |
| Model: claude-sonnet-4 | Best quality/speed balance | Swap to opus-4 in api/claude.js if you want max quality |

---

## Test it locally before deploying

```bash
cd dream-customer-vercel
npm i -g vercel
vercel dev
# Opens http://localhost:3000
# Make sure your ANTHROPIC_API_KEY is set locally:
#   echo "ANTHROPIC_API_KEY=sk-ant-..." > .env
```

---

## Future upgrades

- Add Vercel KV for rate limiting per IP
- Add email capture (Mailchimp/ConvertKit webhook) when blueprint generates
- Save user inputs to Vercel Postgres for follow-up
- Add analytics (Vercel Analytics is one click)
- Gate behind a paywall with Stripe checkout for the premium version
