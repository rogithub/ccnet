import * as ko from "knockout";
import { IFieldValidator} from './../validator/interfaces';
import { IField } from "./interfaces";
import { FieldBase } from "./fieldBase";

/**
 * Represents a field in the form with a single value.
 */
export class Field<T> extends FieldBase<KnockoutObservable<T>, T> implements IField<T> {        
    public value: KnockoutObservable<T>;            

    /**
     * Constructs a field with a single value.
     * @param validators Applied on this field when its value changes.
     * @param value Initial value.
     * @param autovalidate If true trigers validation on value change.
     * @param onValidation Notifies validation results.
     */
    constructor(validators: IFieldValidator<T>[], value: T, autovalidate: boolean = true, onValidation?: (result: boolean) => void) {
        super(validators, value);        
        
        this.value = ko.observable<T>(value);
        
        const self = this;
        if (autovalidate === false) return;

        this.value.subscribe(function (newValue: T): void {
            let promise = self.validate();
            if (onValidation !== undefined && onValidation !== null) {
                promise.then(onValidation);
            }
        });
        
    } 
}
