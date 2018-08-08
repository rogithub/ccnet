import * as ko from "knockout";
import { IFieldValidator } from './../validator/interfaces';

/**
 * Represents a field with a single value.
 */
interface IField<T> {
    /**
     * Current value for this field.
     */
    value: KnockoutObservable<T>;
    /**
     * Validators that act on the current value.
     */
    validators: IFieldValidator<T>[];
    /**
     * List of errrors found for current value.
     */
    errors: KnockoutObservableArray<string>;
    /**
     * True if current value is distinct of initialValue.
     */
    hasChanged: KnockoutComputed<boolean>;
    /**
     * True if there are errors on current value.
     */
    hasError: KnockoutComputed<boolean>;
    /**
     * Run all validator rules.
     */
    validate(): Promise<boolean>;
    /**
     * Assigns current value to the initialValue.
     */
    resetHasChanged(): void;
}

interface IFieldArray<T> {
    /**
     * Current value for this field.
     */
    value: KnockoutObservableArray<T>;
    /**
     * Validators that act on the current value.
     */
    validators: IFieldValidator<T[]>[];
    /**
     * List of errrors found for current value.
     */
    errors: KnockoutObservableArray<string>;
    /**
     * True if current value is distinct of initialValue.
     */
    hasChanged: KnockoutComputed<boolean>;
    /**
     * True if there are errors on current value.
     */
    hasError: KnockoutComputed<boolean>;
    /**
     * Run all validator rules.
     */
    validate(): Promise<boolean>;
    /**
     * Assigns current value to the initialValue.
     */
    resetHasChanged(): void;
}

interface IFieldBase<Ko extends KnockoutObservable<T> | KnockoutObservableArray<T>, T> {

    /**
     * Value for current field.
     */
    value: Ko;
    /**
     * Rules that validate current field value.
     */
    validators: IFieldValidator<T | T[]>[];
    /**
     * Error list of current value.
     */
    errors: KnockoutObservableArray<string>;
    /**
     * True if current value is distinct of initialValue.
     */
    hasChanged: KnockoutComputed<boolean>;
    /**
     * True if there are errors on current value.
     */
    hasError: KnockoutComputed<boolean>;
    /**
     * Run all validator rules.
     */
    validate(): Promise<boolean>;
    /**
     * Assigns current value to the initialValue.
     */
    resetHasChanged(): void;
}

export {
    IField,
    IFieldArray,
    IFieldBase
}
