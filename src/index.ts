#!/usr/bin/env node

// Los imports
import path from "path";
import inquirer, { QuestionCollection } from "inquirer";
import shell from "shelljs";
import { Injection } from "./5cross";
import { Response } from './5cross/interfaces/interfaces-global';


const DIR_ACTUAL_CLIENT = process.cwd();
const _architectureFacade = Injection.InjectionArchitectureFacade();


_architectureFacade.Questions().then((questions: Response<QuestionCollection<any>>) => {
  inquirer.prompt(questions?.result || []).then((response) => {

    const template = response["template"];
    // const pathClient = path.join(DIR_ACTUAL_CLIENT, "src-client");
    const pathClient = path.join(DIR_ACTUAL_CLIENT);

    _architectureFacade.BuildArchitecture(
      {
        pathClient: pathClient
      }
    ).then(() => { });

  });
});

