export declare const date: {
  ISO: {
    today: string
    tomorrow: string
    yesterday: string
  }
  ISO2Local: (string: string) => string
  ISO2LocalRange: (dateObj: { startDate: string; endDate: string }) => string
  ISO2LocalShortDay: (string: string) => string
  ISO2LocalShortMonth: (string: string) => string
  addDaysToDate: (baseDate: Date | string, days: number, format?: "ISO" | "local" | "data") => string | Date
  current: {
    year: number
    month: number
    day: number
  }
  date2ISO: (date: Date) => string
  date2Local: (date: Date) => string
  date2LocalShortDay: (date: Date) => string
  date2LocalShortMonth: (date: Date) => string
  dateFromToday: (daysFromToday: number, format?: "ISO" | "local" | "data") => string | Date
  dayInMS: number
  isISO: (string: string) => boolean
  local2ISO: (string: string) => string
  string2ISO: (string: string) => string
  string2Local: (string: string) => string
  today: Date
  tomorrow: Date
  yesterday: Date
}
