import { ReactNode, CSSProperties } from "react";

export interface ComponentsInterface {
    children?: ReactNode,
    style?: CSSProperties,
    className?: string,
    disabled?: boolean,
    onPress?: () => void
}

export interface ModalInterface extends ComponentsInterface {
    visible: boolean,
    animationType: string,
    transparent: boolean
}
