import React, {FC, useEffect, useState} from 'react';
import {FormInput} from "../FormInput/OtherInputs";
import {onDateInput, onPhoneInput, resetMask, setInputStatus, setTextTimer} from "../../utils/utils";
import {CheckboxInput} from "../CheckboxInput/CheckboxInput";
import {useModal} from "../../CustomHooks/useModal";
import useUser from "../../store/userStore";
import userStore from "../../store/userStore";
import {Prompt} from "../Prompt/Prompt";

type PropsType = {
    authTypeProps?: 'MTS_ID' | 'BASIC_SMS'
}

const AuthWindowInner: FC<PropsType> = ({authTypeProps}) => {
    const [phoneNumber, setPhoneNumber] = useState<string | null>(localStorage.getItem('phoneNumber') || '');
    const phoneNumberFromState = useUser(state => state.phoneNumber)|| localStorage.getItem('phoneNumberFromState');
    const date_birthday = userStore(store => store.date_birthday)
    const setDateBirthday = userStore(store => store.setDateBirthday)
    const unmaskedPhoneNumber = resetMask(phoneNumber);
    const loader = userStore(store => store.loader)
    let birthDateStatus =  unmaskedPhoneNumber.length===11 && date_birthday.length===10 ? true: undefined
    let KEY_PHONE_NUMBER = localStorage.getItem('phoneNumberFromState') || ''
    const modal = useModal(authTypeProps)
    const labelTextAuth = !!authTypeProps
        ? 'Вам поступит смс в формате "1234" - Ваш одноразовый код, не сообщайте его никому\nВведите код подтверждения из смс'
        : 'Введите код подтверждения из СМС';
    const phoneChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPhoneNumber(e.target.value)
    };
    const birthDateHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (resetMask(e.target.value).length === 8){
            setDateBirthday(e.target.value)
        }
    };
    const codeChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (resetMask(e.target.value).length === 4 || resetMask(e.target.value).length === 0) {
            modal.checkCode(e)
        }
    };
    useEffect(() => {
        if (!!authTypeProps) {
            modal.checkInputPartner(unmaskedPhoneNumber, birthDateStatus)
        }
        else modal.checkInput(unmaskedPhoneNumber)
    },[birthDateStatus, unmaskedPhoneNumber, date_birthday]);
    useEffect(()=>{

        if ( modal.timer === -1 && Number(localStorage.getItem('modal.timer')) && Number(localStorage.getItem('phoneNumberFromState')) !== 1 ) {   //если обновили страницу и в ls лежит таймер - запускаем таймер

            const initValue = Number(localStorage.getItem('modal.timer') as string);

            modal.startTimer((Date.now() + initValue * 1000));
        }
    },[modal.timer])
    useEffect(()=>{
        if (!!authTypeProps && date_birthday) {
            localStorage.setItem('birthday', date_birthday)
            // localStorage.setItem('birthDateStatus', date_birthday.result.status)
        }
        if (modal.timer !== -1){
            localStorage.setItem('modal.timer', String(modal.timer))
        }
        if (phoneNumber)
            localStorage.setItem('phoneNumber', phoneNumber)
        if(phoneNumberFromState) {
            localStorage.setItem('phoneNumberFromState', phoneNumberFromState)
        }

    },[phoneNumberFromState, phoneNumber, modal.timer, date_birthday])
    return (
        <>
            <Prompt
                title={ 'Укажите ваш номер телефона для отправки заявки'}
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
                status={setInputStatus(modal.valid)}
                required={modal.valid.required}
                inputMode='tel'
                maskedHandler={onPhoneInput}
            />

            {!!authTypeProps && <FormInput
                defaultValue={localStorage.getItem('birthday')? localStorage.getItem('birthday'): date_birthday !== 'Invalid date' || date_birthday !== null
                    ? date_birthday
                    :  resetMask(date_birthday)}
                status={birthDateStatus}
                onBlur={birthDateHandler}
                onInput={birthDateHandler}
                readOnly={birthDateStatus}
                currentDomain={'sovbank'}
                errorMessage={date_birthday || ''}
                mask={'99-99-9999'}
                alwaysShowMask
                labelText={'Введите дату рождения'}
                containerStyle={{marginTop: 20}}
                placeholder={'например: 25-09-1972'}
                inputStyle={
                    birthDateStatus === undefined
                        ? {background: 'rgba(3, 49, 140, 0.12)', padding: 10}
                        : {background: 'rgba(3, 49, 140, 0.12)', padding: 10}
                }
                labelStyle={{textAlign: 'center'}}
                maskedHandler={onDateInput}
            />}


            {phoneNumberFromState=== null && phoneNumber!==null  ? !/^[^_]+$/.test(phoneNumber) && <CheckboxInput
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


            {loader ||  KEY_PHONE_NUMBER.length === 11  || (!!authTypeProps ? modal.defaultPhone.length === 11 && birthDateStatus ||phoneNumberFromState && phoneNumberFromState.length===11 && birthDateStatus : modal.defaultPhone.length === 11) ? (

                <>
                    { modal.defaultPhone.length === 11 || phoneNumberFromState && phoneNumberFromState.length===11 ? (

                        <p className={'document-text link-color link-action font-main'}
                           onClick={()=>modal.changePhone()}>
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
                        labelText={labelTextAuth}
                        inputType={'one-time-code'}
                        autoFocus
                        autoComplete={'one-time-code'}
                        id={"single-factor-code-text-field"}
                        onInput={codeChangeHandler}
                    />

                    {modal.timer > 0 && modal.timer < 55 ? (
                        <p className={'document-text link-color font-main'}>
                            Не пришел код? Запросите повторно через <span
                            style={{whiteSpace: 'nowrap'}}>{setTextTimer(Number(localStorage.getItem('modal.timer')))}</span>
                        </p>) : Number(localStorage.getItem('modal.timer')) === 0 && modal.countClickResendSms < 2 ? (
                        <p className={'document-text link-color link-action font-main'}
                           onClick={modal.updateCode} style={{cursor: 'pointer'}}>
                            Отправить код повторно
                        </p>
                    ) : ''}
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
        </>
    );
};

export default AuthWindowInner;
