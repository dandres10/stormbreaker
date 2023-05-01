import { actionsAuth } from './index';
import { Injectable } from "@angular/core";
import { mergeMap, map } from 'rxjs/operators';
import { actionsAuth } from '@management/data/management';
import { Actions, createEffect, ofType } from '@ngrx/effects';

@Injectable()
export class AuthEffects {

    constructor(
        private actions$: Actions
    ) { }

}