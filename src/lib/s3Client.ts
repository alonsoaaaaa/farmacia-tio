import { S3 } from "@aws-sdk/client-s3";
const endpoint = "https://nyc3.digitaloceanspaces.com";

const s3Client = new S3({
  endpoint: endpoint,
  region: "us-east-1",
  credentials: {
    accessKeyId: process.env.DO_ACCESS_KEY as string,
    secretAccessKey: process.env.DO_SECRET_KEY as string,
  },
});

export default s3Client;
