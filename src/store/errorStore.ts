import create from 'zustand'
import { immer } from 'zustand/middleware/immer'



export interface useErrorStateType {
    error: string | null;
    setError: (error: string)=> void
}



const useError = create(immer<useErrorStateType>((set) => ({
    error: null,
    setError: (error: string) => {
        set(state => {
            state.error = error
        })
    },
})))
export default useError
