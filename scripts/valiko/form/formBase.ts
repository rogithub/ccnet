import * as ko from "knockout";

import { IFieldValidator } from './../validator/interfaces';

import { IField } from "./../field/interfaces";
import { IFieldBase } from "./../field/interfaces";
import { IFieldArray } from "./../field/interfaces";

import { Field } from "./../field/field";
import { FieldBase } from "./../field/fieldBase";
import { FieldArray } from "../field/fieldArray";
import { ValidatableValidator } from "../validator/validatableValidator";

/**
 * Represents a form with a collection of Fields.
 */
export abstract class FormBase extends FieldBase<KnockoutObservableArray<IFieldBase<any, any>>, IFieldBase<any, any>> {    
    
    public value: KnockoutObservableArray<IFieldBase<any, any>>;    
    
    /**
     * Constructs a new form object.
     * @param validators List of validation rules.
     */
    constructor(validators: IFieldValidator<IFieldBase<any, any>[]>[] = [new ValidatableValidator<IFieldBase<any, any>>("Please fix all errors.")]) {
        super(validators, []);
        this.value = ko.observableArray<IFieldBase<any, any>>();
    }

    /**
     * Resets all fields hasChanged attribute.
     */
    public resetHasChanged(): void {
        const self = this;
        for (let field of self.value()) {
            field.resetHasChanged();
        }
    }

    /**
     * True if any of its internal fields has changed.
     */
    protected getHasChanged(): boolean {
        const self = this;
        for (let field of self.value()) {
            if (field.hasChanged()) {
                return true;
            }
        }

        return false;
    }

    /**
     * Adds a new field to this form object.
     */
    public addField<T>(validators: IFieldValidator<T>[], value: T, autovalidate : boolean = true, onValidation?: (result: boolean) => void): IField<T> {
        const self = this;

        let field: IField<T> = new Field<T>(validators, value, autovalidate, onValidation);

        self.value.push(field);

        return field;
    }

    /**
     * Adds a new field array to this form object.
     */
    public addFieldArray<T>(validators: IFieldValidator<T[]>[], value: T[] = [], autovalidate: boolean = false, onValidation?: (result: boolean) => void): IFieldArray<T> {
        const self = this;                

        let field: IFieldArray<T> = new FieldArray<T>(validators, value, autovalidate, onValidation);

        self.value.push(field);

        return field;
    }
}
