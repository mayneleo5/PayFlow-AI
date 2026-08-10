# PayFlow AI

**Autonomous treasury and payment automation platform built on Arc**

PayFlow AI enables businesses, DAOs, and individuals to automate USDC payments, payroll, vendor settlements, and treasury management using AI agents on Circle’s stablecoin-native L1.

Built for the **Encode Club × Arc Programmable Money Hackathon**  
Tracks: **Agentic Economy** + **DeFi**

---

## Live Demo

🔗 **[https://payflow-2026.netlify.app](https://payflow-2026.netlify.app)**

> Testnet only • No real funds

---

## What Works Today (MVP Status)

| Feature                              | Status          | Notes |
|--------------------------------------|-----------------|-------|
| Connect any EVM wallet to Arc Testnet | ✅ Working     | Auto-adds Arc network |
| View live USDC balance               | ✅ Working     | Real balance from Arc |
| Send USDC on Arc                     | ✅ Working     | Real on-chain transfers (gas paid in USDC) |
| Dashboard & transaction history      | ✅ Working     | Mix of live + demo data |
| Agent rule configuration UI          | ✅ Working     | Rules can be viewed and edited |
| Agent API (for external AIs)         | ✅ Working     | Browser object + HTTP endpoints |
| Autonomous agent execution           | 🟡 Simulated   | Full autonomy is the next phase |
| Payroll / Revenue split / Treasury   | 🟡 Demo        | Logic exists, real triggers coming |

---

## Architecture

```
User / External AI Agent
        │
        ▼
Frontend Dashboard (Next.js)
        │
        ▼
Backend API + Agent Engine
        │
        ├── Rule Engine
        ├── Payroll Scheduler
        ├── Treasury Manager
        └── Revenue Splitter
        │
        ▼
Circle Wallets / App Kits
        │
        ▼
Arc Blockchain (USDC)
```

---

## Tech Stack

- **Blockchain**: Arc Testnet (Chain ID `5042002`)
- **Stablecoin**: USDC (native gas)
- **Circle Tools**: Circle Wallets, App Kits, Agent Stack
- **Frontend**: Next.js, React, Tailwind CSS
- **Backend**: Node.js / Express

---

## Getting Started

```bash
git clone https://github.com/mayneleo5/payflow-ai.git
cd payflow-ai
npm install
npm run dev
```

---

## Agent API

External AI agents (Grok, Claude, GPT, etc.) can already interact with PayFlow:

- `GET /api/status`
- `GET /api/agents`
- `GET /api/rules`
- `POST /api/payroll/simulate`
- `GET /api/treasury`
- `GET /api/transactions`

---

## Roadmap

**Phase 1 – Current**  
- Wallet connection  
- Real USDC transfers on Arc  
- Dashboard + rule configuration  
- Agent API surface  

**Phase 2**  
- Real autonomous agent execution  
- Condition-based & scheduled payments  
- Automatic revenue splitting  

**Phase 3**  
- Multi-signature approvals  
- Cross-chain flows (App Kits / CCTP)  
- Deeper Agent Stack integration  
- Risk controls and spending limits  

---

## Why Arc?

- USDC as gas → predictable and low costs  
- Sub-second settlement  
- Stablecoin-native infrastructure ideal for autonomous financial agents  

---

## Team

**PayFlow AI**  
Built for the Encode Club × Arc Programmable Money Hackathon

---

## License

MIT


