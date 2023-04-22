#!/usr/bin/env node

// Los imports
import fs from "fs";
import path from "path";
import inquirer, { QuestionCollection } from "inquirer";
import shell from "shelljs";
import chalk from "chalk";
import { Injection } from "./5cross";


let _architectureFacade = Injection.InjectionArchitectureFacade();


const DIR_ACTUAL = process.cwd();

_architectureFacade.Questions().then((res: QuestionCollection<any>) => {
  inquirer.prompt(res).then((respuestas) => {
    const template = respuestas["template"];

    //   const templatePath = path.join(__dirname, 'templates', template);
    const pathClient = path.join(DIR_ACTUAL, "src-cliente");
    console.log('--->', pathClient);
    //   console.log(hasAllFolders(pathClient));
    //   if (!createProject(pathTarget)) return;

    //   createDirectoriesFilesContent(templatePath, proyecto);

    //   postProccess(templatePath, pathTarget);
  });
});

function hasAllFolders(pathClient: any) {

}

function createProject(projectPath: any) {
  // Comprobar que no existe el directorio
  if (fs.existsSync(projectPath)) {
    console.log(
      chalk.red(
        "No puedes crear el proyecto porque ya existe, intenta con otro"
      )
    );
    return false;
  }
  fs.mkdirSync(projectPath);
  return true;
}

function createDirectoriesFilesContent(templatePath: any, projectName: any) {
  const listFileDirectories = fs.readdirSync(templatePath);

  listFileDirectories.forEach((item) => {
    const originalPath = path.join(templatePath, item);

    const stats = fs.statSync(originalPath);

    const writePath = path.join(DIR_ACTUAL, projectName, item);

    if (stats.isFile()) {
      let contents = fs.readFileSync(originalPath, "utf-8");
      //   contents = render(contents, { projectName });
      fs.writeFileSync(writePath, contents, "utf-8");
      // Información adicional
      const CREATE = chalk.green("CREATE ");
      const size = stats["size"];
      console.log(`${CREATE} ${originalPath} (${size} bytes)`);
    } else if (stats.isDirectory()) {
      fs.mkdirSync(writePath);
      createDirectoriesFilesContent(
        path.join(templatePath, item),
        path.join(projectName, item)
      );
    }
  });
}
