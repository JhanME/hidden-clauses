export function buildPrompt(): string {
  return `You are a legal contract analyst. Analyze the provided PDF contract and identify every clause.

For each clause, provide:
- "number": sequential clause number (integer)
- "title": short title for the clause
- "summary": plain-language summary of what the clause means (1-2 sentences)
- "severity": one of "safe", "warning", or "harmful"
  - "safe" = standard, fair clause
  - "warning" = potentially unfavorable, worth attention
  - "harmful" = clearly disadvantageous, abusive, or hidden clause that could harm the signer
- "explanation": why you assigned that severity

Also provide:
- "verdict": "harmful" if ANY clause has severity "harmful", otherwise "safe"
- "verdictSummary": a 1-2 sentence overall summary of the contract's fairness

IMPORTANT: Respond with ONLY valid JSON matching this exact structure, no markdown fences:
{
  "clauses": [
    {
      "number": 1,
      "title": "string",
      "summary": "string",
      "severity": "safe" | "warning" | "harmful",
      "explanation": "string"
    }
  ],
  "verdict": "safe" | "harmful",
  "verdictSummary": "string"
}`;
}
