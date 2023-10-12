"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import TypewriterComponent from "typewriter-effect";

const font = Montserrat({ weight: "600", subsets: ["latin"] });

const MainPage = () => {
  return (
    <div className="h-full bg-[#111827] overflow-auto">
      <div className="mx-auto max-w-screen-xl h-full w-full">
        {/* main nav */}
        <nav className="p-4 bg-transparent flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <div className="relative h-8 w-8 mr-4">
              <Image fill alt="Logo" src="/logo.png" sizes="none" />
            </div>
            <h1 className={cn("text-xl font-bold text-white", font.className)}>
              AI assist
            </h1>
          </Link>
          <div className="flex items-center gap-x-2">
            <Link href={"/dashboard"}>
              <Button
                variant="outline"
                className="rounded-full hover:scale-110"
              >
                Get Started
              </Button>
            </Link>
          </div>
        </nav>
        {/* main body */}
        <div className="text-white font-bold py-44 text-center space-y-5">
          <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-5 font-extrabold">
            <h1>The Best AI Tool for</h1>
            <div className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
              <TypewriterComponent
                options={{
                  strings: ["Chatbot.", "Photo Generation."],
                  autoStart: true,
                  loop: true,
                }}
              />
            </div>
          </div>
          <div className="text-sm md:text-xl font-light text-zinc-400">
            AI 사용하여 생산성 증가.
            <span className="pl-1 text-xs md:text-base">10x faster</span>
          </div>
          <div className="pt-10">
            <Link href={"/dashboard"}>
              <Button
                variant="premium"
                className="md:text-lg p-4 md:p-6 rounded-full font-semibold hover:scale-125"
              >
                무료로 시작해보기
              </Button>
            </Link>
          </div>
          <div className="text-zinc-400 text-xs md:text-sm font-normal">
            Go to Generate.
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
