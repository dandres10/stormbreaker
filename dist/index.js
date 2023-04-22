#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
// Los imports
const fs_1 = tslib_1.__importDefault(require("fs"));
const path_1 = tslib_1.__importDefault(require("path"));
const inquirer_1 = tslib_1.__importDefault(require("inquirer"));
const chalk_1 = tslib_1.__importDefault(require("chalk"));
const _5cross_1 = require("./5cross");
let _architectureFacade = _5cross_1.Injection.InjectionArchitectureFacade();
const DIR_ACTUAL = process.cwd();
_architectureFacade.Questions().then((res) => {
    inquirer_1.default.prompt(res).then((respuestas) => {
        const template = respuestas["template"];
        //   const templatePath = path.join(__dirname, 'templates', template);
        const pathClient = path_1.default.join(DIR_ACTUAL, "src-cliente");
        console.log('--->', pathClient);
        //   console.log(hasAllFolders(pathClient));
        //   if (!createProject(pathTarget)) return;
        //   createDirectoriesFilesContent(templatePath, proyecto);
        //   postProccess(templatePath, pathTarget);
    });
});
function hasAllFolders(pathClient) {
}
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
