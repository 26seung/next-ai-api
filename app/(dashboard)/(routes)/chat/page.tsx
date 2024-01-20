"use client";
import Heading from "@/components/heading";
import { Bot } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "./constants";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Empty } from "@/components/empty";
import { UserAvatar } from "@/components/avatar-user";
import { BotAvatar } from "@/components/avatar-bot";
import ReactMarkdown from "react-markdown";
import { useChat } from "ai/react";
import { Loader } from "@/components/loader";
import { users } from "@/lib/db/schema";
import { useSession } from "next-auth/react";
import { Textarea } from "@/components/ui/textarea";
import React from "react";

const ChatPage = () => {
  const { data: session } = useSession();

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

  const textAreaRef = React.useRef<HTMLTextAreaElement | null>(null);
  React.useEffect(() => {
    if (textAreaRef && textAreaRef.current) {
      // textAreaRef.current.style.height =
      //   textAreaRef.current.scrollHeight + "auto";
      textAreaRef.current.style.height = "0px";
      const scrollHeight = textAreaRef.current.scrollHeight;
      textAreaRef.current.style.height = scrollHeight + "px";
    }
  }, [input]);
  // [SHIFT + ENTER]
  const onKeydownChat = React.useCallback(
    (e: any) => {
      if (e.key === "Enter") {
        // console.log(e)
        if (!e.shiftKey) {
          e.preventDefault();
          handleSubmit(e);
        }
      }
    },
    [handleSubmit]
  );

  // console.log("chat page : ", session?.user?.image);
  // console.log("chat page : ", messages[messages.length - 2]);

  const isLoading = form.formState.isSubmitting;

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
        <div>
          <Form {...form}>
            <form
              onSubmit={handleSubmit}
              className="rounded-lg border w-full p-2 px-3 focus-within:shadow-sm grid grid-cols-12 gap-2 bg-white"
            >
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-10">
                    <FormControl className="m-0 p-0">
                      <Textarea
                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent resize-none "
                        disabled={isLoading}
                        placeholder="메시지를 입력하세요."
                        {...field}
                        onChange={handleInputChange}
                        value={input}
                        onKeyDown={onKeydownChat}
                        rows={1}
                        ref={textAreaRef}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                className="col-span-12 lg:col-span-2 w-full"
                type="submit"
                disabled={isLoading}
                size="icon"
              >
                Send
              </Button>
            </form>
          </Form>
        </div>
        <div className="space-y-4 mt-4">
          {isLoading && (
            <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
              <Loader />
            </div>
          )}
          {messages.length === 0 && !isLoading && (
            <Empty label="시작된 대화가 없습니다." />
          )}
          <div className="flex flex-col-reverse gap-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "p-8 w-full flex flex-col items-start gap-x-8 rounded-lg",
                  message.role === "user"
                    ? "bg-white border border-black/10"
                    : "bg-muted"
                )}
              >
                {/* 유저 역활에 따라 사용자 구분 (user, assistant) */}
                <div className="flex flex-row items-center gap-x-4 text-sm text-slate-700 font-bold">
                  {message.role === "user" ? (
                    <>
                      <UserAvatar src={session?.user?.image} />
                      <span>You</span>
                    </>
                  ) : (
                    <>
                      <BotAvatar />
                      <span>ChatAI</span>
                    </>
                  )}
                </div>
                <div className="mt-1 pl-12">
                  {/* <p className="text-sm">{message.content}</p> */}
                  {/* code 설명 시 시각적 요소를 위해 "react-markdown" 사용하여 css 디자인 */}
                  <ReactMarkdown
                    components={{
                      pre: ({ node, ...props }) => (
                        <div className="overflow-auto w-full my-2 bg-black/10 p-2 rounded-lg">
                          <pre {...props} />
                        </div>
                      ),
                      code: ({ node, ...props }) => (
                        <code
                          className="bg-black/10 rounded-lg p-1"
                          {...props}
                        />
                      ),
                    }}
                    className="text-sm overflow-hidden leading-7"
                  >
                    {message.content || ""}
                  </ReactMarkdown>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
