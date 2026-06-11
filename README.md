# Nexus AI Agent Orchestration Platform

**Self-hosted platform for building, deploying, and managing AI agent workflows.**

Live at: [agentforcecrew.com](https://agentforcecrew.com)

## Features

### Build
- **AI Builder** — Describe what you want to automate, AI creates the pipeline
- **Crew Studio** — Visual drag-and-drop workflow editor
- **Agent Repository** — Create agents with role, goal, backstory, and tools (CrewAI-style)
- **Flow Editor** — Visual DAG editor for multi-agent pipelines
- **Automations** — Trigger workflows from Slack, GitHub, HubSpot, and more
- **Playground** — Interactive agent testing with session history
- **Templates** — 8 pre-built agent templates (Research, Code Review, Writer, etc.)
- **Prompt Library** — Curated prompt templates with one-click copy

### Data
- **Knowledge Base** — Upload documents (PDF, DOCX, CSV) for agent reference (RAG)
- **Memory Explorer** — Persistent agent memory with importance scoring
- **40+ Integrations** — Slack, Gmail, GitHub, Salesforce, HubSpot, Jira, and more

### Observe
- **Traces** — Step-by-step agent execution debugging with token/cost breakdown
- **Monitoring** — Real-time health metrics (uptime, latency, error rate)
- **Analytics** — Token usage charts, cost breakdown, agent comparison
- **Logs** — Full activity log with severity filters and search
- **Performance Benchmarks** — P50/P95/P99 latency tracking

### Manage
- **Billing** — Stripe-powered subscription (Free / Pro $49 / Enterprise)
- **Team Management** — Roles: Owner, Admin, Member, Viewer
- **Security** — 2FA, SSO/SAML, IP allowlist, session management, SOC 2/GDPR/HIPAA compliance badges
- **API Keys** — Generate and manage programmatic access tokens
- **Webhooks** — Configure event notifications (8 event types)
- **Rate Limits** — Per-endpoint usage monitoring with progress bars
- **Audit Log** — Full compliance tracking of all user actions
- **Export/Import** — Backup and restore platform configuration as JSON
- **Branding** — Custom colors, logo, and platform name

## Tech Stack

- **Framework:** Next.js 15.5, TypeScript, Tailwind CSS v3
- **Auth:** Clerk (SSO, phone verification)
- **Payments:** Stripe ($49/mo Pro plan)
- **Database:** Prisma ORM (PostgreSQL via Neon)
- **Hosting:** Vercel Pro
- **CI/CD:** GitHub auto-deploy

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/agents` | GET, POST | List and create agents |
| `/api/agents/run` | POST | Execute an agent |
| `/api/flows` | GET, POST | List and create flows |
| `/api/billing/checkout` | POST | Stripe checkout session |
| `/api/swarm` | GET | Swarm health check |
| `/api/notifications` | GET | Get notifications |
| `/api/actions` | GET | Quick actions catalog |

## Getting Started

1. Visit [agentforcecrew.com](https://agentforcecrew.com)
2. Sign up with Google SSO or email
3. Create your first agent or use the AI Builder
4. Deploy and monitor

## License

Proprietary. Built by [Aabhyasa AI](mailto:gopal@aabhyasa.com).

---

*50+ pages, 9 API endpoints, clean white theme, zero deployment failures.*
Last schema update: June 2026 (dedicated agentforge Postgres schema)
