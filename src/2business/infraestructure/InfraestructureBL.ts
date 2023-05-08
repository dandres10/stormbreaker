import { IArchitectureEntity, ILayerAction } from "../../3common-interfaces";
import { Injection } from "../../4cross";
import { CreateResponse } from "../../4cross/class/create-response";
import { Response } from "../../4cross/interfaces/interfaces-global";

export class InfraestructureBL extends ILayerAction {

    private readonly _file = Injection.InjectionFile();
    private readonly _accessCommon = Injection.InjectionAccessCommon();

    constructor() { super(); }

    async Build(architectureEntity: IArchitectureEntity): Promise<Response<boolean>> {

        let responseBuildRepositories!: Response<boolean>;

        if (architectureEntity.newPipe) {
            await this.ExistBase(architectureEntity).then((res) => {
                if (res.result) {
                    this._accessCommon.messageError('Action cannot be executed.');
                    return CreateResponse.FailedResponse(false);
                }
            });


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
        const route1 = { route: `${architectureEntity.pathClient}/data/repositories/${architectureEntity.nameObject}`, nameFolder: `${architectureEntity.nameObject}` };

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
        // let route5!: CreateFile;


        // await this.DataImplementationRespository(architectureEntity).then((data) => {
        //     if (!data)
        //         return CreateResponse.FailedResponse(false);
        //     route5 = {
        //         route: `${architectureEntity.pathClient}/data/repositories/${architectureEntity.nameObject}/`,
        //         nameFolder: `${architectureEntity.nameObject}-implementation.repository`,
        //         typeFile: TypeFile.TS,
        //         data: data.result || ''
        //     };
        // });

        // const createFiles = [route5, route6, route7, route8, route9, route10, route11, route12, route13, route14, route15];

        // for await (const configuration of createFiles) {
        //     await this._file.CreateArchive(configuration.route, configuration.nameFolder, configuration.data, configuration.typeFile).then((res) => {
        //         if (!res.result) {
        //             this._accessCommon.messageError(`Error generating the file of the data layer -> ${configuration.route}`);
        //             return CreateResponse.FailedResponse(false);
        //         }
        //     });
        // }

        return CreateResponse.SuccessfulResponse(true);

    }

 



}