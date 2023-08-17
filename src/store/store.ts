import create from 'zustand'
import { immer } from 'zustand/middleware/immer'


export interface useCounterStateType {
    counter: number
    setCounter: (counter: number)=>void
}



const useCounter = create(immer<useCounterStateType>((set) => ({
     counter: 0,
    setCounter: (counter: number) => {
        set(state => {
            state.counter = counter
        })
    },

})))
export default useCounter
