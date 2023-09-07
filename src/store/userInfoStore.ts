import create from 'zustand'
import {immer} from 'zustand/middleware/immer'
import {Nullable} from "../components/Subtitle/Subtitle";
import Cookies from "js-cookie";



export interface useUserInfoStateType {
    isAuth: boolean;
    isConsent: boolean | string | undefined;
    phoneNumber: Nullable<string>;
    code: Nullable<string>;
    loader: boolean
    codeMessage: Nullable<string>
    authFromAutoLoginToken: boolean,
    removePhoneModal: boolean,
    token: Nullable<string>;
    addUser: ()=>void
}


const useUserInfo = create(immer<useUserInfoStateType>((set) => ({
    isAuth: !!Cookies.get('Bearer'),
    isConsent: !!Cookies.get('Consent'),
    phoneNumber: null,
    authFromAutoLoginToken: false,
    loader: false,
    codeMessage: null,
    removePhoneModal: false,
    code: null,
    token: null,
    setPhoneNumber: (phoneNumber: string) => {
        set(state => {
            state.phoneNumber = phoneNumber
        })
    },
    setSmsLoader: (loader: boolean) => {
        set(state => {
            state.loader = loader
        })
    },
    addUser: () =>{
        set(state => {
            state.isAuth = true
            state.isConsent = !!Cookies.get('Consent')
        })
    }

})))
export default useUserInfo
