export const MONTHS = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
];

export const DAYS_SHORT = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

/** Days in a given month */
export const getDaysInMonth = (year, month) =>
    new Date(year, month + 1, 0).getDate();

/**
 * First weekday of the month (0 = Mon … 6 = Sun)
 */
export const getFirstDayOfMonth = (year, month) => {
    const d = new Date(year, month, 1).getDay(); // 0=Sun
    return d === 0 ? 6 : d - 1;
};

/**
 * Build a 42-cell grid for the month.
 * Each cell: { date: Date, isCurrentMonth: boolean }
 */
export const buildCalendarGrid = (year, month) => {
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    const prevDays = getDaysInMonth(year, month - 1);

    const grid = [];

    // leading days from prev month
    for (let i = firstDay - 1; i >= 0; i--) {
        grid.push({ date: new Date(year, month - 1, prevDays - i), isCurrentMonth: false });
    }
    // current month
    for (let d = 1; d <= daysInMonth; d++) {
        grid.push({ date: new Date(year, month, d), isCurrentMonth: true });
    }
    // trailing days to fill 42 cells
    const trailing = 42 - grid.length;
    for (let d = 1; d <= trailing; d++) {
        grid.push({ date: new Date(year, month + 1, d), isCurrentMonth: false });
    }
    return grid;
};

export const isSameDay = (a, b) => {
    if (!a || !b) return false;
    return (
        a.getFullYear() === b.getFullYear() &&
        a.getMonth() === b.getMonth() &&
        a.getDate() === b.getDate()
    );
};

/** Strictly between start and end (order-independent) */
export const isInRange = (date, start, end) => {
    if (!start || !end) return false;
    const t = date.getTime();
    const [lo, hi] = start < end ? [start.getTime(), end.getTime()] : [end.getTime(), start.getTime()];
    return t > lo && t < hi;
};

export const isWeekend = (date) => {
    const d = date.getDay();
    return d === 0 || d === 6;
};

export const isToday = (date) => isSameDay(date, new Date());

export const formatShort = (date) =>
    date ? `${MONTHS[date.getMonth()].slice(0, 3)} ${date.getDate()}` : "";

export const countRangeDays = (start, end) => {
    if (!start || !end) return 0;
    return Math.round(Math.abs(end - start) / 86400000) + 1;
};

// Per-month themed Unsplash images
export const MONTH_IMAGES = [
    "/images/jan.jpg",
    "/images/feb.jpg",
    "/images/mar.jpg",
    "/images/apr.jpg",
    "/images/may.jpg",
    "/images/jun.jpg",
    "/images/jul.jpg",
    "/images/aug.jpg",
    "/images/sep.jpg",
    "/images/oct.jpg",
    "/images/nov.jpg",
    "/images/dec.jpg",
];

export const HERO_IMAGE = "/images/hero.jpg";