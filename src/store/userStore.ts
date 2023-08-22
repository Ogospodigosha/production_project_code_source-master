import create from 'zustand'
import { immer } from 'zustand/middleware/immer'
import {Nullable} from "../components/Subtitle/Subtitle";


export interface useUserStateType {
    phoneNumber: Nullable<string>;
    setPhoneNumber: (phoneNumber: string)=> void
}



const useUser = create(immer<useUserStateType>((set) => ({
   phoneNumber: null,
    setPhoneNumber: (phoneNumber: string) => {
        set(state => {
            state.phoneNumber = phoneNumber
        })
    },

})))
export default useUser
