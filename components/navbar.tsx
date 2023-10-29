"use client";
import { AiOutlineMenu } from "react-icons/ai";
import { BotAvatar } from "./avatar-bot";
import { useCallback, useState } from "react";
import MenuItem from "./navMenuItem";
import ModalLogin from "./modal-login";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { UserAvatar } from "./avatar-user";

const Navbar = () => {
  const { data: session, status } = useSession();

  const [isOpen, setIsOpen] = useState(false);
  const [loginOpen, setloginOpen] = useState(false);
  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);
  const modalOpen = useCallback(() => {
    setloginOpen((prev) => !prev); // 모달을 열 때 isOpen 상태를 true로 설정
  }, []);

  return (
    <div className="flex items-center p-4">
      {/* <MobileSidebar isPro={isPro} apiLimitCount={apiLimitCount} /> */}
      <div className="flex w-full justify-end">
        <div className="relative flex flex-row items-center gap-3">
          <div
            // onClick={onRent}
            className="
            hidden
            md:block
            text-sm 
            font-semibold 
            py-3 
            px-4 
            rounded-full 
            transition 
            text-gray-600
            hover:scale-105
          "
          >
            <Link href={"/dashboard"}>Go Dashboard</Link>
          </div>
          <div
            onClick={toggleOpen}
            className="
          p-2
          md:py-1
          md:px-3
          border-[1px] 
          border-neutral-200 
          flex 
          flex-row 
          items-center 
          gap-2 
          rounded-full 
          cursor-pointer 
          hover:shadow-md 
          transition
          "
          >
            <AiOutlineMenu />
            <div className="hidden md:block">
              <UserAvatar src={session?.user?.image} />
            </div>
          </div>
          {isOpen && (
            <div
              className="
            absolute 
            rounded-xl 
            shadow-md
            w-[40vw]
            md:w-3/4 
            bg-white 
            overflow-hidden 
            right-0 
            top-12 
            text-sm
          "
            >
              {/* nav 목록 아이콘 선택시 메뉴아이템 */}
              <div className="flex flex-col cursor-pointer">
                <>
                  {/* session 정보에 따라 토글메뉴 변경 설정 */}
                  {session ? (
                    <MenuItem label="Logout" onClick={() => signOut()} />
                  ) : (
                    <MenuItem label="Login" onClick={modalOpen} />
                  )}
                  <MenuItem label="Setting" onClick={() => {}} />
                </>
                <ModalLogin isOpen={loginOpen} onClose={modalOpen} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
