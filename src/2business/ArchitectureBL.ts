



import fs from "fs";
import chalk from "chalk";
import { QuestionCollection } from 'inquirer';
import { IArchitectureAction, IArchitectureEntity } from "../4common-interfaces";
import { QUESTIONS, ROUTES_ARCHITECTURE } from "../5cross";

export class ArchitectureBL implements IArchitectureAction {

    constructor() { }

    async BuildArchitecture(architectureEntity: IArchitectureEntity): Promise<boolean> {

        let hasAllFolders = false;

        this.HasAllFolders(architectureEntity.dirActualClient).then(res => hasAllFolders = res);

        return true;
    }


    async Questions(): Promise<QuestionCollection<any>> {
        return QUESTIONS;
    }

    async HasAllFolders(pathClient: string): Promise<boolean> {

        const validatingArchitecture = chalk.green("Validating architecture...");
        console.log(`${validatingArchitecture}`);

        let routes = ROUTES_ARCHITECTURE;

        for (const route of routes) {
            if (!fs.existsSync(`${pathClient}${route}`)) {
                const thereIsNoRoute = chalk.red(`- This route does not exist: ${pathClient}${route}`);
                const error = chalk.red(`- [Error] The request was not completed`);
                console.log(`${thereIsNoRoute}`);
                console.log(`${error}`);
                return false;
            }
        }
        const valid = chalk.green("Valid architecture");
        console.log(`${valid}`)
        return true;
    }

}