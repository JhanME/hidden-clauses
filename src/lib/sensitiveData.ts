import type { SensitiveDataMatch, SensitiveDataScanResult } from "./types";

// Extended PII patterns for Spanish documents
const patterns: { type: SensitiveDataMatch["type"]; regex: RegExp; redact: (match: string) => string }[] = [
  // DNI/NIE español (8 dígitos + letra o X/Y/Z + 7 dígitos + letra)
  {
    type: "dni",
    regex: /\b([0-9]{8}[A-Za-z]|[XYZxyz][0-9]{7}[A-Za-z])\b/g,
    redact: (m) => m.slice(0, 3) + "****" + m.slice(-1),
  },
  // Teléfonos españoles (6XX XXX XXX, 7XX XXX XXX, 9XX XXX XXX)
  {
    type: "phone",
    regex: /\b(?:\+34\s?)?[679]\d{2}[\s.-]?\d{3}[\s.-]?\d{3}\b/g,
    redact: (m) => m.slice(0, 3) + "***" + m.slice(-3),
  },
  // Teléfonos internacionales
  {
    type: "phone",
    regex: /\b\+\d{1,3}[\s.-]?\d{2,4}[\s.-]?\d{3,4}[\s.-]?\d{3,4}\b/g,
    redact: (m) => m.slice(0, 4) + "****" + m.slice(-3),
  },
  // Emails
  {
    type: "email",
    regex: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/g,
    redact: (m) => {
      const [local, domain] = m.split("@");
      return local.slice(0, 2) + "***@" + domain;
    },
  },
  // IBAN español (ES + 22 dígitos)
  {
    type: "bankAccount",
    regex: /\b[A-Z]{2}\d{2}[\s]?\d{4}[\s]?\d{4}[\s]?\d{2}[\s]?\d{10}\b/gi,
    redact: (m) => m.slice(0, 6) + "****" + m.slice(-4),
  },
  // IBAN formato con espacios
  {
    type: "bankAccount",
    regex: /\b[A-Z]{2}\d{2}(?:\s?\d{4}){5}\b/gi,
    redact: (m) => m.slice(0, 6) + " **** **** " + m.slice(-4),
  },
  // Tarjetas de crédito (16 dígitos)
  {
    type: "creditCard",
    regex: /\b(?:\d{4}[\s.-]?){3}\d{4}\b/g,
    redact: (m) => "**** **** **** " + m.replace(/[\s.-]/g, "").slice(-4),
  },
  // Direcciones españolas (Calle, Avenida, Plaza, etc.)
  {
    type: "address",
    regex: /\b(?:C\/|Calle|Avda\.?|Avenida|Plaza|Pza\.?|Paseo|Camino|Carretera|Ctra\.?)[\s]+[A-Za-zÀ-ÿ\s]+,?\s*(?:n[º°]?|núm\.?|número)?\s*\d+(?:[\s,]+\d+[º°]?(?:\s*[A-Za-z])?)?\b/gi,
    redact: (m) => {
      const parts = m.split(/\s+/);
      if (parts.length > 2) {
        return parts[0] + " " + parts[1] + " ***";
      }
      return m.slice(0, 8) + "***";
    },
  },
  // Código postal español
  {
    type: "address",
    regex: /\b\d{5}\s+[A-Za-zÀ-ÿ]+(?:\s+[A-Za-zÀ-ÿ]+)?\b/g,
    redact: (m) => m.slice(0, 2) + "***" + m.slice(-3),
  },
  // Nombres propios con tratamiento (D., Dña., Don, Doña)
  {
    type: "name",
    regex: /\b(?:D\.|Dña\.|Don|Doña|Sr\.|Sra\.|Srta\.)\s+[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+(?:\s+[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+){1,3}\b/g,
    redact: (m) => {
      const parts = m.split(/\s+/);
      return parts[0] + " " + parts[1]?.slice(0, 1) + "***";
    },
  },
];

export function scanSensitiveData(text: string): SensitiveDataScanResult {
  const matches: SensitiveDataMatch[] = [];
  const seenValues = new Set<string>();

  for (const { type, regex, redact } of patterns) {
    // Reset regex lastIndex
    regex.lastIndex = 0;
    let match;
    while ((match = regex.exec(text)) !== null) {
      const value = match[0];
      // Avoid duplicates
      if (!seenValues.has(value)) {
        seenValues.add(value);
        matches.push({
          type,
          value,
          redacted: redact(value),
        });
      }
    }
  }

  const typeCounts = matches.reduce((acc, m) => {
    acc[m.type] = (acc[m.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const typeLabels: Record<SensitiveDataMatch["type"], string> = {
    dni: "DNI/NIE",
    phone: "teléfonos",
    email: "emails",
    bankAccount: "cuentas bancarias",
    creditCard: "tarjetas de crédito",
    address: "direcciones",
    name: "nombres",
  };

  const summaryParts = Object.entries(typeCounts).map(
    ([type, count]) => `${count} ${typeLabels[type as SensitiveDataMatch["type"]]}`
  );

  return {
    hasSensitiveData: matches.length > 0,
    matches,
    summary: matches.length > 0
      ? `Se detectaron: ${summaryParts.join(", ")}`
      : "No se detectaron datos sensibles",
  };
}
