import create from 'zustand'
import {immer} from 'zustand/middleware/immer'


export interface useAuthWindowStateType {
    type: string,
    view: boolean,
    href: string | undefined,
    withSms: boolean | undefined,
    name: string | undefined,
    surname: string | undefined,
    phone: string | undefined,
    callBack: (() => any) | undefined,
    actions: {
        sendCreditParameters: boolean,
        showHypothecModal: boolean
    },
    setViewModal: (view: boolean)=>void
    setAuthType: (type: string)=> void
}


const useAuthWindow = create(immer<useAuthWindowStateType>((set) => ({
    type: 'BASIC_SMS',
    view: false,
    href: undefined,
    withSms: false,
    name: undefined,
    surname: undefined,
    phone: undefined,
    callBack: undefined,
    actions: {
        sendCreditParameters: false,
        showHypothecModal: false
    },
    setViewModal: (view: boolean) => {
        set(state => {
            state.view = view
        })
    },
    setAuthType: (type: string) => {
        set(state => {
            state.type = type
        })
    },
})))
export default useAuthWindow
