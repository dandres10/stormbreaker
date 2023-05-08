import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
    APPINVOICE_FEATURE_KEY,
    InvoiceAdapter,
    State
} from './invoice.reducer';

const getAppInvoiceState = createFeatureSelector<State>(APPINVOICE_FEATURE_KEY);

const selectInvoiceList = InvoiceAdapter.getSelectors().selectAll;
export const selectorGetInvoiceList = createSelector(
    getAppInvoiceState,
    (state: State) => selectInvoiceList(state.invoiceList)
);