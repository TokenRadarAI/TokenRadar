import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

console.log(process.env.GROQ_API_KEY)

const openai = new OpenAI({
  apiKey: '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',
  baseURL: 'https://api.groq.com/openai/v1',
});



export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { token, metrics } = body;

    const messages = [
      {
        role: "system",
        content: "You are an expert crypto analyst. Your task is to analyze new crypto tokens using on-chain activity, social mentions, dev activity, and whale behavior. Tell everything strictly and to the point, make a real analysis of what you have been given.",
      },
      {
        role: "user",
        content: `Analyze the token "${token}" with these metrics:\n\n${JSON.stringify(metrics, null, 2)}. Based on whale activity, liquidity, developers, and social discussions – assess whether a short-term or medium-term investment is worthwhile.`,
      },
    ];

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