import * as ko from "knockout";
import { IFieldValidator } from './../validator/interfaces';
import { IFieldArray } from "./interfaces";
import { FieldBase } from "./fieldBase";

/**
 * Represents a field in the form with multiple values.
 */
export class FieldArray<T> extends FieldBase<KnockoutObservableArray<T>, T> implements IFieldArray<T> {    
    public value: KnockoutObservableArray<T>;

    /**
     * Constructs a field with multiple values.
     * @param validators Applied on this field when "validate" method is called.
     * @param value Initial value.
     * @param autovalidate If true trigers validation on value change.
     * @param validationSubscribe Notifies validation results.
     */
    constructor(validators: IFieldValidator<T[]>[], value: T[] = [], autovalidate: boolean = false, onValidation?: (result: boolean) => void) {
        super(validators, value);        
        this.value = ko.observableArray<T>(value);
        
        if (autovalidate === false) return;
                    
        const self = this;
        self.value.subscribe(function (changes: KnockoutArrayChange<T>): void {
            let promise = self.validate();
            if (onValidation !== undefined && onValidation !== null) {
                promise.then(onValidation);
            }
        }, self, "arrayChange");            
    }    
}
