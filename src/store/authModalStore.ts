import create from 'zustand'
import {immer} from 'zustand/middleware/immer'


export interface useAuthWindowStateType {

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

}


const useAuthWindow = create(immer<useAuthWindowStateType>((set) => ({
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

})))
export default useAuthWindow
