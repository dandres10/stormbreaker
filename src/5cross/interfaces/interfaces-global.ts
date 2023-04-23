import { MessageTypeEnum, NotificationTypeEnum } from "../enums/global-enum"

export interface Response<T> {
    result: T | null
    message?: string | string[] | null
    notificationType: NotificationTypeEnum
    isValid: boolean
    messageType: MessageTypeEnum
}


