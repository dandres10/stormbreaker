import { Response } from '../../4cross/interfaces/interfaces-global'
import { IArchitectureEntity } from '../entity';

export abstract class  ILayerAction {
    abstract Build(architectureEntity: IArchitectureEntity): Promise<Response<boolean>>;
    abstract ExistBase(architectureEntity: IArchitectureEntity): Promise<Response<boolean>>;
    abstract CreateBase(architectureEntity: IArchitectureEntity): Promise<Response<boolean>>;
    abstract CreateFolders(architectureEntity: IArchitectureEntity): Promise<Response<boolean>>;
    abstract CreateFiles(architectureEntity: IArchitectureEntity): Promise<Response<boolean>>;
}