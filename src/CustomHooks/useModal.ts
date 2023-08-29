import {useEffect, useState} from "react";
import useUser from "../store/userStore";
import {checkPhone, resetMask} from "../utils/utils";
import {authSignIn} from "../request/authSignIn";
import userStore from "../store/userStore";
import {confirmCode} from "../request/confirmCode";
import useAuthWindow from "../store/authModalStore";
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
    const [sendingCode, setSendingCode] = useState(false);
    const setSmsLoader = userStore(store => store.setSmsLoader)
    const loader = userStore(store => store.loader)
    const setViewModal = useAuthWindow(state => state.setViewModal)

    useEffect(() => {
        document.addEventListener('click', outputClickHandler)
        return () => {
            document.removeEventListener('click', outputClickHandler)
            clearInterval(intervalId)
            // clearModal()
        }
    }, [])

    const outputClickHandler = (e: MouseEvent) => {
        const target = e.target as Element
        if (target && target.className === 'modal-container') {
            // dispatch(showModal(false, {}))
            setViewModal(false)
        }
    }

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
            authSignIn(valid.value, intervalId, setSmsLoader, loader)
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

    const checkCode = (value: string) => {
        const phone = valid.value || phoneNumber || ''
        if (resetMask(value).length === 4) {
            setSendingCode(true)

            // const callback = href ? () => {
            //     history.push(href)
            // } : undefined
            confirmCode(phone, Number(resetMask(value)), intervalId)
            // if (type === 'BASIC_SMS') dispatch(confirmCode(phone, Number(resetMask(value)), intervalId, callback))
            // else dispatch(confirmMobileId(phone, resetMask(value),  intervalId, callback));
            // setSendingCode(false)


        } else {
            // dispatch(setCodeMessage(''))
        }
    }
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
        defaultPhone:  phoneNumber || '',
        checkCode: (e: React.ChangeEvent<HTMLInputElement>) => checkCode(e.target.value),
    }
}

