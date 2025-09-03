/**
 * @returns {Date} Start Date of currentMonth including time.
 */
export function getStartDateOfCurrentMonth() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();

    // Get the first day of the current month
    const firstDayOfMonth = new Date(year, month, 1);
    return firstDayOfMonth;
}

export function getStartDateOfNextMonth() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();

    // Get the first day of the next month
    const firstDayOfNextMonth = new Date(year, month + 1, 1);
    return firstDayOfNextMonth;
}

export function getPercentageIncrease(prev: number, next: number) {
    if (prev === 0) return next > 0 ? 100 : 0;
    return Math.round((next - prev) / prev * 100);
}
