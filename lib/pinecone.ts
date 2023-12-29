import { Pinecone } from "@pinecone-database/pinecone";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { S3Loader } from "langchain/document_loaders/web/s3";
import { downloadFromS3 } from "./s3";

// https://js.langchain.com/docs/modules/data_connection/document_loaders/how_to/pdf

// pinecone Config
export const pineconeClient = () => {
  const pinecone = new Pinecone({
    environment: process.env.PINECONE_ENVIRONMENT!,
    apiKey: process.env.PINECONE_API_KEY!,
  });
  return pinecone;
};

type PDFPageType = {
  pageContent: string;
  metadata: {
    loc: { pageNumber: number };
  };
};

export async function s3IntoPinecone(fileKey: string) {
  // 1. obtain the pdf -> downlaod and read from pdf
  const pdfFile = await downloadFromS3(fileKey);
  if (!pdfFile) {
    throw new Error("could not download from s3");
  }
  console.log("downloading s3 into file system : ", pdfFile);
  const loader = new PDFLoader(pdfFile);
  const docs = (await loader.load()) as PDFPageType[];
  console.log("end PDF loader");
  // 2. split and segment the pdf
  const documents = await Promise.all(docs.map(splitPDF));
  return docs;
}

async function splitPDF(page: PDFPageType) {
  const { pageContent, metadata } = page;
}
