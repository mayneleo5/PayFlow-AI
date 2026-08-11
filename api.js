// PayFlow AI - Agent API (Netlify Function)
// Exposes the endpoints claimed in the README so external AI agents can call them.

const agents = [
  { id: 1, name: "Payroll Agent", status: "active", description: "Executes monthly employee payments on schedule", lastAction: "2 days ago", type: "payroll", icon: "💰" },
  { id: 2, name: "Vendor Payer", status: "active", description: "Pays suppliers when invoices become due", lastAction: "4 hours ago", type: "vendor", icon: "📦" },
  { id: 3, name: "Revenue Splitter", status: "running", description: "Automatically allocates incoming USDC", lastAction: "12 min ago", type: "treasury", icon: "📊" },
  { id: 4, name: "Treasury Guardian", status: "active", description: "Monitors balances & enforces allocation rules", lastAction: "1 hour ago", type: "treasury", icon: "🛡️" },
  { id: 5, name: "Subscription Collector", status: "idle", description: "Handles recurring client subscription payments", lastAction: "3 days ago", type: "billing", icon: "🔄" },
  { id: 6, name: "Invoice Settler", status: "active", description: "Pays invoices when approval conditions are met", lastAction: "6 hours ago", type: "vendor", icon: "✅" },
  { id: 7, name: "DAO Distributor", status: "idle", description: "Distributes treasury based on governance votes", lastAction: "1 week ago", type: "dao", icon: "🏛️" },
];

const payroll = [
  { name: "Amina Okonkwo", role: "Lead Engineer", wallet: "0x3f2a...9c1e", amount: 8500 },
  { name: "Carlos Mendes", role: "Product Manager", wallet: "0x8b4d...2a7f", amount: 7200 },
  { name: "Priya Sharma", role: "Smart Contract Dev", wallet: "0x1c9e...4d3b", amount: 9000 },
  { name: "James Wilson", role: "Designer", wallet: "0x6e0f...8a2c", amount: 5800 },
  { name: "Fatima Al-Rashid", role: "Ops Lead", wallet: "0x9d2b...1f5e", amount: 6500 },
  { name: "Liam Chen", role: "Backend Engineer", wallet: "0x4a7c...3e9d", amount: 7800 },
];

const rules = [
  { id: 1, name: "Monthly Payroll", condition: "Every 31st of the month at 09:00 UTC", action: "Execute full payroll via Payroll Agent", status: "active", agent: "Payroll Agent" },
  { id: 2, name: "Vendor Net-30", condition: "Invoice due date reached + status = approved", action: "Pay invoice amount in USDC", status: "active", agent: "Vendor Payer" },
  { id: 3, name: "Revenue Split", condition: "Any incoming USDC transfer > $100", action: "Split: 25% Ops / 36% Payroll / 30% Growth / 9% Tax", status: "active", agent: "Revenue Splitter" },
  { id: 4, name: "Low Balance Guard", condition: "Payroll buffer < 2× monthly payroll", action: "Pause non-essential payments & alert", status: "active", agent: "Treasury Guardian" },
  { id: 5, name: "Subscription Billing", condition: "Client subscription renewal date", action: "Charge USDC from client wallet", status: "paused", agent: "Subscription Collector" },
];

const transactions = [
  { date: "2026-08-03 09:14", type: "Revenue Split", desc: "Incoming payment allocated", party: "Client → Multi", amount: "+12,500.00", status: "success" },
  { date: "2026-08-03 08:42", type: "Vendor", desc: "Invoice #INV-2041", party: "0x8b4d...2a7f", amount: "-3,200.00", status: "success" },
  { date: "2026-08-02 14:20", type: "Vendor", desc: "Cloud services payment", party: "0x1c9e...4d3b", amount: "-890.00", status: "success" },
  { date: "2026-08-01 11:05", type: "Payroll", desc: "July payroll run", party: "6 employees", amount: "-44,800.00", status: "success" },
  { date: "2026-07-28 16:33", type: "Revenue Split", desc: "Contract payment received", party: "Acme Corp → Multi", amount: "+28,000.00", status: "success" },
  { date: "2026-07-25 09:00", type: "Manual", desc: "Treasury top-up", party: "External → Main", amount: "+50,000.00", status: "success" },
];

const allocations = [
  { name: "Operations", pct: 25, color: "bg-sky-500" },
  { name: "Payroll Buffer", pct: 36, color: "bg-emerald-500" },
  { name: "Growth / Savings", pct: 30, color: "bg-violet-500" },
  { name: "Tax Reserve", pct: 9, color: "bg-amber-500" },
];

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Content-Type": "application/json",
};

exports.handler = async (event) => {
  // Handle CORS preflight
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers, body: "" };
  }

  const path = (event.path || "").replace(/^\/\.netlify\/functions\/api/, "").replace(/^\/api/, "") || "/";
  const method = event.httpMethod;

  // GET /
  if (path === "/" || path === "") {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        name: "PayFlow AI Agent API",
        version: "1.0.0",
        network: "Arc Testnet",
        chainId: 5042002,
        endpoints: [
          "GET  /api/status",
          "GET  /api/agents",
          "GET  /api/rules",
          "GET  /api/payroll",
          "POST /api/payroll/simulate",
          "GET  /api/treasury",
          "GET  /api/transactions",
          "GET  /api/command?q=list+agents",
        ],
        docs: "https://payflow-2026.netlify.app",
      }, null, 2),
    };
  }

  // GET /status
  if (path === "/status" && method === "GET") {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        connected: false,
        address: null,
        balanceUSDC: null,
        network: "Arc Testnet",
        chainId: 5042002,
        agentsActive: agents.filter((a) => a.status === "active" || a.status === "running").length,
        rulesActive: rules.filter((r) => r.status === "active").length,
        note: "Wallet status is only available via the browser window.PayFlowAPI object",
      }, null, 2),
    };
  }

  // GET /agents
  if (path === "/agents" && method === "GET") {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(
        agents.map((a) => ({
          id: a.id,
          name: a.name,
          status: a.status,
          type: a.type,
          description: a.description,
          lastAction: a.lastAction,
        })),
        null,
        2
      ),
    };
  }

  // GET /rules
  if (path === "/rules" && method === "GET") {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(
        rules.map((r) => ({
          id: r.id,
          name: r.name,
          status: r.status,
          condition: r.condition,
          action: r.action,
          agent: r.agent,
        })),
        null,
        2
      ),
    };
  }

  // GET /payroll
  if (path === "/payroll" && method === "GET") {
    const total = payroll.reduce((s, p) => s + p.amount, 0);
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(
        {
          employees: payroll,
          totalUSDC: total,
          nextRun: "2026-08-31",
        },
        null,
        2
      ),
    };
  }

  // POST /payroll/simulate
  if (path === "/payroll/simulate" && method === "POST") {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(
        {
          ok: true,
          message: "Payroll simulation started",
          totalUSDC: 44800,
          employees: payroll.length,
          note: "This is a simulation. Real autonomous execution is on the roadmap.",
        },
        null,
        2
      ),
    };
  }

  // GET /treasury
  if (path === "/treasury" && method === "GET") {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(
        {
          allocations,
          totals: {
            operations: 62105,
            payrollBuffer: 89430,
            growth: 74526,
            tax: 22359,
          },
        },
        null,
        2
      ),
    };
  }

  // GET /transactions
  if (path === "/transactions" && method === "GET") {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(transactions, null, 2),
    };
  }

  // GET /command?q=...
  if (path === "/command" && method === "GET") {
    const q = (event.queryStringParameters?.q || "").toLowerCase().trim();
    let result;

    if (!q) {
      result = { error: "Empty command. Use ?q=list+agents" };
    } else if (q.includes("balance") || q.includes("status") || q.includes("connected")) {
      result = {
        connected: false,
        network: "Arc Testnet",
        chainId: 5042002,
        agentsActive: agents.filter((a) => a.status === "active" || a.status === "running").length,
        note: "Connect wallet in the browser for live balance",
      };
    } else if (q.includes("agent")) {
      result = agents.map((a) => ({ id: a.id, name: a.name, status: a.status }));
    } else if (q.includes("rule")) {
      result = rules.map((r) => ({ id: r.id, name: r.name, status: r.status }));
    } else if (q.includes("payroll") || q.includes("pay employees")) {
      result = { ok: true, message: "Payroll simulation started", totalUSDC: 44800 };
    } else if (q.includes("treasury") || q.includes("allocation")) {
      result = { allocations, totals: { operations: 62105, payrollBuffer: 89430, growth: 74526, tax: 22359 } };
    } else if (q.includes("transaction") || q.includes("history") || q.includes("tx")) {
      result = transactions;
    } else if (q.includes("help")) {
      result = {
        commands: [
          "show balance",
          "list agents",
          "list rules",
          "run payroll",
          "show treasury",
          "list transactions",
        ],
      };
    } else {
      result = {
        error: "Unknown command. Try: show balance, list agents, list rules, run payroll, show treasury",
      };
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(result, null, 2),
    };
  }

  // 404
  return {
    statusCode: 404,
    headers,
    body: JSON.stringify({
      error: "Not found",
      path,
      available: [
        "/api",
        "/api/status",
        "/api/agents",
        "/api/rules",
        "/api/payroll",
        "/api/payroll/simulate",
        "/api/treasury",
        "/api/transactions",
        "/api/command?q=...",
      ],
    }, null, 2),
  };
};
