#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Los imports
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const inquirer_1 = __importDefault(require("inquirer"));
const chalk_1 = __importDefault(require("chalk"));
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
inquirer_1.default.prompt(QUESTIONS).then((respuestas) => {
    const template = respuestas["template"];
    //   const templatePath = path.join(__dirname, 'templates', template);
    const pathClient = path_1.default.join(DIR_ACTUAL, "src-cliente");
    console.log('--->', pathClient);
    //   console.log(hasAllFolders(pathClient));
    //   if (!createProject(pathTarget)) return;
    //   createDirectoriesFilesContent(templatePath, proyecto);
    //   postProccess(templatePath, pathTarget);
});
function hasAllFolders(pathClient) { }
function createProject(projectPath) {
    // Comprobar que no existe el directorio
    if (fs_1.default.existsSync(projectPath)) {
        console.log(chalk_1.default.red("No puedes crear el proyecto porque ya existe, intenta con otro"));
        return false;
    }
    fs_1.default.mkdirSync(projectPath);
    return true;
}
function createDirectoriesFilesContent(templatePath, projectName) {
    const listFileDirectories = fs_1.default.readdirSync(templatePath);
    listFileDirectories.forEach((item) => {
        const originalPath = path_1.default.join(templatePath, item);
        const stats = fs_1.default.statSync(originalPath);
        const writePath = path_1.default.join(DIR_ACTUAL, projectName, item);
        if (stats.isFile()) {
            let contents = fs_1.default.readFileSync(originalPath, "utf-8");
            //   contents = render(contents, { projectName });
            fs_1.default.writeFileSync(writePath, contents, "utf-8");
            // Información adicional
            const CREATE = chalk_1.default.green("CREATE ");
            const size = stats["size"];
            console.log(`${CREATE} ${originalPath} (${size} bytes)`);
        }
        else if (stats.isDirectory()) {
            fs_1.default.mkdirSync(writePath);
            createDirectoriesFilesContent(path_1.default.join(templatePath, item), path_1.default.join(projectName, item));
        }
    });
}
