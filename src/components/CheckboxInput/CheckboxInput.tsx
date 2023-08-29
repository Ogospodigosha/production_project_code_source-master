import React from "react";
import {CSSProperties} from "react";

import './CheckboxInput.scss'

export interface UniversalTypes {
    fullGrid?: boolean
}
export interface CheckboxInputPropsType extends UniversalTypes {
    target?: HTMLLinkElement['target'],
    rel?: HTMLLinkElement['rel'],
    state: boolean;
    setState: (value: boolean) => any
    path?: string;
    secondPath?: string;
    label?: string;
    containerId: string;
    id: string;
    message?: string;
    required: boolean;
    placeholder?: string;
    extra_placeholder?: string,
    containerStyle?: CSSProperties
}


export const CheckboxInput: React.FC<CheckboxInputPropsType> = ({
                                                                    state,
                                                                    setState,
                                                                    label,
                                                                    path, secondPath,
                                                                    containerId,
                                                                    message,
                                                                    required, extra_placeholder,
                                                                    fullGrid,
                                                                    target,
                                                                    rel,
                                                                    containerStyle
                                                                }) => {
    return (
        <>

        <div className="input-container" id={containerId} style={containerStyle}
             data-full-grid={fullGrid ? 'true' : ''}>
            <div className="checkbox-container">
                <div
                    className={`checkbox ${state ? `checked` : ''}`}
                    onClick={() => setState(!state)}
                />
                <span className={'agreement-text'}>
                    Я {path ? <a href={'/pdf_agreement'} target={target} rel={rel}
                                       className={'agreement-text-decoration'}>{'соглашаюсь'}</a> : <span
                    className={'agreement-text'}>{'соглашаюсь'}</span>} на обработку моих персональных данных и с условиями {secondPath ?
                    <a href={`/pdf_/offer`} target={target} rel={rel}
                             className={'agreement-text-decoration'}>{'оферты'}</a> : <span
                        className={'agreement-text'}>{'оферты'}</span>}
                </span>


            </div>
            {!state && required && message ? <span className="span-error">{message}</span> : ''}
        </div>
        </>
    )
}
