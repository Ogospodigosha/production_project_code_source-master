import React, {ReactNode} from 'react'

import {HeadlineType, TitleProps} from "../Prompt/Prompt";
import {getGutters} from "../Subtitle/Subtitle";
// import {HeadlineType, TitleProps} from "../Types/Types";

type DefaultClassNamesList = {
    [key in HeadlineType]?: string
}

interface ResultTitleProps extends TitleProps<HTMLHeadingElement> {
    children?: ReactNode
}

const Title: React.FC<ResultTitleProps> = (props) => {
    // const { viewport } = useAppSelector(state => state.config)
    const  viewport  = 'desktop'

    const defaultClassName: DefaultClassNamesList = {
        h1: 'title-text fs-30-24-17 color-black-main',
        h2: 'title-text fs-30-24-17 color-black-main',
        h3: 'title-text fs-24-20-17 color-black-main',
        h4: 'title-text fs-22 color-black-main',
        h5: 'title-text fs-18-16-13 color-black-main',
        h6: 'subheader-18',
    }

    return React.createElement(
        props.titleType || 'h2',
        {
            className: props.titleClassName || defaultClassName[props.titleType || 'h2'] || 'title-text fs-30-24-17 color-black-main',
            style: props.titleMargins || props.titlePaddings ? {
                ...props.titleStyle,
                textAlign: props.titleTextAlign ? props.titleTextAlign[viewport] : props.titleStyle?.textAlign || 'inherit',
                margin: props.titleMargins ? getGutters(props.titleMargins[viewport]) : props.titleStyle?.margin || null,
                padding: props.titlePaddings ? getGutters(props.titlePaddings[viewport]) : props.titleStyle?.padding || null,
            } : {
                ...props.titleStyle,
                textAlign: props.titleTextAlign ? props.titleTextAlign[viewport] : props.titleStyle?.textAlign || 'inherit',
            },
            "data-full-grid": `${props.fullGrid}`,
            ref: props.titleRef
        },
        props.children
    )
}

export default Title
