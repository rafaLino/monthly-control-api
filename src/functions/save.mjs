import * as repository from '../repository/index.mjs'
import { getCurrentFormattedDate } from '../utils/index.mjs';
import crypto from 'crypto';
/**
 * save register's into database
 * @param {{ 
 *  incomes: Array<{id: string, name: string}>;
 *  expenses:Array<{id: string, name: string}>;
 *  investments: Array<id: string, name: string>}} data
 * 
 * @returns boolean
 */
export async function save(data) {
    if (!data)
        return { ok: false };

    const currentDate = getCurrentFormattedDate();

    const existedData = await repository.get(currentDate);
    const id = existedData ? existedData.id : crypto.randomUUID();
    await repository.save({
        id,
        records: data,
        date: currentDate
    });

    return { ok: true };
}