import React, {FC, useState} from 'react';
import useCounter from "../store/store";

export interface CounterPropsType {
    color: string
}
const Counter :FC<CounterPropsType> = ({color}) => {
    const counterZustand = useCounter(state => state.counter)
    const setCounter = useCounter(state => state.setCounter)
    // const [counter, setCounter] = useState(0)
    const clickHandler = () =>{
        // setCounter(prev => prev+1)
        setCounter(counterZustand+1)
    }
    return (
        <div style={{color}}>
            <h1 onClick={clickHandler}>{counterZustand}</h1>
        </div>
    );
};

export default Counter;
