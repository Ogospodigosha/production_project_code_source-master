import {AuthApi} from "../api/AuthApi";

export const authSignUp =  async(phone: string, setSmsLoader:(loader: boolean)=>void, setAuthType:(type: string)=>void, setViewModal: (view: boolean)=>void, setError: (error: string)=>void, setPhoneNumber:(phone:string)=>void) => {
    debugger
    try {
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
