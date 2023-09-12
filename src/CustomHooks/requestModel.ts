import {AuthApi} from "../api/AuthApi";
import userStore from "../store/userStore";
import useUser from "../store/userStore";
import authModalStore from "../store/authModalStore";
import useError from "../store/errorStore";
import useAuthWindow from "../store/authModalStore";
import Cookies from "js-cookie";
import userInfoStore from "../store/userInfoStore";
import {getPage, resetMask} from "../utils/utils";
import {Nullable} from "../components/Subtitle/Subtitle";
import configUserStore from "../store/configUserStore";
import useToken from "../store/store";
import AutoLoginStore from "../store/AutoLoginStore";

export interface UserConfigType {
    user_agent: string,
    type: 'MTS_ID' | 'BASIC_SMS',
    screen_width: Nullable<number>,
    screen_height: Nullable<number>,
    opener: Nullable<string>,
    language: Nullable<string>,
    vendor: Nullable<string>,
    vendor_version: Nullable<string>,
    do_not_track: any,
    cookie_enabled: Nullable<boolean>
    address: any,
    sms_code: Nullable<string>
}

export const useRequestModel = () =>{
    const setSmsLoader = userStore(store => store.setSmsLoader)
    const setPhoneNumber = useUser(state => state.setPhoneNumber)
    const setAuthType = authModalStore(store => store.setAuthType)
    const setError = useError(store => store.setError)
    const setViewModal = useAuthWindow(state => state.setViewModal)
    const addUser = userInfoStore(store => store.addUser)
    const user = configUserStore(store => store.user)
    const setToken = useToken(store => store.setToken)
    const setCode = useUser(store => store.setCode)
    const setAutologinModal = AutoLoginStore(store => store.setAutologinModal)

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
            addUser()
            if (intervalId) {
                clearInterval(intervalId)
            }
            await sendAuthInfo(resetMask(phone), {...user, sms_code: resetMask(String(code))}, 'BASIC_SMS')
            setPhoneNumber(resetMask(phone))
        } catch (err: any) {
            if (err.response.status === 429) {
               setError('🐶🐱🐹🐭🐰🙈🦆🦀')
            }
        }
    }

    const sendAuthInfo = async(value: Nullable<string>, userConfigs: UserConfigType, authType: 'MTS_ID' | 'BASIC_SMS',)=> {
        try {
            await AuthApi.sendAuthInfo(value, {...userConfigs, type: authType})
        } catch (err: any) {
            if (err.response.status >= 400 && value && err.response.status !== 429) {
                setTimeout(() => {
                    sendAuthInfo(value, userConfigs, authType)
                }, 20000)
            }
        }
    }


    const confirmMobileId = async (phone: string, code: string, intervalId: any, addUser: ()=>void, callback?: () => void ) => {
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
            await sendAuthInfo(resetMask(phone), {...user, sms_code: resetMask(String(code))}, 'MTS_ID')
            setPhoneNumber(resetMask(phone))
        } catch (err: any) {
            if (err.response.status === 429) {
                setError('🐶🐱🐹🐭🐰🙈🦆🦀')
            }
        }
        finally {
            // dispatch(setSpinner({loaderStatus: false, message: null}))
        }

    }

     const useAutoAuthLogin = (isAuth: boolean, phoneNumber: Nullable<string>) => {
        if (!(window.location.search.includes('?token=') || window.location.search.includes('&token='))) return
        if (isAuth) return
        if (phoneNumber) return ;

        const location = window.location.search
        let token
        if (location.includes('?token=')) {
            const index = location.lastIndexOf('?token=')
            token = location.substring(index + 1, index + 22)
        } else {
            const index = location.lastIndexOf('&token=')
            token = location.substring(index + 1, index + 22)
        }
        token = token.replace('token=', '')
        const redirect = location.includes('redirect')
        setToken(token)
         getAutologinData(token, redirect)
    }

    const getAutologinData = async (token: string, redirect: boolean) => {
        try {
            const response = await AuthApi.getAutologinData(token)
            setPhoneNumber(response.data.phone)
            setCode(response.data.code)
            if (!redirect || window.location.origin.includes('odobreno')) return;
            setAutologinModal({view: true, href: `/user/credit/${getPage(location.origin)}/credit_parameters_info`})
        } catch (err: any) {
            if (err.response.status === 404) {
                setError('Срок действия персональной ссылки истёк. Введите номер телефона и получите новый код для входа.')
                if (!redirect || window.location.origin.includes('odobreno')) return
                // return dispatch(showModal(true, {href: `/user/credit/${getPage(location.origin)}/credit_parameters_info`}))
            } else console.log(err)
        }
    }
     const confirmAutologinCode = async(phone: Nullable<string>, code: number, token: Nullable<string>, intervalId: any, callback?: () => void) => {
        const phoneNumber = phone === null ? undefined : phone
        try {
            const response = await AuthApi.confirmAutologinCode({code, phone: phoneNumber, token})
            Cookies.set('Bearer', response.data.token, {expires : 21})
            addUser()
            if (intervalId) {
                clearInterval(intervalId)
            }
            await sendAuthInfo(resetMask(phone), {...user, sms_code: resetMask(String(code))}, 'BASIC_SMS')
            setPhoneNumber(resetMask(phone))
            callback && callback()
        } catch (err: any) {
            setPhoneNumber('')
            setError('Срок действия персональной ссылки истёк. Введите номер телефона и получите новый код для входа.')
            setAutologinModal({view: false, href: ''})
        }
    }
    return {
        signInMobileIdFromModel,
        authSignInFromModel,
        authSignUpFromModel,
        mtsAuthSignInFromModel,
        mtsAuthSignUpFromModel,
        confirmCode,
        confirmMobileId,
        sendAuthInfo,
        useAutoAuthLogin,
        confirmAutologinCode
    }
}
