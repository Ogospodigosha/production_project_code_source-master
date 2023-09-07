import {instance} from "./apiConfig";
export interface MobileIDSignIn {
    phone: string;
    birthday: string;
}

export interface SmsVerif {
    phone: string;
    code: string;
}
enum AuthPath {
    SIGN_IN = 'api/auth/sign-in',
    CONFIRM = 'api/auth/confirm',
    MOBILE_ID = 'api/auth/mobile_id/send-sms',
    VERIFY_SMS = 'api/auth/mobile_id/verify-sms',
}

export interface IValueFormSignIn {
    phone: string | undefined;
}
export interface AuthResponse {
    status: string;
}

export interface IValuesFormConfirmCode {
    code: number;
    phone: string | undefined;
}

export interface AuthTokenResponse extends AuthResponse {
    token: string;
}

export const AuthApi = {
    async signIn({phone}: IValueFormSignIn) {
        return await instance.post<AuthResponse>(AuthPath.SIGN_IN, {phone})
    },
    async confirmCode(data: IValuesFormConfirmCode) {
        return await instance.post<AuthTokenResponse>(AuthPath.CONFIRM, data)
    },
    async checkChangePhone() {
        return await instance.get('api/check_for_change_number')
    },
    async startConfirmPhoneNumber(phoneNumber: string) {
        return await instance.post('api/send_sms_to_user', {
            phone: phoneNumber
        })
    },
    async mobileID({phone, birthday}: MobileIDSignIn){
        return await instance.post<AuthResponse>(AuthPath.MOBILE_ID, {
            send_sms_code_body: {
                phone,
                birthday
            },
            phone_number: {
                phone
            }
        })
    },
    async smsVerif({phone, code}: SmsVerif) {
        return await instance.post<AuthTokenResponse>(AuthPath.VERIFY_SMS, {
            phone, code
        })
    },
}
