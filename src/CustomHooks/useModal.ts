import {useEffect, useState} from "react";
import useUser from "../store/userStore";
import {checkPhone, resetMask} from "../utils/utils";
import {authSignIn} from "../request/authSignIn";
import {AuthApi} from "../api/AuthApi";
export const initialStateValid = {
    valid: false,
    message: '',
    value: '',
    required: true,
    dirty: false
}
export const useModal = () => {
    const [valid, setValid] = useState(initialStateValid);
    const [intervalId, setIntervalId] = useState<any>();
    const setPhoneNumber = useUser(state => state.setPhoneNumber)
    const phoneNumber = useUser(state => state.phoneNumber)
    const [countClickResendSms, setCountClickResendSms] = useState(0);
    useEffect(() =>{
        debugger
        if (!!intervalId) return;
        if (valid.valid && !valid.message) {
            debugger
            // dispatch(setPhoneNumber(valid.value))
            setPhoneNumber(valid.value)
            if(localStorage.getItem('phoneNumberFromState') === valid.value) {
                return
            }
            authSignIn(valid.value, intervalId)
            // AuthApi.signIn({phone: valid.value})

            //////////////////////////////////////////////////
            // dispatch(AppFormActions.updateUserPhone({value: valid.value, touched: true}))
            // startTimer(Date.now() + 60 * 1000);
            //
            // if (authTypeEnv === 'MTS') dispatch(signInMobileId(valid.value, date_birthday.result.value || ''));
            // else dispatch(authSignIn(valid.value, intervalId));
            //
            // setTimeout(() => {
            //     setShowChangePhone(true)
            // }, 5000)
            // setTimeout(() => {
            //     document.getElementById('code__confirm')?.focus()
            // }, 1000)
        }

        // else {
            // dispatch(setSmsLoader(false))
        // }
        return () => clearInterval(intervalId)
    },[valid])

    const checkInput = (value: string) => {
        if (resetMask(value).length === 11) {
            setValid(checkPhone(
                resetMask(value),
                true,
                'return_phone_without_mask',
                null,
                true,
                []
            ))
        } else {
            // dispatch(setSmsLoader(false))
        }
    }
    return {
        checkInput: (value: string) => checkInput(value),
        valid,
    }
}

