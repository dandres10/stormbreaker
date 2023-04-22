import { QuestionCollection } from "inquirer"

export interface IArchitectureAction {
  HasAllFolders(pathClient: string): Promise<boolean>
  Questions(): Promise<QuestionCollection<any>>
}