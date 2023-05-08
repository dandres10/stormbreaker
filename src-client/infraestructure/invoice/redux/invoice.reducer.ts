import { createReducer, on, Action } from '@ngrx/store';
import * as InvoiceActions from './invoice.actions';
import { IInvoiceDTO } from '@omni-platform-domain';
import {
    createEntityAdapter,
    Dictionary,
    EntityAdapter,
    EntityState
} from '@ngrx/entity';

export const APPINVOICE_FEATURE_KEY = 'appInvoice';
export interface InvoicePartialState {
    readonly [APPINVOICE_FEATURE_KEY]: State;
}

export class InvoiceEntity implements EntityState<IInvoiceDTO> {
    ids: string[] | number[];
    entities: Dictionary<IInvoiceDTO>;
}

export const InvoiceAdapter: EntityAdapter<IInvoiceDTO> =
    createEntityAdapter<IInvoiceDTO>({
    selectId: invoice => invoice.id
    });

export const InvoiceInitialState: InvoiceEntity =
    InvoiceAdapter.getInitialState({});

export interface State {
    invoiceList: InvoiceEntity;
}

export const initialState: State = {
    invoiceList: InvoiceInitialState
};

const invoiceReducer = createReducer(
    initialState,
    // Only NgRx
    on(InvoiceActions.getInvoiceList, state => ({
    ...state,
    invoiceList: initialState.invoiceList
    })),
    on(InvoiceActions.getInvoiceListSuccess, (state, { invoiceList }) => ({
    ...state,
    invoiceList: InvoiceAdapter.setAll(invoiceList, state.invoiceList)
    })),
    on(InvoiceActions.getInvoiceListFail, state => ({
    ...state,
    invoiceList: initialState.invoiceList
    }))
);

export function reducer(state: State | undefined, action: Action) {
    return invoiceReducer(state, action);
}