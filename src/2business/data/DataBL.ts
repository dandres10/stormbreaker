

import { IArchitectureEntity } from "../../4common-interfaces";
import { Injection, TypeFile } from "../../5cross";
import { CreateFile, Response } from '../../5cross/interfaces/interfaces-global';
import { CreateResponse } from "../../5cross/class/create-response";

export class DataBL {

    private readonly _file = Injection.InjectionFile();
    private readonly _accessCommon = Injection.InjectionAccessCommon();

    constructor() { }

    async BuildData(architectureEntity: IArchitectureEntity): Promise<Response<boolean>> {

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

    private async ExistBase(architectureEntity: IArchitectureEntity): Promise<Response<boolean>> {

        let validRoute = `${architectureEntity.pathClient}/data/repositories/${architectureEntity.nameObject}`;
        let responseExistFileOrFolder!: Response<boolean>;

        await this._file.ExistFileOrFolder(validRoute).then((res) => responseExistFileOrFolder = res);
        if (responseExistFileOrFolder.result) {
            this._accessCommon.messageError('The pipe already exists.');
            return CreateResponse.FailedResponse(true);
        }

        return CreateResponse.SuccessfulResponse(false);

    }

    private async CreateBase(architectureEntity: IArchitectureEntity): Promise<Response<boolean>> {

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


    private async CreateFiles(architectureEntity: IArchitectureEntity): Promise<Response<boolean>> {

        let route5!: CreateFile;

        await this.DataImplementationRespository().then((data) => {
            if (!data)
                return CreateResponse.FailedResponse(false);
            route5 = { route: `${architectureEntity.pathClient}/data/repositories/${architectureEntity.nameObject}/`, nameFolder: `${architectureEntity.nameObject}-implementation.respository`, typeFile: TypeFile.TS, data: data.result || '' };
        })

        const createFiles = [route5];

        for await (const configuration of createFiles) {
            await this._file.CreateArchive(configuration.route, configuration.nameFolder, configuration.data, configuration.typeFile).then((res) => {
                if (!res.result) {
                    this._accessCommon.messageError(`Error generating the file of the data layer -> ${configuration.route}`);
                    return CreateResponse.FailedResponse(false);
                }
            });
        }

        return CreateResponse.SuccessfulResponse(true);
    }

    private async DataImplementationRespository(): Promise<Response<string>> {

        let ruta = "`${this.urlApiRest}auth/singIn`";

        let data = `import { Injectable } from '@angular/core';
import { Action, Store } from "@ngrx/store";

import {
    environment,
    HttpClient,
    map,
    Observable,
    of,
    ResolveRequest,
    keysSessionStorangeEnum
} from '@management/base/management';

import {
    AuthRepository,
    IAuthDTO,
    IAuthSingInDTO
} from '@management/domain/management';

import {
    IAuthEntity,
    AuthImplementationRepositoryMapper,
    reducerAuth
} from '@management/data/management';


@Injectable({
    providedIn: 'root',
})
export class AuthImplementationRepository extends AuthRepository {

    private readonly urlApiRest: string = environment.api.urlApiRest;
    private readonly authMapper = new AuthImplementationRepositoryMapper();

    constructor(
        private http: HttpClient,
        private resolveRequest: ResolveRequest,
        private store: Store<reducerAuth.AuthModel>) {
        super();
    }

    private dispatch(action: Action) {
        this.store.dispatch(action);
    }

    singIn(params: IAuthSingInDTO, loadService: boolean): Observable<IAuthDTO> {
        let data = this.getSessionStorange(keysSessionStorangeEnum.user);
        if (!data || loadService)
            return this.http
                .post<IAuthEntity>(${ruta}, params)
                .pipe(map((response: any) => {
                    let res = this.resolveRequest.resolve<IAuthEntity>(response);
                    this.setSessionStorange(keysSessionStorangeEnum.user, res);
                    return res;
                }))
                .pipe(map((entity: IAuthEntity) => entity && this.authMapper.mapFrom(entity)))
        return of(data);
    }

}`;

        return CreateResponse.SuccessfulResponse(data);
    }



    private async CreateFolders(architectureEntity: IArchitectureEntity): Promise<Response<boolean>> {
        const route1 = { route: `${architectureEntity.pathClient}/data/repositories/${architectureEntity.nameObject}`, nameFolder: `${architectureEntity.nameObject}` };
        const route2 = { route: `${architectureEntity.pathClient}/data/repositories/${architectureEntity.nameObject}/entities`, nameFolder: 'entities' };
        const route3 = { route: `${architectureEntity.pathClient}/data/repositories/${architectureEntity.nameObject}/mappers`, nameFolder: 'mappers' };
        const route4 = { route: `${architectureEntity.pathClient}/data/repositories/${architectureEntity.nameObject}/redux`, nameFolder: 'redux' };
        const createFolders = [route1, route2, route3, route4];


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


}