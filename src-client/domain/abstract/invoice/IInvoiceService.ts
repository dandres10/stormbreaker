import { InvoiceDTO } from '@omni-platform-domain';
import { Observable } from 'rxjs';

export abstract class IInvoiceService {
  abstract getInvoice(params:string,): void;
}