import React, {FC, useEffect, useState} from 'react';
import './AuthWindow.scss'
import '../../styles/index.scss'
import Wrapper from "../Layouts/Wrapper";
import {Prompt} from "../Prompt/Prompt";
import {FormInput} from "../FormInput/OtherInputs";
import useConfig from "../../store/configStore";
import {onDateInput, onPhoneInput, resetMask, setInputStatus, setTextTimer} from "../../utils/utils";
import {useModal} from "../../CustomHooks/useModal";
import useUser from "../../store/userStore";
import {CheckboxInput} from "../CheckboxInput/CheckboxInput";
import userStore from "../../store/userStore";
import useAuthWindow from "../../store/authModalStore";
import AuthWindowInner from "../AuthWindowInner/AuthWindowInner";
import AutologinAuthWindowInner from "../AutologinAuthWindowInner/AutologinAuthWindowInner";


type PropsType = {
    setIsUnmount: (isUnmount: boolean) => void
    getTimer: (timer: number) => void
    authTypeProps?: 'MTS_ID' | 'BASIC_SMS'
    isAutologin: boolean
}


const AuthWindow: FC<PropsType> = ({setIsUnmount, getTimer, authTypeProps, isAutologin}) => {
    console.log(isAutologin)
    const isDesktop = useConfig(state => state.isDesktop)
    const setViewModal = useAuthWindow(state => state.setViewModal)
    const view = useAuthWindow(state => state.view)
    const [phoneNumber, setPhoneNumber] = useState<string | null>(localStorage.getItem('phoneNumber') || '');
    const phoneNumberFromState = useUser(state => state.phoneNumber) || localStorage.getItem('phoneNumberFromState');
    const setPhoneNumberFromState = useUser(store => store.setPhoneNumber)
    const loader = userStore(store => store.loader)
    console.log(authTypeProps)
    const birthDateHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (resetMask(e.target.value).length === 8) {
            setDateBirthday(e.target.value)
        }
    };
    const date_birthday = userStore(store => store.date_birthday)

    const setDateBirthday = userStore(store => store.setDateBirthday)

    console.log(' phoneNumberFromState?.length===11', phoneNumberFromState?.length)
    console.log('date_birthday.length===10', date_birthday.length)
    let KEY_PHONE_NUMBER = localStorage.getItem('phoneNumberFromState') || ''
    const labelTextAuth = !!authTypeProps
        ? 'Вам поступит смс в формате "1234" - Ваш одноразовый код, не сообщайте его никому\nВведите код подтверждения из смс'
        : 'Введите код подтверждения из СМС';
    const unmaskedPhoneNumber = resetMask(phoneNumber);
    let birthDateStatus = unmaskedPhoneNumber.length === 11 && date_birthday.length === 10 ? true : undefined
    console.log(birthDateStatus)
    const modal = useModal(authTypeProps)
    console.log('unmaskedPhoneNumber.length===11', unmaskedPhoneNumber.length === 11)
    console.log('date_birthday.length', date_birthday.length)
    const phoneChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPhoneNumber(e.target.value)
    };
    const codeChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (resetMask(e.target.value).length === 4 || resetMask(e.target.value).length === 0) {
            modal.checkCode(e)
        }
    };

    // useEffect(() => {
    //     if (!!authTypeProps) {
    //         modal.checkInputPartner(unmaskedPhoneNumber, birthDateStatus)
    //     }
    //     else modal.checkInput(unmaskedPhoneNumber)
    // },[birthDateStatus, unmaskedPhoneNumber, date_birthday]);
    //
    // useEffect(()=>{
    //     if (!!authTypeProps && date_birthday) {
    //         localStorage.setItem('birthday', date_birthday)
    //         // localStorage.setItem('birthDateStatus', date_birthday.result.status)
    //     }
    //     if (modal.timer !== -1){
    //         localStorage.setItem('modal.timer', String(modal.timer))
    //     }
    //     if (phoneNumber)
    //         localStorage.setItem('phoneNumber', phoneNumber)
    //     if(phoneNumberFromState) {
    //         localStorage.setItem('phoneNumberFromState', phoneNumberFromState)
    //     }
    //
    // },[phoneNumberFromState, phoneNumber, modal.timer, date_birthday])
    //
    //
    // useEffect(()=>{
    //
    //     if ( modal.timer === -1 && Number(localStorage.getItem('modal.timer')) && Number(localStorage.getItem('phoneNumberFromState')) !== 1 ) {   //если обновили страницу и в ls лежит таймер - запускаем таймер
    //        debugger
    //         const initValue = Number(localStorage.getItem('modal.timer') as string);
    //
    //         modal.startTimer((Date.now() + initValue * 1000));
    //     }
    // },[modal.timer])

    return (
        <>
            <div className={'modal-container'} style={{
                perspective: 2000,
                display: location.pathname.includes('/pdf_/agreement') ? 'none' : 'flex'
            }}>
                <Wrapper
                    style={{
                        maxWidth: 400, margin: 20, padding: 30, overflow: 'hidden', transition: 'all .5s',
                        boxShadow: '0px 0px 100px rgba(0,0,0,.4)'
                    }}
                >
                    <div onClick={() => setViewModal(false)} className={'notification-close'}>
                        <div className={'notification-close-first-line'}/>
                        <div className={'notification-close-second-line'}/>
                    </div>
                    <div style={{maxWidth: isDesktop ? '100%' : '90%'}}>

                        {isAutologin ? <AutologinAuthWindowInner/> : <AuthWindowInner authTypeProps={authTypeProps}/>}
                    </div>
                </Wrapper>
            </div>
        </>
    );
};

export default AuthWindow;
