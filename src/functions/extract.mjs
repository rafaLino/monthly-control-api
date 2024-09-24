import * as repository from "../repository/index.mjs";
import { toCsv } from "../utils/index.mjs";
import { saveAndGetLink } from "../repository/bucket.mjs";
/**
 * extract registers
 * @returns boolean
 */
export async function extract() {
  const result = await repository.scan();

  const csv = toCsv(result);

  const url = await saveAndGetLink(csv);

  return { ok: !!result, data: url };
}
