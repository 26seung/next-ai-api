import { NextResponse } from "next/server";
import OpenAI from "openai";

// API KEY 가져오기
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // This is also the default, can be omitted
});

//  API POST
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { prompt, n = 1, size = "512x512" } = body;

    // Exception Process
    if (!openai.apiKey) {
      return new NextResponse("OpenAI API Key not configured.", {
        status: 500,
      });
    }
    if (!prompt) {
      return new NextResponse("Prompt is required", { status: 400 });
    }
    if (!n) {
      return new NextResponse("n is required", { status: 400 });
    }
    if (!size) {
      return new NextResponse("size is required", { status: 400 });
    }

    // API 전송
    const response = await openai.images.generate({
      prompt,
      n: parseInt(n, 10),
      size: size,
    });
    console.log("[IMAGE_MESSAGE] : ", response.data);
    return NextResponse.json(response.data);
  } catch (error) {
    console.log("[IMAGE_ERROR] : ", error);
    return new NextResponse("IMAGE Error", { status: 500 });
  }
}

// https://www.npmjs.com/package/openai
