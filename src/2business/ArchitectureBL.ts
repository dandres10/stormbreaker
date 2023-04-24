
import fs from "fs";
import chalk from "chalk";
import { QuestionCollection } from 'inquirer';
import { IArchitectureAction, IArchitectureEntity } from "../4common-interfaces";
import { Injection, MessageTypeEnum, QUESTIONS, ROUTES_ARCHITECTURE } from "../5cross";
import { Response } from '../5cross/interfaces/interfaces-global'
import { CreateResponse } from "../5cross/class/create-response";
import { CoreRoutesEnum, TypeFile } from "../5cross/enums/global-enum"

export class ArchitectureBL implements IArchitectureAction {

    private readonly _file = Injection.InjectionFile();

    constructor() { }

    async BuildArchitecture(architectureEntity: IArchitectureEntity): Promise<Response<boolean>> {

        let hasAllFolders!: Response<boolean>;
        const archivo = `${architectureEntity.pathClient}${CoreRoutesEnum.data}IInterfaceDTO.ts`;

        await this.HasAllFolders(architectureEntity.pathClient).then(res => hasAllFolders = res);


        //crear un archivo dentro de una carpeta
        await this._file.CreateArchive(`${architectureEntity.pathClient}${CoreRoutesEnum.data}`, 'IInterfaceDTO', 'hola\n      tu\ngenerador\nleyendo', TypeFile.TS);
        //crear una carpeta
        if (!(await this._file.ExistFile(`${architectureEntity.pathClient}${CoreRoutesEnum.data}NuevaCarpeta`)).result) {
            this._file.CreateNewFile(`${architectureEntity.pathClient}${CoreRoutesEnum.data}NuevaCarpeta`, 'NuevaCarpeta');
        }
        //validar si es un archivo 
        console.log((await this._file.IsFile(`${architectureEntity.pathClient}${CoreRoutesEnum.data}NuevaCarpeta`)).result);
        //valida si es una carpeta
        console.log((await this._file.IsDirectory(`${architectureEntity.pathClient}${CoreRoutesEnum.data}NuevaCarpeta`)).result);
        //Cantidad de lineas en un archivo
        let lines = (await this._file.NumberOfLinesInTheFile(archivo)).result || 0;
        console.log(lines);
        //leer un archivo
        let read = (await this._file.ReadAFile(archivo)).result;
        // console.log(read?.splice(0, lines - 1));
        let union = await this._file.JoinText(read || [])
        console.log(union);


        return hasAllFolders;
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