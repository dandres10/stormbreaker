import { IInvoiceEntity, IInvoiceDTO, Adapter } from '@omni-platform-domain';

        export class InvoiceAdapter extends Adapter<IInvoiceEntity, IInvoiceDTO> {
          private static instance: InvoiceAdapter;
        
          private constructor() {
            super();
          }
          public static getInstance(): InvoiceAdapter {
            if (!InvoiceAdapter.instance)
              InvoiceAdapter.instance = new InvoiceAdapter();
            return InvoiceAdapter.instance;
          }
          mapFrom(param: IInvoiceEntity): IInvoiceDTO {
            return {
              id: param.id,
              options: param.options,
              country: param.country,
              operation_type: param.operation_type,
              name: param.name,
              description: param.description,
              image: param.image,
              image_icon: param.image_icon,
              link_show_more: param.link_show_more,
              active: param.active,
              order: param.order,
              marginLeft: param.marginLeft,
              index: param.index
            };
          }
          mapFromList(params: IInvoiceEntity[]): IInvoiceDTO[] {
            return params.map((param: IInvoiceEntity) => {
              return this.mapFrom(param);
            });
          }
          mapTo(param: IInvoiceDTO): IInvoiceEntity {
            return {
              id: param.id,
              options: param.options,
              country: param.country,
              operation_type: param.operation_type,
              name: param.name,
              description: param.description,
              image: param.image,
              image_icon: param.image_icon,
              link_show_more: param.link_show_more,
              active: param.active,
              order: param.order,
              marginLeft: param.marginLeft,
              index: param.index
            };
          }
          mapToList(params: IInvoiceDTO[]): IInvoiceEntity[] {
            return params.map((param: IInvoiceDTO) => {
              return this.mapTo(param);
            });
          }
        }
        