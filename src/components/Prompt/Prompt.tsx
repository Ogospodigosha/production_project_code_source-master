import React, {CSSProperties, memo, ReactNode, useState} from 'react'
// import {SubTitleProps, TitleProps} from "../Text/Types/Types";
import s from './Prompt.module.scss'

import Title from "../Title/Title";
import Subtitle from "../Subtitle/Subtitle";
import {useTheme} from "../../theme/useTheme";


export type HeadlineType = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
export type SubtitleType = 'span'
export type TextAlign = 'center' | 'justify' | 'left' | 'right' | 'auto' | 'inherit' | 'start' | 'end'
export type Viewport = 'desktop' | 'tablet' | 'mobile'
export interface GutterBase {
    top?: number,
    right?: number,
    bottom?: number,
    left?: number,
}
export type RefType<T> = React.RefObject<T>
export type ViewportConstructor<T> = {
    [key in Viewport]?: T
}
type t = React.FC
export interface TitleProps<T = HTMLElement> {
    titleType?: HeadlineType,
    titleClassName?: string,
    titleStyle?: CSSProperties,
    titleRef?: RefType<T>,
    titleMargins?: ViewportConstructor<GutterBase>,
    titlePaddings?: ViewportConstructor<GutterBase>,
    titleTextAlign?: ViewportConstructor<TextAlign>,
    fullGrid?: boolean
}

export interface SubTitleProps<T = HTMLElement> {
    subtitleType?: SubtitleType,
    subtitleClassName?: string,
    subtitleStyle?: CSSProperties,
    subtitleRef?: RefType<T>,
    subtitleMargins?: ViewportConstructor<GutterBase>,
    subtitlePaddings?: ViewportConstructor<GutterBase>,
    subtitleTextAlign?: ViewportConstructor<TextAlign>,
    fullGrid?: boolean,
    onClick?: (e: React.MouseEvent<HTMLSpanElement>) => void
    children?: ReactNode
}
interface PromptProps extends TitleProps<HTMLHeadingElement>, SubTitleProps<HTMLSpanElement> {
    containerId?: string;
    title?: string;
    subtitle?: string;
    containerStyle?: CSSProperties
    suggestionContent?: Array<string>
    suggestionItemClassName?: string
    suggestionItemStyle?: CSSProperties
    suggestionContainerClassName?: string
    suggestionContainerStyle?: CSSProperties
    showClose?: boolean
    fullGrid?: boolean
    animationKeyFrame?: string
    animationDuration?: number
    titleClassName?: string
    titleStyle?: any
    titleRef?: any
    titleType?:any
    subtitleClassName?:any
    subtitleType?:any
    subtitleRef?: any
    subtitleStyle?: any
    subtitlePaddings?: any
    subtitleMargins?: any
    titlePaddings?: any
    titleMargins?: any
    titleTextAlign?:any
    subtitleTextAlign?: any
}

export const Prompt: React.FC<PromptProps> = memo(({
                                                       containerId,
                                                       title,
                                                       suggestionContent,
                                                       suggestionContainerClassName,
                                                       titleClassName,
                                                       suggestionItemClassName,
                                                       suggestionContainerStyle,
                                                       suggestionItemStyle,
                                                       titleStyle,
                                                       showClose = false,
                                                       children,
                                                       animationDuration,
                                                       animationKeyFrame,
                                                       fullGrid,
                                                       containerStyle,
                                                       titleRef,
                                                       titleType,
                                                       subtitleClassName,
                                                       subtitleType,
                                                       subtitle,
                                                       subtitleRef,
                                                       subtitleStyle,
                                                       subtitlePaddings,
                                                       subtitleMargins,
                                                       titlePaddings,
                                                       titleMargins,
                                                       titleTextAlign,
                                                       subtitleTextAlign
                                                   }) => {
    const [state, setState] = useState(true)
    const {theme, toggleTheme} = useTheme()

    return (
        <>
            {state ? (
                <div
                    id={containerId}
                    style={{
                        width: '100%',
                        animation: animationKeyFrame ? `${animationKeyFrame} ${animationDuration || 0.5}s ease-out forwards` : 'none',
                        ...containerStyle
                    }}
                    data-full-grid={fullGrid ? 'true' : ''}
                >
                    {title ? (
                        <Title
                            // @ts-ignore
                            titleType={titleType}
                            titleRef={titleRef}
                            titleClassName={titleClassName || `${s['header-24']} ${theme}`}
                            titleStyle={titleStyle || {}}
                            titlePaddings={titlePaddings}
                            titleMargins={titleMargins}
                            titleTextAlign={titleTextAlign}
                        >
                            {title}
                        </Title>
                    ) : ''}

                    {subtitle ? (
                        <Subtitle
                            subtitleType={subtitleType}
                            subtitleRef={subtitleRef}
                            subtitleStyle={subtitleStyle}
                            subtitlePaddings={subtitlePaddings}
                            subtitleMargins={subtitleMargins}
                            subtitleClassName={subtitleClassName || 'subtitle'}
                            subtitleTextAlign={subtitleTextAlign}
                        >
                            {subtitle}
                        </Subtitle>
                    ) : ''}

                    {suggestionContent || children ? (

                        <div
                            className={suggestionContainerClassName || 'suggestion-info'}
                            style={suggestionContainerStyle || {}}
                        >
                            <ul style={{listStyle: 'none'}}>
                                {suggestionContent?.map((suggestionText: string, index) => {
                                    return (
                                        <div key={`suggestion_item_container-${index}`}>
                                            {suggestionText.includes(';;') ? suggestionText.split(';;').map((item, itemIndex) => (
                                                <li
                                                    key={`suggestion_content_split_index_${itemIndex}_${Math.random() * 10}`}
                                                    className={suggestionItemClassName || 'suggestion-item'}
                                                    style={suggestionItemStyle || {}}
                                                >
                                                    {item || ''}
                                                    <br/>
                                                </li>
                                            )) : (
                                                <li
                                                    key={`suggestion_content_index_${index}_${Math.random() * 10}`}
                                                    className={suggestionItemClassName || 'suggestion-item'}
                                                    style={suggestionItemStyle || {}}
                                                >
                                                    {suggestionText || ''}
                                                </li>
                                            )}
                                        </div>
                                    )
                                })}
                            </ul>
                            {children}
                        </div>
                    ) : ""}
                </div>
            ) : ''}
        </>
    )
})
