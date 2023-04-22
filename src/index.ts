#!/usr/bin/env node

// Los imports
import path from "path";
import inquirer, { QuestionCollection } from "inquirer";
import shell from "shelljs";
import { Injection } from "./5cross";


const DIR_ACTUAL_CLIENT = process.cwd();
const _architectureFacade = Injection.InjectionArchitectureFacade();



_architectureFacade.Questions().then((questions: QuestionCollection<any>) => {
  inquirer.prompt(questions).then((response) => {
    
    const template = response["template"];
    const pathClient = path.join(DIR_ACTUAL_CLIENT, "src-client");

    _architectureFacade.BuildArchitecture(
      {
        dirActualClient: pathClient
      }
    ).then(() => { });

  });
});

