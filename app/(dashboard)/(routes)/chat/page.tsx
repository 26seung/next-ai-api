import Heading from "@/components/ui-user/heading";
import { Bot } from "lucide-react";
import ChatComponent from "@/components/chatComponent";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

const ChatPage = async () => {
  const { userId } = await auth();
  if (!userId) return redirect("/dashboard");

  return (
    <div>
      <Heading
        title="Chat Stream"
        description="(gpt-3.5-turbo) 모델의 AI가 응답합니다."
        icon={Bot}
        iconColor="text-violet-500"
        bgColor="bg-violet-500/10"
      />
      <div className="px-4 lg:px-8">
        <ChatComponent newChat={true} />
      </div>
    </div>
  );
};

export default ChatPage;
