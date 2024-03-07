import { cn, useDeleteChat } from "@/lib/utils";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { MessageCircle, PlusCircle, Trash2 } from "lucide-react";
import { DrizzleChat } from "@/lib/db/schema";
import { usePathname } from "next/navigation";

const poppins = Montserrat({ weight: "600", subsets: ["latin"] });

type Props = {
  chats: DrizzleChat[];
};

const UserSidebar = ({ chats }: Props) => {
  const pathname = usePathname();
  const mutation = useDeleteChat();

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-gradient-to-b from-gray-900 to-gray-600 text-white">
      <div className="px-3 py-3 flex-1">
        <Link href="/dashboard" className="flex items-center pl-6 mb-16">
          <div className="relative h-8 w-8 mr-4">
            <Image sizes="none" fill alt="Logo" src="/logo.png" />
          </div>
          <h1 className={cn("text-2xl font-bold", poppins.className)}>
            AI assist
          </h1>
        </Link>
        {/* //  Menu Link 들의 목록 나열 */}
        <div className="space-y-1 pb-5">
          <Link href="/dashboard">
            <Button className="w-full border-dashed border-white border hover:bg-slate-700">
              <PlusCircle className="mr-2 w-4 h-4" />
              새로운 채팅
            </Button>
          </Link>
        </div>
        {/* user 채팅 목록 */}
        <div>
          {chats?.map((chat) => (
            <Link key={chat.id} href={`/${chat.type}/${chat.id}`}>
              <div
                className={cn(
                  "group rounded-lg p-3 text-slate-300 flex items-center",
                  {
                    "bg-blue-600 text-white": `/chat/${chat.id}` === pathname,
                    "hover:text-white hover:bg-slate-700":
                      `/chat/${chat.id}` !== pathname,
                  }
                )}
              >
                <MessageCircle className="mr-2" />
                <p className="w-full overflow-hidden text-sm truncate whitespace-nowrap text-ellipsis">
                  {chat.content}
                </p>
                <Trash2
                  className={
                    "mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:scale-125"
                  }
                  onClick={() => mutation.mutate(chat.id)}
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserSidebar;
