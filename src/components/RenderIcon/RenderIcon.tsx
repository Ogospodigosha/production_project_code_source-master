import React, {CSSProperties, Ref} from "react";
import './RenderIcon.scss'
export type PartnerStatus = 'WAITING' | 'APPROVED' | 'REJECTED' | 'SMS' | 'CALL' | 'DEPOSIT_OFFER'

export type statusTypes =
    boolean
    | undefined
    | 'waiting'
    | 'success'
    | 'error'
    | 'reject'
    | 'not imploying'
    | 'APPROVED'
    | PartnerStatus

interface RenderIconProps {
    status: statusTypes,
    field: 'dropdown' | 'text'
    style?: CSSProperties
    waiting?: boolean
}

/**
 * @displayName RenderIcon - Самостоятельный компонент для отображения иконки внутри инпута
 * @param status - Статус true/false для отображения статуса валидности поля ввода
 * @param field - Тип поля - выпадающий список или текстовое поле
 * */

export const RenderIcon = React.forwardRef(({
                                                waiting,
                                                status,
                                                style,
                                                field
                                            }: RenderIconProps, ref: Ref<HTMLSpanElement>) => (
    <>
        {waiting || status === 'waiting' ? (
            <span className="lds-ring" style={style ? style : {}} ref={ref}>
          <span style={style ? {
              width: style?.width,
              height: style?.height
          } : {}}/>
          <span style={style ? {
              width: style?.width,
              height: style?.height
          } : {}}/>
          <span style={style ? {
              width: style?.width,
              height: style?.height
          } : {}}/>
          <span style={style ? {
              width: style?.width,
              height: style?.height
          } : {}}/>
        </span>
        ) : status === true ? (
            <span
                style={style ? style : {}}
                className={'icon-complete'}
                ref={ref}
            >
        </span>
        ) : status === false ? (
            <span
                style={style ? style : {}}
                className={`icon-error `}
                ref={ref}
            >
    </span>
        ) : status === undefined && field === 'dropdown' ? (
            <span
                style={style ? style : {}}
                className={'icon'}
                ref={ref}
            >
        </span>):''}
    </>
))
