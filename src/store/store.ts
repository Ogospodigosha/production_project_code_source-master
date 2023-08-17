import create from 'zustand'
import { immer } from 'zustand/middleware/immer'


export interface useCounterStateType {
    counter: number
    token: string
    setToken: (token: string)=> void
    setCounter: (counter: number)=>void
}



const useCounter = create(immer<useCounterStateType>((set) => ({
     counter: 0,
    token: '',
    setCounter: (counter: number) => {
        set(state => {
            state.counter = counter
        })
    },
    setToken: (token: string) =>{
        set(state => {
            state.token = token
        })
    }

})))
export default useCounter
