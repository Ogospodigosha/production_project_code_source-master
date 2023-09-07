import {useEffect, useState} from "react";
import useUser from "../store/userStore";
import {checkPhone, resetMask} from "../utils/utils";
import {authSignIn} from "../request/authSignIn";
import userStore from "../store/userStore";
import {confirmCode} from "../request/confirmCode";
import useAuthWindow from "../store/authModalStore";
import s from '../Notification/Notification.module.scss'
import {AuthApi} from "../api/AuthApi";
import {signInMobileId} from "../request/signInMobileId";
import authModalStore from "../store/authModalStore";
import {confirmMobileId} from "../request/confirmMobileId";
import userInfoStore from "../store/userInfoStore";


export const initialStateValid = {
    valid: false,
    message: '',
    value: '',
    required: true,
    dirty: false
}
export const useModal = (authTypeProps: string | undefined) => {
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
    const [showCodeMessage, setShowCodeMessage] = useState(false);
    const [showChangePhone, setShowChangePhone] = useState(false);
    const date_birthday = userStore(store => store.date_birthday)
    const setAuthType = authModalStore(store => store.setAuthType)
    const type = authModalStore(store => store.type)
    const addUser = userInfoStore(store => store.addUser)
    useEffect(() => {
        document.addEventListener('click', outputClickHandler)
        return () => {
            document.removeEventListener('click', outputClickHandler)
            clearInterval(intervalId)
            // clearModal()
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
        if (target && target.className === s['modal-container']) {
            setViewModal(false)
        }
    }

    useEffect(() =>{
        debugger
        if (timer === 0) {
            setIntervalId(undefined)
            clearInterval(intervalId)
        }
        if (!!intervalId) return;
        if (valid.valid && !valid.message) {
            debugger
            setPhoneNumber(valid.value)
            if(localStorage.getItem('phoneNumberFromState') === valid.value) {
                return
            }
            debugger
            if (authTypeProps === 'MTS_ID'){
                signInMobileId(valid.value, date_birthday || '', setSmsLoader, loader, setPhoneNumber, setAuthType );
            } else   {
                authSignIn(valid.value, intervalId, setSmsLoader, loader)
            }


            //////////////////////////////////////////////////
            // dispatch(AppFormActions.updateUserPhone({value: valid.value, touched: true}))
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
        debugger
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


    const changePhone = async () => {
        try {
            await AuthApi.checkChangePhone().then(res =>{
                // localStorage.removeItem('phoneNumber');
                // localStorage.setItem('phoneNumber','');
                localStorage.removeItem('phoneNumberFromState')
                setIntervalId(undefined)
                clearInterval(intervalId)
                setPhoneNumber('1')
                return res;
            })
            setTimer(-1)
            setCountClickResendSms(0)
            clearInterval(intervalId)
            // dispatch(setSmsLoader(false))
            // dispatch(setCodeMessage(null))
        } catch (err: any) {
            if (err.response.status === 417) {
                // dispatch(showModal(false))
                // dispatch(addNotification('Вы исчерпали лимит смс в сутки, пожалуйста, попробуйте завтра'))
            } else if (err.response.status === 429) {
                // dispatch(addNotification('🐶🐱🐹🐭🐰🙈🦆🦀'))
            } else if (err.response.status === 401) {
                // dispatch(localLogOut())
                // dispatch(addNotification('Пожалуйста, авторизуйтесь снова'))
            } else if (err.response.status === 404) {
                // history.push('/user/myProfile')
                // dispatch(addNotification('Пожалуйста, заполните анкету снова'))
            }
        }
    }

    const updateCode = async () => {
        try {
            const repeat = type === 'BASIC_SMS'
                ? await AuthApi.startConfirmPhoneNumber(valid.value)
                : await AuthApi.mobileID({phone: valid.value, birthday: date_birthday || localStorage.getItem('birthday') || ""});
            // const repeat = await  AuthApi.startConfirmPhoneNumber(valid.value)
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
                // dispatch(addNotification('Смс уже отправлена, дождитесь её'))
            } else if (err.response.status === 429) {
                // dispatch(addNotification('🐶🐱🐹🐭🐰🙈🦆🦀'))
            } else if (err.response.status === 417) {
                // dispatch(showModal(false))
                // dispatch(addNotification('Вы исчерпали лимит смс в сутки, пожалуйста, попробуйте завтра'))
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
    }
}

