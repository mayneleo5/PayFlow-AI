# PayFlow AI

**Autonomous treasury & payment automation on Arc Testnet**  
Built for the **Encode Club × Arc Programmable Money Hackathon**  
Tracks: **Agentic Economy** + **DeFi**

> Testnet only. No real funds.

**Live Demo:** https://payflow-2026.netlify.app  
**Repository:** https://github.com/mayneleo5/PayFlow-AI

---

## Vision

PayFlow AI is designed as an **agent-native treasury platform**.  
It lets businesses, DAOs and individuals run programmable USDC payment workflows (payroll, vendor payments, revenue splits, treasury rules) with AI agents that can eventually hold and move funds under explicit policies.

The current MVP delivers:
- Real Arc Testnet wallet connection
- Live USDC balance reading
- Real user-signed USDC transfers
- A complete Agent API (browser + HTTP)
- Clear architecture ready for **Circle App Kits** and **Circle Agent Stack**

---

## Alignment with Circle Core Products

| Circle Product | Current Status | How PayFlow AI uses / will use it |
|----------------|----------------|-----------------------------------|
| **Arc + USDC** | ✅ Live | Native gas + payment asset. Real transfers on Arc Testnet |
| **App Kits** (Send / Bridge / Swap / Unified Balance) | 🟡 Architecture ready | Planned for multi-rail payments and cross-chain treasury moves |
| **Agent Stack** (Agent Wallets, CLI, Nanopayments, spending policies) | 🟡 Architecture ready | Next phase: agents hold controlled wallets and execute under limits |
| **Circle Wallets** | 🟡 Planned | For production-grade agent custody |

The project is intentionally structured so that App Kits and Agent Stack can be dropped in without rewriting the core dashboard or Agent API.

---

## What is Working Today

| Feature | Status | Notes |
|---------|--------|-------|
| EVM Wallet Connection | ✅ Live | Auto-adds Arc Testnet (Chain ID 5042002) |
| Live USDC Balance | ✅ Live | Native Arc balance |
| Send USDC | ✅ Live | Real on-chain, user-signed transfers |
| Dashboard | ✅ Live | Wallet + treasury + agents views |
| Browser Agent API | ✅ Live | `window.PayFlowAPI` |
| HTTP Agent API | ✅ Live | Full REST surface for external agents |
| Payment Rules / Payroll / Treasury | 🟡 Demo + Simulation | Logic and data models present |
| Autonomous Execution | 🟡 Designed | Next milestone with spending limits |

---

## Architecture

```text
External AI Agent / Human User
        │
        ├── Browser Agent API (window.PayFlowAPI)
        │
        ▼
PayFlow AI Dashboard
        │
        ├── Wallet connection (ethers.js)
        ├── Live Arc USDC balance
        └── User-signed transfers
                │
                ▼
           Arc Testnet

External Agents / Scripts
        │
        ▼
Netlify Agent API
        ├── /status
        ├── /agents
        ├── /rules
        ├── /payroll + /simulate
        ├── /treasury
        ├── /transactions
        └── /command?q=...

Future Layer (ready for integration)
        ├── Circle App Kits (Send / Bridge / Swap)
        └── Circle Agent Stack (Agent Wallets + Policies)
```

---

## Agent API

**Base URL:** `https://payflow-2026.netlify.app/api`

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api` | Overview |
| GET | `/api/status` | Platform status |
| GET | `/api/agents` | List agents |
| GET | `/api/rules` | Payment rules |
| GET | `/api/payroll` | Payroll data |
| POST | `/api/payroll/simulate` | Run simulation |
| GET | `/api/treasury` | Treasury allocations |
| GET | `/api/transactions` | History |
| GET | `/api/command?q=...` | Natural language queries |

### Browser usage

```js
window.PayFlowAPI.getStatus()
window.PayFlowAPI.listAgents()
window.PayFlowAPI.listRules()
window.PayFlowAPI.command("show treasury")
window.PayFlowAPI.command("run payroll")
```

---

## Roadmap (Circle-aligned)

**Phase 1 – Current (Hackathon MVP)**  
- Real Arc + USDC transfers  
- Full Agent API surface  
- Dashboard + simulations  

**Phase 2 – Permissioned Autonomy**  
- Integrate Circle Agent Wallets  
- Spending limits & approval policies  
- Basic autonomous execution under policy  

**Phase 3 – Full Circle Stack**  
- App Kits for Send / Bridge / Swap  
- Nanopayments where relevant  
- Multi-sig / production treasury controls  

---

## Local Development

```bash
git clone https://github.com/mayneleo5/PayFlow-AI.git
cd PayFlow-AI
npm install
npx netlify dev
```

Open http://localhost:8888

---

## Security

- No private keys or seed phrases are ever requested
- All current transfers require explicit user signature
- Agent API is intentionally limited to read + simulation in this version
- Designed for future policy-controlled Agent Wallets

---

## License

MIT
