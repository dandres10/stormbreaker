import { IArchitectureEntity, ILayerAction } from "../../3common-interfaces";
import { Injection, TypeFile } from "../../4cross";
import { CreateResponse } from "../../4cross/class/create-response";
import { CreateFile, Response } from "../../4cross/interfaces/interfaces-global";
import { Observable } from 'rxjs';

export class DomainBL extends ILayerAction {

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
        let { nameObject } = architectureEntity;
        let pascalCaseNameObject = this._accessCommon.PascalCase(nameObject || '');
        let validRoute = `${architectureEntity.pathClient}/domain/abstract/${nameObject}`;
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
        const route1 = { route: `${architectureEntity.pathClient}/domain/abstract/${architectureEntity.nameObject}`, nameFolder: `${architectureEntity.nameObject}` };
        const route2 = { route: `${architectureEntity.pathClient}/domain/interfaces/${architectureEntity.nameObject}`, nameFolder: `${architectureEntity.nameObject}` };
        const route3 = { route: `${architectureEntity.pathClient}/domain/use-cases/${architectureEntity.nameObject}`, nameFolder: `${architectureEntity.nameObject}` };

        const createFolders = [route1, route2, route3];

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
        let { nameObject, nameMethod } = architectureEntity;
        let nameMethodMid = nameMethod?.replace('_', '-');
        let pascalCaseNameObject = this._accessCommon.PascalCase(nameObject || '');
        let route1!: CreateFile;
        let route2!: CreateFile;
        let route3!: CreateFile;
        let route4!: CreateFile;
        let route5!: CreateFile;
        let route6!: CreateFile;
        let route7!: CreateFile;
        let route8!: CreateFile;
        let route9!: CreateFile;


        await this.DomainImplementationService(architectureEntity).then((data) => {
            if (!data)
                return CreateResponse.FailedResponse(false);
            route1 = {
                route: `${architectureEntity.pathClient}/domain/abstract/${architectureEntity.nameObject}/`,
                nameFolder: `I${pascalCaseNameObject}Service`,
                typeFile: TypeFile.TS,
                data: data.result || ''
            };
        });

        await this.DomainImplementationFacade(architectureEntity).then((data) => {
            if (!data)
                return CreateResponse.FailedResponse(false);
            route2 = {
                route: `${architectureEntity.pathClient}/domain/abstract/${architectureEntity.nameObject}/`,
                nameFolder: `I${pascalCaseNameObject}Facade`,
                typeFile: TypeFile.TS,
                data: data.result || ''
            };
        });

        await this.DomainImplementationIndex(architectureEntity).then((data) => {
            if (!data)
                return CreateResponse.FailedResponse(false);
            route3 = {
                route: `${architectureEntity.pathClient}/domain/abstract/${architectureEntity.nameObject}/`,
                nameFolder: `index`,
                typeFile: TypeFile.TS,
                data: data.result || ''
            };
        });

        await this.DomainImplementationInterface(architectureEntity).then((data) => {
            if (!data)
                return CreateResponse.FailedResponse(false);
            route4 = {
                route: `${architectureEntity.pathClient}/domain/interfaces/${architectureEntity.nameObject}/`,
                nameFolder: `${nameObject}-interface`,
                typeFile: TypeFile.TS,
                data: data.result || ''
            };
        });

        await this.DomainImplementationInterfaceIndex(architectureEntity).then((data) => {
            if (!data)
                return CreateResponse.FailedResponse(false);
            route5 = {
                route: `${architectureEntity.pathClient}/domain/interfaces/${architectureEntity.nameObject}/`,
                nameFolder: `index`,
                typeFile: TypeFile.TS,
                data: data.result || ''
            };
        });

        await this.DomainImplementationUseCase(architectureEntity).then((data) => {
            if (!data)
                return CreateResponse.FailedResponse(false);
            route6 = {
                route: `${architectureEntity.pathClient}/domain/use-cases/${architectureEntity.nameObject}/`,
                nameFolder: `${nameMethodMid}.usecase`,
                typeFile: TypeFile.TS,
                data: data.result || ''
            };
        });

        await this.DomainImplementationUseCaseIndex(architectureEntity).then((data) => {
            if (!data)
                return CreateResponse.FailedResponse(false);
            route7 = {
                route: `${architectureEntity.pathClient}/domain/use-cases/`,
                nameFolder: `index`,
                typeFile: TypeFile.TS,
                data: data.result || ''
            };
        });

        await this.DomainImplementationDominioModule(architectureEntity).then((data) => {
            if (!data)
                return CreateResponse.FailedResponse(false);
            route8 = {
                route: `${architectureEntity.pathClient}/domain/`,
                nameFolder: `dominio.module`,
                typeFile: TypeFile.TS,
                data: data.result || ''
            };
        });

        await this.DomainImplementationDominioModuleIndex(architectureEntity).then((data) => {
            if (!data)
                return CreateResponse.FailedResponse(false);
            route9 = {
                route: `${architectureEntity.pathClient}/domain/`,
                nameFolder: `index`,
                typeFile: TypeFile.TS,
                data: data.result || ''
            };
        });

        const createFiles = [route1, route2, route3, route4, route5, route6, route7, route8, route9];

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

    private async DomainImplementationService(architectureEntity: IArchitectureEntity): Promise<Response<string>> {
        let { nameObject, nameMethod, request } = architectureEntity;
        let pascalCaseNameObject = this._accessCommon.PascalCase(nameObject || '');
        let camelCaseNameObject = this._accessCommon.CamelCase(nameObject || '');
        let camelCaseNameMethod = this._accessCommon.CamelCase(nameMethod || '');


        let data = `import { ${pascalCaseNameObject}DTO } from '@omni-platform-dominio';
import { Observable } from 'rxjs';

export abstract class I${pascalCaseNameObject}Service {
  abstract ${camelCaseNameMethod}(${this.InputMethod(architectureEntity)}): ${this.ResponseMethod(architectureEntity)};
}`;

        return CreateResponse.SuccessfulResponse(data);

    }


    private async DomainImplementationFacade(architectureEntity: IArchitectureEntity): Promise<Response<string>> {
        let { nameObject, nameMethod, request } = architectureEntity;
        let pascalCaseNameObject = this._accessCommon.PascalCase(nameObject || '');
        let camelCaseNameObject = this._accessCommon.CamelCase(nameObject || '');
        let camelCaseNameMethod = this._accessCommon.CamelCase(nameMethod || '');


        let data = `import { ${pascalCaseNameObject}DTO } from '@omni-platform-dominio';
import { Observable } from 'rxjs';

export abstract class I${pascalCaseNameObject}Facade {
  abstract ${camelCaseNameMethod}(${this.InputMethod(architectureEntity)}): ${this.ResponseMethod(architectureEntity)};
}`;

        return CreateResponse.SuccessfulResponse(data);

    }


    private async DomainImplementationUseCase(architectureEntity: IArchitectureEntity): Promise<Response<string>> {
        let { nameObject, nameMethod, request } = architectureEntity;
        let pascalCaseNameObject = this._accessCommon.PascalCase(nameObject || '');
        let camelCaseNameObject = this._accessCommon.CamelCase(nameObject || '');
        let camelCaseNameMethod = this._accessCommon.CamelCase(nameMethod || '');
        let pascalCaseNameMethod = this._accessCommon.CamelCase(nameMethod || '');


        let data = `import { ${pascalCaseNameObject}ApiService } from '@omni-platform-data';
import { ${pascalCaseNameObject}DTO, UseCase } from '@omni-platform-dominio';
import { Observable } from 'rxjs';

export class ${pascalCaseNameMethod} implements UseCase<${this.ReturnUseCaseInterface(architectureEntity)}> {
  constructor(private ${nameObject}Service: ${pascalCaseNameObject}ApiService) {}

  execute(): ${this.ReturnUseCase(architectureEntity)} {
    return this.${nameObject}Service.${camelCaseNameMethod}();
  }
}`;

        return CreateResponse.SuccessfulResponse(data);

    }


    private async DomainImplementationDominioModuleIndex(architectureEntity: IArchitectureEntity): Promise<Response<string>> {
        let { nameObject, nameMethod, request } = architectureEntity;
        let pascalCaseNameObject = this._accessCommon.PascalCase(nameObject || '');
        let camelCaseNameObject = this._accessCommon.CamelCase(nameObject || '');
        let camelCaseNameMethod = this._accessCommon.CamelCase(nameMethod || '');
        let pascalCaseNameMethod = this._accessCommon.CamelCase(nameMethod || '');


        let data = `export * from './interfaces/${nameObject}/index';
export * from './helpers/index';
export * from './use-cases/index';
export * from './abstract/index';`;

        return CreateResponse.SuccessfulResponse(data);

    }

    private async DomainImplementationUseCaseIndex(architectureEntity: IArchitectureEntity): Promise<Response<string>> {
        let { nameObject, nameMethod, request } = architectureEntity;
        let pascalCaseNameObject = this._accessCommon.PascalCase(nameObject || '');
        let camelCaseNameObject = this._accessCommon.CamelCase(nameObject || '');
        let camelCaseNameMethod = this._accessCommon.CamelCase(nameMethod || '');
        let pascalCaseNameMethod = this._accessCommon.CamelCase(nameMethod || '');


        let data = `export * from './${nameObject}/index';`;

        return CreateResponse.SuccessfulResponse(data);

    }
    private async DomainImplementationDominioModule(architectureEntity: IArchitectureEntity): Promise<Response<string>> {
        let { nameObject, nameMethod, request } = architectureEntity;
        let pascalCaseNameObject = this._accessCommon.PascalCase(nameObject || '');
        let camelCaseNameObject = this._accessCommon.CamelCase(nameObject || '');
        let camelCaseNameMethod = this._accessCommon.CamelCase(nameMethod || '');
        let pascalCaseNameMethod = this._accessCommon.CamelCase(nameMethod || '');


        let data = `import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ${pascalCaseNameObject}Effects } from '../infraestructure/${nameObject}/redux/${nameObject}.effects';
import * as fromInvoice from '../infraestructure/${nameObject}/redux/${nameObject}.reducer';
import { ${pascalCaseNameObject}ApiService } from '../data/api-service/${nameObject}/${nameObject}-service';
import { ${pascalCaseNameObject}Facade } from '@omni-platform-infraestructure';
import { I${pascalCaseNameObject}Service } from './abstract/${nameObject}/IInvoiceService';

const ${pascalCaseNameObject}FacadeFactory = (invoiceService: ${pascalCaseNameObject}ApiService) =>
${pascalCaseNameObject}Facade.getInstance(invoiceService);

export const ${pascalCaseNameObject}FacadeProvider = {
  provide: ${pascalCaseNameObject}Facade,
  useFactory: ${pascalCaseNameObject}FacadeFactory,
  deps: [${pascalCaseNameObject}ApiService]
};

const PROVIDERS = [
    ${pascalCaseNameObject}FacadeProvider,
  { provide: I${pascalCaseNameObject}Service, useClass: ${pascalCaseNameObject}ApiService }
];

const IMPORTS = [
  StoreModule.forFeature(
    from${pascalCaseNameObject}.APPINVOICE_FEATURE_KEY,
    from${pascalCaseNameObject}.reducer
  ),
  EffectsModule.forFeature([${pascalCaseNameObject}Effects])
];

@NgModule({
  providers: PROVIDERS,
  imports: IMPORTS
})
export class DataModule {}
`;

        return CreateResponse.SuccessfulResponse(data);

    }


    private ReturnUseCase(architectureEntity: IArchitectureEntity): string {
        let { nameObject, nameMethod, request, response } = architectureEntity;
        let pascalCaseNameObject = this._accessCommon.PascalCase(nameObject || '');
        let camelCaseNameObject = this._accessCommon.CamelCase(nameObject || '');
        let camelCaseNameMethod = this._accessCommon.CamelCase(nameMethod || '');
        let pascalCaseNameMethod = this._accessCommon.CamelCase(nameMethod || '');

        if (response?.length) {
            return `Observable<${pascalCaseNameObject}DTO[]>`;
        }

        return 'void';

    }

    private ReturnUseCaseInterface(architectureEntity: IArchitectureEntity): string {
        let { nameObject, nameMethod, request, response, typeResponse } = architectureEntity;
        let pascalCaseNameObject = this._accessCommon.PascalCase(nameObject || '');
        let camelCaseNameObject = this._accessCommon.CamelCase(nameObject || '');
        let camelCaseNameMethod = this._accessCommon.CamelCase(nameMethod || '');
        let pascalCaseNameMethod = this._accessCommon.CamelCase(nameMethod || '');

        let data = '';


        if (request?.length) {
            data += `I${pascalCaseNameObject}RequestDTO,`;
        } else {
            data += `null,`;
        }

        if (response?.length) {
            switch (typeResponse) {
                case 'array':
                    data += `I${pascalCaseNameObject}DTO[]`
                    break;
                case 'object':
                    data += `I${pascalCaseNameObject}DTO`
                    break;
            }

        } else {
            data += `null`;
        }

        return data;

    }



    private async DomainImplementationIndex(architectureEntity: IArchitectureEntity): Promise<Response<string>> {
        let { nameObject, nameMethod, request } = architectureEntity;
        let pascalCaseNameObject = this._accessCommon.PascalCase(nameObject || '');
        let camelCaseNameObject = this._accessCommon.CamelCase(nameObject || '');
        let camelCaseNameMethod = this._accessCommon.CamelCase(nameMethod || '');


        let data = `export * from './${nameMethod}/I${pascalCaseNameObject}Service';
export * from './${nameMethod}/I${pascalCaseNameObject}Facade';`;

        return CreateResponse.SuccessfulResponse(data);

    }

    private async DomainImplementationInterfaceIndex(architectureEntity: IArchitectureEntity): Promise<Response<string>> {
        let { nameObject, nameMethod, request } = architectureEntity;
        let pascalCaseNameObject = this._accessCommon.PascalCase(nameObject || '');
        let camelCaseNameObject = this._accessCommon.CamelCase(nameObject || '');
        let camelCaseNameMethod = this._accessCommon.CamelCase(nameMethod || '');


        let data = `export * from './${nameObject}-interface';`;

        return CreateResponse.SuccessfulResponse(data);

    }


    private async DomainImplementationInterface(architectureEntity: IArchitectureEntity): Promise<Response<string>> {
        let { nameObject, nameMethod, request, response } = architectureEntity;
        let pascalCaseNameObject = this._accessCommon.PascalCase(nameObject || '');
        let camelCaseNameObject = this._accessCommon.CamelCase(nameObject || '');
        let camelCaseNameMethod = this._accessCommon.CamelCase(nameMethod || '');
        let data = '';

        // await this._accessCommon.BuildImportsInterface(response || []).then((res) => {
        //     if (res?.result) {
        //         data += res?.result;
        //     }
        // });

        await this._accessCommon.BuildInterface(response || [], nameObject || '', 'Entity').then((res) => {
            if (res?.result) {
                data += res?.result;
            }
        });

        await this._accessCommon.BuildInterface(response || [], nameObject || '', 'DTO').then((res) => {
            if (res?.result) {
                data += res?.result;
            }
        });

        await this._accessCommon.BuildInterface(request || [], nameObject || '', 'RequestDTO').then((res) => {
            if (res?.result) {
                data += res?.result;
            }
        });

        return CreateResponse.SuccessfulResponse(data);

    }


    private InputMethod(architectureEntity: IArchitectureEntity): string {

        let { request, nameObject } = architectureEntity;
        let pascalCaseNameObject = this._accessCommon.PascalCase(nameObject || '');

        if (request?.length == 1) {
            let [line] = request;
            return `${line}`;
        }

        return `params: I${pascalCaseNameObject}DTO`
    }

    private ResponseMethod(architectureEntity: IArchitectureEntity): string {
        let { response, nameObject, typeResponse } = architectureEntity;
        let pascalCaseNameObject = this._accessCommon.PascalCase(nameObject || '');

        switch (typeResponse) {
            case 'string':
                return response?.length ? `Observable<I${pascalCaseNameObject}DTO[]>` : 'void';

            case 'object':
                return response?.length ? `Observable<I${pascalCaseNameObject}DTO>` : 'void';
        }

        return 'void'

    }





}