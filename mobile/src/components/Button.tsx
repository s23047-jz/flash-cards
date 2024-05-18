import React from "react";

import { TouchableOpacity } from "react-native";
import { ComponentsInterface } from "../interfaces/components";

const Button: React.FC<ComponentsInterface> = ({ className, style,  disabled, onPress, children }) => {
    return (
        <TouchableOpacity className={`bg-cyan-400 dark:bg-blue-500 border-sky-600 border-2 rounded-md object-scale-down ${className}`} onPress={onPress} disabled={disabled} style={style}>
            { children }
        </TouchableOpacity>
    )
}

export default Button;
