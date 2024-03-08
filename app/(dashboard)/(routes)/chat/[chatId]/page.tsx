import Heading from "@/components/ui-user/heading";
import { Bot } from "lucide-react";
import React from "react";
import ChatComponent from "@/components/chatComponent";
import { dbCheckChat } from "@/data/data";

type Props = {
  params: {
    chatId: string;
  };
};

const ChatPage = async ({ params: { chatId } }: Props) => {
  const check = await dbCheckChat(chatId);

  if (!check) return;

  return (
    <div>
      <Heading
        title="Chat Stream"
        description="(gpt-3.5-turbo) 모델의 AI가 응답합니다."
        icon={Bot}
        iconColor="text-violet-500"
        bgColor="bg-violet-500/10"
      />
      <div className="px-10 lg:pr-32">
        <ChatComponent newChat={false} chat_id={chatId} />
      </div>
    </div>
  );
};

export default ChatPage;
