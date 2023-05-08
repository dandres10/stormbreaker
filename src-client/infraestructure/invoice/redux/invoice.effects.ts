import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import * as InvoiceActions from './invoice.actions';
import { map, catchError, exhaustMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { InvoiceApiService } from '@omni-platform-data';

@Injectable()
export class InvoiceEffects {
    getInvoice$ = createEffect(() =>
    this.actions$.pipe(
        ofType(InvoiceActions.getInvoiceList),
        exhaustMap(action =>
        this.invoiceApiService.getInvoice(action.country_code).pipe(
            map(invoiceList =>
                InvoiceActions.getInvoiceListSuccess({ invoiceList })
            ),
            catchError(error => of(InvoiceActions.getInvoiceListFail(error)))
        )
        )
    )
    );

    constructor(
    private actions$: Actions,
    private invoiceApiService: InvoiceApiService
    ) {}
}