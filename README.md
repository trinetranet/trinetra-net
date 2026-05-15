# Trinetra.net — AI Legal Intelligence Engine

> Free Chrome extension that reads Terms & Conditions for you. AI-powered clause analysis with Indian law citations and blockchain evidence storage.

---

## How It Works

The extension sends T&C text to a cloud backend which uses **Groq's free LLaMA 3 AI** to classify each clause. Results appear in a sidebar within seconds. No Python needed on the user's device.

---

## Deploy the Backend (Free — 10 minutes)

### Step 1 — Get a Free Groq API Key

1. Go to **console.groq.com**
2. Sign up (free, no credit card)
3. Click **API Keys** → **Create API Key**
4. Copy the key — looks like `gsk_xxxxxxxxxxxxxxxx`

### Step 2 — Deploy to Railway (Free)

1. Go to **railway.app** → Sign up with GitHub (free)
2. Click **New Project** → **Deploy from GitHub repo**
3. Select this repository
4. Railway will auto-detect and deploy

### Step 3 — Add the API Key

In Railway dashboard:
1. Click your project → **Variables**
2. Add: `GROQ_API_KEY` = `gsk_your_key_here`
3. Railway redeploys automatically

### Step 4 — Get your live URL

Railway gives you a URL like:
```
https://trinetra-backend-production.up.railway.app
```

That's your live API. Open `/health` to confirm it's running.

---

## Install the Extension

### Option A — Chrome Web Store (recommended for public)
*(Submit the extension ZIP for review — $5 one-time developer fee)*

### Option B — Direct install (free, for GitHub users)
1. Download the `extension/` folder as a ZIP
2. Go to `chrome://extensions`
3. Enable **Developer Mode** (top right)
4. Click **Load Unpacked** → select the `extension/` folder
5. Done — the 👁️ icon appears in your toolbar

---

## Project Structure

```
trinetra-net/
├── app.py                    ← Flask backend (deploy this to Railway)
├── legal_reference_engine.py ← Indian law database
├── requirements.txt          ← Python dependencies
├── Procfile                  ← Railway start command
├── railway.json              ← Railway config
├── extension/
│   ├── manifest.json
│   ├── popup.html
│   ├── popup.js
│   ├── content.js
│   └── background.js
└── website/
    └── index.html            ← Landing page (deploy to GitHub Pages)
```

---

## Tech Stack

| Layer | Technology | Cost |
|-------|-----------|------|
| AI Classification | Groq LLaMA 3 8B | Free (14,400 req/day) |
| Backend server | Railway.app | Free hobby tier |
| Website hosting | GitHub Pages | Free |
| Extension distribution | GitHub Releases | Free |
| Legal database | Custom Python | Free |
| Blockchain storage | SHA-256 JSON files | Free |

**Total cost: ₹0**

---

## Indian Laws Covered

- **CPA 2019** — Consumer Protection Act (unfair contracts, termination, refunds)
- **DPDP Act 2023** — Digital Personal Data Protection (consent, deletion rights)
- **RBI e-Mandate 2021** — Auto-renewal pre-debit notification requirements
- **IT Act 2000 §43A** — Company liability for data breaches
- **Copyright Act 1957** — User content ownership, moral rights
- **Indian Contract Act 1872 §23** — Unconscionable clause invalidation
- **Arbitration Act 1996** — Arbitrator independence, consumer court preservation
- **GDPR** — EU data protection (for companies serving EU users)
- **Information Technology (Intermediary Guidelines) Rules 2021** — Platform accountability and user grievance mechanisms
- **IT Rules 2021** — Platform accountability and grievance redressal requirements

---

## License

MIT License — free to use, modify, and distribute.

Built for Indian internet users. 🇮🇳
