import React, {FC, useEffect, useState} from 'react';
import ThemeProvider from "../theme/ThemeProvider";
import AuthWindow from "../AuthWindow/AuthWindow";
import {Theme} from "../theme/ThemeContext";

type PropsType = {
    currentTheme: Theme
}


const TestComponent: FC<PropsType> = ({currentTheme}) => {
    const getTimer= (timer: number) =>{
        setUnmountTimer(timer)
    }

    const [ unMountTimer, setUnmountTimer]  = useState(0)
    const [isUnMount, setIsUnmount] = useState(false)

    let id: any;
    useEffect(() => {
        if (unMountTimer === 0) return
        if (isUnMount) {
            id = setTimeout(() => {
                setUnmountTimer(unMountTimer - 1)
            }, 1000)
        }
        localStorage.setItem('modal.timer', unMountTimer.toString())
        return () => {
            clearTimeout(id)
        }
    }, [isUnMount, unMountTimer])
    return (
        <ThemeProvider currentTheme={currentTheme}>
            <AuthWindow setIsUnmount={setIsUnmount} getTimer={getTimer}/>
        </ThemeProvider>
    );
};

export default TestComponent;
