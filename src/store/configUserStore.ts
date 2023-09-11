import create from 'zustand'
import { immer } from 'zustand/middleware/immer'
import {Nullable} from "../components/Subtitle/Subtitle";


export interface useConfigUserStateType {
    user_agent: string,
    type: 'MTS_ID' | 'BASIC_SMS',
    screen_width: Nullable<number>,
    screen_height: Nullable<number>,
    opener: Nullable<string>,
    language: Nullable<string>,
    vendor: Nullable<string>,
    vendor_version: Nullable<string>,
    do_not_track: any,
    cookie_enabled: Nullable<boolean>
    address: any,
    sms_code: Nullable<string>
}

export interface UserStateType {
    user: useConfigUserStateType
}

const useConfigUser = create(immer<UserStateType>((set) => ({
    user: {
        user_agent: window.navigator.userAgent || '',
        screen_width: window.screen.width || null,
        screen_height: window.screen.height || null,
        type: 'BASIC_SMS',
        opener: null,
        vendor: window.navigator.vendor || null,
        vendor_version: window.navigator.vendorSub || null,
        language: window.navigator.language || null,
        do_not_track: window.navigator.doNotTrack || null,
        cookie_enabled: window.navigator.cookieEnabled || null,
        address: null,
        sms_code: null,
    },
})))
export default useConfigUser
