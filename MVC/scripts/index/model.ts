import * as ko from "knockout";
import { FormBase, IField } from "../valiko";

class Model extends FormBase {
    public firstname: IField<string>;
    public lastname: IField<string>;

    constructor(firstname: string, lastname: string) {
        super();
        
        this.firstname = this.addField<string>([], firstname);
        this.lastname = this.addField<string>([], lastname);
        
    }
}

export = Model;