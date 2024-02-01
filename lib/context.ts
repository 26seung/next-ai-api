import { Pinecone } from "@pinecone-database/pinecone";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";

// pinecone 데이터 임베딩
export async function getPinecone(query: string, fileKey: string) {
  const embeddings = new OpenAIEmbeddings();
  const queryEmbeddings = await embeddings.embedQuery(query);
  //   console.log("query : ", query);
  //   console.log("fileKey : ", fileKey);
  //   const context = "난 이유승이라는 친구가 있어";
  console.log("queryEmbeddings : ", queryEmbeddings);
  const matches = await getMatchesFromEmbeddings(queryEmbeddings, fileKey);

  const qualifyingDocs = matches.filter(
    (match) => match.score && match.score > 0.7
  );
  console.log("qualifyingDocs : ", qualifyingDocs);
  type Metadata = {
    text: string;
    pageNumber: number;
  };

  let docs = qualifyingDocs.map((match) => (match.metadata as Metadata).text);
  console.log("docs : ", docs);
  // 5 vectors
  return docs.join("\n").substring(0, 3000);
  //   return context;
}

// pinecone.ts 파일과 같이 사용하면 오류 발생
const pineconeClient = () => {
  const pinecone = new Pinecone({
    environment: process.env.PINECONE_ENVIRONMENT!,
    apiKey: process.env.PINECONE_API_KEY!,
  });
  return pinecone;
};

export async function getMatchesFromEmbeddings(
  embeddings: number[],
  fileKey: string
) {
  const pinecone = await pineconeClient();
  const pineconeIndex = pinecone.Index(process.env.PINECONE_INDEX!);
  //   // 인덱스의 레코드를 네임스페이스로 구분
  const namespace = pineconeIndex.namespace(fileKey);
  // 쿼리 벡터를 사용하여 인덱스를 검색 (유사성 점수와 함께 인덱스에서 가장 유사한 레코드의 ID를 검색)
  const queryResult = await namespace.query({
    topK: 5,
    vector: embeddings,
    includeMetadata: true,
  });
  console.log("queryResult : ", queryResult);
  return queryResult.matches || [];
}
