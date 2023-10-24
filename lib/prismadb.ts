/**
 * error : warn(prisma-client) This is the 10th instance of Prisma Client being started. Make sure this is intentional.
 *
 * 해결책 : 단일 인스턴스 "PrismaClient" 를 인스턴스화하고 이를 "globalThis" 객체에 저장
 *        "globalThis" 객체에 없는 경우에만 "PrismaClient" 를 인스턴스화 하도록 검사를 유지,
 *        그렇지 않으면 추가 "PrismaClient" 인스턴스가 인스턴스화되는 것을 방지하기 위해 동일한 인스턴스를 다시 사용
 * */
import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

const client = globalThis.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalThis.prisma = client;

export default client;
