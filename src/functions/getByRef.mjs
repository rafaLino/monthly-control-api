import * as repository from "../repository/index.mjs";

/**
 * get register's
 * @param {{
 *  incomes: Array<{id: string, name: string}>;
 *  expenses:Array<{id: string, name: string}>;
 *  investments: Array<id: string, name: string>}} data
 *
 * @returns boolean
 */
const regex = /^\d{4}-([1-9]|[01]\d|1[0-2])$/;

export async function getByRef(ref) {
  if (!regex.test(ref)) return { ok: false };

  const result = await repository.get(ref);

  return { ok: !!result, data: result };
}
