declare const ProtoUtils: {
    currency: (number: number, hideCents: boolean) => string;
    date: {
        ISO: {
            today: string;
            tomorrow: string;
            yesterday: string;
        };
        ISO2Local: (string: string) => string;
        ISO2LocalRange: (dateObj: {
            startDate: string;
            endDate: string;
        }) => string;
        ISO2LocalShortDay: (string: string) => string;
        ISO2LocalShortMonth: (string: string) => string;
        addDaysToDate: (baseDate: Date | string, days: number, format?: "ISO" | "local" | "data") => string | Date;
        current: {
            year: number;
            month: number;
            day: number;
        };
        date2ISO: (date: Date) => string;
        date2Local: (date: Date) => string;
        date2LocalShortDay: (date: Date) => string;
        date2LocalShortMonth: (date: Date) => string;
        dateFromToday: (daysFromToday: number, format?: "ISO" | "local" | "data") => string | Date;
        dayInMS: number;
        isISO: (string: string) => boolean;
        local2ISO: (string: string) => string;
        string2ISO: (string: string) => string;
        string2Local: (string: string) => string;
        today: Date;
        tomorrow: Date;
        yesterday: Date;
    };
    downloadFile: (url: string, fileName?: string) => void;
    id: (prefix?: string) => string;
    queryParam: (param: string) => string;
    rnd: (min: number, max: number) => number;
    sampleData: {
        data: any;
        init(): void;
        set(path: string, value: any): void;
        get(path: string): {};
        clear(): void;
    };
    stepperPaginator: (name: string, items: {}[], config?: {
        pageSize?: number;
        show5Size?: number;
        filtering?: () => {};
    }) => {
        allItems: {}[];
        displayItems: any[];
        displayPage: any[];
        pageSize: number;
        total: number;
        index: number;
        paginationStepper: Element;
        paginationSizer: Element;
        setPaginationSizeItems(): void;
        setPage(): void;
        checkPageIndex(): void;
        changePageSize(event: CustomEvent): void;
        changePage(event: CustomEvent): void;
        filterList(): void;
        init(): void;
    };
    store: {
        set(key: string, value: any): void;
        get(key: string): any;
        del(key: string): void;
    };
    str: {
        dobFromSsn: (ssn: string) => string;
        ucFirst: (string: string) => string;
    };
    themeSwitch: {
        set(theme: string): void;
        swap(): void;
        init(): void;
    };
    validator: {
        isValidEmail(email: string): boolean;
        isValidPhoneNumber(phone: string): boolean;
        isValidFinnishSSN(ssn: string, strict?: boolean): boolean;
        isValidBusinessId(businessId: string): boolean;
        isValidDate(dateStr: string): boolean;
    };
};
export default ProtoUtils;
