export type ValidatorOptions = {
    formFields: Record<string, any>;
    alertElement: HTMLElement;
    notSubmittedErrorMessage: string;
    validatorFunctions?: Record<string, (value: string) => boolean>;
    lang?: "fi" | "sv" | "en";
    errorMessages?: {
        missing?: string;
        invalid?: string;
    };
};
export declare class FormValidator {
    static create(options: ValidatorOptions): FormValidator;
    private formFields;
    private validatorFunctions;
    private errorMessages;
    private submitErrorMessage;
    private submitErrorVisibleMessage;
    private submitErrorHiddenMessage;
    isValid: boolean;
    hasValidationErrors: boolean;
    constructor({ formFields, alertElement, notSubmittedErrorMessage, validatorFunctions, lang, errorMessages, }: ValidatorOptions);
    clearSubmitErrorMessage(): void;
    setUp({ formFields: nextFormFields, notSubmittedErrorMessage, lang, errorMessages, }: {
        formFields: Record<string, any>;
        notSubmittedErrorMessage: string;
        lang?: "fi" | "sv" | "en";
        errorMessages?: {
            missing?: string;
            invalid?: string;
        };
    }): void;
    validate(): boolean;
}
