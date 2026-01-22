/**
 * @returns {Date} current date
 */
export function getCurrentDate() {
  const now = new Date();
  const offset = now.getTimezoneOffset();
  const currentDate = new Date(now.getTime() - offset * 60 * 1000);
  return currentDate;
}

/**
 * @param {Date} date
 * @returns {string} formatted date as YYYY-MM
 */
export function formatToRefDate(date) {
  const dateString = date.toISOString().split("-");
  return `${dateString[0]}-${dateString[1]}`;
}

export const CLOSING_DAY_DEFAULT = 25;
/**
 * check if month is closed
 * @param {Date} date
 * @param {Number} closingDay - default: 25
 * @returns {Boolean} month closed
 */
export function isMonthClosed(date, closingDay = CLOSING_DAY_DEFAULT) {
  return date.getDate() > closingDay;
}

/**
 * get reference date based on current date and closing day
 * @param {Number} closingDay - default: 25
 * @returns {String} reference date
 */
export function getReferenceDate(closingDay = CLOSING_DAY_DEFAULT) {
  const currentDate = getCurrentDate();

  if (isMonthClosed(currentDate, closingDay)) {
    currentDate.setMonth(currentDate.getMonth() + 1, 1);
  }

  return formatToRefDate(currentDate);
}
