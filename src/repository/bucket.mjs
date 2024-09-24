import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const ONE_HOUR = 60 * 60;
const client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    bucket: process.env.BUCKET_NAME,
  },
});

function getDate() {
  const now = new Date();
  const date = now.toISOString().split("-");
  return `${date[0]}-${date[1]}`;
}
export async function saveAndGetLink(csv) {
  // Save CSV to S3
  const command = new PutObjectCommand({
    Bucket: process.env.BUCKET_NAME,

    Key: getDate(),
    Body: csv,
    ContentType: "text/csv",
  });

  // Download the CSV file
  await client.send(command);
  const url = await getSignedUrl(client, command, { expiresIn: ONE_HOUR });

  return url;
}
