# PayFlow AI

**AI-assisted treasury and payment automation on Arc Testnet**

PayFlow AI is a hackathon MVP for programmable USDC payments. It combines an Arc Testnet wallet dashboard with a browser-based agent interface and a Netlify serverless API for payment rules, treasury views, payroll simulation, and transaction data.

Built for the **Encode Club × Arc Programmable Money Hackathon**.

> **Testnet only. No real funds.**

## Live Demo

**https://payflow-2026.netlify.app**

## What is actually working

| Capability | Status | Notes |
|---|---|---|
| EVM wallet connection | ✅ Live | Connects through `window.ethereum` and switches to Arc Testnet |
| Live Arc balance | ✅ Live | Reads the connected wallet's native Arc balance (USDC is the native gas asset) |
| USDC/native-asset transfer | ✅ Live | User signs the transaction in their wallet; transaction hash links to the explorer |
| Dashboard | ✅ Live | Wallet state + product UI |
| Browser Agent API | ✅ Live | `window.PayFlowAPI` exposes read/query operations and payroll simulation |
| HTTP Agent API | ✅ Live | Netlify Function endpoints for demo/query workflows |
| Payment rules | 🟡 Demo | UI/data model is present; autonomous execution is not yet enabled |
| Payroll | 🟡 Simulation | No automatic real payroll execution |
| Treasury / revenue split | 🟡 Demo | Dashboard logic/data model; no autonomous settlement |
| Autonomous agent execution | 🟡 Planned | Intentionally not represented as live functionality |

## Architecture

```text
User / External Agent
        │
        ├──────────────► Browser Agent API
        │
        ▼
PayFlow AI Dashboard
        │
        ├── Wallet connection (ethers.js)
        │
        ├── Read Arc balance
        │
        └── User-signed USDC transfer
                    │
                    ▼
               Arc Testnet

External HTTP clients
        │
        ▼
Netlify Functions
        ├── status
        ├── agents
        ├── rules
        ├── payroll simulation
        ├── treasury demo
        └── transaction data
```

## Tech Stack

- **Blockchain:** Arc Testnet — Chain ID `5042002`
- **Asset:** USDC / native gas asset on Arc Testnet
- **Frontend:** HTML, Tailwind CSS, ethers.js v6
- **Backend:** Netlify Functions
- **Deployment:** Netlify

## Agent API

Base URL:

`https://payflow-2026.netlify.app/api`

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api` | API overview |
| GET | `/api/status` | Platform status |
| GET | `/api/agents` | Demo agent list |
| GET | `/api/rules` | Demo payment rules |
| GET | `/api/payroll` | Payroll demo data |
| POST | `/api/payroll/simulate` | Run payroll simulation |
| GET | `/api/treasury` | Treasury demo data |
| GET | `/api/transactions` | Demo transaction history |
| GET | `/api/command?q=...` | Natural-language-style demo queries |

### Browser API

When the dashboard is open:

```js
window.PayFlowAPI.getStatus()
window.PayFlowAPI.listAgents()
window.PayFlowAPI.listRules()
window.PayFlowAPI.command("show treasury")
```

These browser methods are designed for demonstration and inspection. They do **not** claim autonomous authority over a user's wallet.

## Reproduce the demo

```bash
git clone https://github.com/mayneleo5/PayFlow-AI.git
cd PayFlow-AI
npm install
npx netlify dev
```

Then open `http://localhost:8888`.

### Wallet flow

1. Open the dashboard in a browser with an injected EVM wallet.
2. Connect the wallet.
3. Approve the Arc Testnet network switch.
4. Use the dashboard to read the live balance.
5. For the transfer demo, enter a recipient and amount.
6. Approve the transaction in the wallet.
7. Open the returned Arc explorer transaction link.

## Security

- Never commit `.env` files, private keys, seed phrases, or API secrets.
- The demo does not request or store private keys.
- Transactions are user-signed through the connected wallet.
- The HTTP API contains demo/simulation endpoints; it should **not** be treated as an authenticated production payment execution service.

## Hackathon scope

The current submission deliberately distinguishes between **working on-chain wallet functionality** and **simulated automation**. The next implementation milestone is a permissioned agent execution layer with explicit spending limits, approval policies, replay protection, and auditable transaction execution.

## Roadmap

### Phase 1 — Current
- Wallet connection
- Arc Testnet balance
- User-signed transfers
- Dashboard
- Browser + HTTP agent API
- Payroll/rules/treasury demonstrations

### Phase 2
- Permissioned autonomous execution
- Scheduled and condition-based payments
- Spending limits
- Approval policies
- On-chain execution records

### Phase 3
- Multi-signature treasury controls
- Revenue splitting
- Cross-chain flows
- Deeper Circle/Agent Stack integration
- Production-grade monitoring and risk controls

## License

MIT
