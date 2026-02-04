import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { buildComparisonPrompt } from "@/lib/gemini";
import type { ComparisonResult } from "@/lib/types";

export async function POST(request: NextRequest) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "GEMINI_API_KEY is not configured" },
      { status: 500 }
    );
  }

  try {
    const formData = await request.formData();
    const file1 = formData.get("pdf1") as File | null;
    const file2 = formData.get("pdf2") as File | null;

    if (!file1 || !file2) {
      return NextResponse.json(
        { error: "Both PDF files are required" },
        { status: 400 }
      );
    }

    if (file1.type !== "application/pdf" || file2.type !== "application/pdf") {
      return NextResponse.json(
        { error: "Both files must be PDFs" },
        { status: 400 }
      );
    }

    const maxSize = 30 * 1024 * 1024; // 30MB
    if (file1.size > maxSize || file2.size > maxSize) {
      return NextResponse.json(
        { error: "Files too large. Maximum size is 30MB each." },
        { status: 400 }
      );
    }

    const [arrayBuffer1, arrayBuffer2] = await Promise.all([
      file1.arrayBuffer(),
      file2.arrayBuffer(),
    ]);

    const base64_1 = Buffer.from(arrayBuffer1).toString("base64");
    const base64_2 = Buffer.from(arrayBuffer2).toString("base64");

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      generationConfig: {
        temperature: 0.2,
        maxOutputTokens: 8192,
        responseMimeType: "application/json",
      },
    });

    const result = await model.generateContent([
      { text: "CONTRATO 1:" },
      {
        inlineData: {
          mimeType: "application/pdf",
          data: base64_1,
        },
      },
      { text: "CONTRATO 2:" },
      {
        inlineData: {
          mimeType: "application/pdf",
          data: base64_2,
        },
      },
      { text: buildComparisonPrompt() },
    ]);

    const responseText = result.response.text();

    // Strip markdown code fences if present (fallback)
    const cleaned = responseText
      .replace(/^```(?:json)?\s*\n?/i, "")
      .replace(/\n?```\s*$/i, "")
      .trim();

    const comparison: ComparisonResult = JSON.parse(cleaned);

    return NextResponse.json(comparison);
  } catch (error) {
    console.error("Comparison error:", error);
    return NextResponse.json(
      { error: "Failed to compare the PDFs. Please try again." },
      { status: 500 }
    );
  }
}
