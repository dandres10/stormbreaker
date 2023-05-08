

import { IArchitectureEntity } from "../../3common-interfaces";
import { Injection, TypeFile } from "../../4cross";
import { CreateFile, Response } from '../../4cross/interfaces/interfaces-global';
import { CreateResponse } from "../../4cross/class/create-response";
import { ILayerAction } from "../../3common-interfaces/action/ILayerAction";

export class DataExampleBL extends ILayerAction {

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

        let validRoute = `${architectureEntity.pathClient}/data/repositories/${architectureEntity.nameObject}`;
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

    async CreateFiles(architectureEntity: IArchitectureEntity): Promise<Response<boolean>> {

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
        let route15!: CreateFile;

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
        await this.DataModule(architectureEntity).then((data) => {
            if (!data)
                return CreateResponse.FailedResponse(false);
            route15 = {
                route: `${architectureEntity.pathClient}/data/`,
                nameFolder: `data.module`,
                typeFile: TypeFile.TS,
                data: data.result || ''
            }
        });



        const createFiles = [route5, route6, route7, route8, route9, route10, route11, route12, route13, route14, route15];

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
        let data: string = `import { actions${pascalCaseNameObject} } from './index';
import { Injectable } from "@angular/core";
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
        let data: string = `import { actions${pascalCaseNameObject} } from './index';
import { createReducer, on } from '@ngrx/store';
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
        let data: string = `import { reducer${pascalCaseNameObject} } from './index';
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
export * from './mappers/${nameObject}.mapper';`;

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
            existExport = line?.includes(`repositories/${nameObject}/index`);
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

    private async DataModule(architectureEntity: IArchitectureEntity): Promise<Response<string>> {
        let data: string = ``;

        await this._file.ExistFileOrFolder(`${architectureEntity.pathClient}/data/data.module.ts`)
            .then(async (res) => {

                if (res?.result) {
                    await this.ModuleExists(architectureEntity).then((res) => {
                        if (res?.result) {
                            data = res?.result;
                        }
                    })
                    return
                }

                await this.CreateModule(architectureEntity).then((res) => {
                    if (res?.result) {
                        data = res?.result;
                    }
                })

            })

        return CreateResponse.SuccessfulResponse(data);
    }

    private async ModuleExists(architectureEntity: IArchitectureEntity): Promise<Response<string>> {
        let { nameObject } = architectureEntity;
        let pascalCaseNameObject = this._accessCommon.PascalCase(nameObject || '');
        let camelCaseNameObject = this._accessCommon.CamelCase(nameObject || '');
        let data: string = '';
        let dataFile: string[] = [];
        let existFacadeFactory: boolean = false;
        let route = `${architectureEntity.pathClient}/data/data.module.ts`;


        await this._file.ReadAFile(route)
            .then(async (res) => {
                if (res?.result?.length) {
                    dataFile = res.result;
                    await this._file.JoinText(dataFile).then((res) => { data = res?.result || '' });
                }
            });

        for await (const line of dataFile) {
            existFacadeFactory = line?.includes(`const ${pascalCaseNameObject}FacadeFactory`);
            if (existFacadeFactory) {
                break;
            }
        }

        if (!existFacadeFactory) {
            await this.BuildInjectFacadeFactory(dataFile, architectureEntity).then(async (res) => {
                if (res?.result) {
                    data = res.result;
                    await this._file.ParseStringArray(data).then((res) => {
                        if (res?.result?.length)
                            dataFile = res.result;
                    })


                }
            })

            await this.BuildInjectFacadeFactoryProviders(dataFile, architectureEntity).then(async (res) => {
                if (res?.result) {
                    data = res.result;
                    await this._file.ParseStringArray(data).then((res) => {
                        if (res?.result?.length)
                            dataFile = res.result;
                    })
                }
            })

            await this.BuildInjectFacadeFactoryStoreModule(dataFile, architectureEntity).then(async (res) => {
                if (res?.result) {
                    data = res.result;
                    await this._file.ParseStringArray(data).then((res) => {
                        if (res?.result?.length)
                            dataFile = res.result;
                    })
                }
            })

            await this.BuildInjectFacadeFactoryEffectsModule(dataFile, architectureEntity).then(async (res) => {
                if (res?.result) {
                    data = res.result;
                    await this._file.ParseStringArray(data).then((res) => {
                        if (res?.result?.length)
                            dataFile = res.result;
                    })
                }
            })

            await this.BuildInjectImports(dataFile, architectureEntity).then(async (res) => {
                if (res?.result) {
                    data = res.result;
                    await this._file.ParseStringArray(data).then((res) => {
                        if (res?.result?.length)
                            dataFile = res.result;
                    })
                }
            })


        }

        return CreateResponse.SuccessfulResponse(data);
    }


    private async BuildInjectFacadeFactory(dataFile: string[], architectureEntity: IArchitectureEntity): Promise<Response<string>> {
        let { nameObject } = architectureEntity;
        let pascalCaseNameObject = this._accessCommon.PascalCase(nameObject || '');
        let camelCaseNameObject = this._accessCommon.CamelCase(nameObject || '');
        let data = '';
        let pointInyection = -1;

        await this._file.SearchInject(dataFile, 'const', '}').then((res) => {
            if (res?.result && res?.result != -1) {
                pointInyection = res?.result;
            }
        })


        let head = dataFile.slice(0, pointInyection);
        head.push(`\nconst ${pascalCaseNameObject}FacadeFactory =
(${nameObject}Repo: ${pascalCaseNameObject}Repository) => ${pascalCaseNameObject}Facade.getInstance(${nameObject}Repo);
export const ${pascalCaseNameObject}FacadeProvider = {
    provide: ${pascalCaseNameObject}Facade,
    useFactory: ${pascalCaseNameObject}FacadeFactory,
    deps: [${pascalCaseNameObject}Repository]
};\n`);

        let end = dataFile.slice(pointInyection + 1, dataFile.length);

        await this._file.JoinArrays(head, end).then(async (res) => {
            if (res?.result?.length) {
                await this._file.JoinText(res.result).then((res) => {
                    if (res?.result)
                        data = res.result;
                });
            }
        });

        return CreateResponse.SuccessfulResponse(data);
    }

    private async BuildInjectFacadeFactoryProviders(dataFile: string[], architectureEntity: IArchitectureEntity): Promise<Response<string>> {
        let { nameObject } = architectureEntity;
        let pascalCaseNameObject = this._accessCommon.PascalCase(nameObject || '');
        let camelCaseNameObject = this._accessCommon.CamelCase(nameObject || '');
        let data = '';
        let pointInyection = -1;

        await this._file.SearchInject(dataFile, 'const PROVIDERS = [', '}').then((res) => {
            if (res?.result && res?.result != -1) {
                pointInyection = res?.result;
            }
        })


        let head = dataFile.slice(0, pointInyection);
        head.push(`    ${pascalCaseNameObject}FacadeProvider,
    { provide: ${pascalCaseNameObject}Repository, useClass: ${pascalCaseNameObject}ImplementationRepository },\n]`);

        let end = dataFile.slice(pointInyection + 1, dataFile.length);

        await this._file.JoinArrays(head, end).then(async (res) => {
            if (res?.result?.length) {
                await this._file.JoinText(res.result).then((res) => {
                    if (res?.result)
                        data = res.result;
                });
            }
        });

        return CreateResponse.SuccessfulResponse(data);
    }

    private async BuildInjectFacadeFactoryStoreModule(dataFile: string[], architectureEntity: IArchitectureEntity): Promise<Response<string>> {
        let { nameObject } = architectureEntity;
        let pascalCaseNameObject = this._accessCommon.PascalCase(nameObject || '');
        let camelCaseNameObject = this._accessCommon.CamelCase(nameObject || '');
        let data = '';
        let pointInyection = -1;

        await this._file.SearchInject(dataFile, 'const IMPORTS = [', ']').then((res) => {
            if (res?.result && res?.result != -1) {
                pointInyection = res?.result;
            }
        })


        let head = dataFile.slice(0, pointInyection);
        head.push(`    StoreModule.forFeature(
        reducer${pascalCaseNameObject}.${nameObject?.toUpperCase()}_KEY,
        reducer${pascalCaseNameObject}.${pascalCaseNameObject}Reducer\n    ),`);

        let end = dataFile.slice(pointInyection, dataFile.length);

        await this._file.JoinArrays(head, end).then(async (res) => {
            if (res?.result?.length) {
                await this._file.JoinText(res.result).then((res) => {
                    if (res?.result)
                        data = res.result;
                });
            }
        });

        return CreateResponse.SuccessfulResponse(data);
    }

    private async BuildInjectFacadeFactoryEffectsModule(dataFile: string[], architectureEntity: IArchitectureEntity): Promise<Response<string>> {
        let { nameObject } = architectureEntity;
        let pascalCaseNameObject = this._accessCommon.PascalCase(nameObject || '');
        let camelCaseNameObject = this._accessCommon.CamelCase(nameObject || '');
        let data = '';
        let pointInyection = -1;

        await this._file.SearchInject(dataFile, 'EffectsModule.', ',').then((res) => {
            if (res?.result && res?.result != -1) {
                pointInyection = res?.result;
            }
        })


        let head = dataFile.slice(0, pointInyection);
        head.push(`        ${pascalCaseNameObject}Effects,`);

        let end = dataFile.slice(pointInyection, dataFile.length);

        await this._file.JoinArrays(head, end).then(async (res) => {
            if (res?.result?.length) {
                await this._file.JoinText(res.result).then((res) => {
                    if (res?.result)
                        data = res.result;
                });
            }
        });

        return CreateResponse.SuccessfulResponse(data);
    }

    private async BuildInjectImports(dataFile: string[], architectureEntity: IArchitectureEntity): Promise<Response<string>> {
        let { nameObject } = architectureEntity;
        let pascalCaseNameObject = this._accessCommon.PascalCase(nameObject || '');
        let camelCaseNameObject = this._accessCommon.CamelCase(nameObject || '');
        let data = '';
        let pointInyection = -1;

        await this._file.SearchInject(dataFile, '//Imports Generator', ' ').then((res) => {
            if (res?.result && res?.result != -1) {
                pointInyection = res?.result;
            }
        })


        let head = dataFile.slice(0, pointInyection);
        head.push(`import { ${pascalCaseNameObject}Repository } from '@management/domain/management';
import { ${pascalCaseNameObject}ImplementationRepository } from '@management/data/management';
import { ${pascalCaseNameObject}Facade } from '@management/facade/management';
import { ${pascalCaseNameObject}Effects, reducer${pascalCaseNameObject} } from './repositories/${nameObject}/redux/index';\n`);

        let end = dataFile.slice(pointInyection, dataFile.length);

        await this._file.JoinArrays(head, end).then(async (res) => {
            if (res?.result?.length) {
                await this._file.JoinText(res.result).then((res) => {
                    if (res?.result)
                        data = res.result;
                });
            }
        });

        return CreateResponse.SuccessfulResponse(data);
    }

    private async CreateModule(architectureEntity: IArchitectureEntity): Promise<Response<string>> {
        let { nameObject } = architectureEntity;
        let pascalCaseNameObject = this._accessCommon.PascalCase(nameObject || '');
        let camelCaseNameObject = this._accessCommon.CamelCase(nameObject || '');

        let data = `import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Store, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { ${pascalCaseNameObject}Repository } from '@management/domain/management';
import { ${pascalCaseNameObject}ImplementationRepository } from '@management/data/management';
import { ${pascalCaseNameObject}Facade } from '@management/facade/management';
import { ${pascalCaseNameObject}Effects, reducer${pascalCaseNameObject} } from './repositories/${nameObject}/redux/index';



const ${pascalCaseNameObject}FacadeFactory =
    (${nameObject}Repo: ${pascalCaseNameObject}Repository) => ${pascalCaseNameObject}Facade.getInstance(${nameObject}Repo);
export const ${pascalCaseNameObject}FacadeProvider = {
    provide: ${pascalCaseNameObject}Facade,
    useFactory: ${pascalCaseNameObject}FacadeFactory,
    deps: [${pascalCaseNameObject}Repository]
};



const PROVIDERS = [
    ${pascalCaseNameObject}FacadeProvider,
    { provide: ${pascalCaseNameObject}Repository, useClass: ${pascalCaseNameObject}ImplementationRepository }
];

const IMPORTS = [
    CommonModule,
    HttpClientModule,
    StoreModule.forFeature(
        reducer${pascalCaseNameObject}.${nameObject?.toUpperCase()}_KEY,
        reducer${pascalCaseNameObject}.${pascalCaseNameObject}Reducer
    ),
    EffectsModule.forFeature([
        ${pascalCaseNameObject}Effects
    ]),
]

@NgModule({
    providers: PROVIDERS,
    imports: IMPORTS
})
export class DataModule { }`;

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
    ${pascalCaseNameObject}Mapper
} from '@management/data/management';

import {
    actions${pascalCaseNameObject}, 
    reducer${pascalCaseNameObject},
    selectors${pascalCaseNameObject}
} from './redux';


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

    async CreateFolders(architectureEntity: IArchitectureEntity): Promise<Response<boolean>> {
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