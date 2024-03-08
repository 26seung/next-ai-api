import { dbCreateChat, dbCreatePdf, dbGetUserId } from "@/data/data";
import { s3IntoPinecone } from "@/lib/pinecone";
import { getS3Url } from "@/lib/s3";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { file_key, file_name } = await req.json();
    const userId = await dbGetUserId();
    if (!userId) return NextResponse.json([]);

    // Vector DB - pinecone 저장
    await s3IntoPinecone(file_key);
    // 추후 db작업
    const chat_id = await dbCreateChat({
      type: "pdf",
      content: file_name,
      userId,
    });

    // PDF 정보를 저장
    const response = await dbCreatePdf({
      pdfName: file_name,
      pdfUrl: getS3Url(file_key),
      chatId: chat_id,
      fileKey: file_key,
    });

    return NextResponse.json({ response }, { status: 200 });
  } catch (error) {
    console.log("[PDF_ERROR] : ", error);
    return new NextResponse("PDF Error", { status: 500 });
  }
}
