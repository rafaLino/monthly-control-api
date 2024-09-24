import { s3 } from "@aws-sdk/client-s3";

export async function saveAndGetLink(csv) {
  // Save CSV to S3
  const s3Params = {
    Bucket: process.env.BUCKET_NAME,
    Key: "result.csv",
    Body: csv,
    ContentType: "text/csv",
  };

  await s3.putObject(s3Params).promise();

  // Download the CSV file
  const downloadParams = {
    Bucket: process.env.BUCKET_NAME,
    Key: "result.csv",
  };
  const downloadUrl = s3.getSignedUrl("getObject", downloadParams);

  return downloadUrl;
}
