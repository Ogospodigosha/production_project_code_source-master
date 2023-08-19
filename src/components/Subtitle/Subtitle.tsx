import React, {createElement} from 'react'
import {SubTitleProps} from "../Prompt/Prompt";

export interface GutterBase {
    top?: number,
    right?: number,
    bottom?: number,
    left?: number,
}

export declare type Nullable<T> = T | null
export const getGutters = (gutters?: GutterBase): Nullable<string> => {
    return gutters ? `${gutters?.top || 0}px ${gutters?.right || 0}px ${gutters?.bottom || 0}px ${gutters?.left || 0}px` : null
}
const Subtitle: React.FC<SubTitleProps<HTMLSpanElement | HTMLParagraphElement>> = (props) => {
    // const {viewport} = useAppSelector(state => state.config)
    const viewport = 'desktop'
    return createElement(
        props.subtitleType || 'span',
        {
            onClick: props.onClick,
            className: props.subtitleClassName || 'subtitle',
            style: props.subtitleMargins || props.subtitlePaddings ? {
                ...props.subtitleStyle,
                textAlign: props.subtitleTextAlign ? props.subtitleTextAlign[viewport] : props.subtitleStyle?.textAlign || 'inherit',
                margin: props.subtitleMargins ? getGutters(props.subtitleMargins[viewport]) : props.subtitleStyle?.margin || null,
                padding: props.subtitlePaddings ? getGutters(props.subtitlePaddings[viewport]) : props.subtitleStyle?.padding || null,
            } : {
                ...props.subtitleStyle,
                textAlign: props.subtitleTextAlign ? props.subtitleTextAlign[viewport] : props.subtitleStyle?.textAlign || 'inherit',
            },
            'data-full-grid': `${props.fullGrid}`,
        },
        props.children)
}

export default Subtitle
