import {useEffect, useState} from "react";
import useUser from "../store/userStore";
import {checkPhone, resetMask} from "../utils/utils";
import userStore from "../store/userStore";

import useAuthWindow from "../store/authModalStore";
import {AuthApi} from "../api/AuthApi";
import authModalStore from "../store/authModalStore";

import userInfoStore from "../store/userInfoStore";
import useError from "../store/errorStore";
import {useRequestModel} from "./requestModel";
import {Nullable} from "../components/Subtitle/Subtitle";
import useToken from "../store/store";



export const initialStateValid = {
    valid: false,
    message: '',
    value: '',
    required: true,
    dirty: false
}
export const useModal = (authTypeProps: string | undefined, backUrl: string) => {
    const [valid, setValid] = useState(initialStateValid);
    const [intervalId, setIntervalId] = useState<any>();
    const setPhoneNumber = useUser(state => state.setPhoneNumber)
    const phoneNumber = useUser(state => state.phoneNumber)
    const [timer, setTimer] = useState<number>(-1);
    const [countClickResendSms, setCountClickResendSms] = useState(0);
    const [sendingCode, setSendingCode] = useState(false);
    const setSmsLoader = userStore(store => store.setSmsLoader)
    const loader = userStore(store => store.loader)
    const setViewModal = useAuthWindow(state => state.setViewModal)
    const { signInMobileIdFromModel, authSignInFromModel, confirmCode, confirmMobileId } = useRequestModel(backUrl)
    const [showCodeMessage, setShowCodeMessage] = useState(false);
    const [showChangePhone, setShowChangePhone] = useState(false);
    const date_birthday = userStore(store => store.date_birthday)
    const setAuthType = authModalStore(store => store.setAuthType)
    const type = authModalStore(store => store.type)
    const addUser = userInfoStore(store => store.addUser)
    const setError = useError(store => store.setError)
    const token = useToken(store => store.token)
    const {confirmAutologinCode} = useRequestModel(backUrl)
    const {checkChangePhone, startConfirmPhoneNumber, mobileID} = AuthApi(backUrl)
    useEffect(() => {
        document.addEventListener('click', outputClickHandler)
        return () => {
            document.removeEventListener('click', outputClickHandler)
            clearInterval(intervalId)
        }
    }, [])

    useEffect(() => {
        if (timer === 0) {
            setShowCodeMessage(true)
            setIntervalId(undefined)
            clearInterval(intervalId)
        }
    }, [timer])

    const outputClickHandler = (e: MouseEvent) => {
        const target = e.target as Element
        if (target && target.className === 'modal-container') {
            setViewModal(false)
        }
    }

    useEffect(() =>{
        if (timer === 0) {
            setIntervalId(undefined)
            clearInterval(intervalId)
        }
        if (!!intervalId) return;
        if (valid.valid && !valid.message) {

            setPhoneNumber(valid.value)
            if(localStorage.getItem('phoneNumberFromState') === valid.value) {
                return
            }

            if (authTypeProps === 'MTS_ID'){
                signInMobileIdFromModel(valid.value, date_birthday || '')
            } else   {
                authSignInFromModel(valid.value, intervalId)
            }
            startTimer(Date.now() + 60 * 1000);

            setTimeout(() => {
                setShowChangePhone(true)
            }, 5000)
            setTimeout(() => {
                document.getElementById('code__confirm')?.focus()
            }, 1000)

        } else {
           setSmsLoader(false)
        }
        return () => clearInterval(intervalId)
    },[valid])

    const checkCode = (value: string) => {
        const phone = valid.value || phoneNumber || ''
        if (resetMask(value).length === 4) {
            setSendingCode(true)
            if (type === 'BASIC_SMS') confirmCode(phone, Number(resetMask(value)), intervalId)
            else confirmMobileId(phone, resetMask(value),  intervalId, addUser)
            setSendingCode(false)
        } else {
            // dispatch(setCodeMessage(''))
        }
    }

    const startTimer = (timestamp: number) => {
        let int = setInterval(() => {
            setTimer(Math.round((timestamp / 1000) - (Date.now() / 1000)))
        }, 1000)

        setIntervalId(int)

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
            setSmsLoader(false)
        }
    }

    const checkInputPartner = (value: string, birthDateStatus?: boolean) => {
        if (resetMask(value).length === 11 && birthDateStatus) {
            setValid(checkPhone(
                resetMask(value),
                true,
                'return_phone_without_mask',
                null,
                true,
                []
            ))
        } else {
            setSmsLoader(false)
        }
    }

    const checkAutologinCode = (value: Nullable<string>) => {
        if (!value) return
        // const callback = autoLoginHref ? () => {
        //     history.push(autoLoginHref)
        // } : undefined
        confirmAutologinCode(phoneNumber, Number(value), token, intervalId)
    }


    const changePhone = async () => {
        try {
            await checkChangePhone().then(res =>{
                localStorage.removeItem('phoneNumberFromState')
                setIntervalId(undefined)
                clearInterval(intervalId)
                setPhoneNumber('1')
                return res;
            })
            setTimer(-1)
            setCountClickResendSms(0)
            clearInterval(intervalId)
            setSmsLoader(false)
            // setCodeMessage(null)
        } catch (err: any) {
            if (err.response.status === 417) {
                setViewModal(false)
                setError('Вы исчерпали лимит смс в сутки, пожалуйста, попробуйте завтра')
            } else if (err.response.status === 429) {
                setError('🐶🐱🐹🐭🐰🙈🦆🦀')
            } else if (err.response.status === 401) {
                // dispatch(localLogOut())
                // dispatch(addNotification('Пожалуйста, авторизуйтесь снова'))
                setError('Пожалуйста, авторизуйтесь снова')
            } else if (err.response.status === 404) {
                setError('Пожалуйста, заполните анкету снова')
            }
        }
    }

    const updateCode = async () => {
        try {
            const repeat = type === 'BASIC_SMS'
                ? await startConfirmPhoneNumber(valid.value)
                : await mobileID({phone: valid.value, birthday: date_birthday || localStorage.getItem('birthday') || ""});
            setCountClickResendSms(countClickResendSms + 1)
            if (repeat.status === 200 || repeat.status === 204) {
                setShowCodeMessage(false)
                startTimer(Date.now() + 60 * 1000)
                return repeat.status >= 200 && repeat.status <= 300
            } else if (repeat.status === 217) {
                setShowCodeMessage(false)
            }
        } catch (err: any) {
            if (err.response.status === 403) {
                setError('Смс уже отправлена, дождитесь её')
            } else if (err.response.status === 429) {
                setError('🐶🐱🐹🐭🐰🙈🦆🦀')
            } else if (err.response.status === 417) {
                setViewModal(false)
                setError('Вы исчерпали лимит смс в сутки, пожалуйста, попробуйте завтра')
            }
        }
    }
    return {
        checkInput: (value: string) => checkInput(value),
        valid,
        defaultPhone:  phoneNumber || '',
        checkCode: (e: React.ChangeEvent<HTMLInputElement>) => checkCode(e.target.value),
        changePhone: () => changePhone(),
        startTimer,
        timer,
        countClickResendSms,
        updateCode: () => updateCode(),
        checkInputPartner: (value: string, birthDateStatus?: boolean) => checkInputPartner(value, birthDateStatus),
        checkAutologinCode: (value: Nullable<string>) => checkAutologinCode(value),
    }
}

