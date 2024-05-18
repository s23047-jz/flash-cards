import React from "react";

import { View } from "react-native";
import { ComponentsInterface } from "../interfaces/components";

const Card: React.FC<ComponentsInterface> = ({ className, style, children }) => {
    return (
        <View className={`bg-cyan-400 dark:bg-blue-500 border-blue-800 border-2 rounded-md p-3 ${className}`} style={style}>
            { children }
        </View>
    )
}

export default Card;
