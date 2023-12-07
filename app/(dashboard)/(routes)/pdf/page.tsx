"use client";
import Heading from "@/components/heading";
import { Bot } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "./constants";
import { useChat } from "ai/react";
import FileUpload from "@/components/pdf-upload";
import PDFViewer from "@/components/pdf-view";

const PdfPage = () => {
  // vercel-ai-sdk 양식
  // useChat()는 자동으로 사용자 메시지를 채팅 기록에 추가하고 구성된 엔드포인트에 대한 API 호출 ("/api/chat")
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "/api/chat",
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  return (
    <div>
      <Heading
        title="Chat PDF"
        description="업로드한 PDF 파일을 AI가 학습하여 대화합니다."
        icon={Bot}
        iconColor="text-violet-500"
        bgColor="bg-violet-500/10"
      />
      <div className="px-4 lg:px-8">
        <FileUpload />
        <div className="flex min-h-screen rounded-lg border border-slate-300 bg-white">
          {/* <PDFViewer pdfUrl="https://chatpdf0-next.s3.ap-northeast-2.amazonaws.com/uploads/1698169617140resume.pdf" /> */}
          {/* <div className="flex w-full min-h-screen overflow-scroll"> */}
          {/* pdf viewer */}
          {/* <div className="min-h-screen p-4 oveflow-scroll flex-[5] border-l-2 bg-white"> */}
          {/* <PDFViewer pdf_url={currentChat?.pdfUrl || ""} /> */}
          {/* </div> */}
          {/* chat component */}
          {/* <div className="flex-[3] border-l-2 border-l-slate-200 bg-white"> */}
          {/* <ChatComponent chatId={parseInt(chatId)} /> */}
        </div>
        {/* </div> */}
        {/* </div> */}
      </div>
    </div>
  );
};

export default PdfPage;
