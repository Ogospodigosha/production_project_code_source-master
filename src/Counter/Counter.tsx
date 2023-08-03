import React, {FC, useState} from 'react';

export interface CounterPropsType {
    color: string
}
const Counter :FC<CounterPropsType> = ({color}) => {
    const [counter, setCounter] = useState(0)
    const clickHandler = () =>{
        setCounter(prev => prev+1)
    }
    return (
        <div style={{color}}>
            <h1 onClick={clickHandler}>{counter}</h1>
        </div>
    );
};

export default Counter;
