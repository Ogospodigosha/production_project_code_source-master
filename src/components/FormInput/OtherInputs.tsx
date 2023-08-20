import {ChangeEvent, CSSProperties, SetStateAction, useEffect, useState} from "react";
import {Nullable} from "../Subtitle/Subtitle";
import React, { useRef} from 'react'
import useSelectedList, {ListMethods} from "../../CustomHooks/useSelectedList";
import ReactInputMask from "react-input-mask";
import './FormInput.scss'

export interface UniversalTypes {
    fullGrid?: boolean
}

export type InputStatus = (value: string, required: boolean, dirty?: boolean, prevStatus?: boolean) => any
export interface CustomInput extends UniversalTypes {
    currentDomain: string
    // Animation
    animationEffect?: 'fade-up' | 'zoom-up' | 'fade-right' | 'fade-left' | 'zoom-down'

    // Styles
    inputStyle?: CSSProperties,
    containerStyle?: CSSProperties,
    labelStyle?: CSSProperties,
    extraPlaceholderStyle?: CSSProperties,
    inputMessagesStyle?: CSSProperties,

    // Classes
    inputClassNames?: Array<string>,
    containerClassNames?: Array<string>,
    labelClassNames?: string,
    extraPlaceholderClassNames?: Array<string>,

    // ID
    containerId?: string,
    id?: string,
    labelId?: string,

    // Text
    labelText?: string,
    defaultValue?: Nullable<string>,
    placeholder?: string,
    extraPlaceholder?: string,
    errorMessage?: string,
    inputMode?: 'none' | 'text' | 'tel' | 'url' | 'email' | 'numeric' | 'decimal' | 'search' | undefined;

    // Options
    mask?: string
    maskChar?: string
    required?: boolean,
    name?: string,
    minLength?: number,
    maxLength?: number,
    alwaysShowMask?: boolean
    inputType?: 'text' | 'tel' | 'email' | 'one-time-code'
    autoComplete?: HTMLInputElement['autocomplete']
    autoFocus?: boolean

    // Validation
    status?: boolean,
    setStatus?: InputStatus
    readOnly?: boolean

    // Func
    onInput?: (
        event: React.ChangeEvent<HTMLInputElement>,
        masked: Nullable<string>,
        setMasked: React.Dispatch<SetStateAction<Nullable<string>>>,
        setValue: (value: string) => void,
        actions?: ListMethods
    ) => any
    onChange?: (
        event: React.ChangeEvent<HTMLInputElement>,
        masked: Nullable<string>,
        setMasked: React.Dispatch<SetStateAction<Nullable<string>>>,
        setValue: (value: string) => void,
        actions?: ListMethods
    ) => any
    onPaste?: (
        event: React.ClipboardEvent<HTMLInputElement>,
        masked: Nullable<string>,
        setMasked: React.Dispatch<SetStateAction<Nullable<string>>>,
        setValue: (value: string) => void,
        actions?: ListMethods
    ) => any
    onPasteCapture?: (
        event: React.ClipboardEvent<HTMLInputElement>,
        masked: Nullable<string>,
        setMasked: React.Dispatch<SetStateAction<Nullable<string>>>,
        setValue: (value: string) => void,
        actions?: ListMethods
    ) => any
    onBlur?: (event: React.FocusEvent<HTMLInputElement>, actions?: ListMethods) => any
    onFocus?: (event: React.FocusEvent<HTMLInputElement>, actions?: ListMethods) => any
    onKeyDown?: (event: React.KeyboardEvent, actions?: ListMethods) => any
    onKeyPress?: (event: React.KeyboardEvent, actions?: ListMethods) => any
    maskedHandler?: (event: React.ChangeEvent<HTMLInputElement>) => any
}
export interface InputLabelProps {
    text: Nullable<string>;
    id?: string;
    required: boolean,
    hintText?: string,
    containerId?: string
    style?: CSSProperties
    className?: string
}




export const InputLabel: React.FC<InputLabelProps> = ({
                                                          text,
                                                          id,
                                                          required,
                                                          hintText,
                                                          containerId,
                                                          style,
                                                          className,
                                                      }) => {
    return (
        <label htmlFor={id} className={className || 'label'} id={containerId} style={style}>
            {text} <span style={{color: 'red'}}>{required ? ' *' : ''}</span>
            {hintText ? <span>{hintText}</span> : ''}
        </label>
    )
}
export const FormInput: React.FC<CustomInput> = ({
                                                     inputMode,
                                                     inputStyle,
                                                     containerStyle,
                                                     labelStyle,
                                                     extraPlaceholderStyle,
                                                     inputClassNames,
                                                     containerClassNames,
                                                     labelClassNames,
                                                     extraPlaceholderClassNames,
                                                     containerId,
                                                     id,
                                                     labelId,
                                                     labelText,
                                                     defaultValue,
                                                     placeholder,
                                                     extraPlaceholder,
                                                     errorMessage,
                                                     mask,
                                                     maskChar,
                                                     required,
                                                     name,
                                                     minLength,
                                                     maxLength,
                                                     onInput,
                                                     onBlur,
                                                     onFocus,
                                                     readOnly,
                                                     animationEffect,
                                                     alwaysShowMask,
                                                     inputType,
                                                     fullGrid,
                                                     setStatus,
                                                     status,
                                                     onKeyPress,
                                                     onKeyDown,
                                                     inputMessagesStyle,
                                                     onPaste,
                                                     onPasteCapture,
                                                     onChange,
                                                     autoComplete,
                                                     autoFocus,
                                                     maskedHandler,
                                                     currentDomain
                                                 }) => {
    const [masked, setMasked] = useState<Nullable<string>>(mask || null)
    const list = useSelectedList()
    const [dirty, setDirty] = useState<boolean>(false)
    const [maskedValue, setMaskedValue] = useState<Nullable<string>>(null);

    const maskedChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!maskedHandler) return
        setMaskedValue(maskedHandler(e))
    }

    useEffect(() => {
        list.setInputValue(defaultValue || maskedValue || '')
    }, [defaultValue, maskedValue])

    return (
        <>
            <div
                className="input-container"
                id={containerId}
                style={containerStyle}
                data-full-grid={fullGrid ? 'true' : ''}
            >
                {labelText ? (
                    <InputLabel text={labelText || ''} required={required || false} id={id} style={labelStyle}/>
                ) : ''}

                <div className={'input-container'}>

                    {masked ? (
                        <ReactInputMask
                            inputMode={inputMode}
                            mask={masked}
                            value={maskedValue !== null ? maskedValue : defaultValue || ''}
                            placeholder={placeholder || ''}
                            className={
                                `input__${currentDomain} ${status !== undefined ? !status ? 'input-error' : status ? 'input-done' : '' : ''} ${inputClassNames?.join(' ')}` //`input__${currentDomain}
                            }
                            style={inputStyle}
                            autoComplete={autoComplete || "something"}
                            type={inputType}
                            name={(name || '') + Date.now()}
                            readOnly={readOnly}
                            inputRef={(el:any) => {

                            }}
                            id={id}
                            onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => {
                                onKeyPress && onKeyPress(e, list)
                            }}
                            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                                onKeyDown && onKeyDown(e, list)
                            }}
                            alwaysShowMask={alwaysShowMask}
                            onPaste={(event:React.ClipboardEvent<HTMLInputElement> ) => onPaste ? onPaste(event, masked, setMasked, list.setInputValue) : ''}
                            onPasteCapture={(event: React.ClipboardEvent<HTMLInputElement> ) => onPasteCapture ? onPasteCapture(event, masked, setMasked, list.setInputValue) : ''}
                            onChange={(event: ChangeEvent<HTMLInputElement> ) => onChange ? onChange(event, masked, setMasked, list.setInputValue) : ''}
                            onBlur={(e:any ) => {
                                onBlur && onBlur(e)
                                setDirty(false)
                                if (setStatus) {
                                    // setInputStatus(setStatus(e.target.value || "", required || false, dirty, status))
                                }
                            }}
                            onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                                onInput ? onInput(e, masked, setMasked, list.setInputValue) : ''
                                maskedHandler && maskedChangeHandler(e)
                            }}
                            onFocus={(e:any) => {
                                onFocus && onFocus(e)
                                setDirty(true)
                            }}
                            minLength={masked.length}
                        />
                    ) : (
                        <input
                            inputMode={inputMode}
                            placeholder={placeholder}
                            className={
                                `input__${currentDomain} ${status !== undefined ? !status ? 'input-error' : status ? 'input-done' : '' : ''} ${inputClassNames?.join(' ') || ''}` // `input__${currentDomain}
                            }
                            style={inputStyle}
                            defaultValue={defaultValue || ''}
                            autoComplete={autoComplete || "something"}
                            autoFocus={autoFocus}
                            name={(name || '') + Date.now()}
                            readOnly={readOnly}
                            id={id}
                            onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => {
                                onKeyPress && onKeyPress(e, list)
                            }}
                            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                                onKeyDown && onKeyDown(e, list)
                            }}
                            type={inputType}
                            ref={list.input as React.RefObject<HTMLInputElement>}
                            maxLength={maxLength}
                            minLength={minLength}
                            onPaste={(event) => {
                                onPaste ? onPaste(event, masked, setMasked, list.setInputValue) : ''
                            }}
                            onInput={(e: React.ChangeEvent<HTMLInputElement>) => onInput ? onInput(e, masked, setMasked, list.setInputValue) : ''}
                            onBlur={(e) => {
                                let v = e.target.value
                                if (onBlur) {
                                    const result = onBlur(e)
                                    v = typeof result === "string" ? result : v
                                }
                                if (setStatus) {
                                    // setInputStatus(setStatus(v, required || false, dirty, status))
                                }
                            }}
                            onFocus={(e) => {
                                onFocus && onFocus(e)
                                setDirty(true)
                            }}
                            onClick={e => e.currentTarget.focus()}
                        />
                    )}
                    {/*<RenderIcon status={status} field={'text'}/>*/}
                </div>

                {/*<RenderInputMessage message={errorMessage || extraPlaceholder || ''} inputMessagesStyle={inputMessagesStyle}*/}
                {/*                    status={status}/>*/}
            </div>
        </>
    )
}
