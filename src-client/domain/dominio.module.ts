import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { InvoiceEffects } from '../infraestructure/invoice/redux/invoice.effects';
import * as fromInvoice from '../infraestructure/invoice/redux/invoice.reducer';
import { InvoiceApiService } from '../data/api-service/invoice/invoice-service';
import { InvoiceFacade } from '@omni-platform-infraestructure';
import { IInvoiceService } from './abstract/invoice/IInvoiceService';

const InvoiceFacadeFactory = (invoiceService: InvoiceApiService) =>
  InvoiceFacade.getInstance(invoiceService);

export const InvoiceFacadeProvider = {
  provide: InvoiceFacade,
  useFactory: InvoiceFacadeFactory,
  deps: [InvoiceApiService]
};

const PROVIDERS = [
  InvoiceFacadeProvider,
  { provide: IInvoiceService, useClass: InvoiceApiService }
];

const IMPORTS = [
  StoreModule.forFeature(
    fromInvoice.APPINVOICE_FEATURE_KEY,
    fromInvoice.reducer
  ),
  EffectsModule.forFeature([InvoiceEffects])
];

@NgModule({
  providers: PROVIDERS,
  imports: IMPORTS
})
export class DataModule {}
