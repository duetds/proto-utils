/**
 * Validator for prototyping, these are purposely permissive
 * and are not intended to be used in production
 */
declare const validator: {
  /**
   * Basic email validation
   *
   * @param email - The email to validate
   * @returns True if the email is valid, false otherwise
   */
  isValidEmail(email: string): boolean
  /**
   * Basic phone validation
   * Checks it starts with + and has some numbers
   *
   * @param phone - The phone number to validate
   * @returns True if the phone number is valid, false otherwise
   */
  isValidPhoneNumber(phone: string): boolean
  /**
   * Finnish SSN validation using 3rd party library
   *
   * @param ssn - The SSN to validate
   * @param strict - Whether to use the strict validation
   * @returns True if the SSN is valid, false otherwise
   */
  isValidFinnishSSN(ssn: string, strict?: boolean): boolean
  /**
   * Basic business ID validation
   * Checks the format XXXXXXX-X
   *
   * @param businessId - The business ID to validate
   * @returns True if the business ID is valid, false otherwise
   */
  isValidBusinessId(businessId: string): boolean
  /**
   * Basic date validation
   * Checks if the string can be parsed as a date
   *
   * @param dateStr - The date string to validate
   * @returns True if the date string is valid, false otherwise
   */
  isValidDate(dateStr: string): boolean
}
export { validator }
