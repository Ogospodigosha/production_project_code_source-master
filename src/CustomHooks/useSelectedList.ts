import React, {useEffect, useRef, useState} from 'react'
import {Nullable} from "../components/Subtitle/Subtitle";

export type RefType<T> = React.RefObject<T>
export type ReactSetState<T> = React.Dispatch<React.SetStateAction<T>>
export type callBackFn<T> = (e: React.FocusEvent<T>) => void

export interface ListMethods {
    list: RefType<HTMLDivElement>,
    icon: RefType<HTMLSpanElement>,
    input: RefType<HTMLInputElement | HTMLTextAreaElement>,
    parent: RefType<HTMLDivElement>,
    invisibleContent: RefType<HTMLDivElement>,
    dirty: boolean,
    setDirty: ReactSetState<boolean>,
    calm: boolean | undefined,
    setCalm: ReactSetState<boolean | undefined>
    blurHandler: (
        e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
        callbackFn?: callBackFn<HTMLInputElement | HTMLTextAreaElement>
    ) => void,
    blurInput: (callback?: (inputRef: RefType<HTMLInputElement | HTMLTextAreaElement>) => any) => void,
    setInvisibleContent: (value: string, callback?: (invisibleContent: React.RefObject<HTMLDivElement>) => any) => void
    checkChangeDefaultValue: (defaultValue?: Nullable<string>) => void
    documentClickHandler: (e: MouseEvent) => void
    closeList: () => void
    openList: (focusable?: boolean) => void,
    keyClosersHandler: (e: React.KeyboardEvent, closers?: Array<string>) => void,
    setInputValue: (value: string, callback?: () => void) => void,
    mouseOverHandler: (e: React.MouseEvent) => void,
    mouseOutHandler: () => void,
    checkIncludes: () => boolean,
    setMaskedRef: (ref: HTMLInputElement | null) => void;
}

const useSelectedList = (defaultValue?: Nullable<string>) => {
    const list = useRef<HTMLDivElement>(null);
    const icon = useRef<HTMLSpanElement>(null);
    const input = useRef<HTMLInputElement & HTMLTextAreaElement>(null);
    let maskedInput: HTMLInputElement | null = null;
    const parent = useRef<HTMLDivElement>(null);
    const invisibleContent = useRef<HTMLDivElement>(null)
    const [dirty, setDirty] = useState<boolean>(false)
    const [calm, setCalm] = useState<boolean | undefined>(undefined)
    const InputOpenIndex = '1000'
    const IconOpenIndex = '1001'
    const InputCloseIndex = '0'
    const IconCloseIndex = '1'

    useEffect(() => {
        document.addEventListener('click', (e: MouseEvent) => methods.documentClickHandler(e))
        return () => document.removeEventListener('click', (e: MouseEvent) => methods.documentClickHandler(e))
    }, [])

    const methods: ListMethods = {
        list,
        icon,
        input,
        parent,
        invisibleContent,
        dirty,
        setDirty,
        calm,
        setCalm,
        mouseOutHandler() {

        },
        checkIncludes() {
            let includes = false
            this.list.current?.childNodes.forEach(
                (item) => {
                    const div = item as unknown as HTMLDivElement
                    if (div.classList.value.includes('includes')) {
                        includes = true
                    }
                }
            )
            return includes
        },
        mouseOverHandler(e) {
            const node = list.current
            const selector = `selected-item__${''}__preselect`       //`selected-item__${currentDomain}__preselect`
            if (node) {
                const checkSelector = node.querySelector(`.${selector}`)
                const checkIncludes = node.querySelector(`.includes`)
                if (checkIncludes || checkSelector) {
                    node.querySelector(`.${selector}`)?.classList.remove(selector)
                }
            }
        },
        blurHandler(e, callbackFn) {
            const input = list.current
            if (input) {
                input.style.borderRadius = `8px`
                input.style.top = `52px`
                input.style.borderTop = '2px solid rgba(90, 90, 90, 1)'
            }
        },
        blurInput(callback) {
            if (input.current) {
                input.current.blur()
            }
            callback && callback(input)
        },
        setInvisibleContent(value, callback) {
            invisibleContent.current ? invisibleContent.current.textContent = value : ''
            callback && callback(invisibleContent)
        },
        checkChangeDefaultValue(defaultValue) {
            this.setInputValue(defaultValue || '')
        },
        documentClickHandler(e) {
            const target = e.target as Element
            if (
                !list.current?.contains(target) &&
                list.current?.classList.value.includes('active') &&
                target !== input.current
            ) {
                this.closeList()
            }
        },
        closeList() {
            list.current?.classList.remove('active')
            input.current ? input.current.style.zIndex = InputCloseIndex : ''
            icon.current ? icon.current.style.zIndex = IconCloseIndex : ''
        },
        openList(focusable?: boolean) {
            list.current?.classList.add('active')
            icon.current ? icon.current.style.zIndex = IconOpenIndex : ''
            input.current ? input.current.style.zIndex = InputOpenIndex : ''
        },
        keyClosersHandler(e: React.KeyboardEvent, closers) {
            if (e.code === 'Tab' || e.key === 'Tab' || e.key === 'Escape' || e.code === 'Escape') {
                this.closeList()
            }
        },
        setInputValue(value: string, callback?: () => void) {
            input.current ? input.current.value = value : ''
            maskedInput ? maskedInput.value = value : ''
            callback && callback()
        },
        setMaskedRef(ref: HTMLInputElement | null) {
            if (!maskedInput)
                maskedInput = ref
        }
    }

    return methods
}

export default useSelectedList
