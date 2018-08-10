
/**
 * Object that can be validated and return its results on a promise.
 */
interface IValidatable {
    /**
     * Validates current instance informing the result on a boolean promise.
     */
    validate(): Promise<boolean>;
}

/**
 * Result of a validation.
 */
interface IValidationResult {
    /**
     * True if current value is valid. 
     */
    isValid: boolean;
    /**
     * Error message if value fails current validation.
     */
    message: string;
}

/**
 * Validation rule for a field.
 */
interface IFieldValidator<T> {
    check(value?: T): Promise<IValidationResult>;
}

export {
    IValidatable,
    IValidationResult,
    IFieldValidator
}