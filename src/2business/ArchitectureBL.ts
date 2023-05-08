
import fs from "fs";
import chalk from "chalk";
import { QuestionCollection } from 'inquirer';
import { IArchitectureAction, IArchitectureEntity } from "../3common-interfaces";
import { Injection, QUESTIONS, ROUTES_ARCHITECTURE } from "../4cross";
import { Response } from '../4cross/interfaces/interfaces-global'
import { CreateResponse } from "../4cross/class/create-response";

export class ArchitectureBL implements IArchitectureAction {

    private readonly _file = Injection.InjectionFile();

    private readonly _dataBL = Injection.InjectionDataBL();
    private readonly _domainBL = Injection.InjectionDomainBL();
    private readonly _facadeBL = Injection.InjectionFacadeBL();
    private readonly _infraestructureBL = Injection.InjectionInfraestructureBL();

    constructor() { }

    async BuildArchitecture(architectureEntity: IArchitectureEntity): Promise<Response<boolean>> {

        let hasAllFolders!: Response<boolean>;

        await this.HasAllFolders(architectureEntity.pathClient).then(res => hasAllFolders = res);
        if (hasAllFolders?.result) {

            await this._domainBL.Build(architectureEntity).then(res => {
                if (!res.result) {
                    return CreateResponse.FailedResponse(false);
                }
            });

            await this._infraestructureBL.Build(architectureEntity).then(res => {
                if (!res.result) {
                    return CreateResponse.FailedResponse(false);
                }
            });

            await this._facadeBL.Build(architectureEntity).then(res => {
                if (!res.result) {
                    return CreateResponse.FailedResponse(false);
                }
            });
        }

        return CreateResponse.SuccessfulResponse(true);
    }


    async Questions(): Promise<Response<QuestionCollection<any>>> {
        return CreateResponse.SuccessfulResponse(QUESTIONS);
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
                return CreateResponse.FailedResponse(false);
            }
        }
        const valid = chalk.green("Valid architecture");
        console.log(`${valid}`)
        return CreateResponse.SuccessfulResponse(true);
    }

}



// //crear un archivo dentro de una carpeta
// await this._file.CreateArchive(`${architectureEntity.pathClient}${CoreRoutesEnum.data}`, 'IInterfaceDTO', 'hola\n      tu\ngenerador\nleyendo', TypeFile.TS);
// //crear una carpeta
// if (!(await this._file.ExistFile(`${architectureEntity.pathClient}${CoreRoutesEnum.data}NuevaCarpeta`)).result) {
//     this._file.CreateNewFile(`${architectureEntity.pathClient}${CoreRoutesEnum.data}NuevaCarpeta`, 'NuevaCarpeta');
// }
// //validar si es un archivo
// console.log((await this._file.IsFile(`${architectureEntity.pathClient}${CoreRoutesEnum.data}NuevaCarpeta`)).result);
// //valida si es una carpeta
// console.log((await this._file.IsDirectory(`${architectureEntity.pathClient}${CoreRoutesEnum.data}NuevaCarpeta`)).result);
// //Cantidad de lineas en un archivo
// let lines = (await this._file.NumberOfLinesInTheFile(archivo)).result || 0;
// console.log(lines);
// //leer un archivo
// let read = (await this._file.ReadAFile(archivo)).result;
// // console.log(read?.splice(0, lines - 1));
// let union = await this._file.JoinText(read || [])
// console.log(union);