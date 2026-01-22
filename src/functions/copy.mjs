import * as repository from "../repository/index.mjs";
import { getReferenceDate, getCurrentDate, isMonthClosed, formatToRefDate } from "../utils/index.mjs";
import crypto from "node:crypto";
/**
 * copy register's
 * @returns {Promise<{ ok: boolean }>} copy result
 */
export async function copy() {
  const currentDataResult = await getCurrentRecordsData();

  if (!currentDataResult.ok) {
    return { ok: false };
  }

  const { records } = currentDataResult.data;

  const refDate = getReferenceDate();

  await repository.save({
    id: crypto.randomUUID(),
    date: refDate,
    records,
  });

  return { ok: true };
}

async function getCurrentRecordsData() {
  const currentDate = getCurrentDate();

  if (!isMonthClosed(currentDate)) {
    return { ok: false };
  }
  const formatedCurrentDate = formatToRefDate(currentDate);

  const currentData = await repository.get(formatedCurrentDate);

  if (!currentData) {
    return { ok: false };
  }

  return { ok: true, data: currentData };
}
