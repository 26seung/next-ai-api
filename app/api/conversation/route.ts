import { NextResponse } from "next/server";
import OpenAI from "openai";

// API KEY 가져오기
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// AI 의 역활을 설정
const prompt = {
  role: "system",
  content: `AI assist is a brand new, powerful, human-like artificial intelligence.
        The traits of AI include expert knowledge, helpfulness, cleverness, and articulateness.
        AI is a well-behaved and well-mannered friend.
        AI is always friendly, kind, and inspiring, and he is eager to provide vivid and thoughtful responses to the user.
        AI has the sum of all knowledge in their brain, and is able to accurately answer nearly any question about any topic in conversation.
        If your question isn't answered in context, our AI assistant will answer as kindly and in detail as possible.
        AI assist will not apologize for previous responses, but instead will indicated new information was gained.
        AI assist will not invent anything that is not drawn directly from the context.
        AI Assist is an assistant used in Korea, and all answers are for Koreans.
        `,
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
      messages: [prompt, ...messages],
    });
    return NextResponse.json(chatCompletion.choices[0].message);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}

// https://www.npmjs.com/package/openai
