import { MessageTypeEnum, NotificationTypeEnum } from "../enums/global-enum";
import { Response } from '../interfaces/interfaces-global'

export class CreateResponse {

    public static SuccessfulResponse<T>(result: T | null): Response<T> {
        return {
            result: result,
            notificationType: NotificationTypeEnum.SUCCESSFUL,
            isValid: true
        } as Response<T>
    }

    public static WarningResponse<T>(result: T | null): Response<T> {
        return {
            result: result,
            notificationType: NotificationTypeEnum.WARNING,
            isValid: false
        } as Response<T>
    }

    public static FailedResponse<T>(result: T | null): Response<T> {
        return {
            result: result,
            notificationType: NotificationTypeEnum.FAILED,
            isValid: false
        } as Response<T>
    }




}