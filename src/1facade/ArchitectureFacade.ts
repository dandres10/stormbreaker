import { QuestionCollection } from "inquirer";
import { IArchitectureEntity, IArchitectureFacade } from "../3common-interfaces";
import { Injection } from "../4cross";
import { Response } from '../4cross/interfaces/interfaces-global';


export class ArchitectureFacade implements IArchitectureFacade {

    private readonly _architectureBusiness = Injection.InjectionArchitectureBusiness();
    private readonly _accessCommon = Injection.InjectionAccessCommon();

    constructor() { }

    Start(dirActualClient: string): Promise<Response<boolean>> {
        return this._accessCommon.ExecuteTransaction<any>(async () => {
            let responseStart!: Response<boolean>;
            await this._architectureBusiness.Start(dirActualClient).then((state) => responseStart = state);
            return responseStart;
        })
    }



}