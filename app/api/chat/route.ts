import { dbCreateChat, dbSaveMessages, dbGetUserId } from "@/data/data";
import { getPinecone } from "@/lib/context";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { NextResponse } from "next/server";
import OpenAI from "openai";

// API KEY 가져오기
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// error :: (Module not found: Can't resolve 'crypto') ::
// (runtime = "edge") 와 (getServerSession) 의 충돌로 보임
// export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const { messages, chat_id, fileKey } = await req.json();
    const userId = await dbGetUserId();
    let chatId: string;
    let context;
    if (!userId) {
      return NextResponse.json([]);
    }
    if (chat_id) {
      chatId = chat_id;
    } else {
      const chat_id = await dbCreateChat({
        type: "chat",
        content: messages[0].content,
        userId,
      });
      chatId = chat_id;
    }
    // 입력 질문
    const lastMessage = messages[messages.length - 1].content;
    if (fileKey) {
      context = await getPinecone(lastMessage, fileKey);
    }

    // AI 의 역활을 설정
    const prompt = {
      role: "system",
      content: `AI assist is a brand new, powerful, human-like artificial intelligence.
        The traits of AI include expert knowledge, helpfulness, cleverness, and articulateness.
        AI is a well-behaved and well-mannered friend.
        AI is always friendly, kind, and inspiring, and he is eager to provide vivid and thoughtful responses to the user.
        AI has the sum of all knowledge in their brain, and is able to accurately answer nearly any question about any topic in conversation.
        START CONTEXT BLOCK
        ${context}
        END OF CONTEXT BLOCK
        AI Assist considers a CONTEXT BLOCK for every conversation presented to the conversation if there is content inside the CONTEXT BLOCK.
        If your question isn't answered in context, our AI assistant will answer as kindly and in detail as possible.
        AI assist will not apologize for previous responses, but instead will indicated new information was gained.
        AI assist will not invent anything that is not drawn directly from the context.
        AI Assist is an assistant used in Korea, and all answers are for Koreans.
        `,
    };

    // Exception (api키 & 내용) 없는경우
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
      // model: "gpt-4-turbo-preview",
      model: "gpt-3.5-turbo",
      messages: [prompt, ...messages],
      stream: true,
    });
    // Convert the response into a friendly text-stream
    const stream = OpenAIStream(response, {
      onStart: async () => {
        await dbSaveMessages({
          chatId,
          content: lastMessage,
          role: "user",
        });
      },
      onCompletion: async (completion: string) => {
        await dbSaveMessages({
          chatId,
          content: completion,
          role: "system",
        });
      },
    });
    // Respond with the stream
    return new StreamingTextResponse(stream);
  } catch (error) {
    // Check if the error is an APIError
    if (error instanceof OpenAI.APIError) {
      const { name, status, headers, message } = error;
      return NextResponse.json({ name, status, headers, message }, { status });
    } else {
      throw error;
    }
  }
}

// https://vercel.com/blog/introducing-the-vercel-ai-sdk
