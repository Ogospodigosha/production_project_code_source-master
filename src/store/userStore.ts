import create from 'zustand'
import { immer } from 'zustand/middleware/immer'
import {Nullable} from "../components/Subtitle/Subtitle";


export interface useUserStateType {
    phoneNumber: string | null;
    loader: boolean
    setPhoneNumber: (phoneNumber: string)=> void
    setSmsLoader: (loader: boolean)=> void
}



const useUser = create(immer<useUserStateType>((set) => ({
   phoneNumber: null,
    loader: false,
    setPhoneNumber: (phoneNumber: string) => {
        set(state => {
            state.phoneNumber = phoneNumber
        })
    },
    setSmsLoader: (loader: boolean)=>{
       set(state => {
           state.loader = loader
       })
    }

})))
export default useUser
