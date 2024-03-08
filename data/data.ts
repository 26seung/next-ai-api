"use server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { InMessage, chats, messages, pdf, users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";

interface CreateChatProps {
  type: "chat" | "pdf";
  content: string;
  userId: string;
}
interface CreatePDFProps {
  pdfName: string;
  pdfUrl: string;
  chatId: string;
  fileKey: string;
}

// CREATE
// CREATE
// CREATE

// 새로 시작한 채팅 정보를 db 저장
export const dbCreateChat = async ({
  type,
  content,
  userId,
}: CreateChatProps) => {
  const response = await db
    .insert(chats)
    .values({
      id: uuidv4(),
      type,
      content,
      userId,
    })
    .returning({ insertedId: chats.id });
  return response[0].insertedId;
};

// PDF 파일의 정보를 저장
export const dbCreatePdf = async ({
  pdfName,
  pdfUrl,
  chatId,
  fileKey,
}: CreatePDFProps) => {
  return await db.insert(pdf).values({
    pdfName,
    pdfUrl,
    chatId,
    fileKey,
  });
};

// 유저와 ai간의 chat-messages 데이터 db 저장
export const dbSaveMessages = async ({ chatId, content, role }: InMessage) => {
  return await db.insert(messages).values({
    chatId,
    content,
    role,
  });
};

// READ
// READ
// READ

// 현재 db 저장된 userId 일치하는 모든 채팅을 가져옴
export const dbGetChats = async (userId: string) => {
  return await db.select().from(chats).where(eq(chats.userId, userId));
};

// 현재 로그인 user 정보의 db 저장된 "uuid" 형식의 id값 리턴
export const dbGetUserId = async () => {
  const { userEmail } = await auth();
  if (!userEmail) return;

  const response = await db
    .select()
    .from(users)
    .where(eq(users.email, userEmail));
  if (!response[0]) return;

  return response[0].id;
};

// 현재 로그인 user 정보와 db 정보를 비교하여 chat 리스트 리턴
export const dbCheckChat = async (chatId: string) => {
  const userId = await dbGetUserId();
  if (!userId) {
    return;
  }
  const _chats = await db.select().from(chats).where(eq(chats.userId, userId));
  const response = _chats.find((chat) => chat.id === chatId);

  return response;
};

// 현재 chat pdf 정보 리턴
export const dbCheckPdf = async (chatId: string) => {
  const response = await db.select().from(pdf).where(eq(pdf.chatId, chatId));

  return response[0];
};

// 현재 chat에 대한 messages 정보를 리턴
export const dbGetMessage = async (chat_id: string) => {
  return await db.select().from(messages).where(eq(messages.chatId, chat_id));
};

// DELETE
// DELETE
// DELETE
