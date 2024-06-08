import React from "react";

import { View } from "react-native";
import { ComponentsInterface } from "../interfaces/components";

const Col: React.FC<ComponentsInterface> = ({ className, style, onLayout,  children }) => {
    return (
        <View className={`flex flex-grow min-w-0 max-w-full ${className}`} style={style} onLayout={onLayout}>
            { children }
        </View>
    )
}

export default Col;
