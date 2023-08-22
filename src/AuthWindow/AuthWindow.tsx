import React, {ChangeEvent, useEffect, useState} from 'react';
import {AuthApi} from "../api/AuthApi";
import useCounter from "../store/store";
import s from '../Notification/Notification.module.scss'
import Wrapper from "../Layouts/Wrapper";
import {Prompt} from "../components/Prompt/Prompt";
import {FormInput} from "../components/FormInput/OtherInputs";
import useConfig from "../store/configStore";
import {onPhoneInput, resetMask} from "../utils/utils";
import {useModal} from "../CustomHooks/useModal";
import useUser from "../store/userStore";
import {CheckboxInput} from "../components/CheckboxInput/CheckboxInput";

const AuthWindow = () => {
    const isDesktop = useConfig(state => state.isDesktop)
    const [phoneNumber, setPhoneNumber] = useState<string | null>(localStorage.getItem('phoneNumber') || '');
    const phoneNumberFromState = useUser(state => state.phoneNumber)|| localStorage.getItem('phoneNumberFromState');
    console.log(phoneNumberFromState)
    const unmaskedPhoneNumber = resetMask(phoneNumber);
    console.log(phoneNumber)
    const modal = useModal()
    const phoneChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPhoneNumber(e.target.value)
    };
    useEffect(() => {
        // if (!!authTypeEnv) {
        //     modal.checkInputPartner(unmaskedPhoneNumber, birthDateStatus)
        // }
        // else
            modal.checkInput(unmaskedPhoneNumber)
    },[unmaskedPhoneNumber]);
    useEffect(()=>{
        // if (!!authTypeEnv && birthday) {
        //     localStorage.setItem('birthday', birthday)
        //     localStorage.setItem('birthDateStatus', date_birthday.result.status)
        // }
        if (phoneNumber)
            localStorage.setItem('phoneNumber', phoneNumber)
        if(phoneNumberFromState) {
            localStorage.setItem('phoneNumberFromState', phoneNumberFromState)
        }

    },[phoneNumberFromState, phoneNumber])
    // useEffect(() =>{
    //     if (phoneNumber === '+7-(911)-777-07-26') {
    //         AuthApi.signIn({phone:'79117770726'})
    //     }
    // },[phoneNumber])
    // const [phone, setPhone] = useState('')
    // const [code, setCode] = useState('')
    // const token = useCounter(state => state.counter)
    // const isDesktop = useConfig(state => state.isDesktop)
    // console.log(isDesktop)
    // const setToken = useCounter(state => state.setToken)
    // const changeHandlerPhone = (e: ChangeEvent<HTMLInputElement>) => {
    //     setPhone(e.currentTarget.value)
    // }
    // const changeHandlerCode = (e: ChangeEvent<HTMLInputElement>) => {
    //     setCode(e.currentTarget.value)
    // }
    // const clickHandlerPhone = () => {
    //     AuthApi.signIn({phone})
    // }
    // const clickHandlerGetToken = () => {
    //     AuthApi.confirmCode({code: Number(code), phone: phone}).then(res => {
    //         console.log(res.data.token)
    //         setToken(res.data.token)
    //     })
    // }
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
                <div onClick={() => {
                }} className={s['notification-close']}>
                    <div className={s['notification-close-first-line']}/>
                    <div className={s['notification-close-second-line']}/>
                </div>
                <div style={{maxWidth: isDesktop ? '100%' : '90%'}}>
                    <Prompt
                        title={'Укажите ваш номер телефона для отправки заявки'}
                        titleStyle={{textAlign: 'center'}}
                    />
                    <FormInput
                        currentDomain={'sovbank'}
                        inputStyle={{background: 'rgba(3, 49, 140, 0.12)', padding: 10}}
                        mask={'+7-(999)-999-99-99'}
                        alwaysShowMask={true}
                        containerStyle={{marginTop: 20}}
                        labelStyle={{textAlign: 'center'}}
                        defaultValue={ localStorage.getItem('phoneNumber')? localStorage.getItem('phoneNumber'): ''}
                        animationEffect={'fade-up'}
                        onChange={phoneChangeHandler}
                        readOnly={false}
                        errorMessage={modal.valid.message}
                        status={true}
                        required={modal.valid.required}
                        inputMode='tel'
                        maskedHandler={onPhoneInput}
                    />

                    {phoneNumberFromState=== null && phoneNumber!==null ? !/^[^_]+$/.test(phoneNumber) && <CheckboxInput
                        required={true}
                        state={true}
                        path={'1233'}
                        secondPath={'3242342'}
                        target={'_blank'}
                        rel={'noopener noreferer'}
                        setState={() => {
                        }}
                        id={'agreement_document'}
                        containerId={'container_agreement_document'}
                        containerStyle={{
                            marginTop: 20,
                            width: '100%'
                        }}
                    /> : ''}
                </div>
            </Wrapper>
        </div>
    );
};

export default AuthWindow;
