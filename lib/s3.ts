/**
 * npm i aws-sdk
 */

// import AWS from "aws-sdk";
import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import fs from "fs";

const credentials = {
  accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID!,
  secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY!,
};
const config = {
  region: process.env.NEXT_PUBLIC_AWS_S3_REGION!,
  credentials,
};
const client = new S3Client(config);

// 버킷에 객체 업로드 (JavaScript (v3) 용 SDK)
// https://docs.aws.amazon.com/ko_kr/sdk-for-javascript/v3/developer-guide/javascript_s3_code_examples.html
export const uploadToS3 = async (file: File) => {
  const file_key =
    "uploads/" + Date.now().toString() + file.name.replace(" ", "-");

  const command = new PutObjectCommand({
    Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME,
    Key: file_key,
    Body: file,
  });

  try {
    // save to aws-s3-bucket
    const response = await client.send(command);
  } catch (err) {
    console.error(err);
  }
  return Promise.resolve({
    file_key,
    file_name: file.name,
  });
};

// 버킷에서 PDF 다운로드
export const downloadFromS3 = async (filePath: string) => {
  const file_save = `/tmp/euseung${Date.now().toString()}.pdf`;

  const command = new GetObjectCommand({
    Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME,
    Key: filePath,
  });

  try {
    const response = await client.send(command);
    const fileStream = fs.createWriteStream(file_save);
    await new Promise((resolve) => {
      // @ts-ignore
      response.Body.pipe(fileStream).on("finish", resolve);
    });
  } catch (err) {
    console.error(err);
  }
  return file_save;
};

export function getS3Url(file_key: string) {
  const url = `https://${process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME}.s3.${process.env.NEXT_PUBLIC_AWS_S3_REGION}.amazonaws.com/${file_key}`;
  console.error("url : ", url);
  return url;
}
