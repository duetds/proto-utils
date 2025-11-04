/**
 * @param elementOrName: HTMLElement | string, container element or id prefix to use in stepper wrapper
 * @param items: array of objects to paginate
 * @param config: object for configurable options: pageSize, show5Size, filtering function
 *
 */

const MAX_PAGE_SIZE = 40

const stepperPaginator = (
  elementOrName: HTMLElement | string,
  items: {}[],
  config: { pageSize?: number; show5Size?: number; filtering?: () => {} } = {}
) => {
  let stepperElement: HTMLElement

  // 1. Traditional name-based approach
  // 2. Direct container element (ShadowDOM compatible)
  if (typeof elementOrName === "string") {
    stepperElement = document.getElementById(`${elementOrName}-pagination-stepper`)
    if (!stepperElement) {
      throw new Error(`Paginator container not found with name: ${elementOrName}`)
    }
  } else if (elementOrName instanceof HTMLElement) {
    stepperElement = elementOrName
  } else {
    throw new Error("Paginator needs either a container element or a name string")
  }

  return {
    allItems: items,
    displayItems: [],
    displayPage: [],
    pageSize: config.pageSize || 10,
    total: items.length,
    index: 1,
    paginationStepper: stepperElement.querySelector(".pagination-step"),
    paginationSizer: stepperElement.querySelector(".pagination-size"),

    setPaginationSizeItems() {
      const optionCount = Math.ceil(this.total / 10)
      const items = []
      if (config.show5Size || config.pageSize < 10) {
        items.push({
          label: "5",
          value: "5",
        })
      }
      for (let i = 1; i < optionCount && i * 10 <= MAX_PAGE_SIZE; i++) {
        items.push({
          label: `${i}0`,
          value: `${i}0`,
        })
      }
      this.paginationSizer.items = items
    },
    setPage() {
      this.displayPage = this.displayItems.slice((this.index - 1) * this.pageSize, this.index * this.pageSize)
    },
    checkPageIndex() {
      if (this.total < this.index * this.pageSize) {
        const index = Math.floor(this.total / this.pageSize) || 1
        this.index = index
        this.paginationStepper.stepIndex = index
      }
    },
    changePageSize(event: CustomEvent) {
      this.pageSize = event.detail.value * 1
      this.checkPageIndex()
      this.setPage()
    },
    changePage(event: CustomEvent) {
      this.index = event.detail.index
      this.setPage()
    },
    filterList() {
      this.displayItems = this.allItems.filter(config.filtering)
      this.total = this.displayItems.length
      this.checkPageIndex()
      this.setPaginationSizeItems()
      this.setPage()
    },
    init() {
      this.displayItems = this.allItems
      this.index = 1
      this.paginationStepper.stepIndex = 1
      this.setPaginationSizeItems()
      this.setPage()
    },
  }
}

export { stepperPaginator }
