import crypto from "crypto";
import path from "path";

import multer from "multer";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const {
  AWS_REGION,
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
  AWS_S3_BUCKET,
  AWS_S3_ENDPOINT,
  AWS_S3_PUBLIC_URL,
} = process.env;

const s3Client = new S3Client({
  region: AWS_REGION,
  endpoint: AWS_S3_ENDPOINT || undefined,
  credentials:
    AWS_ACCESS_KEY_ID && AWS_SECRET_ACCESS_KEY
      ? {
          accessKeyId: AWS_ACCESS_KEY_ID,
          secretAccessKey: AWS_SECRET_ACCESS_KEY,
        }
      : undefined,
});

const allowedMimeTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (!allowedMimeTypes.includes(file.mimetype)) {
    cb(new Error("Unsupported file type. Only JPEG, PNG, WEBP, and GIF are allowed."));
    return;
  }
  cb(null, true);
};

const resolveFileSizeLimit = () => {
  const parsed = Number.parseInt(process.env.MAX_UPLOAD_FILE_SIZE ?? "", 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 5 * 1024 * 1024;
};

export const uploadSingleProductImage = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: resolveFileSizeLimit(),
  },
}).single("image");

const buildPublicUrl = (key) => {
  if (AWS_S3_PUBLIC_URL) {
    const base = AWS_S3_PUBLIC_URL.endsWith("/")
      ? AWS_S3_PUBLIC_URL.slice(0, -1)
      : AWS_S3_PUBLIC_URL;
    return `${base}/${key}`;
  }

  if (AWS_S3_ENDPOINT) {
    const endpoint = AWS_S3_ENDPOINT.endsWith("/")
      ? AWS_S3_ENDPOINT.slice(0, -1)
      : AWS_S3_ENDPOINT;
    return `${endpoint}/${AWS_S3_BUCKET}/${key}`;
  }

  const regionSegment = AWS_REGION ? `.${AWS_REGION}` : "";

  return `https://${AWS_S3_BUCKET}.s3${regionSegment}.amazonaws.com/${key}`;
};

export const uploadFileToS3 = async (file, { folder = "products" } = {}) => {
  if (!AWS_S3_BUCKET) {
    throw new Error("AWS_S3_BUCKET environment variable is not set.");
  }

  if (!AWS_REGION && !AWS_S3_ENDPOINT) {
    throw new Error("AWS_REGION or AWS_S3_ENDPOINT environment variable must be set.");
  }

  if (!file) {
    throw new Error("No file provided for upload.");
  }

  const extension = path.extname(file.originalname) || "";
  const randomName = crypto.randomBytes(16).toString("hex");
  const key = `${folder}/${Date.now()}-${randomName}${extension}`;

  const command = new PutObjectCommand({
    Bucket: AWS_S3_BUCKET,
    Key: key,
    Body: file.buffer,
    ContentType: file.mimetype,
    ACL: "public-read",
  });

  await s3Client.send(command);

  return {
    key,
    url: buildPublicUrl(key),
  };
};

export default {
  uploadSingleProductImage,
  uploadFileToS3,
};

