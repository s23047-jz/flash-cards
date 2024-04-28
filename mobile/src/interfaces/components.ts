import { ReactNode } from "react";

export interface ComponentsInterface {
    children?: ReactNode,
    className?: string,
    disabled?: boolean,
    onPress?: () => void
}

export interface ModalInterface extends ComponentsInterface {
    visible: boolean,
    animationType: string,
    transparent: boolean
}
