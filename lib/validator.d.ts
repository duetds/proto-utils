/**
 * Validator for prototyping, these are purposely permissive
 * and are not intended to be used in production
 */
declare const validator: {
    /**
     * Basic email validation
     * Checks for single @ and .
     */
    isValidEmail(email: string): boolean;
    /**
     * Basic phone validation
     * Checks it starts with + and has some numbers
     */
    isValidPhoneNumber(phone: string): boolean;
    /**
     * Finnish SSN validation using 3rd party library
     */
    isValidFinnishSSN(ssn: string): boolean;
    /**
     * Basic business ID validation
     * Checks the format XXXXXXX-X
     */
    isValidBusinessId(businessId: string): boolean;
    /**
     * Basic date validation
     * Checks if the string can be parsed as a date
     */
    isValidDate(dateStr: string): boolean;
};
export { validator };
