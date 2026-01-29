export interface Clause {
  number: number;
  title: string;
  summary: string;
  severity: "safe" | "warning" | "harmful";
  explanation: string;
}

export interface AnalysisResult {
  clauses: Clause[];
  verdict: "safe" | "harmful";
  verdictSummary: string;
}
