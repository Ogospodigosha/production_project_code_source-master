import {instance} from "./apiConfig";
import {Nullable} from "../components/Subtitle/Subtitle";
import {UserConfigType} from "../CustomHooks/requestModel";
export interface MobileIDSignIn {
    phone: string;
    birthday: string;
}

export interface IValuesFormConfirmCodeAutologin {
    code: number;
    phone: string | undefined;
    token: string | null;
}

export interface SmsVerif {
    phone: string;
    code: string;
}
export interface IValuesFormSignUp {
    phone?: string | undefined;
}
enum AuthPath {
    SIGN_IN = 'api/auth/sign-in',
    CONFIRM = 'api/auth/confirm',
    MOBILE_ID = 'api/auth/mobile_id/send-sms',
    VERIFY_SMS = 'api/auth/mobile_id/verify-sms',
    MTS_SIGN_IN = '/api/auth/sign_in_mts',
    MTS_SIGN_UP = '/api/auth/sign_up_mts',
    SIGN_UP = 'api/auth/sign-up',
    GET_AUTOLOGIN_DATA = '/api/auth/get_autologin_data',
    CONFIRM_AUTOLOGIN = '/api/auth/confirm_autologin',
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
//const AuthApi = (backUrl) => {
// const signIn = async () => {
// return await ...
// }
//
// return {signIn}
// }
export const AuthApi = (backUrl: string)=>{
    const signIn = async ({phone}: IValueFormSignIn)=>{
        return await instance.post<AuthResponse>(`${backUrl}/${AuthPath.SIGN_IN}`, {phone})
    }
    const confirmCodeBasic = async (data: IValuesFormConfirmCode) =>{
        return await instance.post<AuthTokenResponse>(`${backUrl}/${AuthPath.CONFIRM}`, data)
    }
    const checkChangePhone = async () =>{
        return await instance.get(`${backUrl}/api/check_for_change_number`)
    }
    const startConfirmPhoneNumber = async(phoneNumber: string)=>{
        return await instance.post(`${backUrl}/api/send_sms_to_user`, {
            phone: phoneNumber
        })
    }
    const mobileID = async ({phone, birthday}: MobileIDSignIn)=>{
        return await instance.post<AuthResponse>(`${backUrl}/${AuthPath.MOBILE_ID}`, {
            send_sms_code_body: {
                phone,
                birthday
            },
            phone_number: {
                phone
            }
        })
    }
    const smsVerif = async ({phone, code}: SmsVerif)=>{
        return await instance.post<AuthTokenResponse>(`${backUrl}/${AuthPath.VERIFY_SMS}`, {
            phone, code
        })
    }
    const  sendMtsSignIn=async ({phone}: IValueFormSignIn)=>{
        return await instance.post<AuthResponse>(`${backUrl}/${AuthPath.MTS_SIGN_IN}`, {phone})
    }
    const signUp = async ({phone}: IValuesFormSignUp)=>{
        return await instance.post<AuthResponse>(`${backUrl}/${AuthPath.SIGN_UP}`, {phone})
    }
    const sendMtsSignUp = async ({phone}: IValuesFormSignUp) =>{
        return await instance.post<AuthResponse>(`${backUrl}/${AuthPath.MTS_SIGN_UP}`, {phone})
    }
    const sendInfoAuth = async (value: Nullable<string>, userConfigs: UserConfigType)=>{
        return await instance.post(`${backUrl}/api/form/create/auth_info`, {
            phone_number: value, ...userConfigs,
            checkin_page: `${window.location.href}`
        })
    }
    const getDataAutologin = async (autologin_token: string) =>{
        return await instance.get(`${backUrl}${AuthPath.GET_AUTOLOGIN_DATA}?autologin_token=${autologin_token}`)
    }
    const autologinCodeConfirm = async (data: IValuesFormConfirmCodeAutologin)=>{
        return await instance.post<AuthTokenResponse>(`${backUrl}/AuthPath.CONFIRM_AUTOLOGIN`, data)
    }
    return {
        signIn,
        confirmCodeBasic,
        checkChangePhone,
        startConfirmPhoneNumber,
        mobileID,
        smsVerif,
        sendMtsSignIn,
        signUp,
        sendMtsSignUp,
        sendInfoAuth,
        getDataAutologin,
        autologinCodeConfirm
    }
}
// export const AuthApi = {
//     async signIn({phone}: IValueFormSignIn) {
//         return await instance.post<AuthResponse>(AuthPath.SIGN_IN, {phone})
//     },
//     async confirmCode(data: IValuesFormConfirmCode) {
//         return await instance.post<AuthTokenResponse>(AuthPath.CONFIRM, data)
//     },
//     async checkChangePhone() {
//         return await instance.get('api/check_for_change_number')
//     },
//     async startConfirmPhoneNumber(phoneNumber: string) {
//         return await instance.post('api/send_sms_to_user', {
//             phone: phoneNumber
//         })
//     },
//     async mobileID({phone, birthday}: MobileIDSignIn){
//         return await instance.post<AuthResponse>(AuthPath.MOBILE_ID, {
//             send_sms_code_body: {
//                 phone,
//                 birthday
//             },
//             phone_number: {
//                 phone
//             }
//         })
//     },
//     async smsVerif({phone, code}: SmsVerif) {
//         return await instance.post<AuthTokenResponse>(AuthPath.VERIFY_SMS, {
//             phone, code
//         })
//     },
//     async sendMtsSignIn({phone}: IValueFormSignIn) {
//         return await instance.post<AuthResponse>(AuthPath.MTS_SIGN_IN, {phone})
//     },
//     async signUp({phone}: IValuesFormSignUp) {
//         return await instance.post<AuthResponse>(AuthPath.SIGN_UP, {phone})
//     },
//     async sendMtsSignUp({phone}: IValuesFormSignUp) {
//         return await instance.post<AuthResponse>(AuthPath.MTS_SIGN_UP, {phone})
//     },
//     async sendAuthInfo(value: Nullable<string>, userConfigs: UserConfigType) {
//         return await instance.post('api/form/create/auth_info', {
//             phone_number: value, ...userConfigs,
//             checkin_page: `${window.location.href}`
//         })
//     },
//     async getAutologinData(autologin_token: string) {
//         return await instance.get(`${AuthPath.GET_AUTOLOGIN_DATA}?autologin_token=${autologin_token}`)
//     },
//     async confirmAutologinCode(data: IValuesFormConfirmCodeAutologin) {
//         return await instance.post<AuthTokenResponse>(AuthPath.CONFIRM_AUTOLOGIN, data)
//     }
// }
