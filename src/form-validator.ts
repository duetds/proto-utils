export type ValidatorOptions = {
  formFields: Record<string, any>
  alertElement: HTMLElement
  notSubmittedErrorMessage: string
  validatorFunctions?: Record<string, (value: string) => boolean>
  lang?: "fi" | "sv" | "en"
  errorMessages?: {
    missing?: string
    invalid?: string
  }
}

export class FormValidator {
  static create(options: ValidatorOptions) {
    return new FormValidator(options)
  }

  private formFields: Record<string, any>
  private validatorFunctions: Record<string, (value: string) => boolean>
  private errorMessages: { missing: string; invalid: string; notSubmitted: string }
  private submitErrorMessage: HTMLElement
  private submitErrorVisibleMessage: HTMLElement
  private submitErrorHiddenMessage: HTMLElement
  public isValid: boolean
  public hasValidationErrors: boolean

  constructor({
    formFields,
    alertElement,
    notSubmittedErrorMessage,
    validatorFunctions = {},
    lang,
    errorMessages = {},
  }: ValidatorOptions) {
    this.formFields = formFields
    this.validatorFunctions = validatorFunctions
    this.errorMessages = { missing: "", invalid: "", notSubmitted: "" }
    this.submitErrorMessage = alertElement
    this.submitErrorVisibleMessage = alertElement.querySelector(".visible") as HTMLElement
    this.submitErrorHiddenMessage = alertElement.querySelector("duet-visually-hidden") as HTMLElement
    this.isValid = false
    this.hasValidationErrors = false

    this.setUp({ formFields, notSubmittedErrorMessage, lang, errorMessages })
  }

  clearSubmitErrorMessage() {
    this.submitErrorVisibleMessage.textContent = ""
    this.submitErrorHiddenMessage.textContent = ""
    this.submitErrorMessage.style.display = "none"
    this.hasValidationErrors = false
  }

  setUp({
    formFields: nextFormFields,
    notSubmittedErrorMessage,
    lang,
    errorMessages = {},
  }: {
    formFields: Record<string, any>
    notSubmittedErrorMessage: string
    lang?: "fi" | "sv" | "en"
    errorMessages?: { missing?: string; invalid?: string }
  }) {
    this.formFields = nextFormFields

    for (const field in nextFormFields) {
      nextFormFields[field].addEventListener("duetChange", () => {
        const nativeElement = nextFormFields[field].querySelector("input, textarea")
        const value = nextFormFields[field].value

        if (nextFormFields[field]?.matches("duet-date-picker")) {
          nextFormFields[field].error = ""
        }

        if (nextFormFields[field]?.matches("duet-checkbox")) {
          nextFormFields[field].error = ""
        }

        if (value && (!nativeElement || nativeElement.validity.valid)) {
          nextFormFields[field].error = ""
        }

        if (value && Object.values(this.formFields).every(f => !f.error || f.error === "")) {
          this.clearSubmitErrorMessage()
        }
      })
    }
    this.clearSubmitErrorMessage()

    const safeLang = lang || "fi"
    const defaults = {
      missing: { fi: "Puuttuu", en: "Missing", sv: "Saknas" }[safeLang],
      invalid: { fi: "Virheellinen", en: "Invalid", sv: "Felaktig" }[safeLang],
    }
    this.errorMessages = {
      missing: errorMessages.missing || defaults.missing,
      invalid: errorMessages.invalid || defaults.invalid,
      notSubmitted: notSubmittedErrorMessage,
    }
  }

  validate() {
    this.clearSubmitErrorMessage()
    this.isValid = false

    const invalidFields: any[] = []
    const checkFieldsValidityObject = (field: any) => {
      const invalidities = Object.entries(field.validity)
        .filter(([key, invalid]) => invalid && key !== "valid")
        .map(([key]) => key)
      const errorMessages: string[] = []
      invalidities.forEach(i => {
        if (field.dataset[i]) {
          errorMessages.push(field.dataset[i])
        } else if (i === "valueMissing" && field.dataset.errorMissing) {
          errorMessages.push(field.dataset.errorMissing)
        }
      })
      field.error = errorMessages.join(" ") || field.dataset.errorInvalid || this.errorMessages.invalid
      invalidFields.push(field)
    }

    if (this.formFields) {
      Object.values(this.formFields).forEach((f: any) => {
        if (f.dataset.conditionallyOptionalIn) {
          document.querySelector(f.dataset.conditionallyOptionalIn)!.error = ""
        }
      })
    }

    for (const fieldName in this.formFields) {
      const field = this.formFields[fieldName]
      field.error = ""
      const value = `${field.value || ""}`.trim()
      const isCheckbox = field.matches("duet-checkbox")
      const isMissing = isCheckbox ? !field.checked : value === ""

      if (field.matches("duet-date-picker") && !field.validity.valid) {
        checkFieldsValidityObject(field)
      } else if (isMissing && !field.dataset.conditionallyOptionalIn && !field.dataset.optional) {
        field.error = field.dataset.errorMissing || this.errorMessages.missing
        invalidFields.push(field)
        field.required = true
      } else if (field.validity && !field.validity.valid) {
        checkFieldsValidityObject(field)
      }
      if (field.dataset.conditionallyOptionalIn) {
        const container = document.querySelector(field.dataset.conditionallyOptionalIn) as any
        const optionalFields = [...container.querySelectorAll("[data-conditionally-optional-in]")]
        if (
          !optionalFields.some((f: any) => `${f.value || ""}`.trim() !== "") &&
          !invalidFields.find(f => f.label === container.label)
        ) {
          container.error = container.dataset.errorMissing || this.errorMessages.missing
          invalidFields.push(container)
        }
      }
      if (
        !field.error &&
        value !== "" &&
        field.dataset.validatorFunction &&
        !this.validatorFunctions[field.dataset.validatorFunction](field.value)
      ) {
        field.error = field.dataset.errorInvalid || this.errorMessages.invalid
        invalidFields.push(field)
      }
    }

    if (invalidFields.length) {
      this.hasValidationErrors = true
      this.submitErrorVisibleMessage.textContent = this.errorMessages.notSubmitted
      this.submitErrorHiddenMessage.textContent = invalidFields
        .map(field => `${field.label}, ${field.error}`)
        .join(". ")
      this.submitErrorMessage.style.display = "block"
      return false
    }
    this.isValid = true
    return true
  }
}
