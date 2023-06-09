import fs from 'fs'
import { MessageTypeEnum, TypeFile } from '../enums/global-enum';
import { Response } from '../interfaces/interfaces-global'
import { CreateResponse } from './create-response';

export class File {

    constructor() { }

    public async CreateFile(route: string, nameFile: string, data: string, typeFile: TypeFile): Promise<Response<string>> {
        return new Promise((resolve, reject) => {
            fs.writeFile(`${route}${nameFile}${typeFile}`, data, (err) => {
                if (err) {
                    reject(err)
                }
                else {
                    console.log(`Archivo creado -> ${nameFile}`);
                    resolve(CreateResponse.SuccessfulResponse(`Archivo creado - ${nameFile}`));
                }
            });
            fs.close;
        });
    }
    public async CreateNewFolder(route: string, nameFile: string): Promise<Response<string>> {
        return new Promise((resolve, reject) => {
            fs.mkdir(`${route}`, (err) => {
                if (err) {
                    reject(err)
                }
                else {
                    console.log(`Created folder ${route} -> ${nameFile}`);
                    resolve(CreateResponse.SuccessfulResponse(`Created folder - ${nameFile}`));
                }
            });
            fs.close;
        });
    }

    public async ExistFileOrFolder(route: string): Promise<Response<boolean>> {
        return new Promise((resolve) => {
            let exist = fs.existsSync(route).valueOf();
            fs.close;
            return resolve(CreateResponse.SuccessfulResponse(exist));
        });
    }

    public async IsFile(route: string): Promise<Response<boolean>> {
        return new Promise((resolve) => {
            const stats = fs.statSync(route).isFile();
            fs.close;
            return resolve(CreateResponse.SuccessfulResponse(stats));
        });
    }

    public async IsDirectory(route: string): Promise<Response<boolean>> {
        return new Promise((resolve) => {
            const stats = fs.statSync(route).isDirectory();
            fs.close;
            return resolve(CreateResponse.SuccessfulResponse(stats));
        });
    }

    public async NumberOfLinesInTheFile(route: string): Promise<Response<number>> {
        return new Promise((resolve) => {
            const contenido = fs.readFileSync(route, 'utf8');
            const lineas = contenido.split(/\r?\n/)?.length || -1;
            fs.close;
            return resolve(CreateResponse.SuccessfulResponse(lineas));
        });
    }

    public async SearchInject(contenido: string[] , search: string, stop: string): Promise<Response<number>> {
        return new Promise(async (resolve) => {
            let count = 1;
            let found = false;
            let result = -1;
            for await (const line of contenido) {
                if (line?.includes(search)) {
                    found = true;
                }
                if (found && line?.includes(stop)) {
                    result = count;
                    break;
                }
                count++;
            }
            return resolve(CreateResponse.SuccessfulResponse(result));
        });
    }

    public async ReadAFile(route: string): Promise<Response<string[]>> {
        return new Promise((resolve) => {
            const contenido = fs.readFileSync(route, 'utf8').split(/\r?\n/);
            fs.close;
            return resolve(CreateResponse.SuccessfulResponse(contenido));
        });
    }

    public async JoinText(text: string[]): Promise<Response<string>> {
        return new Promise((resolve) => {
            const union = text?.join('\n').toString();
            return resolve(CreateResponse.SuccessfulResponse(union));
        });
    }

    public async JoinArrays(array1: string[], array2: string[]): Promise<Response<string[]>> {
        return new Promise((resolve) => {
            const arrayConcat = array1.concat(array2);
            return resolve(CreateResponse.SuccessfulResponse(arrayConcat));
        });
    }

    public async ParseStringArray(data: string): Promise<Response<string[]>> {
        return new Promise((resolve) => {
            const response = data.split(/\r?\n/);
            return resolve(CreateResponse.SuccessfulResponse(response));
        });
    }








}