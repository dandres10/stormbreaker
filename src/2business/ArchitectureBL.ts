



import fs from "fs";
import { QuestionCollection } from 'inquirer';
import { IArchitectureAction } from "../4common-interfaces";
import { QUESTIONS } from "../5cross";





export class ArchitectureBL implements IArchitectureAction {

    constructor() { }


    async Questions(): Promise<QuestionCollection<any>> {
        return QUESTIONS;
    }

    async HasAllFolders(pathClient: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

}