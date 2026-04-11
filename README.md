# Nexus — AI Agent Orchestration Platform

> Self-hosted platform for building, deploying, and managing AI agent workflows.

## 🚀 Live

**[agentforcecrew.com](https://agentforcecrew.com)**

## 🏗️ Stack

- **Framework:** Next.js 15.5 + TypeScript
- **Auth:** Clerk
- **Database:** PostgreSQL (Prisma ORM)
- **Billing:** Stripe
- **UI:** Tailwind CSS + React Flow (DAG editor)
- **Hosting:** Vercel

## 📋 Features

- **Agent Management** — Create, configure, and monitor AI agents
- **Visual Flow Editor** — Drag-and-drop DAG editor for multi-agent workflows
- **Memory System** — Persistent agent memory with scoped retrieval
- **Billing** — Stripe-powered subscription plans (Free / Pro / Enterprise)
- **API** — RESTful API for programmatic agent execution
- **Real-time Dashboard** — Execution metrics, token usage, latency tracking

## 🔧 Setup

1. Clone the repo
2. `npm install`
3. Configure environment variables (Clerk, Stripe, Postgres)
4. `npx prisma generate && npx prisma db push`
5. `npm run dev`

## 📄 License

MIT
