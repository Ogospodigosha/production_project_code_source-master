import {AuthApi} from "../api/AuthApi";

export const authSignIn =  async(phone: string, intervalId: any) => {
    debugger
    try {
        debugger
        await AuthApi.signIn({phone})
        // await dispatch(setSmsLoader(true))
        // dispatch(setPhoneNumber(phone));
        // dispatch(setAuthType('BASIC_SMS'));
    } catch (error: any) {
        if (!error.response) {
            // dispatch(showModal(false))
        }
        if (error.response.status === 423) {
            // dispatch(addNotification(['Ваш номер телефона временно заблокирован для авторизации на сервисе, пожалуйста, попробуйте авторизоваться позже!'], 10))
            clearInterval(intervalId)
            // dispatch(showModal(false))
        } else if (error.response.status === 417) {
            // dispatch(showModal(false));
            // dispatch(setPhoneNumber(''))
            // dispatch(addNotification('Вы исчерпали лимит смс в сутки, пожалуйста, попробуйте завтра'))
        } if (error.response.status === 429) {
            // dispatch(addNotification('🐶🐱🐹🐭🐰🙈🦆🦀'))
        } else {
            // dispatch(authSignUp(phone))
        }
    }
}
