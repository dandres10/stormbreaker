export interface IInvoiceEntity {
     id: number;
     options: string[];
     country: string;
     operation_type: string;
     name: string;
     description: string;
     image: string;
     image_icon:  string;
     link_show_more:  string;
     active:  boolean;
     order:  number;
     marginLeft?:  number;
     index?:  number;
}
export interface IInvoiceDTO {
     id: number;
     options: string[];
     country: string;
     operation_type: string;
     name: string;
     description: string;
     image: string;
     image_icon:  string;
     link_show_more:  string;
     active:  boolean;
     order:  number;
     marginLeft?:  number;
     index?:  number;
}
export interface IInvoiceRequestDTO {
     params: string;
}
