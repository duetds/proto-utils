/**
 * @param elementOrName: HTMLElement | string, container element or id prefix to use in stepper wrapper
 * @param items: array of objects to paginate
 * @param config: object for configurable options: pageSize, show5Size, filtering function
 *
 */
declare const stepperPaginator: (
  elementOrName: HTMLElement | string,
  items: {}[],
  config?: {
    pageSize?: number
    show5Size?: number
    filtering?: () => {}
  }
) => {
  allItems: {}[]
  displayItems: any[]
  displayPage: any[]
  pageSize: number
  total: number
  index: number
  paginationStepper: Element
  paginationSizer: Element
  setPaginationSizeItems(): void
  setPage(): void
  checkPageIndex(): void
  changePageSize(event: CustomEvent): void
  changePage(event: CustomEvent): void
  filterList(): void
  init(): void
}
export { stepperPaginator }
