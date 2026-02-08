import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { buildComparisonChatPrompt } from "@/lib/gemini";
import type { ChatMessage, ComparisonResult } from "@/lib/types";

export async function POST(request: NextRequest) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "GEMINI_API_KEY is not configured" },
      { status: 500 }
    );
  }

  try {
    const body = await request.json();
    const {
      message,
      contract1Text,
      contract2Text,
      comparisonResult,
      conversationHistory,
    } = body as {
      message: string;
      contract1Text: string;
      contract2Text: string;
      comparisonResult: ComparisonResult;
      conversationHistory: ChatMessage[];
    };

    if (!message || !contract1Text || !contract2Text || !comparisonResult) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-3-flash-preview",
      generationConfig: {
        temperature: 0.4,
        maxOutputTokens: 1024,
      },
    });

    const prompt = buildComparisonChatPrompt(
      message,
      contract1Text,
      contract2Text,
      comparisonResult,
      conversationHistory || []
    );

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    return NextResponse.json({ response: responseText });
  } catch (error) {
    console.error("Compare chat error:", error);
    return NextResponse.json(
      { error: "Failed to process the question. Please try again." },
      { status: 500 }
    );
  }
}
