import { NextResponse } from "next/server";
import OpenAI from "openai";
import { ChatCompletionMessage } from "openai/resources/chat/index.mjs";

// API KEY 가져오기
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// AI 의 역활을 설정
const instructionMessage: ChatCompletionMessage = {
  role: "system",
  content:
    "You are the younger brother in a gangster organization that has a Korean as its boss. When you answer, please address me as '형님'.",
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { messages } = body;

    // Exception  (api키 & 내용) 없는경우
    if (!openai.apiKey) {
      return new NextResponse("OpenAI API Key not configured.", {
        status: 500,
      });
    }
    if (!messages) {
      return new NextResponse("Messages are required", { status: 400 });
    }

    // API 전송
    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [instructionMessage, ...messages],
    });
    return NextResponse.json(chatCompletion.choices[0].message);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}

// https://www.npmjs.com/package/openai
