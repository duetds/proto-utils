/**
 * @param name: string, id prefix to use in stepper wrapper
 * @param items: array of objects to paginate
 * @param config: object for cofigurable options: pageSize, show5Size, filtering function
 *
 */
declare const stepperPaginator: (name: string, items: {}[], config?: {
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
export { stepperPaginator };
