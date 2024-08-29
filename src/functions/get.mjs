import * as repository from '../repository/index.mjs'
import { getCurrentFormattedDate } from '../utils/index.mjs';

/**
 * get register's 
 * @param {{ 
 *  incomes: Array<{id: string, name: string}>;
 *  expenses:Array<{id: string, name: string}>;
 *  investments: Array<id: string, name: string>}} data
 * 
 * @returns boolean
 */
export async function get() {

    const currentDate = getCurrentFormattedDate();

    const result = await repository.get(currentDate);

    return { ok: !!result, data: result };
}