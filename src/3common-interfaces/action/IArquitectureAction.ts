import { QuestionCollection } from "inquirer"
import { IArchitectureEntity } from "../entity"
import { Response } from '../../4cross/interfaces/interfaces-global'

export interface IArchitectureAction {
  HasAllFolders(pathClient: string): Promise<Response<boolean>>
  Questions(): Promise<Response<QuestionCollection<any>>>
  BuildArchitecture(architectureEntity: IArchitectureEntity): Promise<Response<boolean>>
}

export interface IArchitectureFacade {
  // Questions(): Promise<Response<QuestionCollection<any>>>
  // BuildArchitecture(architectureEntity: IArchitectureEntity): Promise<Response<boolean>>
}