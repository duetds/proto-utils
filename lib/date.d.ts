export declare const date: {
    dayInMS: number;
    today: Date;
    tomorrow: Date;
    yesterday: Date;
    ISO: {
        today: string;
        tomorrow: string;
        yesterday: string;
    };
    current: {
        year: number;
        month: number;
        day: number;
    };
    isISO: (string: string) => boolean;
    date2ISO: (date: Date) => string;
    date2Local: (date: Date) => string;
    date2LocalShortMonth: (date: Date) => string;
    date2LocalShortDay: (date: Date) => string;
    dateFromToday: (daysFromToday: number, format?: "ISO" | "local" | "data") => string | Date;
    addDaysToDate: (baseDate: Date | string, days: number, format?: "ISO" | "local" | "data") => string | Date;
    ISO2Local: (string: string) => string;
    ISO2LocalShortMonth: (string: string) => string;
    ISO2LocalShortDay: (string: string) => string;
    ISO2LocalRange: (dateObj: {
        startDate: string;
        endDate: string;
    }) => string;
    local2ISO: (string: string) => string;
    string2ISO: (string: string) => string;
    string2Local: (string: string) => string;
};
