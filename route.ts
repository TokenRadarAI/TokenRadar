import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { ChatCompletionMessageParam } from 'openai/resources';

const openai = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: 'https://api.groq.com/openai/v1',
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { token, metrics } = body;

const messages = [
  {
    role: "system",
    content: "You are an expert crypto analyst. Your task is to analyze new crypto tokens ...",
  },
  {
    role: "user",
    content: `Analyze the token "${token}" with these metrics:\n\n${JSON.stringify(metrics, null, 2)}...`,
  },
] as const satisfies ChatCompletionMessageParam[];

const chatCompletion = await openai.chat.completions.create({
  model: "llama3-70b-8192",
  messages,
});

    return NextResponse.json({ result: chatCompletion.choices[0].message.content });
  } catch (error) {
    console.error("❌ API Error:", error);
    return NextResponse.json({ error: "Failed to generate analysis" }, { status: 500 });
  }
}