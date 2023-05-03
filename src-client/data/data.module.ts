import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Store, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
//Imports Generator




const XXXXXXXFacadeFactory =
    (authRepo: AuthRepository) => AuthFacade.getInstance(authRepo);
export const AuthFacadeProvider = {
    provide: AuthFacade,
    useFactory: AuthFacadeFactory,
    deps: [AuthRepository]
};



const PROVIDERS = [
    XXXXXXXFacadeProvider,
    { provide: XXXXXXXRepository, useClass: XXXXXXXImplementationRepository },
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
    ]),
]

@NgModule({
    providers: PROVIDERS,
    imports: IMPORTS
})
export class DataModule { }