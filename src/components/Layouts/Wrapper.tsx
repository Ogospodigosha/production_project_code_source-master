import React, {CSSProperties, ReactNode, useRef} from 'react'
import s from './Wrapper.module.scss'
export interface WrapperProps {
    useWrapper?: boolean,
    id?: string,
    classNameAdd?: Array<string>,
    style?: CSSProperties,
    wrapperClassName?: string
    hidden?: boolean
    onClick?: (e: React.MouseEvent<HTMLDivElement>) => void
    children?: ReactNode
}

const Wrapper: React.FC<WrapperProps> = ({
                                             children,
                                             id,
                                             classNameAdd,
                                             style,
                                             useWrapper,
                                             wrapperClassName,
                                             hidden,
                                             onClick
                                         }) => {
    const ref = useRef<HTMLDivElement>(null)
    // const isDesktop = useAppSelector((store) => store.config.isDesktop)

    return (
        <>
            <div
                ref={ref}
                className={wrapperClassName || `${useWrapper || useWrapper === undefined ? s['wrapper-layout'] : s['wrapper-without-layout']} ${classNameAdd ? classNameAdd.join(' ') : ''}`}
                id={id}
                style={{overflow: hidden ? 'hidden' : 'visible', ...style}}
                onClick={onClick}
            >
                {children}
            </div>
        </>
    )
}

export default Wrapper
