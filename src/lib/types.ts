export interface Clause {
  number: number;
  title: string;
  summary: string;
  severity: "safe" | "warning" | "harmful";
  explanation: string;
  textSnippets: string[];
}

export interface AnalysisResult {
  clauses: Clause[];
  verdict: "safe" | "harmful";
  verdictSummary: string;
}

export interface ValidationResult {
  isContract: boolean;
  confidence: number;
  documentType: string;
  reason: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export interface SensitiveDataMatch {
  type: "dni" | "phone" | "email" | "bankAccount" | "creditCard" | "address" | "name";
  value: string;
  redacted: string;
}

export interface SensitiveDataScanResult {
  hasSensitiveData: boolean;
  matches: SensitiveDataMatch[];
  summary: string;
}
