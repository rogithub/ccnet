import { IFieldValidator } from './interfaces';
import { IValidationResult } from './interfaces';

import PromiseUtils = require("./../utils/promiseUtils");
/**
 * Base class for validation rules.
 */
export abstract class ValidatorBase<T> implements IFieldValidator<T> {

    public abstract check(value?: T): Promise<IValidationResult>;
    
    protected toPromise(isValid: boolean, message: string = ""): Promise<IValidationResult> {
        let result: IValidationResult = {
            isValid: isValid,
            message: isValid ? "" : message
        };

        return PromiseUtils.toPromise(result);
    }
}