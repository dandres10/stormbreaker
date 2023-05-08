export enum TEMPLATE_OPTIONS {
    "new_pipe" = "Nuevo flujo",
    "add_pipe" = "Añadir al flujo"
}

export enum CoreRoutesEnum {
    data = '/data',
    dataAdapters = '/data/adapters',
    dataApiService = '/data/api-service',
    dataIndex = '/data/index.ts',
    domain = '/domain',
    domainAbstract = '/domain/abstract',
    domainAbstractIndex = '/domain/abstract/index.ts',
    domainhelpers = '/domain/helpers',
    domainInterfaces = '/domain/interfaces',
    domainUseCases = '/domain/use-cases',
    domainModule = '/domain/dominio.module.ts',
    domainIndex = '/domain/index.ts',
    facade = '/facade',
    infraestructure = '/infraestructure',
    infraestructureIndex = '/infraestructure/index.ts'
}

export const ROUTES_ARCHITECTURE: string[] = [
    CoreRoutesEnum.data,
    CoreRoutesEnum.dataAdapters,
    CoreRoutesEnum.dataApiService,
    CoreRoutesEnum.dataIndex,
    CoreRoutesEnum.domain,
    CoreRoutesEnum.domainAbstract,
    CoreRoutesEnum.domainAbstractIndex,
    CoreRoutesEnum.domainhelpers,
    CoreRoutesEnum.domainInterfaces,
    CoreRoutesEnum.domainUseCases,
    CoreRoutesEnum.domainModule,
    CoreRoutesEnum.domainIndex,
    CoreRoutesEnum.facade,
    CoreRoutesEnum.infraestructure,
    CoreRoutesEnum.infraestructureIndex
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

export enum PrimitiveTypesEnum {
    string = 'string',
    null = 'null',
    number = 'number',
    date = 'Date',
    corchetes = '[]',
    llaves = '{}',
    object = 'object'
}

