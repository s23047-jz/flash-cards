import React from "react";

import { View } from "react-native";
import { ComponentsInterface } from "../interfaces/components";

const Row: React.FC<ComponentsInterface> = ({ className, style, children }) => {
    return (
        <View className={`flex flex-wrap ${className}`} style={style}>
            { children }
        </View>
    )
}

export default Row;
