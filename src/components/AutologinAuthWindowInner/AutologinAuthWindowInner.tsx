import React from 'react';
import {FormInput} from "../FormInput/OtherInputs";
import {Prompt} from "../Prompt/Prompt";
import s from './AutologinAuthWindowInner.module.scss'
import {CheckboxInput} from "../CheckboxInput/CheckboxInput";
import userStore from "../../store/userStore";

const AutologinAuthWindowInner = () => {
    // const {phoneNumber, code} = useAppSelector(store => store.session)
    const phoneNumber = userStore(store => store.phoneNumber)
    const code = userStore(store => store.code)
    const clickHandler = () => {
        // dispatch(setAutologinModal({view: false, href: `/user/credit/${getPage(location.origin)}/${current_step}`}))
        // modal.checkAutologinCode(code)
    }
    return (
        <div className={s.authWindow}>
            <Prompt title={'Ваш номер телефона'} titleStyle={{textAlign: 'center'}}/>
            <FormInput
                currentDomain={'sovbank'}
                inputStyle={{background: 'rgba(3, 49, 140, 0.12)', padding: 10, }}
                mask={'+7-(999)-999-99-99'}
                alwaysShowMask={true}
                labelStyle={{textAlign: 'center'}}
                defaultValue={phoneNumber}
                status={true}
                animationEffect={'fade-up'}
                readOnly={true}
                inputMode='tel'/>
            <Prompt title={'Ваш код авторизации'} titleStyle={{textAlign: 'center'}}/>
            <FormInput
                currentDomain={'sovbank'}
                inputStyle={{background: 'rgba(3, 49, 140, 0.12)', padding: 10, textAlign: 'center', letterSpacing: 5}}
                maxLength={4}
                animationEffect={'zoom-up'}
                defaultValue={code}
                readOnly={true}
            />

            <CheckboxInput
                label={'Согласен(-на) с правилами предоставления информации'}
                required={true}
                state={true}
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
            <button type='button' onClick={clickHandler} className={s.button__auth}>
                Далее
            </button>
        </div>
    );
};

export default AutologinAuthWindowInner;
