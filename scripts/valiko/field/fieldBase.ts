import * as ko from "knockout";
import { IValidatable } from './../validator/interfaces';
import { IFieldValidator } from './../validator/interfaces';
import { IFieldBase } from "./interfaces";
import PromiseUtils = require('./../utils/promiseUtils');

/**
 * Base class for fields.
 */
export abstract class FieldBase<Ko extends KnockoutObservable<T> | KnockoutObservableArray<T>, T> implements IFieldBase<Ko, T>, IValidatable {
    public validators: IFieldValidator<T | T[]>[];
    public abstract value: Ko;
    public errors: KnockoutObservableArray<string>;
    public hasChanged: KnockoutComputed<boolean>;
    public hasError: KnockoutComputed<boolean>;    
    protected initialValue: string;

    constructor(validators: IFieldValidator<T | T[]>[], value?: T | T[]) {
        this.validators = validators;
        this.initialValue = JSON.stringify(value);        

        this.errors = ko.observableArray<string>([]);

        const self = this;        

        this.hasChanged = ko.pureComputed<boolean>(function (): boolean {
            return self.getHasChanged();
        }, self);
        this.hasError = ko.pureComputed<boolean>(function (): boolean {
            return self.errors().length > 0;
        }, self);
    }

    /**
     * Applies existing validators on current value.
     */
    public async validate(): Promise<boolean> {
        const self = this;
        self.errors.removeAll();

        let isValid = true;

        for (let validator of self.validators) {
            let result = await validator.check(self.value());

            if (result.isValid === false) {
                self.errors.push(result.message);
                isValid = false;
            }
        }

        return PromiseUtils.toPromise(isValid);
    }

    /**
     * True if current value is distinct of initial value.
     */
    protected getHasChanged(): boolean {
        const self = this;
        let changedVal = (self.initialValue !== JSON.stringify(self.value()));

        return changedVal;
    }

    /**
     * Assigns the current value to initialValue.
     */
    public resetHasChanged(): void {
        const self = this;
        self.initialValue = JSON.stringify(self.value());
    }
}
