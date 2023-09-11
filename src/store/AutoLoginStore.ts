import create from 'zustand'
import {immer} from 'zustand/middleware/immer'


export interface useAutoLoginStateType {
    isAutologin: boolean
    setIsAutoLogin: (isAutologin: boolean)=> void
    autoLoginModal: {
        view: boolean,
        href: string | undefined,
    },
    setAutologinModal: (autoLoginModal: { view: boolean, href: string | undefined})=>void
}


const useAutoLogin = create(immer<useAutoLoginStateType>((set) => ({
    isAutologin: false,
    autoLoginModal:{
        view: false,
        href: undefined
    },
    setAutologinModal: (autoLoginModal) => {
        set(state => {
            if (!window.location.origin.includes('odobreno')){
               state.autoLoginModal = autoLoginModal
            }
        })
    },
    setIsAutoLogin: (isAutologin: boolean) => {
        set(state => {
            state.isAutologin = isAutologin
        })
    },

})))
export default useAutoLogin
