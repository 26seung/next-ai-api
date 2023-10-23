import { z } from "zod";

// zod 라이브러리로 유효성 검사를 도와줌
// "z.infer<typeof User>" 형식으로 타입을 받아올 수 있음

export const formSchema = z.object({
  prompt: z.string().min(2, {
    message: "Must be 2 or more characters long.",
  }),
});
