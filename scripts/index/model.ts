import * as ko from "knockout";
import { FormBase, IField } from "../valiko";

class Model extends FormBase {
    public firstname: KnockoutObservable<string>;
    public lastname: IField<string>;

    constructor(firstname: string, lastname: string) {
        super();
        
        this.firstname = ko.observable<string>(firstname);
        this.lastname = this.addField([], lastname);
        
    }
}

export = Model;