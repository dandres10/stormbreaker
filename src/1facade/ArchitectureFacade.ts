


import { QuestionCollection } from "inquirer";
import { IArchitectureAction } from "../4common-interfaces";
import { Injection } from "../5cross";



export class ArchitectureFacade implements IArchitectureAction {

    private readonly _architectureBusiness = Injection.InjectionArchitectureBusiness();


    constructor() { }

    HasAllFolders(pathClient: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    Questions(): Promise<QuestionCollection<any>> {
        return this._architectureBusiness.Questions();
    }

}