import { PutObjectCommand, GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const ONE_HOUR = 60 * 60;
const client = new S3Client({
  region: process.env.AWS_REGION,
});

export async function saveAndGetLink(csv) {
  const key = getDate();
  // Save CSV to S3
  const command = new PutObjectCommand({
    Bucket: process.env.BUCKET_NAME,
    Key: key,
    Body: csv,
    ContentType: "text/csv",
  });
  await client.send(command);

  // Download the CSV file

  return await getSignedLink(key);
}

async function getSignedLink(key) {
  const command = new GetObjectCommand({
    Bucket: process.env.BUCKET_NAME,
    Key: key,
  });

  const url = await getSignedUrl(client, command, { expiresIn: ONE_HOUR });

  return url;
}

function getDate() {
  const now = new Date();
  const date = now.toISOString().split("-");
  return `${date[0]}-${date[1]}`;
}
