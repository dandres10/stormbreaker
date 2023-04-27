import { MessageTypeEnum, NotificationTypeEnum, TypeFile } from "../enums/global-enum"

export interface Response<T> {
    result: T | null
    message?: string | string[] | null
    notificationType: NotificationTypeEnum
    isValid: boolean
    messageType: MessageTypeEnum
}

export interface CreateFile {
    route: string
    nameFolder: string
    typeFile: TypeFile
    data: string;
}



