import {AuthApi} from "../api/AuthApi";
import {mtsAuthSignUp} from "./mtsAuthSignUp";


export const mtsAuthSignIn = async (phone: string, setSmsLoader: (loader: boolean) => void, setAuthType: (authType: string) => void, setPhoneNumber: (phone: string) => void, setViewModal: (view: boolean)=>void, setError:(error: string)=>void) => {
    try {
        await AuthApi.sendMtsSignIn({phone})
        setSmsLoader(true)
        setAuthType('BASIC_SMS')
        setPhoneNumber(phone)
    } catch (error: any) {
        if (!error.response) {
            setViewModal(false)
        }
        if (error.response.status === 423) {
            setError('Ваш номер телефона временно заблокирован для авторизации на сервисе, пожалуйста, попробуйте авторизоваться позже!')
            setViewModal(false)
        } else if (error.response.status === 417) {
            setViewModal(false)
            setPhoneNumber('')
            setError('Вы исчерпали лимит смс в сутки, пожалуйста, попробуйте завтра')
        } if (error.response.status === 429) {
            setError('🐶🐱🐹🐭🐰🙈🦆🦀')
        } else {
            mtsAuthSignUp(phone, setSmsLoader, setAuthType, setPhoneNumber, setError, setViewModal)
        }
    }

}
