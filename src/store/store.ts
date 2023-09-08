import create from 'zustand'
import { immer } from 'zustand/middleware/immer'


export interface useCounterStateType {
    token: string
    setToken: (token: string)=> void
}



const useToken = create(immer<useCounterStateType>((set) => ({
    token: '',
    setToken: (token: string) =>{
        set(state => {
            state.token = token
        })
    }

})))
export default useToken
