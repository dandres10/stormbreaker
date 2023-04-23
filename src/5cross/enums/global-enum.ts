export enum TEMPLATE_OPTIONS {
    "consume_an_api" = "consume an api",
    "Generar_una_pantalla" = "Generar una pantalla"
}

export enum CoreRoutesEnum {
    data = '/data/',
    dataRepositories = '/data/repositories',
    domain = '/domain',
    facade = '/facade',

}

export const ROUTES_ARCHITECTURE: string[] = [
    CoreRoutesEnum.data,
    CoreRoutesEnum.dataRepositories,
    CoreRoutesEnum.domain,
    CoreRoutesEnum.facade
];


export enum TypeFile {
    TS = '.ts'
}

export enum NotificationTypeEnum {
    SUCCESSFUL = 1,
    WARNING = 2,
    FAILED = 3
}

export enum MessageTypeEnum {
    STATIC_MESSAGE = 1,
    TEMPORARY_MESSAGE = 2,
    NONE = 3
}


export enum TypeCodeHttp {
    OK = 200,
    INTERNAL_SERVER_ERROR = 500,
    AUTHORIZATION_REQUIRED = 401,
    MODEL_VALIDATION = 400
}

