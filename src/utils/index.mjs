export function getReferenceDate(closingDay = 25) {
    const now = new Date();
    const offset = now.getTimezoneOffset()
    const currentDate = new Date(now.getTime() - (offset * 60 * 1000))

    if (currentDate.getDate() > closingDay) {
        currentDate.setMonth(currentDate.getMonth() + 1);
    }
    const date = currentDate.toISOString().split('-');
    return `${date[0]}-${date[1]}`;
}
