import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Store, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
//Imports Generator
import { AuthRepository } from '@management/domain/management';
import { AuthImplementationRepository } from '@management/data/management';
import { AuthFacade } from '@management/facade/management';
import { AuthEffects, reducerAuth } from './repositories/auth/redux/index';





const XXXXXXXFacadeFactory =
    (authRepo: AuthRepository) => AuthFacade.getInstance(authRepo);
export const AuthFacadeProvider = {
    provide: AuthFacade,
    useFactory: AuthFacadeFactory,
    deps: [AuthRepository]
};

const AuthFacadeFactory =
(authRepo: AuthRepository) => AuthFacade.getInstance(authRepo);
export const AuthFacadeProvider = {
    provide: AuthFacade,
    useFactory: AuthFacadeFactory,
    deps: [AuthRepository]
};


const PROVIDERS = [
    XXXXXXXFacadeProvider,
    { provide: XXXXXXXRepository, useClass: XXXXXXXImplementationRepository },
    AuthFacadeProvider,
    { provide: AuthRepository, useClass: AuthImplementationRepository },
]

const IMPORTS = [
    CommonModule,
    HttpClientModule,
    StoreModule.forFeature(
        reducerXXXX.XXXXX_KEY,
        reducerXXXX.XXXXXXReducer
    ),
    EffectsModule.forFeature([
        XXXXXEffects,
        AuthEffects,
    ]),
    StoreModule.forFeature(
        reducerAuth.AUTH_KEY,
        reducerAuth.AuthReducer
    ),
]

@NgModule({
    providers: PROVIDERS,
    imports: IMPORTS
})
export class DataModule { }