import React, {FC, useEffect, useState} from 'react';
import ThemeProvider from "../../theme/ThemeProvider";
import AuthWindow from "../AuthWindow/AuthWindow";
import {Theme} from "../../theme/ThemeContext";
import useAutoLogin from "../../store/AutoLoginStore";
import userStore from "../../store/userStore";
import useUserInfo from "../../store/userInfoStore";
import {useRequestModel} from "../../CustomHooks/requestModel";

type PropsType = {
    currentTheme: Theme
    authTypeProps?: 'MTS_ID' | 'BASIC_SMS'
}


const AuthWindowWrapper: FC<PropsType> = ({currentTheme, authTypeProps}) => {
    const setIsAutoLogin = useAutoLogin(store => store.setIsAutoLogin)
    const isAutologin = useAutoLogin(store => store.isAutologin)
    const code = userStore(store => store.code)
    const phoneNumber = userStore(store => store.phoneNumber)
    const isAuth = useUserInfo(store => store.isAuth)
    const {useAutoAuthLogin} = useRequestModel()
    const getTimer= (timer: number) =>{
        setUnmountTimer(timer)
    }
    if (window.location.search.includes('?token=')) {
        setIsAutoLogin(true)
    }

    const [ unMountTimer, setUnmountTimer]  = useState(0)
    const [isUnMount, setIsUnmount] = useState(false)
    useEffect(() => {
        useAutoAuthLogin(isAuth, phoneNumber)
    }, [code])
    //
    // let id: any;
    // useEffect(() => {
    //     if (unMountTimer === 0) return
    //     if (isUnMount) {
    //         id = setTimeout(() => {
    //             setUnmountTimer(unMountTimer - 1)
    //         }, 1000)
    //     }
    //     localStorage.setItem('modal.timer', unMountTimer.toString())
    //     return () => {
    //         clearTimeout(id)
    //     }
    // }, [isUnMount, unMountTimer])
    return (
        <ThemeProvider currentTheme={currentTheme}>
            <AuthWindow setIsUnmount={setIsUnmount} getTimer={getTimer} authTypeProps={authTypeProps} isAutologin={isAutologin}/>
        </ThemeProvider>
    );
};

export default AuthWindowWrapper;
