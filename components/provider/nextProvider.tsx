"use client";
import { SessionProvider } from "next-auth/react";

// export default SessionProvider;
import { useEffect, useState } from "react";

interface Props {
  children: React.ReactNode;
}

// next-auth setting

export default function NextProvider({ children }: Props) {
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return <SessionProvider>{children}</SessionProvider>;
}

/** hasMounted 를 통해 새로고침시 로그인 상태 렌더링 작업,
 * useEffect가 실행되면 렌더링이 된 상황이고, hasMounted 값을 변경하여 렌더링 여부 설정  */
