import { ReactNode } from "react";

export interface ComponentsInterface {
    children?: ReactNode,
    className?: string,
    disabled?: boolean,
    onPress?: () => void
}