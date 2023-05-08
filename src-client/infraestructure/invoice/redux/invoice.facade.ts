import { InvoiceApiService } from '@omni-platform-data';
import {
    GetInvoice,
    IInvoiceDTO,
    GetInvoiceList,
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
    return new GetInvoice(this.invoiceApiService).execute(params);
}
}