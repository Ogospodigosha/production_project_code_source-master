import {AuthApi} from "../api/AuthApi";
import Cookies from "js-cookie";

export const confirmMobileId = async (phone: string, code: string, intervalId: any, addUser: ()=>void, callback?: () => void ) => {
    // const user = getState().config.user;
    try {
        // setSpinner({loaderStatus: true, message: 'Проверяем введённый код...', type: 'future'})
        const response = await AuthApi.smsVerif({
            phone,
            code,
        }); //partner: 'mts'
        Cookies.set('Bearer', response.data.token, {expires : 21});

        addUser()
        if (intervalId) {
            clearInterval(intervalId)
        }
        // await dispatch(AppFormActions.updateUserPhone({
        //     value: resetMask(phone),
        //     touched: true
        // }));
        //
        // await dispatch(sendAuthInfo(resetMask(phone), {...user, sms_code: resetMask(String(code))}, 'MTS_ID'));
        //
        // dispatch(setPhoneNumber(resetMask(phone)))
        // callback && callback()

    } catch (err: any) {
        if (err.response.status === 429) {
            // dispatch(addNotification('🐶🐱🐹🐭🐰🙈🦆🦀'))
        }
        // dispatch(setCodeMessage('Неверный код подтверждения'))
    }
    finally {
        // dispatch(setSpinner({loaderStatus: false, message: null}))
    }

}
