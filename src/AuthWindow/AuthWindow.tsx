import React, {ChangeEvent, useState} from 'react';
import {AuthApi} from "../api/AuthApi";
import useCounter from "../store/store";
import s from '../Notification/Notification.module.scss'
import Wrapper from "../Layouts/Wrapper";
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
        // <>
        // <div>
        //     <input value={phone} onChange={changeHandlerPhone}/>
        //     <button onClick={clickHandlerPhone}>Отправить номер телефона для получения кода</button>
        // </div>
        //     <div>
        //         <input value={phone} onChange={changeHandlerPhone}/>
        //         <input value={code} onChange={changeHandlerCode}/>
        //         <button onClick={clickHandlerGetToken}>Отправить номер и код телефона для получения токена</button>
        //     </div>
        // </>
        <div className={s['modal-container']} style={{
            perspective: 2000,
            display: location.pathname.includes('/pdf_/agreement') ? 'none' : 'flex'
        }}>
            <Wrapper
                style={{
                    maxWidth: 400, margin: 20, padding: 30, overflow: 'hidden', transition: 'all .5s',
                    boxShadow: '0px 0px 100px rgba(0,0,0,.4)'
                }}
            >
                <div onClick={() =>{}} className={s['notification-close']}>
                    <div className={s['notification-close-first-line']}/>
                    <div className={s['notification-close-second-line']}/>
                </div>
            </Wrapper>
        </div>
    );
};

export default AuthWindow;
