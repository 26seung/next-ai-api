import Image from "next/image";

interface EmptyProps {
  label: string;
}

export const Empty = ({ label }: EmptyProps) => {
  return (
    <div className="h-full m-2 mt-28 flex flex-col items-center justify-center">
      <div className="relative h-72 w-72">
        <Image
          src="/empty.png"
          fill
          alt="Empty"
          sizes="none"
          placeholder="blur"
          blurDataURL="/empty.png"
        />
      </div>
      <p className="text-muted-foreground text-sm text-center">{label}</p>
    </div>
  );
};

/** Empty : ai 생성 초기화면 (대화 & 이미지) 컴포넌트, 생성하면 Empty 에서 생성된 데이터 변환 **/
