export function getCurrentFormattedDate() {
    const now = new Date();
    const offset = now.getTimezoneOffset()
    const currentDate = new Date(now.getTime() - (offset * 60 * 1000))
    const date = currentDate.toISOString().split('-');
    return `${date[0]}-${date[1]}`;
}
