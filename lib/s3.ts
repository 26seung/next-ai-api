/**
 * npm i aws-sdk
 */

// import AWS from "aws-sdk";
import {
  GetObjectCommand,
  PutObjectCommand,
  S3,
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
    const response = await client.send(command);
    console.log(response);
  } catch (err) {
    console.error(err);
  }
  return Promise.resolve({
    file_key,
    file_name: file.name,
  });
};

export async function downloadFromS33(file_key: string): Promise<string> {
  return new Promise(async (resolve, reject) => {
    const command = new GetObjectCommand({
      Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME,
      Key: file_key,
    });

    try {
      const response = await client.send(command);
      const file_name = `/tmp/elliott${Date.now().toString()}.pdf`;

      if (response.Body instanceof require("stream").Readable) {
        // AWS-SDK v3 has some issues with their typescript definitions, but this works
        // https://github.com/aws/aws-sdk-js-v3/issues/843
        //open the writable stream and write the file
        const file = fs.createWriteStream(file_name);
        file.on("open", function (fd) {
          // @ts-ignore
          response.Body?.pipe(file).on("finish", () => {
            return resolve(file_name);
          });
        });
        // obj.Body?.pipe(fs.createWriteStream(file_name));
      }
    } catch (error) {
      console.error(error);
      reject(error);
      return null;
    }
  });
}

export const downloadFromS3 = async (fileFath: string) => {
  const file_save = `/tmp/euseung${Date.now().toString()}.pdf`;

  const command = new GetObjectCommand({
    Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME,
    Key: fileFath,
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

// export async function uploadS33(file: File) {
//   try {
//     AWS.config.update({
//       accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
//       secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
//     });
//     const s3 = new AWS.S3({
//       params: {
//         Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME,
//       },
//       region: process.env.NEXT_PUBLIC_AWS_S3_REGION,
//     });

//     const file_key =
//       "uploads/" + Date.now().toString() + file.name.replace(" ", "-");

//     const params = {
//       Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME!,
//       Key: file_key,
//       Body: file,
//     };
//     const upload = s3
//       .putObject(params)
//       // .on("httpUploadProgress", (event) => {
//       //   console.log(
//       //     "uploading s3.. ",
//       //     parseInt(((event.loaded * 100) / event.total).toString()) + "%"
//       //   );
//       // })
//       .promise();

//     await upload.then((data) => {
//       console.log("seccess upload S3 !!!", file_key);
//     });

//     return Promise.resolve({
//       file_key,
//       file_name: file.name,
//     });
//   } catch (error) {}
// }

export function getS3Url(file_key: string) {
  const url = `https://${process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME}.s3.${process.env.NEXT_PUBLIC_AWS_S3_REGION}.amazonaws.com/${file_key}`;
  return url;
}
