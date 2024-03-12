import Heading from "@/components/ui-user/heading";
import { Bot } from "lucide-react";
import FileUpload from "@/components/pdf-upload";
import PDFViewer from "@/components/pdf-view";
import ChatComponent from "@/components/chatComponent";
import { dbCheckChat, dbCheckPdf } from "@/data/data";

type Props = {
  params: {
    chatId: string;
  };
};

const PdfPage = async ({ params: { chatId } }: Props) => {
  const check = await dbCheckChat(chatId);
  if (!check) return;
  const pdfs = await dbCheckPdf(chatId);

  return (
    <div>
      <Heading
        title="Chat PDF"
        description="업로드한 PDF 파일을 AI가 학습하여 대화합니다."
        icon={Bot}
        iconColor="text-violet-500"
        bgColor="bg-violet-500/10"
      />
      <div className="flex px-4 lg:px-8 space-x-4">
        {pdfs && (
          <div className="flex-[2] min-h-screen rounded-lg border border-slate-300 bg-white">
            <PDFViewer pdfUrl={pdfs?.pdfUrl} />
          </div>
        )}
        <div className="flex-[2] rounded-lg border border-slate-300 bg-white ">
          <ChatComponent
            newChat={false}
            chat_id={chatId}
            fileKey={pdfs?.fileKey}
          />
        </div>
      </div>
    </div>
  );
};

export default PdfPage;
