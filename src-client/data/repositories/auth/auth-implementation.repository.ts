import { Injectable } from '@angular/core';
import { Action, Store } from "@ngrx/store";

import {
    environment,
    HttpClient,
    map,
    Observable,
    of,
    ResolveRequest,
    keysSessionStorangeEnum
} from '@management/base/management';

import {
    AuthRepository,
    IAuthDTO,
    IAuthSingInDTO
} from '@management/domain/management';

import {
    IAuthEntity,
    AuthMapper
} from '@management/data/management';

import {
    actionsAuth, 
    reducerAuth,
    selectorsAuth
} from './redux';


@Injectable({
    providedIn: 'root',
})
export class AuthImplementationRepository extends AuthRepository {

    private readonly urlApiRest: string = environment.api.urlApiRest;
    private readonly authMapper = AuthMapper.getInstance();

    constructor(
        private http: HttpClient,
        private resolveRequest: ResolveRequest,
        private store: Store<reducerAuth.AuthModel>) {
        super();
    }

    private dispatch(action: Action) {
        this.store.dispatch(action);
    }

    singIn(params: IAuthSingInDTO, loadService: boolean): Observable<IAuthDTO> {
        let data = this.getSessionStorange(keysSessionStorangeEnum.singIn);
        if (!data || loadService)
            return this.http
                .post<IAuthEntity>(`${this.urlApiRest}auth/singIn`, params)
                .pipe(map((response: any) => {
                    let res = this.resolveRequest.resolve<IAuthEntity>(response);
                    this.setSessionStorange(keysSessionStorangeEnum.singIn, res);
                    return res;
                }))
                .pipe(map((entity: IAuthEntity) => entity && this.authMapper.mapFrom(entity)))
        return of(data);
    }

}