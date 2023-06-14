
import fs from "fs";
import chalk from "chalk";
import { IArchitectureAction, IArchitectureEntity } from "../3common-interfaces";
import { CORE_ROUTES_CLEAR_ARCHITECTURE, Injection, MENU_OPTIONS, QUESTIONS, QUESTION_MENU, ROUTES_ARCHITECTURE } from "../4cross";
import { Response } from '../4cross/interfaces/interfaces-global'
import { CreateResponse } from "../4cross/class/create-response";
import figlet from "figlet";
import inquirer, { QuestionCollection } from "inquirer";
import path from "path";
import shell from "shelljs";
import dotenv from 'dotenv';
dotenv.config();

export class ArchitectureBL implements IArchitectureAction {

    private readonly _file = Injection.InjectionFile();
    private readonly _dataBL = Injection.InjectionDataBL();
    private readonly _domainBL = Injection.InjectionDomainBL();
    private readonly _facadeBL = Injection.InjectionFacadeBL();
    private readonly _infraestructureBL = Injection.InjectionInfraestructureBL();
    private readonly _accessCommon = Injection.InjectionAccessCommon();
    private pathClient = '';

    constructor() { }

    async BuildArchitecture(architectureEntity: IArchitectureEntity): Promise<Response<boolean>> {

        let hasAllFolders!: Response<boolean>;

        await this.HasAllFolders(architectureEntity.pathClient).then(res => hasAllFolders = res);
        if (hasAllFolders?.result) {

            await this._dataBL.Build(architectureEntity).then(res => {
                if (!res.result) {
                    return CreateResponse.FailedResponse();
                }
            });

            await this._domainBL.Build(architectureEntity).then(res => {
                if (!res.result) {
                    return CreateResponse.FailedResponse();
                }
            });

            await this._infraestructureBL.Build(architectureEntity).then(res => {
                if (!res.result) {
                    return CreateResponse.FailedResponse();
                }
            });

            await this._facadeBL.Build(architectureEntity).then(res => {
                if (!res.result) {
                    return CreateResponse.FailedResponse();
                }
            });
        }

        return CreateResponse.SuccessfulResponse(true);
    }


    async Questions(): Promise<Response<QuestionCollection<any>>> {
        return this._accessCommon.ExecuteTransaction<any>(async () => {
            return CreateResponse.SuccessfulResponse(QUESTIONS);
        })
    }

    async QuestionMenu(): Promise<Response<QuestionCollection<any>>> {
        return this._accessCommon.ExecuteTransaction<any>(async () => {
            return CreateResponse.SuccessfulResponse(QUESTION_MENU);
        })
    }

    async HasAllFolders(pathClient: string): Promise<Response<boolean>> {

        const validatingArchitecture = chalk.green("Validating architecture...");
        console.log(`${validatingArchitecture}`);

        let routes = ROUTES_ARCHITECTURE;

        for (const route of routes) {
            if (!fs.existsSync(`${pathClient}${route}`)) {
                const thereIsNoRoute = chalk.red(`- This route does not exist: ${pathClient}${route}`);
                const error = chalk.red(`- [Error] The request was not completed`);
                console.log(`${thereIsNoRoute}`);
                console.log(`${error}`);
                return CreateResponse.FailedResponse();
            }
        }
        const valid = chalk.green("Valid architecture");
        console.log(`${valid}`)
        return CreateResponse.SuccessfulResponse(true);
    }

    async Build(dirActualClient: string): Promise<Response<boolean>> {
        return this._accessCommon.ExecuteTransaction<any>(async () => {
            let responseQuestionMenu!: Response<QuestionCollection<any>>;
            let responseMenuInquirer!: any;

            await this.QuestionMenu().then((questionMenu) => responseQuestionMenu = questionMenu);
            await inquirer.prompt(responseQuestionMenu.result || []).then((prompt) => responseMenuInquirer = prompt);

            // this.pathClient = path.join(dirActualClient, "src-client"); //develop
            this.pathClient = dirActualClient //produccion
            const itemMenuSelected = responseMenuInquirer["itemMenu"] as MENU_OPTIONS;

            switch (itemMenuSelected) {
                case MENU_OPTIONS.create_clean_architecture:
                    let responseCreateCleanArchitecture!: Response<boolean>;
                    await this.CreateCleanArchitecture().then((status) => responseCreateCleanArchitecture = status);
                    if (!responseCreateCleanArchitecture.isValid)
                        return CreateResponse.FailedResponse();
                    break;

                default:
                    break;
            }

            return CreateResponse.SuccessfulResponse(true);
        })
    }

    async Start(dirActualClient: string): Promise<Response<boolean>> {
        return this._accessCommon.ExecuteTransaction<any>(async () => {
            figlet("STORMBREAKER-CLI", async (err, data) => {
                return await this._accessCommon.ExecuteTransaction<any>(async () => {
                    console.log(chalk.blue(data));
                    console.log(chalk.blue(`stormbreaker-cli: 1.0.19`));
                    console.log(chalk.blue(`Node: 18.16.0`));
                    console.log(chalk.blue(`Author: Marlon Andrés León León`));
                    console.log(chalk.blue(`...........................................`));
                    console.log(chalk.blue(`                                            `));
                    return await this.Build(dirActualClient);
                })
            });
        })
    }

    async CreateCleanArchitecture(): Promise<Response<boolean>> {
        return this._accessCommon.ExecuteTransaction<any>(async () => {
            let responseCreateNewFolder!: Response<string>;
            for await (const configuration of CORE_ROUTES_CLEAR_ARCHITECTURE) {
                let clonConfiguration = configuration;
                let name = clonConfiguration.split('/').pop() || '';
                await this._file.CreateNewFolder(`${this.pathClient}${configuration}`, name).then((response) => responseCreateNewFolder = response);
                if (!responseCreateNewFolder.isValid) {
                    this._accessCommon.messageError(`Error generating the folder of the data layer -> ${configuration}`);
                    return CreateResponse.FailedResponse();
                }
            }
            return CreateResponse.SuccessfulResponse(true);
        })
    }


}

