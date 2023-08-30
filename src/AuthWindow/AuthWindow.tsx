import React, {FC, useEffect, useState} from 'react';
import s from '../Notification/Notification.module.scss'
import './AuthWindow.scss'
import '../styles/index.scss'
import Wrapper from "../Layouts/Wrapper";
import {Prompt} from "../components/Prompt/Prompt";
import {FormInput} from "../components/FormInput/OtherInputs";
import useConfig from "../store/configStore";
import {onPhoneInput, resetMask} from "../utils/utils";
import {useModal} from "../CustomHooks/useModal";
import useUser from "../store/userStore";
import {CheckboxInput} from "../components/CheckboxInput/CheckboxInput";
import userStore from "../store/userStore";
import useAuthWindow from "../store/authModalStore";





const AuthWindow: FC = () => {
    const isDesktop = useConfig(state => state.isDesktop)
    const setViewModal = useAuthWindow(state => state.setViewModal)
    const view = useAuthWindow(state => state.view)
    const [phoneNumber, setPhoneNumber] = useState<string | null>(localStorage.getItem('phoneNumber') || '');
    const phoneNumberFromState = useUser(state => state.phoneNumber)|| localStorage.getItem('phoneNumberFromState');
    const loader = userStore(store => store.loader)

    const labelTextAuth = 'Введите код подтверждения из СМС';
    console.log(phoneNumberFromState)
    const unmaskedPhoneNumber = resetMask(phoneNumber);
    console.log(phoneNumber)
    const modal = useModal()
    console.log(view)
    const phoneChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPhoneNumber(e.target.value)
    };
    const codeChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (resetMask(e.target.value).length === 4 || resetMask(e.target.value).length === 0) {
            modal.checkCode(e)
        }
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
        <>
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
                <div onClick={() => setViewModal(false)} className={s['notification-close']}>
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


                    {loader || (modal.defaultPhone.length === 11) ? (

                        <>
                            { modal.defaultPhone.length === 11 ||phoneNumberFromState && phoneNumberFromState.length===11 ? (

                                <p className={'document-text link-color link-action font-main'}  //modal.changePhone
                                   onClick={()=>{}}>
                                    Изменить номер телефона
                                </p>

                            ) : ''}

                            <FormInput
                                currentDomain={'sovbank'}
                                containerStyle={{marginTop: 20}}
                                inputStyle={{textAlign: 'center', padding: 10, letterSpacing: 5}}
                                placeholder={'____'}
                                labelStyle={{textAlign: 'center'}}
                                maxLength={4}
                                animationEffect={'zoom-up'}
                                labelText={labelTextAuth} //labelTextAuth
                                inputType={'one-time-code'}
                                autoFocus
                                autoComplete={'one-time-code'}
                                id={"single-factor-code-text-field"}
                                onInput={codeChangeHandler}         //codeChangeHandler
                            />

                            {/*{codeMessage ? (*/}
                            {/*    <p className={'span-error font-main'}>*/}
                            {/*        Вы ввели неправильный код. {modal.showCodeMessage && modal.timer === 0 ? <span*/}
                            {/*        onClick={modal.updateCode}*/}
                            {/*        className={'link-action'}>Нажмите сюда, чтобы отправить код повторно.</span> : ''}*/}
                            {/*    </p>*/}
                            {/*) : !codeMessage && modal.timer > 0 && modal.timer < 55 ? (*/}
                            {/*    <p className={'document-text link-color font-main'}>*/}
                            {/*        Не пришел код? Запросите повторно через <span*/}
                            {/*        style={{whiteSpace: 'nowrap'}}>{setTextTimer(modal.timer)}</span>*/}
                            {/*    </p>*/}
                            {/*) : !codeMessage && modal.timer === 0 && modal.countClickResendSms < 2 ? (*/}
                            {/*    <p className={'document-text link-color link-action font-main'}*/}
                            {/*       onClick={modal.updateCode} style={{cursor: 'pointer'}}>*/}
                            {/*        Отправить код повторно*/}
                            {/*    </p>*/}
                            {/*) : ''}*/}

                            <CheckboxInput
                                required={true}
                                state={true}
                                path={'123'}
                                secondPath={'123'}
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
                            />

                        </>

                    ) : ''}

                </div>
            </Wrapper>
        </div>
        </>
    );
};

export default AuthWindow;
