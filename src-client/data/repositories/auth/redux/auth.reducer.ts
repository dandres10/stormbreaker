import { createReducer, on } from '@ngrx/store';
import { actionsAuth } from '@management/data/management';
import {  } from "@management/domain/management";

export const AUTH_KEY = 'auth'
export interface AuthModel {
}

export const AuthInitialState: AuthModel = {
}

const _AuthReducer = createReducer(AuthInitialState,
);

export function AuthReducer(state: AuthModel, action: any) {
    return _AuthReducer(state, action);
}