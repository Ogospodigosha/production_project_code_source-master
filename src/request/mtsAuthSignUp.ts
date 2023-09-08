import {AuthApi} from "../api/AuthApi";

export const mtsAuthSignUp = async (phone: string, setSmsLoader: (loader: boolean) => void, setAuthType: (authType: string) => void, setPhoneNumber: (phone: string) => void, setError:(error: string)=>void, setViewModal: (view: boolean)=>void) => {
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
