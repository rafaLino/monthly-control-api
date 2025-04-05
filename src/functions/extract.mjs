import * as repository from "../repository/index.mjs";
import { toCsv } from "../utils/index.mjs";
import { putCsv, getSignedLink } from "../repository/bucket.mjs";
/**
 * extract registers
 * @returns boolean
 */
export async function extract() {
  const result = await repository.scan();

  const csv = toCsv(result);

  await putCsv(csv);

  const url = await getSignedLink();

  return { ok: !!result, data: url };
}


export async function getExtractedDataLink() {
  const url = await getSignedLink();
  return { ok: !!url, data: url }
}


