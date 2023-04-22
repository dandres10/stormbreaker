import { QuestionCollection } from "inquirer"
import { IArchitectureEntity } from "../entity"

export interface IArchitectureAction {
  HasAllFolders(pathClient: string): Promise<boolean>
  Questions(): Promise<QuestionCollection<any>>
  BuildArchitecture(architectureEntity: IArchitectureEntity): Promise<boolean>
}


export interface IArchitectureFacade {
  Questions(): Promise<QuestionCollection<any>>
  BuildArchitecture(architectureEntity: IArchitectureEntity): Promise<boolean>
}