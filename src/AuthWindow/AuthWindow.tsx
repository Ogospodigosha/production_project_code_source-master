import React, {ChangeEvent, useState} from 'react';
import {AuthApi} from "../api/AuthApi";
import useCounter from "../store/store";

const AuthWindow = () => {
    const [phone, setPhone] = useState('')
    const [code, setCode] = useState('')
    const token = useCounter(state => state.counter)
    const setToken = useCounter(state => state.setToken)
    const changeHandlerPhone =(e: ChangeEvent<HTMLInputElement>) =>{
        setPhone(e.currentTarget.value)
    }
    const changeHandlerCode = (e: ChangeEvent<HTMLInputElement>) =>{
        setCode(e.currentTarget.value)
    }
    const clickHandlerPhone =() =>{
        AuthApi.signIn({phone})
    }
    const clickHandlerGetToken = () =>{
         AuthApi.confirmCode({code: Number(code), phone: phone}).then(res =>{
             console.log(res.data.token)
             setToken(res.data.token)
       })
    }
    return (
        <>
        <div>
            <input value={phone} onChange={changeHandlerPhone}/>
            <button onClick={clickHandlerPhone}>Отправить номер телефона для получения кода</button>
        </div>
            <div>
                <input value={phone} onChange={changeHandlerPhone}/>
                <input value={code} onChange={changeHandlerCode}/>
                <button onClick={clickHandlerGetToken}>Отправить номер и код телефона для получения токена</button>
            </div>
        </>
    );
};

export default AuthWindow;
