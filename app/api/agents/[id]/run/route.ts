import { NextRequest, NextResponse } from 'next/server';

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const { input, systemPrompt, model } = await req.json();

    if (!input) {
      return NextResponse.json({ error: 'Input is required' }, { status: 400 });
    }

    // Demo agents for when no DB is connected
    const demoAgents: Record<string, { name: string; systemPrompt: string; model: string }> = {
      '1': { name: 'Research Agent', systemPrompt: 'You are a research assistant. Provide comprehensive, well-structured research summaries with citations.', model: 'claude-sonnet-4-20250514' },
      '2': { name: 'Code Reviewer', systemPrompt: 'You are an expert code reviewer. Analyze code for bugs, security issues, performance problems, and suggest improvements.', model: 'claude-sonnet-4-20250514' },
      '3': { name: 'Data Analyst', systemPrompt: 'You are a data analyst. Process data, generate insights, create summaries, and suggest visualizations.', model: 'claude-sonnet-4-20250514' },
    };

    const agent = demoAgents[id];
    const agentSystemPrompt = systemPrompt || agent?.systemPrompt || 'You are a helpful AI assistant.';
    const agentModel = model || agent?.model || 'claude-sonnet-4-20250514';
    const agentName = agent?.name || 'Custom Agent';

    // If no Anthropic API key, return a simulated response
    if (!ANTHROPIC_API_KEY) {
      const startTime = Date.now();
      const simulatedResponse = generateDemoResponse(agentName, input);
      return NextResponse.json({
        id: 'exec_' + Date.now(),
        agentId: id,
        agentName,
        status: 'COMPLETED',
        input,
        output: simulatedResponse,
        tokensUsed: Math.floor(Math.random() * 3000) + 500,
        latencyMs: Date.now() - startTime + Math.floor(Math.random() * 2000),
        model: agentModel,
        timestamp: new Date().toISOString(),
        demo: true,
      });
    }

    // Real Anthropic API call
    const startTime = Date.now();
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: agentModel,
        max_tokens: 4096,
        system: agentSystemPrompt,
        messages: [{ role: 'user', content: input }],
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      return NextResponse.json({ error: 'AI API error', details: error }, { status: 502 });
    }

    const data = await response.json();
    const output = data.content?.[0]?.text || '';
    const tokensUsed = (data.usage?.input_tokens || 0) + (data.usage?.output_tokens || 0);

    return NextResponse.json({
      id: 'exec_' + Date.now(),
      agentId: id,
      agentName,
      status: 'COMPLETED',
      input,
      output,
      tokensUsed,
      latencyMs: Date.now() - startTime,
      model: agentModel,
      timestamp: new Date().toISOString(),
      demo: false,
    });
  } catch (error: any) {
    return NextResponse.json({ error: 'Execution failed', message: error.message }, { status: 500 });
  }
}

function generateDemoResponse(agentName: string, input: string): string {
  const responses: Record<string, string> = {
    'Research Agent': `## Research Summary\n\nBased on analysis of "${input.substring(0, 100)}":\n\n**Key Findings:**\n1. The topic has significant relevance in current discourse\n2. Multiple authoritative sources confirm the main thesis\n3. Recent developments suggest evolving understanding\n\n**Detailed Analysis:**\nThe research indicates several important trends and patterns. Cross-referencing multiple databases and publications reveals a consistent narrative that supports further investigation.\n\n**Recommendations:**\n- Continue monitoring developments in this area\n- Consider conducting primary research for deeper insights\n- Review peer-reviewed publications for validation\n\n*Note: This is a demo response. Connect your Anthropic API key for real AI-powered research.*`,
    'Code Reviewer': `## Code Review Report\n\n**Input analyzed:** ${input.substring(0, 80)}...\n\n**Findings:**\n- **Security:** No critical vulnerabilities detected in this snippet\n- **Performance:** Consider memoization for repeated computations\n- **Style:** Code follows standard conventions\n- **Maintainability:** Good separation of concerns\n\n**Suggestions:**\n1. Add input validation for edge cases\n2. Consider adding unit tests for core logic\n3. Document public-facing functions\n\n*Note: This is a demo response. Connect your Anthropic API key for real code reviews.*`,
    'Data Analyst': `## Data Analysis Report\n\n**Query:** ${input.substring(0, 80)}...\n\n**Summary Statistics:**\n- Processed records: 1,247\n- Anomalies detected: 3\n- Confidence level: 94.2%\n\n**Key Insights:**\n1. Primary trend shows 12% growth quarter-over-quarter\n2. Seasonal patterns detected with peak in Q4\n3. Correlation coefficient of 0.87 between key variables\n\n**Visualization Recommendations:**\n- Time series chart for trend analysis\n- Scatter plot for correlation visualization\n- Heatmap for seasonal patterns\n\n*Note: This is a demo response. Connect your Anthropic API key for real data analysis.*`,
  };
  return responses[agentName] || `## Agent Response\n\nProcessed input: "${input.substring(0, 100)}"\n\nThis is a demo response from the Nexus AI Platform. Connect your Anthropic API key in Vercel environment variables to enable real AI agent execution.\n\n*Agent: ${agentName}*`;
}
