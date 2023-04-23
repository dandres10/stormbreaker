
import fs from "fs";
import chalk from "chalk";
import { QuestionCollection } from 'inquirer';
import { IArchitectureAction, IArchitectureEntity } from "../4common-interfaces";
import { Injection, MessageTypeEnum, QUESTIONS, ROUTES_ARCHITECTURE } from "../5cross";
import { Response } from '../5cross/interfaces/interfaces-global'
import { CreateResponse } from "../5cross/class/create-response";
import {CoreRoutesEnum, TypeFile} from "../5cross/enums/global-enum"

export class ArchitectureBL implements IArchitectureAction {

    private readonly _file = Injection.InjectionFile();

    constructor() { }

    async BuildArchitecture(architectureEntity: IArchitectureEntity): Promise<Response<boolean>> {

        let hasAllFolders!: Response<boolean>;

        await this.HasAllFolders(architectureEntity.pathClient).then(res => hasAllFolders = res);


        //crear un archivo dentro de una carpeta
        this._file.CreateArchive(`${architectureEntity.pathClient}${CoreRoutesEnum.data}`,'IInterfaceDTO.ts', 'hola', TypeFile.TS);
        //crear una carpeta
        this._file.CreateNewFile(`${architectureEntity.pathClient}${CoreRoutesEnum.data}NuevaCarpeta`, 'NuevaCarpeta');

        


        return hasAllFolders;
    }

    private async CreateFile(architectureEntity: IArchitectureEntity) {
        fs.appendFileSync('hola.ts', "import fs from 'fs'")
    }


    async Questions(): Promise<Response<QuestionCollection<any>>> {
        return CreateResponse.SuccessfulResponse(QUESTIONS, MessageTypeEnum.NONE);
    }

    async HasAllFolders(pathClient: string): Promise<Response<boolean>> {

        const validatingArchitecture = chalk.green("Validating architecture...");
        console.log(`${validatingArchitecture}`);

        let routes = ROUTES_ARCHITECTURE;

        for (const route of routes) {
            if (!fs.existsSync(`${pathClient}${route}`)) {
                const thereIsNoRoute = chalk.red(`- This route does not exist: ${pathClient}${route}`);
                const error = chalk.red(`- [Error] The request was not completed`);
                console.log(`${thereIsNoRoute}`);
                console.log(`${error}`);
                return CreateResponse.FailedResponse(false, MessageTypeEnum.NONE);
            }
        }
        const valid = chalk.green("Valid architecture");
        console.log(`${valid}`)
        return CreateResponse.SuccessfulResponse(true, MessageTypeEnum.NONE);
    }

}