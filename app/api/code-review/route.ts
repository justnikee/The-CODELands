import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "https://api.deepseek.com/v1",
  apiKey: process.env.DEEPSEEK_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("Received Data:", body);

    if (!body.code || !body.language) {
      return NextResponse.json(
        { error: "Missing 'code' or 'language' in request body" },
        { status: 400 }
      );
    }

    const userPrompt = `Review this ${body.language} code and provide suggestions:\n\n${body.code}`;

    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: userPrompt }],
      model: "deepseek-chat",
    });

    console.log(completion.choices[0]?.message?.content);
    const response = completion.choices[0]?.message?.content || "No response";

    return NextResponse.json({ success: true, data: response }, { status: 200 });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
