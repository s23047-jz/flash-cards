import React from "react";

import { View } from "react-native";
import { LayoutsInterface } from "../interfaces/layouts";

const Row: React.FC<LayoutsInterface> = ({ className, children }) => {
    return (
        <View className={`flex flex-wrap ${className}`}>
            { children }
        </View>
    )
}

export default Row;
