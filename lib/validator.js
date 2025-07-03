import * as finnishSSNModule from "finnish-ssn";
/**
 * Validator for prototyping, these are purposely permissive
 * and are not intended to be used in production
 */
const validator = {
    /**
     * Basic email validation
     *
     * @param email - The email to validate
     * @returns True if the email is valid, false otherwise
     */
    isValidEmail(email) {
        if (!email)
            return false;
        return /^[a-zA-Z0-9\._\-]+@[a-zA-Z0-9\._\-]+\.[a-zA-Z]{2,6}$/.test(email);
    },
    /**
     * Basic phone validation
     * Checks it starts with + and has some numbers
     *
     * @param phone - The phone number to validate
     * @returns True if the phone number is valid, false otherwise
     */
    isValidPhoneNumber(phone) {
        if (!phone)
            return false;
        return phone.startsWith("+") && phone.length > 3;
    },
    /**
     * Finnish SSN validation using 3rd party library
     *
     * @param ssn - The SSN to validate
     * @param strict - Whether to use the strict validation
     * @returns True if the SSN is valid, false otherwise
     */
    isValidFinnishSSN(ssn, strict = false) {
        if (!ssn)
            return false;
        return strict ? finnishSSNModule.FinnishSSN.validate(ssn) : /^\d{6}[\+\-aA]\d{3}[\da-zA-Z]$/.test(ssn);
    },
    /**
     * Basic business ID validation
     * Checks the format XXXXXXX-X
     *
     * @param businessId - The business ID to validate
     * @returns True if the business ID is valid, false otherwise
     */
    isValidBusinessId(businessId) {
        if (!businessId)
            return false;
        return /^\d{7}-\d$/.test(businessId);
    },
    /**
     * Basic date validation
     * Checks if the string can be parsed as a date
     *
     * @param dateStr - The date string to validate
     * @returns True if the date string is valid, false otherwise
     */
    isValidDate(dateStr) {
        if (!dateStr)
            return false;
        const date = new Date(dateStr);
        return !Number.isNaN(date.getTime());
    },
};
export { validator };
