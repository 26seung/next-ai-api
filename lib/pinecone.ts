import { Pinecone } from "@pinecone-database/pinecone";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { S3Loader } from "langchain/document_loaders/web/s3";
import { downloadFromS3 } from "./s3";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { Document } from "langchain/document";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { PineconeStore } from "langchain/vectorstores/pinecone";
import crypto from "crypto";

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
  // 3. vectorise and embed individual documents
  // const embeddingsPromises = documents
  //   .flat()
  //   .map((doc) => embedDocument(doc.metadata.text));
  const vectors = await Promise.all(documents.flat().map(embedDocument));
  // 4. upload to pinecone
  // const pinecone = await pineconeClient();
  // const pineconeIndex = pinecone.Index(process.env.PINECONE_INDEX!);

  // await pineconeIndex.upsert(vectors);

  return vectors;
}

// 임베딩처리
export const embedDocument = async (doc: Document) => {
  // id hash 처리
  const sha256 = (text: string) => {
    const hash = crypto.createHash("sha256");
    hash.update(text);
    return hash.digest("hex");
  };
  const hash = sha256(doc.metadata.text);
  // embedding 처리 (openai)
  const embeddings = new OpenAIEmbeddings();
  const res = await embeddings.embedQuery(doc.pageContent);

  // pinecone 데이터삽입 vectors 형태
  return {
    id: hash,
    values: res, // 여기에는 벡터 값이 들어가야 합니다.
    metadata: {
      text: doc.metadata.text, // 텍스트가 메타데이터로 들어가 있습니다. 필요에 따라 수정할 수 있습니다.
      pageNumber: doc.metadata.pageNumber,
    },
  };
};

export const truncateStringByBytes = (str: string, bytes: number) => {
  const enc = new TextEncoder();
  return new TextDecoder("utf-8").decode(enc.encode(str).slice(0, bytes));
};

async function splitPDF(page: PDFPageType) {
  let { pageContent, metadata } = page;
  pageContent = pageContent.replace(/\n/g, "");

  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
  });
  const docs = await textSplitter.splitDocuments([
    new Document({
      pageContent,
      metadata: {
        pageNumber: metadata.loc.pageNumber,
        text: truncateStringByBytes(pageContent, 36000),
      },
    }),
  ]);
  return docs;
}
