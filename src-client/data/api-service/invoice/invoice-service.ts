import { Injectable } from '@angular/core';
        import { IInvoiceDTO, IInvoiceEntity,IInvoiceService } from '@omni-platform-domain';
        import { Observable, of } from 'rxjs';
        import { map } from 'rxjs/operators';
        import { HttpClient } from '@angular/common/http';
        import { InvoiceAdapter } from '@omni-platform-data';
        import { environment } from '@env/environment';
        import { Action, Store, select } from '@ngrx/store';
        import {
          State,
          getInvoiceList,
          selectorGetInvoiceList
        } from '@omni-platform-infraestructure';
        
        
        @Injectable({
          providedIn: 'root'
        })
        export class InvoiceApiService extends IInvoiceService {
          
        
          private readonly invoiceAdapter = InvoiceAdapter.getInstance();
        
          constructor(private http: HttpClient, private store: Store<State>) {
            super();
          }
        
          getInvoiceRedux(country_code: string): void {
            return this.dispatch(getInvoiceList({ country_code }));
          }
        
          private dispatch(action: Action) {
            this.store.dispatch(action);
          }
        
          getInvoice(params: string): Observable<IInvoiceDTO[]> {
            return this.http
              .get<IInvoiceEntity[]>(
                `${https://financial-platform-qa-ha.klym.com}/factoring-operations/operation-types/?country_code=params
              )
              .pipe(
                map((entity: IInvoiceEntity[]) => {
                  return entity && this.invoiceAdapter.mapFromList(entity);
                })
              );
          }
        
          getInvoiceList$: Observable<IInvoiceDTO[]> = this.store.pipe(
            select(selectorGetInvoiceList)
          );
        }
        