import { IArchitectureEntity, ILayerAction } from "../../3common-interfaces";
import { Injection, TypeFile } from "../../4cross";
import { CreateResponse } from "../../4cross/class/create-response";
import { CreateFile, Response } from "../../4cross/interfaces/interfaces-global";

export class InfraestructureBL extends ILayerAction {

    private readonly _file = Injection.InjectionFile();
    private readonly _accessCommon = Injection.InjectionAccessCommon();

    constructor() { super(); }

    async Build(architectureEntity: IArchitectureEntity): Promise<Response<boolean>> {

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
        let validRoute = `${architectureEntity.pathClient}/infraestructure/${architectureEntity.nameObject}`;
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
        const route1 = { route: `${architectureEntity.pathClient}/infraestructure/${architectureEntity.nameObject}`, nameFolder: `${architectureEntity.nameObject}` };

        const route2 = { route: `${architectureEntity.pathClient}/infraestructure/${architectureEntity.nameObject}/redux`, nameFolder: `${architectureEntity.nameObject}` };

        const createFolders = [route1, route2];

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
        let route4!: CreateFile;
        let route5!: CreateFile;
        let route6!: CreateFile;

        await this.DataImplementationAction(architectureEntity).then((data) => {
            if (!data)
                return CreateResponse.FailedResponse(false);
                route1 = {
                route: `${architectureEntity.pathClient}/infraestructure/${architectureEntity.nameObject}/redux/`,
                nameFolder: `${architectureEntity.nameObject}.actions`,
                typeFile: TypeFile.TS,
                data: data.result || ''
            };
        });

        await this.DataImplementationReducer(architectureEntity).then((data) => {
            if (!data)
                return CreateResponse.FailedResponse(false);
                route2 = {
                route: `${architectureEntity.pathClient}/infraestructure/${architectureEntity.nameObject}/redux/`,
                nameFolder: `${architectureEntity.nameObject}.reducer`,
                typeFile: TypeFile.TS,
                data: data.result || ''
            };
        });

        await this.DataImplementationSelector(architectureEntity).then((data) => {
            if (!data)
                return CreateResponse.FailedResponse(false);
                route3 = {
                route: `${architectureEntity.pathClient}/infraestructure/${architectureEntity.nameObject}/redux/`,
                nameFolder: `${architectureEntity.nameObject}.selectors`,
                typeFile: TypeFile.TS,
                data: data.result || ''
            };
        });

        await this.DataImplementationEffect(architectureEntity).then((data) => {
            if (!data)
                return CreateResponse.FailedResponse(false);
                route4 = {
                route: `${architectureEntity.pathClient}/infraestructure/${architectureEntity.nameObject}/redux/`,
                nameFolder: `${architectureEntity.nameObject}.effects`,
                typeFile: TypeFile.TS,
                data: data.result || ''
            };
        });

        await this.DataImplementationFacade(architectureEntity).then((data) => {
            if (!data)
                return CreateResponse.FailedResponse(false);
                route5 = {
                route: `${architectureEntity.pathClient}/infraestructure/${architectureEntity.nameObject}/redux/`,
                nameFolder: `${architectureEntity.nameObject}.facade`,
                typeFile: TypeFile.TS,
                data: data.result || ''
            };
        });

        await this.DataImplementationIndex(architectureEntity).then((data) => {
            if (!data)
                return CreateResponse.FailedResponse(false);
            route6 = {
                route: `${architectureEntity.pathClient}/infraestructure/`,
                nameFolder: `index`,
                typeFile: TypeFile.TS,
                data: data.result || ''
            }

        });

        const createFiles = [route1,route2,route3,route4,route5,route6];

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

    private async DataImplementationAction(architectureEntity: IArchitectureEntity): Promise<Response<string>> {

        let ruta = "`${this.urlApiRest}";
        ruta += `${architectureEntity.url}`;
        ruta += '`';
        let { response, nameObject, nameMethod } = architectureEntity;
        let pascalCaseNameObject = this._accessCommon.PascalCase(nameObject || '');
        let camelCaseNameObject = this._accessCommon.CamelCase(nameObject || '');
        let camelCaseNameMethod = this._accessCommon.CamelCase(nameMethod || '');
        let pascalCaseNameMethod = this._accessCommon.PascalCase(nameMethod || '');

        let data = `import { createAction, props } from '@ngrx/store';
import {
    I${pascalCaseNameObject}DTO,
    I${pascalCaseNameObject}RequestDTO
} from '@omni-platform-dominio';

export const get${pascalCaseNameObject}List = createAction(
    '[${pascalCaseNameObject}] Get ${pascalCaseNameObject} List ',
    props<{ country_code: string }>()
);

export const get${pascalCaseNameObject}ListSuccess = createAction(
    '[${pascalCaseNameObject}] Get ${pascalCaseNameObject} List Success',
    props<{ ${nameObject}List: I${pascalCaseNameObject}DTO[] }>()
);

export const get${pascalCaseNameObject}ListFail = createAction(
    '[${pascalCaseNameObject}] Get ${pascalCaseNameObject} List Fail',
    props<{ error: string }>()
);`;

        return CreateResponse.SuccessfulResponse(data);
    }

    private async DataImplementationReducer(architectureEntity: IArchitectureEntity): Promise<Response<string>> {

        let ruta = "`${this.urlApiRest}";
        ruta += `${architectureEntity.url}`;
        ruta += '`';
        let { response, nameObject, nameMethod } = architectureEntity;
        let pascalCaseNameObject = this._accessCommon.PascalCase(nameObject || '');
        let camelCaseNameObject = this._accessCommon.CamelCase(nameObject || '');
        let camelCaseNameMethod = this._accessCommon.CamelCase(nameMethod || '');
        let pascalCaseNameMethod = this._accessCommon.PascalCase(nameMethod || '');
        let toUpperCaseNameObject = nameObject?.toUpperCase();

        let data = `import { createReducer, on, Action } from '@ngrx/store';
import * as ${pascalCaseNameObject}Actions from './${nameObject}.actions';
import { I${pascalCaseNameObject}DTO } from '@omni-platform-dominio';
import {
    createEntityAdapter,
    Dictionary,
    EntityAdapter,
    EntityState
} from '@ngrx/entity';

export const APP${toUpperCaseNameObject}_FEATURE_KEY = 'app${pascalCaseNameObject}';
export interface ${pascalCaseNameObject}PartialState {
    readonly [APP${toUpperCaseNameObject}_FEATURE_KEY]: State;
}

export class ${pascalCaseNameObject}Entity implements EntityState<I${pascalCaseNameObject}DTO> {
    ids: string[] | number[];
    entities: Dictionary<I${pascalCaseNameObject}DTO>;
}

export const ${pascalCaseNameObject}Adapter: EntityAdapter<I${pascalCaseNameObject}DTO> =
    createEntityAdapter<I${pascalCaseNameObject}DTO>({
    selectId: ${nameObject} => ${nameObject}.id
    });

export const ${pascalCaseNameObject}InitialState: ${pascalCaseNameObject}Entity =
    ${pascalCaseNameObject}Adapter.getInitialState({});

export interface State {
    ${nameObject}List: ${pascalCaseNameObject}Entity;
}

export const initialState: State = {
    ${nameObject}List: ${pascalCaseNameObject}InitialState
};

const ${nameObject}Reducer = createReducer(
    initialState,
    // Only NgRx
    on(${pascalCaseNameObject}Actions.get${pascalCaseNameObject}List, state => ({
    ...state,
    ${nameObject}List: initialState.${nameObject}List
    })),
    on(${pascalCaseNameObject}Actions.get${pascalCaseNameObject}ListSuccess, (state, { ${nameObject}List }) => ({
    ...state,
    ${nameObject}List: ${pascalCaseNameObject}Adapter.setAll(${nameObject}List, state.${nameObject}List)
    })),
    on(${pascalCaseNameObject}Actions.get${pascalCaseNameObject}ListFail, state => ({
    ...state,
    ${nameObject}List: initialState.${nameObject}List
    }))
);

export function reducer(state: State | undefined, action: Action) {
    return ${nameObject}Reducer(state, action);
}`;

        return CreateResponse.SuccessfulResponse(data);
    }

    private async DataImplementationSelector(architectureEntity: IArchitectureEntity): Promise<Response<string>> {

        let ruta = "`${this.urlApiRest}";
        ruta += `${architectureEntity.url}`;
        ruta += '`';
        let { response, nameObject, nameMethod } = architectureEntity;
        let pascalCaseNameObject = this._accessCommon.PascalCase(nameObject || '');
        let camelCaseNameObject = this._accessCommon.CamelCase(nameObject || '');
        let camelCaseNameMethod = this._accessCommon.CamelCase(nameMethod || '');
        let pascalCaseNameMethod = this._accessCommon.PascalCase(nameMethod || '');
        let toUpperCaseNameObject = nameObject?.toUpperCase();

        let data = `import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
    APP${toUpperCaseNameObject}_FEATURE_KEY,
    ${pascalCaseNameObject}Adapter,
    State
} from './${nameObject}.reducer';

const getApp${pascalCaseNameObject}State = createFeatureSelector<State>(APP${toUpperCaseNameObject}_FEATURE_KEY);

const select${pascalCaseNameObject}List = ${pascalCaseNameObject}Adapter.getSelectors().selectAll;
export const selectorGet${pascalCaseNameObject}List = createSelector(
    getApp${pascalCaseNameObject}State,
    (state: State) => select${pascalCaseNameObject}List(state.${nameObject}List)
);`;

        return CreateResponse.SuccessfulResponse(data);
    }

    private async DataImplementationEffect(architectureEntity: IArchitectureEntity): Promise<Response<string>> {

        let ruta = "`${this.urlApiRest}";
        ruta += `${architectureEntity.url}`;
        ruta += '`';
        let { response, nameObject, nameMethod } = architectureEntity;
        let pascalCaseNameObject = this._accessCommon.PascalCase(nameObject || '');
        let camelCaseNameObject = this._accessCommon.CamelCase(nameObject || '');
        let camelCaseNameMethod = this._accessCommon.CamelCase(nameMethod || '');
        let pascalCaseNameMethod = this._accessCommon.PascalCase(nameMethod || '');

        let data = `import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import * as ${pascalCaseNameObject}Actions from './${nameObject}.actions';
import { map, catchError, exhaustMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ${pascalCaseNameObject}ApiService } from '@omni-platform-data';

@Injectable()
export class ${pascalCaseNameObject}Effects {
    get${pascalCaseNameObject}$ = createEffect(() =>
    this.actions$.pipe(
        ofType(${pascalCaseNameObject}Actions.get${pascalCaseNameObject}List),
        exhaustMap(action =>
        this.${nameObject}ApiService.get${pascalCaseNameObject}(action.country_code).pipe(
            map(${nameObject}List =>
                ${pascalCaseNameObject}Actions.get${pascalCaseNameObject}ListSuccess({ ${nameObject}List })
            ),
            catchError(error => of(${pascalCaseNameObject}Actions.get${pascalCaseNameObject}ListFail(error)))
        )
        )
    )
    );

    constructor(
    private actions$: Actions,
    private ${nameObject}ApiService: ${pascalCaseNameObject}ApiService
    ) {}
}`;

        return CreateResponse.SuccessfulResponse(data);
    }

    private async DataImplementationFacade(architectureEntity: IArchitectureEntity): Promise<Response<string>> {

        let ruta = "`${this.urlApiRest}";
        ruta += `${architectureEntity.url}`;
        ruta += '`';
        let { response, nameObject, nameMethod } = architectureEntity;
        let pascalCaseNameObject = this._accessCommon.PascalCase(nameObject || '');
        let camelCaseNameObject = this._accessCommon.CamelCase(nameObject || '');
        let camelCaseNameMethod = this._accessCommon.CamelCase(nameMethod || '');
        let pascalCaseNameMethod = this._accessCommon.PascalCase(nameMethod || '');

        let data = `import { ${pascalCaseNameObject}ApiService } from '@omni-platform-data';
import {
    Get${pascalCaseNameObject},
    I${pascalCaseNameObject}DTO,
    Get${pascalCaseNameObject}List,
    I${pascalCaseNameObject}Facade
} from '@omni-platform-dominio';
import { Observable } from 'rxjs';

export class ${pascalCaseNameObject}Facade extends I${pascalCaseNameObject}Facade {
private static instance: ${pascalCaseNameObject}Facade;

constructor(private ${nameObject}ApiService: ${pascalCaseNameObject}ApiService) {
    super();
}

public static getInstance(
    ${nameObject}ApiService: ${pascalCaseNameObject}ApiService
): ${pascalCaseNameObject}Facade {
    if (!${pascalCaseNameObject}Facade.instance)
        ${pascalCaseNameObject}Facade.instance = new ${pascalCaseNameObject}Facade(${nameObject}ApiService);
    return ${pascalCaseNameObject}Facade.instance;
}

get${pascalCaseNameObject}(params: string): void {
    return new Get${pascalCaseNameObject}(this.${nameObject}ApiService).execute(params);
}
}`;

        return CreateResponse.SuccessfulResponse(data);
    }

    private async DataImplementationIndex(architectureEntity: IArchitectureEntity): Promise<Response<string>> {
        let { nameObject } = architectureEntity;
        let data: string = `export * from './${nameObject}/redux/${nameObject}.facade';
export * from './${nameObject}/redux/${nameObject}.reducer';
export * from './${nameObject}/redux/${nameObject}.actions';
export * from './${nameObject}/redux/${nameObject}.selectors';`;
        let dataFile: string[] = [];
        let existExport: boolean = false;

        await this._file.ReadAFile(`${architectureEntity.pathClient}/infraestructure/index.ts`)
            .then((res) => {
                if (res?.result?.length) {
                    dataFile = res.result;
                }
            });

        for await (const line of dataFile) {
            existExport = line?.includes(`${nameObject}/redux/${nameObject}.facade`);
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

}