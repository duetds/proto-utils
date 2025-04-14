const dayInMS = 24 * 60 * 60 * 1000;
const today = new Date();
const tomorrow = new Date(today.getTime() + dayInMS);
const yesterday = new Date(today.getTime() - dayInMS);
const isDate = (date) => typeof date.getMonth === "function";
const date2ISO = (date) => date.toISOString().split("T")[0];
const date2Local = (date) => date.toLocaleDateString("fi");
const date2LocalShortMonth = (date) => date.toLocaleDateString("fi", { month: "short" });
const date2LocalShortDay = (date) => date.toLocaleDateString("fi", { day: "numeric" });
const addDaysToDate = (baseDate, days, format = "ISO") => {
    const isoDate = isDate(baseDate) ? date2ISO(baseDate) : string2ISO(baseDate);
    const date = new Date(new Date(isoDate).getTime() + dayInMS * days);
    if (format === "ISO") {
        return date2ISO(date);
    }
    if (format === "local") {
        return date2Local(date);
    }
    return date;
};
const dateFromToday = (daysFromToday, format = "ISO") => {
    return addDaysToDate(today, daysFromToday, format);
};
const isISO = (string) => !!string && /^\d{4}-\d{2}-\d{2}$/.test(string);
const ISO2Local = (string) => string && date2Local(new Date(string));
const ISO2LocalShortMonth = (string) => date2LocalShortMonth(new Date(string));
const ISO2LocalShortDay = (string) => date2LocalShortDay(new Date(string));
const ISO2LocalRange = (dateObj) => `${ISO2Local(dateObj?.startDate || "")} - ${ISO2Local(dateObj?.endDate || "")}`;
const local2ISO = (string) => string
    .split(".")
    .map(n => n.padStart(2, "0"))
    .reverse()
    .join("-");
const ISO = {
    today: date2ISO(today),
    tomorrow: date2ISO(tomorrow),
    yesterday: date2ISO(yesterday),
};
const current = {
    year: Number.parseInt(ISO.today.split("-")[0]),
    month: Number.parseInt(ISO.today.split("-")[1]),
    day: Number.parseInt(ISO.today.split("-")[2]),
};
const string2ISO = (string) => {
    if (!string) {
        return "";
    }
    if (isISO(string)) {
        return string;
    }
    if (/^[+-]?\d+$/.test(string)) {
        return dateFromToday(Number.parseInt(string), "ISO");
    }
    const [number, unit, date] = string.split(" ");
    if (!unit || !/^[+-]?\d+$/.test(number)) {
        return "";
    }
    if (unit.toLowerCase().startsWith("month")) {
        const baseDate = new Date();
        if (date?.toLowerCase() === "first") {
            baseDate.setDate(15);
            return date2ISO(new Date(baseDate.setMonth(baseDate.getMonth() + Number.parseInt(number), 1)));
        }
        if (date?.toLowerCase() === "last") {
            baseDate.setDate(15);
            const nextMonthFirst = new Date(baseDate.setMonth(baseDate.getMonth() + Number.parseInt(number) + 1, 1));
            return date2ISO(new Date(nextMonthFirst.getTime() - dayInMS));
        }
        return date2ISO(new Date(baseDate.setMonth(baseDate.getMonth() + Number.parseInt(number))));
    }
    if (unit.toLowerCase().startsWith("year")) {
        if (date?.toLowerCase() === "start") {
            return `${current.year + Number.parseInt(number)}-01-01`;
        }
        if (date?.toLowerCase() === "end") {
            return `${current.year + Number.parseInt(number)}-12-31`;
        }
        return `${current.year + Number.parseInt(number)}-${current.month}-${current.day}`;
    }
    if (unit.toLowerCase().startsWith("day")) {
        return dateFromToday(Number.parseInt(number), "ISO");
    }
    return "";
};
const string2Local = (string) => ISO2Local(string2ISO(string));
export const date = {
    ISO,
    ISO2Local,
    ISO2LocalRange,
    ISO2LocalShortDay,
    ISO2LocalShortMonth,
    addDaysToDate,
    current,
    date2ISO,
    date2Local,
    date2LocalShortDay,
    date2LocalShortMonth,
    dateFromToday,
    dayInMS,
    isISO,
    local2ISO,
    string2ISO,
    string2Local,
    today,
    tomorrow,
    yesterday,
};
