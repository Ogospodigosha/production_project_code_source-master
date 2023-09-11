import create from 'zustand'
import {immer} from 'zustand/middleware/immer'
import {Nullable} from "../components/Subtitle/Subtitle";



export interface useUserStateType {
    phoneNumber: string | null;
    loader: boolean
    setPhoneNumber: (phoneNumber: string) => void
    setSmsLoader: (loader: boolean) => void
    date_birthday: string
    setDateBirthday: (date_birthday: string)=> void
    code: Nullable<string>;
    setCode: (code: string)=>void
}


const useUser = create(immer<useUserStateType>((set) => ({
    phoneNumber: null,
    loader: false,
    date_birthday: '',
    code: null,
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
    setDateBirthday: (date_birthday: string) =>{
        set(state => {
            state.date_birthday = date_birthday
        })
    },
    setCode: (code: string) =>{
        set(state => {
            state.code = code
        })
    },

})))
export default useUser
