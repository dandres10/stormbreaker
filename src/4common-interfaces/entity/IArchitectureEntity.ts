import { QuestionCollection } from "inquirer"

export interface IArchitectureEntity {
    request?: object,
    response?: object,
    url?: string,
    dirActualClient: string
}