


import { QuestionCollection } from "inquirer";
import { IArchitectureEntity, IArchitectureFacade } from "../4common-interfaces";
import { Injection } from "../5cross";



export class ArchitectureFacade implements IArchitectureFacade {

    private readonly _architectureBusiness = Injection.InjectionArchitectureBusiness();


    constructor() { }

    BuildArchitecture(architectureEntity: IArchitectureEntity): Promise<boolean> {
        return this._architectureBusiness.BuildArchitecture(architectureEntity);
    }

    Questions(): Promise<QuestionCollection<any>> {
        return this._architectureBusiness.Questions();
    }

}