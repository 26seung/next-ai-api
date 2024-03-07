import Image from "next/image";

export const Loader = () => {
  return (
    <div className="h-full flex flex-col gap-y-4 items-center justify-center">
      <div className="w-10 h-10 relative animate-bounce">
        <Image alt="Logo" src="/logo.png" fill sizes="none" />
      </div>
      <p className="text-sm text-muted-foreground">
        AI 가 답변을 준비중입니다...
      </p>
    </div>
  );
};

/** Loader : 페이지 답변 대기 로더 컴포넌트**/
