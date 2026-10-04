import { EnvironmentError } from "@/errors/environment.error";
import { S3Client } from "bun";
import { BunS3Provider } from "./bucket.s3";

const SECRET_KEY = process.env["MINIO_SECRET_KEY"];
const ACCESS_KEY = process.env["MINIO_ACCESS_KEY"];
const BUCKET = process.env["MINIO_BUCKET"];
const URL = process.env["MINIO_URL"];

if (!SECRET_KEY || !ACCESS_KEY || !BUCKET || !URL)
  throw new EnvironmentError([
    "MINIO_SECRET_KEY",
    "MINIO_ACCESS_KEY",
    "MINIO_BUCKET",
    "MINIO_URL",
  ]);

const s3Client = new S3Client({
  secretAccessKey: SECRET_KEY,
  accessKeyId: ACCESS_KEY,
  bucket: BUCKET,
  endpoint: URL,
});

const Bucket = new BunS3Provider(s3Client);

export default Bucket;
