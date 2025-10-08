import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-pro" });

export async function POST(req: NextRequest) {
  try {
    const { message }: { message: string } = await req.json();

    const result = await model.generateContent(message);
    const response = result.response.text().trim();

    return NextResponse.json({ reply: response });
  } catch (err) {
    console.error("Gemini error:", err);
    return NextResponse.json(
      { error: "Failed to get response" },
      { status: 500 }
    );
  }
}