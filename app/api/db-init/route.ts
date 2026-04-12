import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Create tables using raw SQL - this works at runtime without prisma db push
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "Agent" (
        "id" TEXT NOT NULL DEFAULT gen_random_uuid()::text,
        "name" TEXT NOT NULL,
        "role" TEXT NOT NULL DEFAULT '',
        "goal" TEXT NOT NULL DEFAULT '',
        "backstory" TEXT NOT NULL DEFAULT '',
        "model" TEXT NOT NULL DEFAULT 'claude-sonnet-4',
        "tools" TEXT[] DEFAULT '{}',
        "status" TEXT NOT NULL DEFAULT 'active',
        "runs" INTEGER NOT NULL DEFAULT 0,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT "Agent_pkey" PRIMARY KEY ("id")
      )
    `);

    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "Flow" (
        "id" TEXT NOT NULL DEFAULT gen_random_uuid()::text,
        "name" TEXT NOT NULL,
        "description" TEXT NOT NULL DEFAULT '',
        "trigger" TEXT NOT NULL DEFAULT 'Manual',
        "steps" JSONB NOT NULL DEFAULT '[]',
        "status" TEXT NOT NULL DEFAULT 'active',
        "runs" INTEGER NOT NULL DEFAULT 0,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT "Flow_pkey" PRIMARY KEY ("id")
      )
    `);

    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "Crew" (
        "id" TEXT NOT NULL DEFAULT gen_random_uuid()::text,
        "name" TEXT NOT NULL,
        "config" JSONB NOT NULL DEFAULT '{}',
        "status" TEXT NOT NULL DEFAULT 'active',
        "runs" INTEGER NOT NULL DEFAULT 0,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT "Crew_pkey" PRIMARY KEY ("id")
      )
    `);

    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "Automation" (
        "id" TEXT NOT NULL DEFAULT gen_random_uuid()::text,
        "name" TEXT NOT NULL,
        "trigger" TEXT NOT NULL,
        "agent" TEXT NOT NULL,
        "status" TEXT NOT NULL DEFAULT 'active',
        "runs" INTEGER NOT NULL DEFAULT 0,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT "Automation_pkey" PRIMARY KEY ("id")
      )
    `);

    // Verify tables exist
    const agents = await prisma.$queryRawUnsafe('SELECT COUNT(*) as count FROM "Agent"');
    const flows = await prisma.$queryRawUnsafe('SELECT COUNT(*) as count FROM "Flow"');

    return NextResponse.json({
      success: true,
      message: 'Database tables created successfully!',
      tables: ['Agent', 'Flow', 'Crew', 'Automation'],
      counts: { agents: agents[0].count, flows: flows[0].count }
    });
  } catch (e) {
    return NextResponse.json({ success: false, error: e.message }, { status: 500 });
  }
}