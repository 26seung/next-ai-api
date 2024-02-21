import Heading from "@/components/heading";
import { Bot } from "lucide-react";
import React from "react";
import ChatComponent from "@/components/chatComponent";

type Props = {
  params: {
    chatId: string;
  };
};

const ChatPage = ({ params: { chatId } }: Props) => {
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
        <ChatComponent newChat={false} chat_id={chatId} />
      </div>
    </div>
  );
};

export default ChatPage;
