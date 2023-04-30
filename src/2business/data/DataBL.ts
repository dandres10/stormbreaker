

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
        let route6!: CreateFile;
        let route7!: CreateFile;
        let route8!: CreateFile;
        let route9!: CreateFile;
        let route10!: CreateFile;
        let route11!: CreateFile;
        let route12!: CreateFile;
        let route13!: CreateFile;
        let route14!: CreateFile;

        await this.DataImplementationRespository(architectureEntity).then((data) => {
            if (!data)
                return CreateResponse.FailedResponse(false);
            route5 = {
                route: `${architectureEntity.pathClient}/data/repositories/${architectureEntity.nameObject}/`,
                nameFolder: `${architectureEntity.nameObject}-implementation.repository`,
                typeFile: TypeFile.TS,
                data: data.result || ''
            };
        });

        await this.DataEntity(architectureEntity).then((data) => {
            if (!data)
                return CreateResponse.FailedResponse(false);
            route6 = {
                route: `${architectureEntity.pathClient}/data/repositories/${architectureEntity.nameObject}/entities/`,
                nameFolder: `${architectureEntity.nameObject}-entity`,
                typeFile: TypeFile.TS,
                data: data.result || ''
            }

        });

        await this.Mapper(architectureEntity).then((data) => {
            if (!data)
                return CreateResponse.FailedResponse(false);
            route7 = {
                route: `${architectureEntity.pathClient}/data/repositories/${architectureEntity.nameObject}/mappers/`,
                nameFolder: `${architectureEntity.nameObject}.mapper`,
                typeFile: TypeFile.TS,
                data: data.result || ''
            }

        });

        await this.ActionsRedux(architectureEntity).then((data) => {
            if (!data)
                return CreateResponse.FailedResponse(false);
            route8 = {
                route: `${architectureEntity.pathClient}/data/repositories/${architectureEntity.nameObject}/redux/`,
                nameFolder: `${architectureEntity.nameObject}.actions`,
                typeFile: TypeFile.TS,
                data: data.result || ''
            }

        });

        await this.EffectsRedux(architectureEntity).then((data) => {
            if (!data)
                return CreateResponse.FailedResponse(false);
            route9 = {
                route: `${architectureEntity.pathClient}/data/repositories/${architectureEntity.nameObject}/redux/`,
                nameFolder: `${architectureEntity.nameObject}.effects`,
                typeFile: TypeFile.TS,
                data: data.result || ''
            }

        });

        await this.ReducerRedux(architectureEntity).then((data) => {
            if (!data)
                return CreateResponse.FailedResponse(false);
            route10 = {
                route: `${architectureEntity.pathClient}/data/repositories/${architectureEntity.nameObject}/redux/`,
                nameFolder: `${architectureEntity.nameObject}.reducer`,
                typeFile: TypeFile.TS,
                data: data.result || ''
            }

        });

        await this.SelectorsRedux(architectureEntity).then((data) => {
            if (!data)
                return CreateResponse.FailedResponse(false);
            route11 = {
                route: `${architectureEntity.pathClient}/data/repositories/${architectureEntity.nameObject}/redux/`,
                nameFolder: `${architectureEntity.nameObject}.selectors`,
                typeFile: TypeFile.TS,
                data: data.result || ''
            }

        });

        await this.IndexRedux(architectureEntity).then((data) => {
            if (!data)
                return CreateResponse.FailedResponse(false);
            route12 = {
                route: `${architectureEntity.pathClient}/data/repositories/${architectureEntity.nameObject}/redux/`,
                nameFolder: `index`,
                typeFile: TypeFile.TS,
                data: data.result || ''
            }

        });

        await this.IndexEntity(architectureEntity).then((data) => {
            if (!data)
                return CreateResponse.FailedResponse(false);
            route13 = {
                route: `${architectureEntity.pathClient}/data/repositories/${architectureEntity.nameObject}/`,
                nameFolder: `index`,
                typeFile: TypeFile.TS,
                data: data.result || ''
            }

        });

        await this.DataIndexEntity(architectureEntity).then((data) => {
            if (!data)
                return CreateResponse.FailedResponse(false);
            route14 = {
                route: `${architectureEntity.pathClient}/data/`,
                nameFolder: `index`,
                typeFile: TypeFile.TS,
                data: data.result || ''
            }

        });

        const createFiles = [route5, route6, route7, route8, route9, route10, route11, route12, route13, route14];

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

    private async DataEntity(architectureEntity: IArchitectureEntity): Promise<Response<string>> {

        let { response, nameObject } = architectureEntity;
        let data: string = '\n';

        await this._accessCommon.BuildImportsInterface(response || []).then(res => data += res.result);
        await this._accessCommon.BuildInterface(response || [], nameObject || '').then(res => data += res.result);

        return CreateResponse.SuccessfulResponse(data);
    }

    private async Mapper(architectureEntity: IArchitectureEntity): Promise<Response<string>> {
        let { response, nameObject } = architectureEntity;
        let pascalCaseNameObject = this._accessCommon.PascalCase(nameObject || '');
        let data: string = `
import { Mapper } from '@management/base/management';
import { I${pascalCaseNameObject}DTO } from '@management/domain/management';
import { I${pascalCaseNameObject}Entity } from '@management/data/management';

export class ${pascalCaseNameObject}Mapper extends Mapper<I${pascalCaseNameObject}Entity, I${pascalCaseNameObject}DTO> {

    private static instance: ${pascalCaseNameObject}Mapper;

    private constructor() { super(); }

    public static getInstance(): ${pascalCaseNameObject}Mapper {
        if (!${pascalCaseNameObject}Mapper.instance)
            ${pascalCaseNameObject}Mapper.instance = new ${pascalCaseNameObject}Mapper();
        return ${pascalCaseNameObject}Mapper.instance;
    }


    mapFrom(param: I${pascalCaseNameObject}Entity): I${pascalCaseNameObject}DTO {
        return {
${this.BuildProperties(response || [])}
        };
    }
    mapFromList(params: I${pascalCaseNameObject}Entity[]): I${pascalCaseNameObject}DTO[] {
        return params.map((param: I${pascalCaseNameObject}Entity) => {
            return this.mapFrom(param)
        })
    }
    mapTo(param: I${pascalCaseNameObject}DTO): I${pascalCaseNameObject}Entity {
        return {
${this.BuildProperties(response || [])}
        }
    }
    mapToList(params: I${pascalCaseNameObject}DTO[]): I${pascalCaseNameObject}Entity[] {
        return params.map((param: I${pascalCaseNameObject}DTO) => {
            return this.mapTo(param);
        })
    }
}`;

        return CreateResponse.SuccessfulResponse(data);
    }

    private async ActionsRedux(architectureEntity: IArchitectureEntity): Promise<Response<string>> {
        let data: string = `import { createAction, props } from "@ngrx/store";
import {  } from "@management/domain/management";`;

        return CreateResponse.SuccessfulResponse(data);
    }

    private async EffectsRedux(architectureEntity: IArchitectureEntity): Promise<Response<string>> {
        let { nameObject } = architectureEntity;
        let pascalCaseNameObject = this._accessCommon.PascalCase(nameObject || '');
        let data: string = `import { Injectable } from "@angular/core";
import { mergeMap, map } from 'rxjs/operators';
import { actions${pascalCaseNameObject} } from '@management/data/management';
import { Actions, createEffect, ofType } from '@ngrx/effects';

@Injectable()
export class ${pascalCaseNameObject}Effects {

    constructor(
        private actions$: Actions
    ) { }

}`;

        return CreateResponse.SuccessfulResponse(data);
    }

    private async ReducerRedux(architectureEntity: IArchitectureEntity): Promise<Response<string>> {
        let { nameObject } = architectureEntity;
        let pascalCaseNameObject = this._accessCommon.PascalCase(nameObject || '');
        let camelCaseNameObject = this._accessCommon.CamelCase(nameObject || '');
        let data: string = `import { createReducer, on } from '@ngrx/store';
import { actions${pascalCaseNameObject} } from '@management/data/management';
import {  } from "@management/domain/management";

export const ${nameObject?.toUpperCase()}_KEY = '${camelCaseNameObject}'
export interface ${pascalCaseNameObject}Model {
}

export const ${pascalCaseNameObject}InitialState: ${pascalCaseNameObject}Model = {
}

const _${pascalCaseNameObject}Reducer = createReducer(${pascalCaseNameObject}InitialState,
);

export function ${pascalCaseNameObject}Reducer(state: ${pascalCaseNameObject}Model, action: any) {
    return _${pascalCaseNameObject}Reducer(state, action);
}`;

        return CreateResponse.SuccessfulResponse(data);
    }

    private async SelectorsRedux(architectureEntity: IArchitectureEntity): Promise<Response<string>> {
        let { nameObject } = architectureEntity;
        let pascalCaseNameObject = this._accessCommon.PascalCase(nameObject || '');
        let camelCaseNameObject = this._accessCommon.CamelCase(nameObject || '');
        let data: string = `import { reducer${pascalCaseNameObject} } from '@management/data/management';
import { createFeatureSelector, createSelector } from "@ngrx/store";

export const get${pascalCaseNameObject} = createFeatureSelector<reducer${pascalCaseNameObject}.${pascalCaseNameObject}Model>(reducer${pascalCaseNameObject}.${nameObject?.toUpperCase()}_KEY);`;

        return CreateResponse.SuccessfulResponse(data);
    }


    private async IndexRedux(architectureEntity: IArchitectureEntity): Promise<Response<string>> {
        let { nameObject } = architectureEntity;
        let pascalCaseNameObject = this._accessCommon.PascalCase(nameObject || '');
        let camelCaseNameObject = this._accessCommon.CamelCase(nameObject || '');
        let data: string = `export * as actions${pascalCaseNameObject} from './${nameObject}.actions';
export * as effects${pascalCaseNameObject}  from './${nameObject}.effects';
export * as reducer${pascalCaseNameObject}  from './${nameObject}.reducer';
export * as selectors${pascalCaseNameObject}  from './${nameObject}.selectors';`;

        return CreateResponse.SuccessfulResponse(data);
    }

    private async IndexEntity(architectureEntity: IArchitectureEntity): Promise<Response<string>> {
        let { nameObject } = architectureEntity;
        let pascalCaseNameObject = this._accessCommon.PascalCase(nameObject || '');
        let camelCaseNameObject = this._accessCommon.CamelCase(nameObject || '');
        let data: string = `export * from './entities/${nameObject}-entity';
export * from './${nameObject}-implementation.repository';
export * from './mappers/${nameObject}.mapper';
export * from './redux/index';`;

        return CreateResponse.SuccessfulResponse(data);
    }

    private async DataIndexEntity(architectureEntity: IArchitectureEntity): Promise<Response<string>> {
        let { nameObject } = architectureEntity;
        let data: string = `export * from './repositories/${nameObject}/index';\n`;
        let dataFile: string[] = [];
        let existExport: boolean = false;

        await this._file.ReadAFile(`${architectureEntity.pathClient}/data/index.ts`)
            .then((res) => {
                if (res?.result?.length) {
                    dataFile = res.result;
                }
            });

        for await (const line of dataFile) {
            existExport = line?.includes(`${nameObject}/index`);
            if (existExport) {
                break;
            }
        }

        if (!existExport) {
            dataFile.push(data);
        }

        await this._file.JoinText(dataFile).then((res) => {
            if (res?.result)
                data = res.result
        });

        return CreateResponse.SuccessfulResponse(data);
    }

    private BuildProperties(response: string[]): string {
        let data = '';

        for (const items of response) {
            if (items?.length) {
                let [attribute] = items.split(':');
                if (attribute)
                    data += `            ${attribute}: param.${attribute},\n`
            }

        }

        return data;
    }

    private async DataImplementationRespository(architectureEntity: IArchitectureEntity): Promise<Response<string>> {

        let ruta = "`${this.urlApiRest}";
        ruta += `${architectureEntity.url}`;
        ruta += '`';
        let { response, nameObject, nameMethod } = architectureEntity;
        let pascalCaseNameObject = this._accessCommon.PascalCase(nameObject || '');
        let camelCaseNameObject = this._accessCommon.CamelCase(nameObject || '');
        let camelCaseNameMethod = this._accessCommon.CamelCase(nameMethod || '');
        let pascalCaseNameMethod = this._accessCommon.PascalCase(nameMethod || '');

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
    ${pascalCaseNameObject}Repository,
    I${pascalCaseNameObject}DTO,
    I${pascalCaseNameObject}SingInDTO
} from '@management/domain/management';

import {
    I${pascalCaseNameObject}Entity,
    ${pascalCaseNameObject}Mapper,
    reducer${pascalCaseNameObject},
    actions${pascalCaseNameObject},
    selectors${pascalCaseNameObject}
} from '@management/data/management';


@Injectable({
    providedIn: 'root',
})
export class ${pascalCaseNameObject}ImplementationRepository extends ${pascalCaseNameObject}Repository {

    private readonly urlApiRest: string = environment.api.urlApiRest;
    private readonly ${nameObject}Mapper = ${pascalCaseNameObject}Mapper.getInstance();

    constructor(
        private http: HttpClient,
        private resolveRequest: ResolveRequest,
        private store: Store<reducer${pascalCaseNameObject}.${pascalCaseNameObject}Model>) {
        super();
    }

    private dispatch(action: Action) {
        this.store.dispatch(action);
    }

    ${camelCaseNameMethod}(params: I${pascalCaseNameObject}${pascalCaseNameMethod}DTO, loadService: boolean): Observable<I${pascalCaseNameObject}DTO> {
        let data = this.getSessionStorange(keysSessionStorangeEnum.${camelCaseNameMethod});
        if (!data || loadService)
            return this.http
                .post<I${pascalCaseNameObject}Entity>(${ruta}, params)
                .pipe(map((response: any) => {
                    let res = this.resolveRequest.resolve<I${pascalCaseNameObject}Entity>(response);
                    this.setSessionStorange(keysSessionStorangeEnum.${camelCaseNameMethod}, res);
                    return res;
                }))
                .pipe(map((entity: I${pascalCaseNameObject}Entity) => entity && this.${nameObject}Mapper.mapFrom(entity)))
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