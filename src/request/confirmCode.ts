import {AuthApi} from "../api/AuthApi";
import Cookies from "js-cookie";

export const confirmCode = async (phone: string, code: number, intervalId: any, callback?: () => void) =>{
    try {
        const response = await AuthApi.confirmCode({code, phone}).then(res =>{
            localStorage.removeItem('phoneNumber');

            return res;
        })

        Cookies.set('Bearer', response.data.token, {expires : 21});
        // dispatch(addUser())
        // if (intervalId) {
        //     clearInterval(intervalId)
        // }
        //
        // await dispatch(AppFormActions.updateUserPhone({
        //     value: resetMask(phone),
        //     touched: true
        // }))
        //
        // await dispatch(sendAuthInfo(resetMask(phone), {...user, sms_code: resetMask(String(code))}, 'BASIC_SMS'))
        //
        // dispatch(setPhoneNumber(resetMask(phone)))
        // callback && callback()
    } catch (e) {

    }

}
