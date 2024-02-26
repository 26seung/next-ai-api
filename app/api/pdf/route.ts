import { getUserId } from "@/data/data";
import { db } from "@/lib/db";
import { chats, pdf } from "@/lib/db/schema";
import { s3IntoPinecone } from "@/lib/pinecone";
import { getS3Url } from "@/lib/s3";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: Request) {
  try {
    const { file_key, file_name } = await req.json();
    const userId = await getUserId();
    let chatId: string;

    const docs = await s3IntoPinecone(file_key);
    // 추후 db작업

    const chat_id = await db
      .insert(chats)
      .values({
        id: uuidv4(),
        type: "pdf",
        content: file_name,
        userId,
      })
      .returning({ insertedId: chats.id });

    chatId = chat_id[0].insertedId;

    await db.insert(pdf).values({
      pdfName: file_name,
      pdfUrl: getS3Url(file_key),
      chatId,
      fileKey: file_key,
    });

    return NextResponse.json({ docs });
  } catch (error) {
    console.log("[PDF_ERROR] : ", error);
    return new NextResponse("PDF Error", { status: 500 });
  }
}
