export enum TEMPLATE_OPTIONS {
    "new_pipe" = "Nuevo flujo",
    "add_pipe" = "Añadir al flujo"
}

export enum MENU_OPTIONS {
    "create_clean_architecture" = "Generate clean arquitect"
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

export enum ROUTES_CLEAR_ARCHITECTURE {
    domain = '/domain',
    domainInterfaces = '/domain/interfaces',
    domainUseCases = '/domain/use-cases',
    domainHelpers = '/domain/helpers',
    data = '/data',
    dataApiServices = '/data/api-services',
    dataMocks = '/data/mocks',
    dataAdapters = '/data/adapters',
    infraestructure = '/infraestructure',
    infraestructureRedux = '/infraestructure/redux',
    infraestructureReduxStore = '/infraestructure/redux/store',
    infraestructureReduxStoreEffects = '/infraestructure/redux/store/effects',
    infraestructureReduxActions = '/infraestructure/redux/actions',
    infraestructureReduxReducers = '/infraestructure/redux/reducers',
    infraestructureReduxSelectors = '/infraestructure/redux/selectors',
    infraestructureXState = '/infraestructure/xstate',
    facade = '/facade',
    facadeStore = '/facade/store',
    facadeUI = '/facade/ui',
    ui = '/ui',
    uiUtils = '/ui/utils',
    uiUtilsPipes = '/ui/utils/pipes',
    uiUtilsDirectives = '/ui/utils/directives',
    uiUtilsGuards = '/ui/utils/guards',
    components = '/ui/components',
    containers = '/ui/containers'
}

export const CORE_ROUTES_CLEAR_ARCHITECTURE: string[] = [
    ROUTES_CLEAR_ARCHITECTURE.domain,
    ROUTES_CLEAR_ARCHITECTURE.domainInterfaces,
    ROUTES_CLEAR_ARCHITECTURE.domainUseCases,
    ROUTES_CLEAR_ARCHITECTURE.domainHelpers,
    ROUTES_CLEAR_ARCHITECTURE.data,
    ROUTES_CLEAR_ARCHITECTURE.dataApiServices,
    ROUTES_CLEAR_ARCHITECTURE.dataMocks,
    ROUTES_CLEAR_ARCHITECTURE.dataAdapters,
    ROUTES_CLEAR_ARCHITECTURE.infraestructure,
    ROUTES_CLEAR_ARCHITECTURE.infraestructureRedux,
    ROUTES_CLEAR_ARCHITECTURE.infraestructureReduxStore,
    ROUTES_CLEAR_ARCHITECTURE.infraestructureReduxStoreEffects,
    ROUTES_CLEAR_ARCHITECTURE.infraestructureReduxActions,
    ROUTES_CLEAR_ARCHITECTURE.infraestructureReduxReducers,
    ROUTES_CLEAR_ARCHITECTURE.infraestructureReduxSelectors,
    ROUTES_CLEAR_ARCHITECTURE.infraestructureXState,
    ROUTES_CLEAR_ARCHITECTURE.facade,
    ROUTES_CLEAR_ARCHITECTURE.facadeStore,
    ROUTES_CLEAR_ARCHITECTURE.facadeUI,
    ROUTES_CLEAR_ARCHITECTURE.ui,
    ROUTES_CLEAR_ARCHITECTURE.uiUtils,
    ROUTES_CLEAR_ARCHITECTURE.uiUtilsPipes,
    ROUTES_CLEAR_ARCHITECTURE.uiUtilsDirectives,
    ROUTES_CLEAR_ARCHITECTURE.uiUtilsGuards,
    ROUTES_CLEAR_ARCHITECTURE.components,
    ROUTES_CLEAR_ARCHITECTURE.containers
]

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

