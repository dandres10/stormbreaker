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

    public async NumberOfLinesInTheFile(route: string): Promise<Response<number>> {
        return new Promise((resolve) => {
            const contenido = fs.readFileSync(route, 'utf8');
            const lineas = contenido.split(/\r?\n/)?.length || -1;
            fs.close;
            return resolve(CreateResponse.SuccessfulResponse(lineas, MessageTypeEnum.NONE));
        });
    }

    public async ReadAFile(route: string): Promise<Response<string[]>> {
        return new Promise((resolve) => {
            const contenido = fs.readFileSync(route, 'utf8').split(/\r?\n/);
            fs.close;
            return resolve(CreateResponse.SuccessfulResponse(contenido, MessageTypeEnum.NONE));
        });
    }

    public async JoinText(text: string[]): Promise<Response<string>> {
        return new Promise((resolve) => {
            const union = text?.join('\n').toString();
            return resolve(CreateResponse.SuccessfulResponse(union, MessageTypeEnum.NONE));
        });
    }

    public async JoinArrays(array1: string[], array2: string[]): Promise<Response<string[]>> {
        return new Promise((resolve) => {
            const arrayConcat = array1.concat(array2);
            return resolve(CreateResponse.SuccessfulResponse(arrayConcat, MessageTypeEnum.NONE));
        });
    }








}