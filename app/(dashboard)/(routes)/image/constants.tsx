import { z } from "zod";

// zod 라이브러리로 유효성 검사를 도와줌
// "z.infer<typeof User>" 형식으로 타입을 받아올 수 있음

export const formSchema = z.object({
  prompt: z
    .string()
    .min(1, {
      message: "Must be 1 or more characters long.",
    })
    .max(1000),
  n: z.string().min(1),
  size: z.string().min(1),
});

//  이미지 옵션 (1~10 개)
export const nOptions = [
  {
    value: "1",
    label: "1 Photo",
  },
  {
    value: "3",
    label: "3 Photos",
  },
  {
    value: "5",
    label: "5 Photos",
  },
  {
    value: "7",
    label: "7 Photos",
  },
  {
    value: "10",
    label: "10 Photos",
  },
];
// (256x256, 512x512또는 중 하나여야 합니다. 기본값: 1024x1024)
export const sizeOptions = [
  {
    value: "256x256",
    label: "256x256",
  },
  {
    value: "512x512",
    label: "512x512",
  },
  {
    value: "1024x1024",
    label: "1024x1024",
  },
];
