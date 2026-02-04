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

export interface ComparisonDifference {
  aspect: string;
  contract1: string;
  contract2: string;
  favoredContract: "contract1" | "contract2" | "equal";
}

export interface ComparisonResult {
  contract1Analysis: AnalysisResult;
  contract2Analysis: AnalysisResult;
  recommendation: "contract1" | "contract2" | "similar";
  recommendationReason: string;
  keyDifferences: ComparisonDifference[];
  overallSummary: string;
}
