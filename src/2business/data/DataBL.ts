import chalk from "chalk";
import { IArchitectureEntity, ILayerAction } from "../../3common-interfaces";
import { Injection, TypeFile } from "../../4cross";
import { CreateResponse } from "../../4cross/class/create-response";
import { CreateFile, Response } from "../../4cross/interfaces/interfaces-global";

export class DataBL extends ILayerAction {


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
        const route1 = { route: `${architectureEntity.pathClient}/data/adapters/${architectureEntity.nameObject}`, nameFolder: `${architectureEntity.nameObject}` };
        const route2 = { route: `${architectureEntity.pathClient}/data/api-service/${architectureEntity.nameObject}`, nameFolder: `${architectureEntity.nameObject}` };
        
        const createFolders = [route1,route2];

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
         let route3!: CreateFile;
         let route4!: CreateFile;
         let route5!: CreateFile;
         let route6!:CreateFile


        await this.DataIndexAdapter(architectureEntity).then((data) => {
            if (!data)
                 return CreateResponse.FailedResponse(false);
        route3 = {
               route: `${architectureEntity.pathClient}/data/adapters/${architectureEntity.nameObject}/`,
                nameFolder: `index`,
                typeFile: TypeFile.TS,
                 data: data.result || ''
           };
    
         });

        await this.DataAdapter(architectureEntity).then((data) => {
            if (!data)
                 return CreateResponse.FailedResponse(false);
 
           route4 = {
            route: `${architectureEntity.pathClient}/data/adapters/${architectureEntity.nameObject}/`,
             nameFolder: `${architectureEntity.nameObject}-adapter`,
             typeFile: TypeFile.TS,
              data: data.result || ''
        };
    
         });

        await this.DataService(architectureEntity).then((data) => {
            if (!data)
                 return CreateResponse.FailedResponse(false);

           route5 = {
            route: `${architectureEntity.pathClient}/data/api-service/${architectureEntity.nameObject}/`,
             nameFolder: `${architectureEntity.nameObject}-service`,
             typeFile: TypeFile.TS,
              data: data.result || ''
        };
         });
         await this.DataIndex(architectureEntity).then((data) => {
            if (!data)
                return CreateResponse.FailedResponse(false);
            route6 = {
                route: `${architectureEntity.pathClient}/data/`,
                nameFolder: `index`,
                typeFile: TypeFile.TS,
                data: data.result || ''
            }
        });

         const createFiles = [route3, route4, route5];

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

 
    // Construir códito dentro d ecada archivo nuevo creado
    private async DataIndexAdapter(architectureEntity: IArchitectureEntity): Promise<Response<string>> {

        let ruta = "`${this.urlApiRest}";
        ruta += `${architectureEntity.url}`;
        ruta += '`';
        let { response, nameObject, nameMethod } = architectureEntity;
        let pascalCaseNameObject = this._accessCommon.PascalCase(nameObject || '');
        let camelCaseNameObject = this._accessCommon.CamelCase(nameObject || '');
        let camelCaseNameMethod = this._accessCommon.CamelCase(nameMethod || '');
        let pascalCaseNameMethod = this._accessCommon.PascalCase(nameMethod || '');

        let data = `export * from './${nameObject}-adapter';`;
        return CreateResponse.SuccessfulResponse(data);
    }
    private async DataAdapter(architectureEntity: IArchitectureEntity): Promise<Response<string>> {

        let ruta = "`${this.urlApiRest}";
        ruta += `${architectureEntity.url}`;
        ruta += '`';
        let { response, nameObject, nameMethod } = architectureEntity;
        let pascalCaseNameObject = this._accessCommon.PascalCase(nameObject || '');
        let camelCaseNameObject = this._accessCommon.CamelCase(nameObject || '');
        let camelCaseNameMethod = this._accessCommon.CamelCase(nameMethod || '');
        let pascalCaseNameMethod = this._accessCommon.PascalCase(nameMethod || '');

        let data = `import { IInvoiceEntity, IInvoiceDTO, Adapter } from '@omni-platform-domain';

        export class InvoiceAdapter extends Adapter<IInvoiceEntity, IInvoiceDTO> {
          private static instance: InvoiceAdapter;
        
          private constructor() {
            super();
          }
          public static getInstance(): InvoiceAdapter {
            if (!InvoiceAdapter.instance)
              InvoiceAdapter.instance = new InvoiceAdapter();
            return InvoiceAdapter.instance;
          }
          mapFrom(param: IInvoiceEntity): IInvoiceDTO {
            return {
              id: param.id,
              options: param.options,
              country: param.country,
              operation_type: param.operation_type,
              name: param.name,
              description: param.description,
              image: param.image,
              image_icon: param.image_icon,
              link_show_more: param.link_show_more,
              active: param.active,
              order: param.order,
              marginLeft: param.marginLeft,
              index: param.index
            };
          }
          mapFromList(params: IInvoiceEntity[]): IInvoiceDTO[] {
            return params.map((param: IInvoiceEntity) => {
              return this.mapFrom(param);
            });
          }
          mapTo(param: IInvoiceDTO): IInvoiceEntity {
            return {
              id: param.id,
              options: param.options,
              country: param.country,
              operation_type: param.operation_type,
              name: param.name,
              description: param.description,
              image: param.image,
              image_icon: param.image_icon,
              link_show_more: param.link_show_more,
              active: param.active,
              order: param.order,
              marginLeft: param.marginLeft,
              index: param.index
            };
          }
          mapToList(params: IInvoiceDTO[]): IInvoiceEntity[] {
            return params.map((param: IInvoiceDTO) => {
              return this.mapTo(param);
            });
          }
        }
        `;// para crear el código que va dentro del archivo

        return CreateResponse.SuccessfulResponse(data);
    }
    private async DataService(architectureEntity: IArchitectureEntity): Promise<Response<string>> {
          let ruta = "`${this.urlApiRest}";
        let urlApiRest="`${https://financial-platform-qa-ha.klym.com}";
        ruta += `${architectureEntity.url}`;
        ruta += '`';
        let { response, nameObject, nameMethod } = architectureEntity;
        let pascalCaseNameObject = this._accessCommon.PascalCase(nameObject || '');
        let camelCaseNameObject = this._accessCommon.CamelCase(nameObject || '');
        let camelCaseNameMethod = this._accessCommon.CamelCase(nameMethod || '');
        let pascalCaseNameMethod = this._accessCommon.PascalCase(nameMethod || '');

        let data = `import { Injectable } from '@angular/core';
        import { IInvoiceDTO, IInvoiceEntity,IInvoiceService } from '@omni-platform-domain';
        import { Observable, of } from 'rxjs';
        import { map } from 'rxjs/operators';
        import { HttpClient } from '@angular/common/http';
        import { InvoiceAdapter } from '@omni-platform-data';
        import { environment } from '@env/environment';
        import { Action, Store, select } from '@ngrx/store';
        import {
          State,
          getInvoiceList,
          selectorGetInvoiceList
        } from '@omni-platform-infraestructure';
        
        
        @Injectable({
          providedIn: 'root'
        })
        export class InvoiceApiService extends IInvoiceService {
          
        
          private readonly invoiceAdapter = InvoiceAdapter.getInstance();
        
          constructor(private http: HttpClient, private store: Store<State>) {
            super();
          }
        
          getInvoiceRedux(country_code: string): void {
            return this.dispatch(getInvoiceList({ country_code }));
          }
        
          private dispatch(action: Action) {
            this.store.dispatch(action);
          }
        
          getInvoice(params: string): Observable<IInvoiceDTO[]> {
            return this.http
              .get<IInvoiceEntity[]>(
                ${urlApiRest}/factoring-operations/operation-types/?country_code=params
              )
              .pipe(
                map((entity: IInvoiceEntity[]) => {
                  return entity && this.invoiceAdapter.mapFromList(entity);
                })
              );
          }
        
          getInvoiceList$: Observable<IInvoiceDTO[]> = this.store.pipe(
            select(selectorGetInvoiceList)
          );
        }
        `;

        return CreateResponse.SuccessfulResponse(data);
    }

//Validar index que ya existe para modificarlo
private async DataIndex(architectureEntity: IArchitectureEntity): Promise<Response<string>> {
    let ruta = "`${this.urlApiRest}";
    ruta += `${architectureEntity.url}`;
    ruta += '`';
    let { response, nameObject, nameMethod } = architectureEntity;
    let pascalCaseNameObject = this._accessCommon.PascalCase(nameObject || '');
    let camelCaseNameObject = this._accessCommon.CamelCase(nameObject || '');
    let camelCaseNameMethod = this._accessCommon.CamelCase(nameMethod || '');
    let pascalCaseNameMethod = this._accessCommon.PascalCase(nameMethod || '');
    let data: string =`export * from './adapters/${nameObject}/index';\n
    export * from './api-service/${nameObject}/${nameObject}-service';`;

    
    return CreateResponse.SuccessfulResponse(data);

  
}





}