import create from 'zustand'
import {immer} from 'zustand/middleware/immer'



export interface useUserStateType {
    phoneNumber: string | null;
    loader: boolean
    setPhoneNumber: (phoneNumber: string) => void
    setSmsLoader: (loader: boolean) => void
    date_birthday: string
    setDateBirthday: (date_birthday: string)=> void
}


const useUser = create(immer<useUserStateType>((set) => ({
    phoneNumber: null,
    loader: false,
    date_birthday: '',
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
    }

})))
export default useUser
