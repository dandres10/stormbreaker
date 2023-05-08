import { InvoiceApiService } from '@omni-platform-data';
import {
    getInvoice,
    IInvoiceDTO,
    getInvoiceList,
    IInvoiceFacade
} from '@omni-platform-domain';
import { Observable } from 'rxjs';

export class InvoiceFacade extends IInvoiceFacade {
private static instance: InvoiceFacade;

constructor(private invoiceApiService: InvoiceApiService) {
    super();
}

public static getInstance(
    invoiceApiService: InvoiceApiService
): InvoiceFacade {
    if (!InvoiceFacade.instance)
        InvoiceFacade.instance = new InvoiceFacade(invoiceApiService);
    return InvoiceFacade.instance;
}

getInvoice(params: string): void {
    return new getInvoice(this.invoiceApiService).execute(params);
}
}