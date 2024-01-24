"use client";
import { AiOutlineMenu } from "react-icons/ai";
import { useCallback, useEffect, useRef, useState } from "react";
import MenuItem from "./navMenuItem";
import ModalLogin from "./modal-login";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { UserAvatar } from "./avatar-user";

const Navbar = () => {
  // next-auth 데이터 확인
  const { data: session, status } = useSession();
  // modal (on / off)
  const [loginOpen, setloginOpen] = useState(false);
  // toggle modal (on / off)
  const [isOpen, setIsOpen] = useState(false);
  const toggleRef = useRef<HTMLDivElement | null>(null);

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
    // console.log("toggleOpen")
  }, []);
  const modalOpen = useCallback(() => {
    setloginOpen((prev) => !prev); // 모달을 열 때 isOpen 상태를 true로 설정
  }, []);
  // toggle background (on / off)
  useEffect(() => {
    const clickOutside = (e:MouseEvent) => {
      // 모달이 열려 있고 모달의 바깥쪽을 눌렀을 때 창 닫기
        if (isOpen && toggleRef.current) {
          const clickedElement = e.target as HTMLInputElement;  
          if (
            !clickedElement.closest('.menu-item') &&
            !toggleRef.current.contains(clickedElement)
          ) {
            // console.log("clickOutside :" )
            setIsOpen(false);
          }
        }
    };
    document.addEventListener("mousedown", clickOutside);
    return () => {
      // addEventListener 추가된 클릭 이벤트 리스너를, 컴포넌트가 사라질 때, 해당 리스너를 제거하면 "메모리 누수"를 방지
      document.removeEventListener("mousedown", clickOutside);
    };
  }, [isOpen]);

  return (
  <>
    <div className="flex items-center p-4" >
      <div className="flex w-full justify-end">
        <div className="relative flex flex-row items-center gap-3">
          <div className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full transition text-gray-600 hover:scale-105">
            <Link href={"/dashboard"}>Go Dashboard</Link>
          </div>
          <div
            ref={toggleRef}
            onClick={toggleOpen}
            className=" p-2 md:py-1 md:px-3 border-[1px] border-neutral-200 flex flex-row items-center gap-2 rounded-full cursor-pointer hover:shadow-md transition"
          >
            <AiOutlineMenu />
            <div className="hidden md:block">
              <UserAvatar src={session?.user?.image} />
            </div>
          </div>
          {isOpen && (
            <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
              {/* nav 목록 아이콘 선택시 메뉴아이템 */}
              <div className="flex flex-col cursor-pointer menu-item" >
                <>
                  {/* session 정보에 따라 토글메뉴 변경 설정 */}
                  {session ? 
                  (
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
    </>
  );
};

export default Navbar;
