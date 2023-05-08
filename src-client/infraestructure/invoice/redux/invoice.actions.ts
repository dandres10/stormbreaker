import { createAction, props } from '@ngrx/store';
import {
    IInvoiceDTO,
    IInvoiceRequestDTO
} from '@omni-platform-domain';

export const getInvoiceList = createAction(
    '[Invoice] Get Invoice List ',
    props<{ country_code: string }>()
);

export const getInvoiceListSuccess = createAction(
    '[Invoice] Get Invoice List Success',
    props<{ invoiceList: IInvoiceDTO[] }>()
);

export const getInvoiceListFail = createAction(
    '[Invoice] Get Invoice List Fail',
    props<{ error: string }>()
);