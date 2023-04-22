#!/usr/bin/env node

// Los imports
import fs from "fs";
import path from "path";
import inquirer from "inquirer";
import shell from "shelljs";
import chalk from "chalk";

// Obtener las opciones de los templates
const TEMPLATE_OPTIONS = ["consume an api", "Generar una pantalla"];
// const ARCHITECTURE = [
//     { file: "data", file: [Object] },
//     { file: "domain", file: [Object] },
//     { file: "facade", file: [Object] }
// ];

const QUESTIONS = [
  {
    name: "template",
    type: "list",
    message: "¿Qué tipo de proyecto quieres generar?",
    choices: TEMPLATE_OPTIONS,
  },
  //   {
  //     name: "proyecto",
  //     type: "input",
  //     message: "¿Cuál es el nombre del proyecto?",
  //     validate: function (input) {
  //       if (/^([a-z@]{1}[a-z\-\.\\\/0-9]{0,213})+$/.test(input)) {
  //         return true;
  //       }
  //       return "El nombre del proyecto solo puede tener 214 carácteres y tiene que empezar en minúsculas o con una arroba";
  //     },
  //   },
];

const DIR_ACTUAL = process.cwd();
inquirer.prompt(QUESTIONS).then((respuestas) => {
  const template = respuestas["template"];

  //   const templatePath = path.join(__dirname, 'templates', template);
  const pathClient = path.join(DIR_ACTUAL, "src-cliente");
  console.log('--->',pathClient);
//   console.log(hasAllFolders(pathClient));
  //   if (!createProject(pathTarget)) return;

  //   createDirectoriesFilesContent(templatePath, proyecto);

  //   postProccess(templatePath, pathTarget);
});

function hasAllFolders(pathClient: any) {}

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
