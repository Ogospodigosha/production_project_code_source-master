import create from 'zustand'
import {immer} from 'zustand/middleware/immer'


export interface useAutoLoginStateType {
    autoLoginModal: {
        view: boolean,
        href: string | undefined,
    },
    setAutologinModal: (view: boolean, href: string)=>void
}


const useAutoLogin = create(immer<useAutoLoginStateType>((set) => ({
    autoLoginModal:{
        view: false,
        href: undefined
    },
    setAutologinModal: (view: boolean, href: string) => {
        set(state => {
            if (!window.location.origin.includes('odobreno')) state.autoLoginModal = {view, href}
        })
    },

})))
export default useAutoLogin
