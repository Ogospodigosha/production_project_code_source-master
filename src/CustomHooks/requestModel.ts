import {AuthApi} from "../api/AuthApi";
import userStore from "../store/userStore";
import useUser from "../store/userStore";
import authModalStore from "../store/authModalStore";
import useError from "../store/errorStore";
import useAuthWindow from "../store/authModalStore";
import Cookies from "js-cookie";



export const useRequestModel = () =>{
    const setSmsLoader = userStore(store => store.setSmsLoader)
    const setPhoneNumber = useUser(state => state.setPhoneNumber)
    const setAuthType = authModalStore(store => store.setAuthType)
    const setError = useError(store => store.setError)
    const setViewModal = useAuthWindow(state => state.setViewModal)
    const signInMobileIdFromModel = async (phone: string, brithDate: string) =>{
        try {
            await AuthApi.mobileID({phone, birthday: brithDate}) // partner: 'mts'
            setSmsLoader(true)
            setPhoneNumber(phone)
            setAuthType('MTS_ID')
            document.getElementById('codeConfirm')?.focus()
        } catch (err: any) {
            if (err.response.status === 429) {
                setError('🐶🐱🐹🐭🐰🙈🦆🦀')
            } else if (err.response.status === 417) {
                setViewModal(false)
                setError('Вы исчерпали лимит смс в сутки, пожалуйста, попробуйте завтра')
            } else if (err.response.status === 400) {
                await mtsAuthSignInFromModel(phone)
            }
            setPhoneNumber('')
            setSmsLoader(false)
        }
    }
    const authSignInFromModel = async (phone: string, intervalId: any)=>{
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
                authSignUpFromModel(phone)
            }
        }
    }
    const authSignUpFromModel = async (phone: string) =>{
        try{
            await AuthApi.signUp({phone})
            setSmsLoader(true)
            setPhoneNumber(phone)
            setAuthType('BASIC_SMS')
            document.getElementById('codeConfirm')?.focus()
        } catch (err: any) {
            if (err.response.status === 429) {
                setError('🐶🐱🐹🐭🐰🙈🦆🦀')
            } else if (err.response.status === 417) {
                setViewModal(false)
                setError('Вы исчерпали лимит смс в сутки, пожалуйста, попробуйте завтра')
            }
            setPhoneNumber('')
            setSmsLoader(false)
        }
    }
    const mtsAuthSignInFromModel = async(phone: string) =>{
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
                mtsAuthSignUpFromModel(phone)
            }
        }
    }
    const mtsAuthSignUpFromModel = async(phone: string)=> {
        try {
            await AuthApi.sendMtsSignUp({phone})
            setSmsLoader(true)
            setPhoneNumber(phone)
            setAuthType('BASIC_SMS')
            document.getElementById('codeConfirm')?.focus()
        } catch (err: any) {
            if (err.response.status === 429) {
                setError('🐶🐱🐹🐭🐰🙈🦆🦀')
            } else if (err.response.status === 417) {
                setViewModal(false)
                setError('Вы исчерпали лимит смс в сутки, пожалуйста, попробуйте завтра')
            }
            setPhoneNumber('')
            setSmsLoader(false)
        }
    }
    const confirmCode = async (phone: string, code: number, intervalId: any, callback?: () => void) =>{
        try {
            const response = await AuthApi.confirmCode({code, phone}).then(res =>{
                localStorage.removeItem('phoneNumber');

                return res;
            })

            Cookies.set('Bearer', response.data.token, {expires : 21});
            // dispatch(addUser())
            // if (intervalId) {
            //     clearInterval(intervalId)
            // }
            //
            // await dispatch(AppFormActions.updateUserPhone({
            //     value: resetMask(phone),
            //     touched: true
            // }))
            //
            // await dispatch(sendAuthInfo(resetMask(phone), {...user, sms_code: resetMask(String(code))}, 'BASIC_SMS'))
            //
            // dispatch(setPhoneNumber(resetMask(phone)))
            // callback && callback()
        } catch (e) {

        }

    }
    const confirmMobileId = async (phone: string, code: string, intervalId: any, addUser: ()=>void, callback?: () => void ) => {
        // const user = getState().config.user;
        try {
            // setSpinner({loaderStatus: true, message: 'Проверяем введённый код...', type: 'future'})
            const response = await AuthApi.smsVerif({
                phone,
                code,
            }); //partner: 'mts'
            Cookies.set('Bearer', response.data.token, {expires : 21});

            addUser()
            if (intervalId) {
                clearInterval(intervalId)
            }
            // await dispatch(AppFormActions.updateUserPhone({
            //     value: resetMask(phone),
            //     touched: true
            // }));
            //
            // await dispatch(sendAuthInfo(resetMask(phone), {...user, sms_code: resetMask(String(code))}, 'MTS_ID'));
            //
            // dispatch(setPhoneNumber(resetMask(phone)))
            // callback && callback()

        } catch (err: any) {
            if (err.response.status === 429) {
                // dispatch(addNotification('🐶🐱🐹🐭🐰🙈🦆🦀'))
            }
            // dispatch(setCodeMessage('Неверный код подтверждения'))
        }
        finally {
            // dispatch(setSpinner({loaderStatus: false, message: null}))
        }

    }

    return {
        signInMobileIdFromModel,
        authSignInFromModel,
        authSignUpFromModel,
        mtsAuthSignInFromModel,
        mtsAuthSignUpFromModel,
        confirmCode,
        confirmMobileId
    }
}
