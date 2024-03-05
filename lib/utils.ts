import { useMutation, useQuery } from "@tanstack/react-query";
import { Message } from "ai";
import axios from "axios";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// 채팅 목록을 리턴
export const useGetChats = (userEmail: any) => {
  return useQuery({
    queryKey: ["chats"],
    queryFn: async () => {
      const response = await axios.post("/api/db-get-chats");
      return response.data;
    },
    enabled: !!userEmail,
  });
};
// 해당 채팅에 대한 메시지들을 리턴
export const useGetMessages = (chat_id?: string) => {
  return useQuery({
    queryKey: ["chat", chat_id],
    queryFn: async () => {
      const response = await axios.post<Message[]>("/api/db-get-messages", {
        chat_id,
      });
      return response.data;
    },
  });
};
// 선택된 채팅을 제거
export const useDeleteChat = () => {
  const { refetch: refetchChats } = useGetChats(true);
  return useMutation({
    mutationFn: async (chat_id: string) => {
      const response = await axios.post("/api/db-delete-chats", { chat_id });
      return response.data;
    },
    onSuccess: async () => {
      await refetchChats();
    },
  });
};

type S3File = {
  file_key: string;
  file_name: string;
};
// PDF파일을 저장
export const useCreatePdf = () => {
  return useMutation({
    mutationFn: async ({ file_key, file_name }: S3File) => {
      const response = await axios.post("/api/pdf", {
        file_key,
        file_name,
      });
      return response.data;
    },
  });
};
