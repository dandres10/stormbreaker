


import { QuestionCollection } from "inquirer";
import { IArchitectureEntity, IArchitectureFacade } from "../4common-interfaces";
import { Injection } from "../5cross";
import { Response } from '../5cross/interfaces/interfaces-global';


export class ArchitectureFacade implements IArchitectureFacade {

    private readonly _architectureBusiness = Injection.InjectionArchitectureBusiness();

    constructor() { }

    BuildArchitecture(architectureEntity: IArchitectureEntity): Promise<Response<boolean>> {
        return this._architectureBusiness.BuildArchitecture(architectureEntity);
    }

    Questions(): Promise<Response<QuestionCollection<any>>> {
        return this._architectureBusiness.Questions();
    }

}