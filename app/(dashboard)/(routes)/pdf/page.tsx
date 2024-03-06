import Heading from "@/components/ui-user/heading";
import { Bot } from "lucide-react";
import FileUpload from "@/components/pdf-upload";
import ChatComponent from "@/components/chatComponent";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

const PdfPage = async () => {
  const { userId } = await auth();
  if (!userId) return redirect("/dashboard");

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
        <div className="flex-[2] rounded-lg border border-slate-300 bg-white ">
          <FileUpload />
        </div>

        {/* chat component */}
        <div className="flex-[2] rounded-lg border border-slate-300 bg-white ">
          <ChatComponent newChat={false} />
        </div>
      </div>
    </div>
  );
};

export default PdfPage;
