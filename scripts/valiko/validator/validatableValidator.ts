import { IValidatable } from './interfaces';
import { IValidationResult } from './interfaces';
import { ValidatorBase } from "./validatorBase";

/**
 * Validator that runs all validations on a IValidatable.
 */
export class ValidatableValidator<T extends IValidatable> extends ValidatorBase<T[]> {
    private message: string;

    /**
     * Message to display if errors.
     * @param message Error message
     */
    constructor(message: string) {
        super();
        this.message = message;
    }

    /**
     * Runs all validation rules against given value.
     * @param value Current value.
     */
    public async check(value?: T[]): Promise<IValidationResult> {
        const self = this;
        let isValid = true;

        if (value === null || value === undefined) {
            return self.toPromise(isValid, self.message);
        }

        for (let f of value) {
            if (await f.validate() === false) {
                isValid = false;
            }
        }

        return self.toPromise(isValid, self.message);
    }
}