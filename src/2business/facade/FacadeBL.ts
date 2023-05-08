import { IArchitectureEntity, ILayerAction } from "../../3common-interfaces";
import { Injection, TypeFile } from "../../4cross";
import { CreateResponse } from "../../4cross/class/create-response";
import { CreateFile, Response } from "../../4cross/interfaces/interfaces-global";

export class FacadeBL extends ILayerAction {

    private readonly _file = Injection.InjectionFile();
    private readonly _accessCommon = Injection.InjectionAccessCommon();

    constructor() { super(); }

    async Build(architectureEntity: IArchitectureEntity): Promise<Response<boolean>> {

        let responseBuildRepositories!: Response<boolean>;

        if (architectureEntity.newPipe) {

            // await this.ExistBase(architectureEntity).then((res) => {
            //     if (res.result) {
            //         this._accessCommon.messageError('Action cannot be executed.');
            //         return CreateResponse.FailedResponse(false);
            //     }
            // });


            await this.CreateBase(architectureEntity).then(res => {
                if (!res.result) {
                    this._accessCommon.messageError('Action cannot be executed. Create base');
                    return CreateResponse.FailedResponse(false);
                }
            });
        }

        return CreateResponse.SuccessfulResponse(true);
    }
    async ExistBase(architectureEntity: IArchitectureEntity): Promise<Response<boolean>> {
        let validRoute = `${architectureEntity.pathClient}`;
        let responseExistFileOrFolder!: Response<boolean>;

        await this._file.ExistFileOrFolder(validRoute).then((res) => responseExistFileOrFolder = res);
        if (responseExistFileOrFolder.result) {
            this._accessCommon.messageError('The pipe already exists.');
            return CreateResponse.FailedResponse(true);
        }

        return CreateResponse.SuccessfulResponse(false);
    }

    async CreateBase(architectureEntity: IArchitectureEntity): Promise<Response<boolean>> {

        await this.CreateFolders(architectureEntity).then((res) => {
            if (!res.result) {
                return CreateResponse.FailedResponse(false);
            }
        });

        await this.CreateFiles(architectureEntity).then((res) => {
            if (!res.result) {
                return CreateResponse.FailedResponse(false);
            }
        })

        return CreateResponse.SuccessfulResponse(true);
    }



    async CreateFolders(architectureEntity: IArchitectureEntity): Promise<Response<boolean>> {
        const route1 = { route: `${architectureEntity.pathClient}/facade/store/`, nameFolder: `${architectureEntity.nameObject}` };

        const createFolders = [route1];

        for await (const configuration of createFolders) {
            await this._file.CreateNewFolder(configuration.route, configuration.nameFolder).then((res) => {
                if (!res.result) {
                    this._accessCommon.messageError(`Error generating the folder of the data layer -> ${configuration.route}`);
                    return CreateResponse.FailedResponse(false);
                }
            });
        }

        return CreateResponse.SuccessfulResponse(true);
    }


    async CreateFiles(architectureEntity: IArchitectureEntity): Promise<Response<boolean>> {
        let route1!: CreateFile;
        let route2!: CreateFile;
        let route3!: CreateFile;


        await this.DataImplementationFacadeStore(architectureEntity).then((data) => {
            if (!data)
                return CreateResponse.FailedResponse(false);
            route1 = {
                route: `${architectureEntity.pathClient}/facade/store/`,
                nameFolder: `store.facade`,
                typeFile: TypeFile.TS,
                data: data.result || ''
            };
        });

        await this.DataImplementationFacadeIndex(architectureEntity).then((data) => {
            if (!data)
                return CreateResponse.FailedResponse(false);
            route2 = {
                route: `${architectureEntity.pathClient}/facade/store/`,
                nameFolder: `index`,
                typeFile: TypeFile.TS,
                data: data.result || ''
            };
        });

        await this.DataImplementationFacadeIndexIndex(architectureEntity).then((data) => {
            if (!data)
                return CreateResponse.FailedResponse(false);
            route3 = {
                route: `${architectureEntity.pathClient}/facade/`,
                nameFolder: `index`,
                typeFile: TypeFile.TS,
                data: data.result || ''
            };
        });

        const createFiles = [route1, route2, route3];

        for await (const configuration of createFiles) {
            await this._file.CreateFile(configuration.route, configuration.nameFolder, configuration.data, configuration.typeFile).then((res) => {
                if (!res.result) {
                    this._accessCommon.messageError(`Error generating the file of the data layer -> ${configuration.route}`);
                    return CreateResponse.FailedResponse(false);
                }
            });
        }

        return CreateResponse.SuccessfulResponse(true);

    }



    private async DataImplementationFacadeStore(architectureEntity: IArchitectureEntity): Promise<Response<string>> {
        let { nameObject, nameMethod, request } = architectureEntity;
        let pascalCaseNameObject = this._accessCommon.PascalCase(nameObject || '');
        let camelCaseNameObject = this._accessCommon.CamelCase(nameObject || '');
        let camelCaseNameMethod = this._accessCommon.CamelCase(nameMethod || '');
        let pascalCaseNameMethod = this._accessCommon.CamelCase(nameMethod || '');


        let data = `export * from '@omni-platform-infraestructure';`;

        return CreateResponse.SuccessfulResponse(data);

    }

    private async DataImplementationFacadeIndex(architectureEntity: IArchitectureEntity): Promise<Response<string>> {
        let { nameObject, nameMethod, request } = architectureEntity;
        let pascalCaseNameObject = this._accessCommon.PascalCase(nameObject || '');
        let camelCaseNameObject = this._accessCommon.CamelCase(nameObject || '');
        let camelCaseNameMethod = this._accessCommon.CamelCase(nameMethod || '');
        let pascalCaseNameMethod = this._accessCommon.CamelCase(nameMethod || '');


        let data = `import './store.facade';`;

        return CreateResponse.SuccessfulResponse(data);

    }

    private async DataImplementationFacadeIndexIndex(architectureEntity: IArchitectureEntity): Promise<Response<string>> {
        let { nameObject, nameMethod, request } = architectureEntity;
        let pascalCaseNameObject = this._accessCommon.PascalCase(nameObject || '');
        let camelCaseNameObject = this._accessCommon.CamelCase(nameObject || '');
        let camelCaseNameMethod = this._accessCommon.CamelCase(nameMethod || '');
        let pascalCaseNameMethod = this._accessCommon.CamelCase(nameMethod || '');


        let data = `import './store/index';`;

        return CreateResponse.SuccessfulResponse(data);

    }





}