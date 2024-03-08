"use client";

import ModalLogin from "@/components/modal-login";
import Heading from "@/components/ui-user/heading";
import { DrizzleChat } from "@/lib/db/schema";
import { useGetChats } from "@/lib/utils";
import { Settings } from "lucide-react";
import { useSession } from "next-auth/react";
import React from "react";

const SettingPage = () => {
  const [loginOpen, setLoginOpen] = React.useState(false);
  const { data: session, status } = useSession();
  const { data: chats, status: useState } = useGetChats(session);

  React.useEffect(() => {
    if (!session && status == "unauthenticated") {
      setLoginOpen(true);
    }
  }, [session]);

  return (
    <>
      <Heading
        title="Setting"
        description="사용자 정보를 확인합니다."
        icon={Settings}
        iconColor="text-violet-500"
        bgColor="bg-violet-500/10"
      />
      {!session ? (
        <>
          <ModalLogin isOpen={loginOpen} onClose={() => setLoginOpen(false)} />
        </>
      ) : (
        <>
          <div className="flex px-4 lg:px-8 space-x-4">
            <div className="bg-white max-w-2xl shadow overflow-hidiven sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  User database
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  Details and informations about user.
                </p>
              </div>
              <div className="border-t border-gray-200">
                <div>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <div className="text-sm font-medium text-gray-500">
                      닉네임
                    </div>
                    <div className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {session?.user?.name}
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <div className="text-sm font-medium text-gray-500">
                      이메일
                    </div>
                    <div className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {session?.user?.email}
                    </div>
                  </div>
                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <div className="text-sm font-medium text-gray-500">
                      진행중인 채팅 수
                    </div>
                    <div className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {chats?.length}개
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <div className="text-sm font-medium text-gray-500">
                      About
                    </div>
                    <div className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {/* {chats?.map((chat: DrizzleChat) => (
                    <div key={chat.id}>{chat.type}</div>
                  ))} */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default SettingPage;
