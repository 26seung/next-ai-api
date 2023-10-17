import { OpenAIStream, StreamingTextResponse } from "ai";
import { NextResponse } from "next/server";
import OpenAI from "openai";
import { ChatCompletionMessage } from "openai/resources/chat/index.mjs";
// import { Configuration, OpenAIApi } from 'openai-edge'

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

// IMPORTANT! Set the runtime to edge
export const runtime = "edge";

export async function POST(req: Request) {
  // Extract the `messages` from the body of the request
  const { messages } = await req.json();

  // Exception Process
  if (!openai.apiKey) {
    return new NextResponse("OpenAI API Key not configured.", {
      status: 500,
    });
  }
  if (!messages) {
    return new NextResponse("Messages are required", { status: 400 });
  }

  // Ask OpenAI for a streaming chat completion given the prompt
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [instructionMessage, ...messages],
    stream: true,
  });
  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);
  // Respond with the stream
  return new StreamingTextResponse(stream);
}
