import React from "react";

import { TouchableOpacity } from "react-native";
import { ComponentsInterface } from "../interfaces/components";

const Button: React.FC<ComponentsInterface> = ({ className, disabled, onPress, children }) => {
    return (
        <TouchableOpacity className={`bg-cyan-400 dark:bg-blue-500 border-sky-600 border-2 rounded-md object-scale-down ${className}`} onPress={onPress} disabled={disabled}>
            { children }
        </TouchableOpacity>
    )
}

export default Button;
