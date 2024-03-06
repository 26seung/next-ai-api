"use client";
import { uploadToS3 } from "@/lib/s3";
import { useCreatePdf, useGetChats } from "@/lib/utils";
import { FilePlus, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";

const FileUpload = () => {
  const router = useRouter();
  const [uploading, setUploading] = useState<boolean>(false);
  // pdf 생성, chat 리스트 조회
  const mutation = useCreatePdf();
  const { refetch: refetchChats } = useGetChats(uploading);
  // useDropzone. config option setting
  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const pdfFile = acceptedFiles[0];
      // 유효성 체크 (정상파일 && 사이즈)
      if (!pdfFile) {
        toast.error("PDF 파일을 업로드 해주세요.");
        return;
      }
      if (pdfFile.size > 10 * 1024 * 1024) {
        toast.error("파일 사이즈가 너무 큽니다.");
        return;
      }

      try {
        // 업로딩 체크 status
        setUploading(true);
        // save to aws-s3-bucket
        const data = await uploadToS3(pdfFile);
        if (!data?.file_key || !data?.file_name) {
          toast.error("파일이 존재하지 않습니다.");
          return;
        }
        // data : api-docs
        mutation.mutate(data, {
          onSuccess: async () => {
            await refetchChats().then(({ data }) => {
              const lastChatId = data[data.length - 1].id;
              router.push(`/pdf/${lastChatId}`);
            });
          },
          onError(error) {
            console.log("mutate error : ", error);
          },
        });
      } catch (error) {
        console.log("mutate catch error : ", error);
      } finally {
        setUploading(false);
      }
    },
    [mutation]
  );

  // react-dropzone (공식문서 : https://react-dropzone.js.org/)
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    // pdfFile 조건 설정
    accept: { "application/pdf": [".pdf"] },
    maxFiles: 1,
    onDrop,
  });

  return (
    <>
      <div className="p-2 bg-white rounded-xl">
        <div
          {...getRootProps({
            className:
              "border-dashed border-2 rounded-xl cursor-pointer min-h-screen items-center justify-center flex flex-col",
          })}
        >
          <input {...getInputProps()} />
          {/* 파일 업로딩 && 파일 드래그 상태를 체크 */}
          {uploading || mutation.isPending ? (
            <>
              {/* 로딩 상태 */}
              <Loader2 className="h-10 w-10 text-blue-500 animate-spin" />
              <p className="mt-2 text-sm text-slate-400">
                PDF 확인중 입니다...
              </p>
            </>
          ) : (
            <>
              <FilePlus className="w-10 h-10 text-blue-500" />
              {isDragActive ? (
                <p className="m-4 mt-4 text-sm leading-loose text-slate-400">
                  PDF 파일을 여기에 올려 주세요...
                </p>
              ) : (
                <p className="m-4 mt-4 text-sm leading-loose text-center text-slate-400">
                  PDF 파일을 여기로 Drag 하거나, 클릭하여 파일을 업로드 하세요
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default FileUpload;
