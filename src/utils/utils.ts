import {Nullable} from "../components/Subtitle/Subtitle";
type OutputControllerType =
    | 'return_date_number'
    | 'return_date_dd_mm_yyyy'
    | 'return_date_yyyy_mm_dd'
    | 'return_phone_without_mask'
    | 'return_phone_with_mask';
type InputActionType = 'dropdown' | 'text' | 'dropdown+text';
export const resetMask = (value: Nullable<string>) => {
    return value ? value.replace(/\D/g, '') : ''
}

export const onPhoneInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const getValue = () => {
        if (value === '') return '+7-(___)-___-__-__'
        const arr = value.split('-')
        if (arr.length !== 5) {
            if (value[8] !== '-') {
                return value.substring(-1,6)
            }
            if (value[12] !== '-')  {
                return value.substring(-1,11)
            }
            if (value[15] !== '-')  {
                return value.substring(-1,14)
            }
        }
        if (arr[1].length === 6) {
            const result = arr[1].replace('_','')
            return [arr[0],result,arr[2],arr[3],arr[4]].join('-')
        }
        if (arr[2].length === 4) {
            const result = arr[2].replace('_','')
            return [arr[0],arr[1],result,arr[3],arr[4]].join('-')
        }
        if (arr[3].length === 3) {
            const result = arr[3].replace('_','')
            return [arr[0],arr[1],arr[2],result,arr[4]].join('-')
        }
        if (arr[4].length === 3) {
            const result = arr[4].replace('_','')
            return [arr[0],arr[1],arr[2],arr[3],result].join('-')
        }
        return value
    }
    return resetMask(getValue())
}


export const setInputMask = (v: string, mask: string | null) => {
    let value = v
    if (mask) {
        let i = 0
        let def = mask.replace(/\D/g, '')
        let val = v.replace(/\D/g, '')

        if (def.length >= val.length) val = def
        value = mask.replace(/./g, (a) => {
            return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a
        })
    }

    return value
}

const error = (message: string, required: boolean, value: any, type?: InputActionType) => {
    return {
        valid: false,
        required,
        value: value as typeof value,
        dirty: true,
        message: type === 'dropdown' || type === 'dropdown+text' ? `Выберите вариант из списка ${type === 'dropdown+text' ? 'или введите корректное значение' : ''}` : message
    }
}
const success = (value: any, required: boolean) => {
    return {valid: true, required, value: value as typeof value, dirty: true, message: ''}
}

const dontTouch = (message: string, required: boolean, value: any, dirty: boolean, type?: InputActionType) => {
    return {
        valid: false,
        required,
        value: value as typeof value,
        dirty: dirty,
        message: dirty && required ? type === 'dropdown' ? 'Выберите вариант из списка' : message : ''
    }
}

export const checkPhone = (
    v: string | null,
    required: boolean,
    output: OutputControllerType,
    mask: Nullable<string>,
    dirty: boolean,
    disabledValue: Array<string>
) => {
    if (v !== null) {
        if (mask === null) {
            mask = '___________' //11 символов
        }

        const re = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{10}$/
        if (!re.test(setInputMask(v, '+7-(___)-___-__-__'))) {
            return error(
                'Укажите корректный для России номер телефона',
                required,
                output === 'return_phone_without_mask' ? resetMask(v) : setInputMask(v, mask)
            )
        }


        let value = resetMask(v)
        let valid = {
            valid: false,
            value: output === 'return_phone_without_mask' ? resetMask(value) : setInputMask(value, mask),
            message: '',
            dirty: false,
            required
        }

        const notUniqueResult =
            disabledValue.length > 0
                ? disabledValue.filter((item) => resetMask(item) === resetMask(value)).length > 0
                : false

        if (notUniqueResult) {
            return error(
                'Укажите номер телефона, отличающийся от указанных ранее.',
                required,
                output === 'return_phone_without_mask' ? resetMask(value) : setInputMask(value, mask)
            )
        }

        if (value.length > 0) {
            if (value.length === 11) {
                valid = success(
                    output === 'return_phone_without_mask' ? resetMask(value) : setInputMask(value, mask),
                    required
                )
            } else {
                valid = error(
                    'Введенный номер телефона указан не корректно',
                    required,
                    output === 'return_phone_without_mask' ? resetMask(value) : setInputMask(value, mask)
                )
            }
        } else {
            if (required) {
                if (dirty) {
                    valid = error(
                        'Это поле обязательно для заполнения',
                        required,
                        output === 'return_phone_without_mask' ? resetMask(value) : setInputMask(value, mask)
                    )
                } else {
                    valid = error(
                        '',
                        required,
                        output === 'return_phone_without_mask' ? resetMask(value) : setInputMask(value, mask)
                    )
                }
            } else {
                valid = error(
                    '',
                    required,
                    output === 'return_phone_without_mask' ? resetMask(value) : setInputMask(value, mask)
                )
            }
        }

        return valid
    } else {
        return dontTouch('Это поле обязательно для заполнения', required, v, dirty)
    }
}
export const setTextTimer = (timer: number) => {
    if (timer <= 0) return ''

    const minutes = Math.floor(timer / 60)
    const seconds = Math.floor(timer % 60)

    return `${minutes} ${seconds > 0 ? seconds < 10 ? `: 0${seconds}` : `: ${seconds}` : ': 00'}`
}
