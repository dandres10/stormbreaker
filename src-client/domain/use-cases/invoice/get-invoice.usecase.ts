import { InvoiceApiService } from '@omni-platform-data';
import { InvoiceDTO, UseCase } from '@omni-platform-domain';
import { Observable } from 'rxjs';

export class getInvoice implements UseCase<IInvoiceRequestDTO,IInvoiceDTO[]> {
  constructor(private invoiceService: InvoiceApiService) {}

  execute(): Observable<InvoiceDTO[]> {
    return this.invoiceService.getInvoice();
  }
}