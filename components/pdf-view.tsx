"use client";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import React from "react";

type Props = { pdfUrl: string };

const PDFViewer = ({ pdfUrl }: Props) => {
  const [loading, setLoading] = React.useState(true);

  const handleLoad = () => {
    setLoading(false);
  };

  return (
    <>
      {loading && (
        <div className="w-full h-60 flex flex-col items-center justify-center">
          <Loader2 className="h-10 w-10 text-blue-500 animate-spin" />
          <p className="mt-2 text-sm text-slate-400">Loading pdf file</p>
        </div>
      )}
      <iframe
        title="pdf-viewer"
        src={`https://docs.google.com/gview?url=${pdfUrl}&embedded=true`}
        className={cn("w-full h-full", loading && "hidden")}
        onLoad={handleLoad}
      ></iframe>
    </>
  );
};

export default PDFViewer;
