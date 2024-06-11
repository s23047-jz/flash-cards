import { ReactNode, CSSProperties } from "react";

export interface ComponentsInterface {
    children?: ReactNode,
    style?: CSSProperties,
    className?: string,
    disabled?: boolean,
    onPress?: () => void
    onLayout?: () => void
}

export interface ModalInterface extends ComponentsInterface {
    visible: boolean,
    animationType: string,
    transparent: boolean
}

interface VoiceControlInstructionItemDataInterface {
    id: string
    title: string
    description: string
}

export interface VoiceControlInstructionItemInterface {
    item: VoiceControlInstructionItemDataInterface,
    parentWidth?: number
}

export interface PaginatorInterface {
    data: object[]
    scrollX: any,
    parentWidth?: number
}

export interface FlashCardInterface {
    index: number
    title: string
    description?: string
    width?: number
    showFrontCard: boolean

}
