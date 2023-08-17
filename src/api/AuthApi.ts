import {instance} from "./apiConfig";

enum AuthPath {
    SIGN_IN = 'api/auth/sign-in',
    CONFIRM = 'api/auth/confirm',
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
}
