import create from 'zustand'
import { immer } from 'zustand/middleware/immer'
import {Nullable} from "../components/Subtitle/Subtitle";


export interface useUserStateType {
    error: number | null;
    setError: (error: number)=> void
}



const useUser = create(immer<useUserStateType>((set) => ({
    error: null,
    setError: (error: number) => {
        set(state => {
            state.error = error
        })
    },
})))
export default useUser
