import {AuthApi} from "../api/AuthApi";
import {authSignUp} from "./authSignUp";


export const authSignIn =  async(phone: string, intervalId: any, setSmsLoader:(loader: boolean)=>void, loader:boolean, setAuthType:(type: string)=>void, setError: (error: string)=>void, setViewModal: (view: boolean)=>void, setPhoneNumber:(phone:string)=>void) => {
    debugger
    try {
        await AuthApi.signIn({phone})
        setSmsLoader(true)
        setPhoneNumber(phone)
        setAuthType('BASIC_SMS')
    } catch (error: any) {
        if (!error.response) {
            setViewModal(false)
        }
        if (error.response.status === 423) {
            setError('Ваш номер телефона временно заблокирован для авторизации на сервисе, пожалуйста, попробуйте авторизоваться позже!')
            clearInterval(intervalId)
            setViewModal(false)
        } else if (error.response.status === 417) {
            setViewModal(false)
            setError('Вы исчерпали лимит смс в сутки, пожалуйста, попробуйте завтра')
        } if (error.response.status === 429) {
            setError('🐶🐱🐹🐭🐰🙈🦆🦀')
        } else {
            authSignUp(phone, setSmsLoader, setAuthType, setViewModal, setError, setPhoneNumber)
        }
    }
}
