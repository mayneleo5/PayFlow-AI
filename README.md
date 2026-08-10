# PayFlow AI

**Autonomous treasury & payment automation platform built on Arc**

PayFlow AI enables businesses, DAOs, and individuals to automate USDC payments, payroll, vendor settlements, and treasury management using AI agents on Circle’s stablecoin-native L1.

Built for the **Encode Club × Arc Programmable Money Hackathon** (Agentic Economy + DeFi tracks).

---

## Live Demo
🔗 [https://payflow-2026.netlify.app](https://payflow-2026.netlify.app)

> Testnet only • No real funds

---

## What Works Today (MVP Status)

| Feature                        | Status          | Notes |
|--------------------------------|-----------------|-------|
| Connect any EVM wallet to Arc Testnet | ✅ Working     | Auto-adds Arc network |
| View live USDC balance         | ✅ Working     | Real balance from Arc |
| Send USDC on Arc               | ✅ Working     | Real on-chain transfers (gas paid in USDC) |
| Dashboard & transaction history| ✅ Working     | Mix of live + demo data |
| Agent rule configuration UI    | ✅ Working     | Rules can be viewed/edited |
| Agent API (for external AIs)   | ✅ Working     | Browser + HTTP endpoints |
| Autonomous agent execution     | 🟡 Simulated   | Full autonomy is next phase |
| Payroll / Revenue split / Treasury rules | 🟡 Demo     | Logic exists, real triggers coming |

---

## Architecture
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
---

## Tech Stack

- **Blockchain**: Arc Testnet (Chain ID 5042002)
- **Stablecoin**: USDC (native gas)
- **Circle Tools**: Circle Wallets, App Kits, Agent Stack (planned deeper integration)
- **Frontend**: Next.js, React, Tailwind CSS
- **Backend**: Node.js / Express
- **Smart Contracts**: Solidity (coming)

---

## Getting Started

```bash
# Clone
git clone https://github.com/mayneleo5/payflow-ai.git
cd payflow-ai

# Install
npm install

# Run locally
npm run dev
Agent API (for other AIs)
External agents (Grok, Claude, GPT, etc.) can control PayFlow:
GET  /api/status
GET  /api/agents
GET  /api/rules
POST /api/payroll/simulate
GET  /api/treasury
GET  /api/transactions

## Roadmap

### Phase 1 (Current)
Wallet connection + real USDC transfers
Dashboard + rule configuration
Agent API surface

### Phase 2
Real autonomous agent execution (condition-based payments)
Scheduled payroll with real on-chain settlement
Revenue split on incoming transfers

### Phase 3
Multi-sig approvals
Cross-chain via App Kits / CCTP
Deeper Agent Stack integration
Risk & spending limits

## Why Arc?

USDC as gas → predictable costs
Sub-second settlement
Stablecoin-native infrastructure ideal for autonomous financial agents

## Team

PayFlow AI
Built by [Your Name] for the Arc Programmable Money Hackathon.

## License

MIT License

---

## Contact

GitHub: https://github.com/mayneleo5/payflow-ai

Email: mayneleo5@email.com
