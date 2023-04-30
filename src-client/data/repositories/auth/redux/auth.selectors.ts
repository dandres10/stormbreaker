import { reducerAuth } from '@management/data/management';
import { createFeatureSelector, createSelector } from "@ngrx/store";

export const getAuth = createFeatureSelector<reducerAuth.AuthModel>(reducerAuth.AUTH_KEY);