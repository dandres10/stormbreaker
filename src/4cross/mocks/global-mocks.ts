import { TEMPLATE_OPTIONS } from "../enums/global-enum";




export const QUESTIONS = [
    {
        name: "type_pipe",
        type: "list",
        message: "¿Qué tuberia quieres generar?",
        choices: [`${TEMPLATE_OPTIONS.new_pipe}`, `${TEMPLATE_OPTIONS.add_pipe}`]
    },
    {
        name: "nameMethod",
        type: "input",
        message: "Nombre del metodo"
    },
    {
        name: "nameObject",
        type: "input",
        message: "nombre del objeto"
    },
    {
        name: "base",
        type: "input",
        message: "Nombre base"
    },
    {
        name: "url",
        type: "input",
        message: "Url del Endpoint"
    },
    {
        name: "typeResponse",
        type: "input",
        message: "type response"
    },
    {
        name: "request",
        type: "editor",
        message: "Request del Endpoint"
    },
    {
        name: "response",
        type: "input",
        message: "Response del Endpoint"
    }
];

