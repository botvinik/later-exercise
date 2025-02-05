// Date utility functions

export function getTodayAtMidnight() {
    const now = new Date();
    now.setHours(0, 0, 0, 0); // Set time to 00:00:00
    return now;
}

export function getTomorrowAtMidnight() {
    const tomorrow = getTodayAtMidnight();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow;
}
