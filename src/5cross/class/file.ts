import fs from 'fs'
import { MessageTypeEnum, TypeFile } from '../enums/global-enum';
import { Response } from '../interfaces/interfaces-global'
import { CreateResponse } from './create-response';

export class File {

    constructor() { }

    public async CreateArchive(route: string, nameFile: string, data: string, typeFile: TypeFile): Promise<Response<string>> {
        return new Promise((resolve, reject) => {
            fs.writeFile(`${route}${nameFile}${typeFile}`, data, (err) => {
                if (err) {
                    reject(err)
                }
                else {
                    console.log(`Archivo creado -> ${nameFile}`);
                    resolve(CreateResponse.SuccessfulResponse(`Archivo creado - ${nameFile}`, MessageTypeEnum.NONE));
                }
            });
            fs.close;
        });
    }
    public async CreateNewFile(route: string, nameFile: string): Promise<Response<string>> {
        return new Promise((resolve, reject) => {
            fs.mkdir(`${route}`, (err) => {
                if (err) {
                    reject(err)
                }
                else {
                    console.log(`Carpeta creada -> ${nameFile}`);
                    resolve(CreateResponse.SuccessfulResponse(`Carpeta creada - ${nameFile}`, MessageTypeEnum.NONE));
                }
            });
            fs.close;
        });
    }

    public async ExistFile(route: string): Promise<Response<boolean>> {
        return new Promise((resolve) => {
            let exist = fs.existsSync(route).valueOf();
            fs.close;
            return resolve(CreateResponse.SuccessfulResponse(exist, MessageTypeEnum.NONE));
        });
    }

    public async IsFile(route: string): Promise<Response<boolean>> {
        return new Promise((resolve) => {
            const stats = fs.statSync(route).isFile();
            fs.close;
            return resolve(CreateResponse.SuccessfulResponse(stats, MessageTypeEnum.NONE));
        });
    }

    public async IsDirectory(route: string): Promise<Response<boolean>> {
        return new Promise((resolve) => {
            const stats = fs.statSync(route).isDirectory();
            fs.close;
            return resolve(CreateResponse.SuccessfulResponse(stats, MessageTypeEnum.NONE));
        });
    }




}