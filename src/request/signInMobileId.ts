import {AuthApi} from "../api/AuthApi";


export const signInMobileId = async (phone: string, brithDate: string, setSmsLoader: (loader: boolean) => void, loader: boolean, setPhoneNumber: (phone: string) => void, setAuthType: (authType: string) => void, setError:(error: string)=>void, setViewModal: (view: boolean)=>void) => {
    try {
        await AuthApi.mobileID({phone, birthday: brithDate}) // partner: 'mts'
        setSmsLoader(true)
        setPhoneNumber(phone);
        setAuthType('MTS_ID')
        document.getElementById('codeConfirm')?.focus()
    } catch (err: any) {
        if (err.response.status === 429) {
            setError('🐶🐱🐹🐭🐰🙈🦆🦀')
        } else if (err.response.status === 417) {
            setViewModal(false)
            setError('Вы исчерпали лимит смс в сутки, пожалуйста, попробуйте завтра')
        } else if (err.response.status === 400) {
            // dispatch(mtsAuthSignIn(phone));
        }
        // dispatch(setPhoneNumber(''));
       setSmsLoader(false)
    }

}
