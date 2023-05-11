import { reducerAuth } from './index';
import { createFeatureSelector, createSelector } from "@ngrx/store";

export const getAuth = createFeatureSelector<reducerAuth.AuthModel>(reducerAuth.AUTH_KEY);