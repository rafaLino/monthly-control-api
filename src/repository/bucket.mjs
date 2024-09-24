import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
const ONE_HOUR = 60 * 60;
const client = new S3Client({});
export async function saveAndGetLink(csv) {
  // Save CSV to S3
  const command = new PutObjectCommand({
    Bucket: process.env.BUCKET_NAME,
    Key: "result.csv",
    Body: csv,
    ContentType: "text/csv",
  });

  // Download the CSV file
  const url = await getSignedUrl(client, command, { expiresIn: ONE_HOUR });
  await client.send(command);

  return url;
}
