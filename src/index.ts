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
      nameObject: 'auth',
      nameMethod: 'sing_in',
      request: [
        'email:string',
        'password:string'
      ],
      response: [
        'person:IPersonEntity|null',
        'language:ILanguageEntity|null',
        'companies:ICompanyEntity[]|null',
        'currency:ICurrencyEntity|null',
        'token:string|null',
        ''
      ],
      url: 'auth/singIn'
    }


    _architectureFacade.BuildArchitecture(initData).then(() => { });

  });
});

