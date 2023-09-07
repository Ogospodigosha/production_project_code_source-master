import {AuthApi} from "../api/AuthApi";


export const authSignIn =  async(phone: string, intervalId: any, setSmsLoader:(loader: boolean)=>void, loader:boolean, setAuthType:(type: string)=>void, setError: (error: string)=>void, setViewModal: (view: boolean)=>void) => {
    debugger
    try {
        debugger
        await AuthApi.signIn({phone})
        setSmsLoader(true)
        // setPhoneNumber(phone)
        setAuthType('BASIC_SMS')
    } catch (error: any) {
        if (!error.response) {
            setViewModal(false)
        }
        if (error.response.status === 423) {
            // dispatch(addNotification(['Ваш номер телефона временно заблокирован для авторизации на сервисе, пожалуйста, попробуйте авторизоваться позже!'], 10))
            setError('Ваш номер телефона временно заблокирован для авторизации на сервисе, пожалуйста, попробуйте авторизоваться позже!')
            clearInterval(intervalId)
            setViewModal(false)
        } else if (error.response.status === 417) {
            setViewModal(false)
            // dispatch(setPhoneNumber(''))
            // dispatch(addNotification('Вы исчерпали лимит смс в сутки, пожалуйста, попробуйте завтра'))
            setError('Вы исчерпали лимит смс в сутки, пожалуйста, попробуйте завтра')
        } if (error.response.status === 429) {
            // dispatch(addNotification('🐶🐱🐹🐭🐰🙈🦆🦀'))
            setError('🐶🐱🐹🐭🐰🙈🦆🦀')
        } else {
            // dispatch(authSignUp(phone))
        }
    }
}
