import React from "react";

import { TouchableOpacity } from "react-native";
import { LayoutsInterface } from "../interfaces/layouts";

const Button: React.FC<LayoutsInterface> = ({ className, children }) => {
    return (
        <TouchableOpacity className={`bg-cyan-400 border-sky-600 border-2 rounded-md object-scale-down ${className}`}>
            { children }
        </TouchableOpacity>
    )
}

export default Button;
