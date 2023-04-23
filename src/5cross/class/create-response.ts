import { MessageTypeEnum, NotificationTypeEnum } from "../enums/global-enum";
import { Response } from '../interfaces/interfaces-global'

export class CreateResponse {

    public static SuccessfulResponse<T>(result: T | null, typeMessage: MessageTypeEnum, message?: string): Response<T> {
        return {
            result: result,
            message: message,
            notificationType: NotificationTypeEnum.SUCCESSFUL,
            isValid: true,
            messageType: typeMessage
        } as Response<T>
    }

    public static WarningResponse<T>(result: T | null, typeMessage: MessageTypeEnum, message?: string): Response<T> {
        return {
            result: result,
            message: message,
            notificationType: NotificationTypeEnum.WARNING,
            isValid: false,
            messageType: typeMessage
        } as Response<T>
    }

    public static FailedResponse<T>(result: T | null, typeMessage: MessageTypeEnum, message?: string): Response<T> {
        return {
            result: result,
            message: message,
            notificationType: NotificationTypeEnum.FAILED,
            isValid: false,
            messageType: typeMessage
        } as Response<T>
    }

    public static ReturnQuery<T>(result: T | null): Response<T> {
        return {
            result: result,
            message: '',
            notificationType: NotificationTypeEnum.SUCCESSFUL,
            isValid: true,
            messageType: MessageTypeEnum.NONE
        } as Response<T>
    }


}