#!/usr/bin/env node

// Los imports
import path from "path";
import inquirer, { QuestionCollection } from "inquirer";
import shell from "shelljs";
import { Injection, TEMPLATE_OPTIONS } from "./4cross";
import { Response } from './4cross/interfaces/interfaces-global';
import { IArchitectureEntity } from "./3common-interfaces";


const DIR_ACTUAL_CLIENT = process.cwd();
const _architectureFacade = Injection.InjectionArchitectureFacade();


_architectureFacade.Questions().then((questions: Response<QuestionCollection<any>>) => {
  inquirer.prompt(questions?.result || []).then((response) => {

    const pathClient = path.join(DIR_ACTUAL_CLIENT, "src-client");
    // const pathClient = path.join(DIR_ACTUAL_CLIENT);

    // const initData: IArchitectureEntity = {
    //   newPipe: response["type_pipe"] == TEMPLATE_OPTIONS.new_pipe ? true : false,
    //   pathClient: pathClient,
    //   base: response["base"],
    //   request: response["request"]?.replace(/[\s\{\}]+/g, '').split(';'),
    //   response: response["response"]?.replace(/[\s\{\}]+/g, '').split(';'),
    //   url: response["url"]
    // }

    const initData: IArchitectureEntity = {
      newPipe: true,
      pathClient: pathClient,
      nameObject: 'invoice',
      nameMethod: 'get_invoice',
      request: [
        'params:string',
      ],
      response: [
        'id:number',
        'options:string[]',
        'country:string',
        'operation_type:string',
        'name:string',
        'description:string',
        'image:string',
        'image_icon: string',
        'link_show_more: string',
        'active: boolean',
        'order: number',
        'marginLeft?: number',
        'index?: number',
      ], 
      typeResponse: 'array',
      url: 'invoice/singIn'
    }
    _architectureFacade.BuildArchitecture(initData).then(() => { });

  });
});

