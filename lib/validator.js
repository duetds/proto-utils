import * as finnishSSNModule from "finnish-ssn";
/**
 * Validator for prototyping, these are purposely permissive
 * and are not intended to be used in production
 */
const validator = {
    /**
     * Basic email validation
     * Checks for single @ and .
     */
    isValidEmail(email) {
        if (!email)
            return false;
        return (email.match(/@/g) || []).length === 1 && email.includes(".");
    },
    /**
     * Basic phone validation
     * Checks it starts with + and has some numbers
     */
    isValidPhoneNumber(phone) {
        if (!phone)
            return false;
        return phone.startsWith("+") && phone.length > 3;
    },
    /**
     * Finnish SSN validation using 3rd party library
     */
    isValidFinnishSSN(ssn) {
        if (!ssn)
            return false;
        return finnishSSNModule.FinnishSSN.validate(ssn);
    },
    /**
     * Basic business ID validation
     * Checks the format XXXXXXX-X
     */
    isValidBusinessId(businessId) {
        if (!businessId)
            return false;
        return /^\d{7}-\d$/.test(businessId);
    },
    /**
     * Basic date validation
     * Checks if the string can be parsed as a date
     */
    isValidDate(dateStr) {
        if (!dateStr)
            return false;
        const date = new Date(dateStr);
        return !Number.isNaN(date.getTime());
    },
};
export { validator };
