
import {
     IPersonEntity,
     ILanguageEntity,
     ICompanyEntity,
     ICurrencyEntity,
} from "@management/data/management";

export interface IAuthEntity {
     person: IPersonEntity|null;
     language: ILanguageEntity|null;
     companies: ICompanyEntity[]|null;
     currency: ICurrencyEntity|null;
     token: string|null;
}
