import { TEMPLATE_OPTIONS } from "../enums/global-enum";


export const QUESTIONS = [
    {
        name: "template",
        type: "list",
        message: "¿Qué tipo de proyecto quieres generar?",
        choices: [`${TEMPLATE_OPTIONS.consume_an_api}`]
    }
];

export const ROUTES_ARCHITECTURE: string[] = [
    '/data',
    '/data/repositories',
    '/domain',
    '/facade'
];