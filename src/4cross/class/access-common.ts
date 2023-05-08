import chalk from "chalk";
import { PrimitiveTypesEnum } from "../enums/global-enum";
import { CreateResponse } from "./create-response";
import { Response } from '../../4cross/interfaces/interfaces-global';

export class AccessCommon {

    PrimitivesTypes: string[] = [
        PrimitiveTypesEnum.corchetes,
        PrimitiveTypesEnum.date,
        PrimitiveTypesEnum.llaves,
        PrimitiveTypesEnum.null,
        PrimitiveTypesEnum.number,
        PrimitiveTypesEnum.object,
        PrimitiveTypesEnum.string
    ]

    constructor() { }

    messageSuccess(message: string) {
        console.log(chalk.green(message));
    }

    messageError(message: string) {
        console.log(`${chalk.red('[ERROR]:')} ${chalk.red(message)}`);
    }

    PascalCase = (name: string): string => {
        let adjustedFormat: string = '';
        let nameSplit = name.split('_');
        for (let index = 0; index < nameSplit.length; index++) {
            adjustedFormat += `${nameSplit[index].substring(0, 1).toLocaleUpperCase()}${nameSplit[index].substring(1, nameSplit[index].length)}`;
        }
        return adjustedFormat;
    }

    CamelCase = (name: string): string => {
        let adjustedFormat: string = '';
        let nameSplit = name.split('_');
        for (let index = 0; index < nameSplit.length; index++) {
            adjustedFormat += `${nameSplit[index].substring(0, 1).toUpperCase()}${nameSplit[index].substring(1, nameSplit[index].length)}`;
        }
        return `${adjustedFormat.substring(0, 1).toLowerCase()}${adjustedFormat.substring(1, adjustedFormat.length)}`;
    }

    async BuildInterface(response: string[], nameObject: string, typeObject: string): Promise<Response<string>> {

        let data: string = `export interface I${this.PascalCase(nameObject)}${typeObject} {\n`;

        for (const item of response) {
            if (item?.split(':')?.length) {
                let [nameAttribute, type] = item.split(':');
                if (type) {
                    data += `     ${nameAttribute}: ${type};\n`;
                }
            }
        }

        data += `}\n`;

        return CreateResponse.SuccessfulResponse(data);

    }

    async BuildImportsInterface(response: string[]): Promise<Response<string>> {

        let data = 'import {\n';

        for (const item of response) {
            if (item?.split(':')?.length) {
                let [one, two] = item.split(':');

                if (two?.split('|')?.length) {
                    let types = two.split('|');

                    for (const type of types) {
                        if (!this.PrimitivesTypes.includes(type)) {
                            data += `     ${this.OnlyRegexLetters(type)},\n`
                        }
                    }
                }
            }
        }

        data += `} from "@management/data/management";\n\n`;

        return CreateResponse.SuccessfulResponse(data);

    }

    OnlyRegexLetters(data: string) {
        return data.replace(/[^A-Za-z0-9]/g, '');
    }

}