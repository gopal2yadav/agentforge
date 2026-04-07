export const maxDuration = 60;

// Rate limit: wait between API calls to avoid 5 req/min limit
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function POST(req) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return Response.json({ error: "ANTHROPIC_API_KEY not configured" }, { status: 500 });
  }

  // Rate limit protection: wait 13 seconds between calls
  // This ensures we stay under 5 requests/minute
  const now = Date.now();
  if (!global.__lastApiCall) global.__lastApiCall = 0;
  const elapsed = now - global.__lastApiCall;
  if (elapsed < 13000) {
    await delay(13000 - elapsed);
  }
  global.__lastApiCall = Date.now();

  try {
    const body = await req.json();
    const { messages, tools, system } = body;

    const anthropicBody = {
      model: "claude-sonnet-4-20250514",
      max_tokens: 4096,
      messages,
    };
    if (system) anthropicBody.system = system;
    if (tools && tools.length) anthropicBody.tools = tools;

    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify(anthropicBody),
    });

    const data = await res.json();
    if (!res.ok) {
      return Response.json({ error: data?.error?.message || "API error" }, { status: res.status });
    }

    return Response.json(data);
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
