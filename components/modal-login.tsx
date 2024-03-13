"use client";
import Modal from "./modal";
import { Button } from "./ui/button";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
import Image from "next/image";

interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
}

// 공통된 모달창 프레임 안에 content별 내용 삽입
const ModalLogin = ({ isOpen, onClose }: ModalProps) => {
  
  // social Login
  const providers = [
    { providerName: "github", Icon: AiFillGithub },
    { providerName: "google", Icon: FcGoogle },
  ];
  
  const handleOAuthSignIn = (provider: string) => {
    signIn(provider);
  };


  // credential 구현 X
  const bodyContent = (
    <>
      <div className="flex relative p-4 flex-col">
        <div className="flex justify-center">
          <Image sizes="none" width={50} height={50} alt="Logo" src="/logo.png" />
        </div>
        <div className="mt-3 text-xl font-bold text-center">
          Welcome to AI assist 
        </div>
        <div className="font-light text-neutral-500 mt-2 text-center">
          로그인 후 서비스를 사용해 보세요
        </div>
      </div>
    </>
    )

  // social Login
  const footerContent = (
    <>
      <div className="flex flex-col gap-2 p-6">
      <div className="relative">
        <div className=" absolute inset-0 flex items-center ">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-white px-2 text-gray-500">소셜 로그인</span>
        </div>
      </div>
      {/* 로그인 버튼 */}
      <div className="flex flex-col gap-3 mt-3">
        {providers.map((provider) => (
            <Button
            key={provider.providerName}
            onClick={() => handleOAuthSignIn(provider.providerName)}
            variant="outline"
            className="relative disabled:opacity-70 disabled:cursor-not-allowed rounded-lg hover:opacity-80 transition w-full border-2 font-normal"
          >
            <div className="absolute left-4">
              <provider.Icon size={24} />
            </div>
            {provider.providerName.toUpperCase()} 계정으로 로그인
          </Button>
        ))}
        <div className="flex gap-2 justify-center text-sm mt-4 px-2 text-gray-500 ">
          간편하게 로그인 하세요
        </div>
      </div>
    </div>
    </>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="LOGIN"
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default ModalLogin;
