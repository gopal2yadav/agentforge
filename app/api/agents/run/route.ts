import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { agentId, prompt, model } = await req.json();
    if (!prompt) return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });

    const responses: Record<string, string> = {
      '1': '## Research Summary\n\n**Key Findings:**\n- The topic shows significant recent developments\n- Multiple authoritative sources confirm the trend\n- Expert consensus supports further investigation\n\n**Sources:** 12 papers, 5 reports\n\n*Completed in 1.85s | 3,200 tokens*',
      '2': '## Code Review\n\n```diff\n+ Line 15: Consider using const instead of let\n+ Line 23: Missing error handling\n+ Line 47: Potential memory leak\n```\n\n**Score:** 7.5/10 | 3 suggestions\n\n*Completed in 2.1s | 2,800 tokens*',
      '3': '## Data Analysis\n\n| Metric | Value | Change |\n|--------|-------|--------|\n| Records | 15,234 | +12.3% |\n| Avg Time | 245ms | -8.7% |\n| Errors | 0.3% | -15.2% |\n\n*Completed in 3.2s | 4,100 tokens*',
    };

    await new Promise(r => setTimeout(r, 800));

    return NextResponse.json({
      result: responses[agentId] || responses['1'],
      agentId, model: model || 'claude-sonnet-4-20250514',
      tokensUsed: Math.floor(Math.random() * 3000) + 1500,
      latencyMs: Math.floor(Math.random() * 2000) + 800,
    });
  } catch (e) {
    return NextResponse.json({ error: 'Failed to run agent' }, { status: 500 });
  }
}