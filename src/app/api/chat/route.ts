import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { buildChatPrompt } from "@/lib/gemini";
import type { ChatMessage, AnalysisResult } from "@/lib/types";

interface ChatRequestBody {
  message: string;
  contractText: string;
  analysisResult: AnalysisResult;
  conversationHistory: ChatMessage[];
}

export async function POST(request: NextRequest) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "GEMINI_API_KEY is not configured" },
      { status: 500 }
    );
  }

  try {
    const body: ChatRequestBody = await request.json();
    const { message, contractText, analysisResult, conversationHistory } = body;

    if (!message || !contractText || !analysisResult) {
      return NextResponse.json(
        { error: "Missing required fields: message, contractText, analysisResult" },
        { status: 400 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-3-pro-preview",
      generationConfig: {
        temperature: 0.4,
        maxOutputTokens: 8192,
      },
    });

    const prompt = buildChatPrompt(
      message,
      contractText,
      analysisResult,
      conversationHistory || []
    );

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    return NextResponse.json({ response: responseText });
  } catch (error) {
    console.error("Chat error:", error);
    return NextResponse.json(
      { error: "Failed to process the message. Please try again." },
      { status: 500 }
    );
  }
}
