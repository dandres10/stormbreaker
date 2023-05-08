import { InvoiceDTO } from '@omni-platform-domain';
import { Observable } from 'rxjs';

export abstract class IInvoiceFacade {
  abstract getInvoice(params:string,): void;
}