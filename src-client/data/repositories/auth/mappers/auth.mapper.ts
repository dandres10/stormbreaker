
import { Mapper } from '@management/base/management';
import { IAuthDTO } from '@management/domain/management';
import { IAuthEntity } from '@management/data/management';

export class AuthMapper extends Mapper<IAuthEntity, IAuthDTO> {

    private static instance: AuthMapper;

    private constructor() { super(); }

    public static getInstance(): AuthMapper {
        if (!AuthMapper.instance)
            AuthMapper.instance = new AuthMapper();
        return AuthMapper.instance;
    }


    mapFrom(param: IAuthEntity): IAuthDTO {
        return {
            person: param.person,
            language: param.language,
            companies: param.companies,
            currency: param.currency,
            token: param.token,

        };
    }
    mapFromList(params: IAuthEntity[]): IAuthDTO[] {
        return params.map((param: IAuthEntity) => {
            return this.mapFrom(param)
        })
    }
    mapTo(param: IAuthDTO): IAuthEntity {
        return {
            person: param.person,
            language: param.language,
            companies: param.companies,
            currency: param.currency,
            token: param.token,

        }
    }
    mapToList(params: IAuthDTO[]): IAuthEntity[] {
        return params.map((param: IAuthDTO) => {
            return this.mapTo(param);
        })
    }
}