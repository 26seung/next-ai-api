"use client";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { routes } from "./constants";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

const DashboardPage = () => {
  const router = useRouter();
  // next-auth
  const { data: session } = useSession();

  // 페이지 이동 및 로그인 알림창
  const handleRouter = (tool: any) => {
    if (tool.auth === "guest" || session) {
      router.push(tool.href);
    } else {
      toast.error("해당 서비스 로그인 필요");
    }
  };

  return (
    <div>
      <div className="mb-8 space-y-4">
        <h2 className="text-2xl md:text-4xl font-bold text-center">
          Dashboard
        </h2>
        <p className="text-muted-foreground font-light text-sm md:text-lg text-center">
          Chat AI
        </p>
      </div>
      <div className="px-4 md:px-32 lg:px-52 space-y-4 ">
        {routes.map(
          (tool) =>
            !(tool.layout === "side") && (
              <Card
                onClick={() => handleRouter(tool)}
                key={tool.href}
                className={cn(
                  "p-4 !isSelectable border-black/5 flex items-center justify-between hover:shadow-md transition cursor-pointer",
                  !session &&
                    tool.auth === "user" &&
                    "cursor-not-allowed bg-gray-800/30"
                )}
              >
                <div className="flex items-center gap-x-4">
                  <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                    <tool.icon className={cn("w-8 h-8 ", tool.color)} />
                  </div>
                  <div className="p-2 font-semibold">{tool.label}</div>
                </div>
                <ArrowRight className="w-5 h-5" />
              </Card>
            )
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
