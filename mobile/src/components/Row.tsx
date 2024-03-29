import React from "react";

import { View } from "react-native";
import { LayoutsInterface } from "../interfaces/layouts";

const Row: React.FC<LayoutsInterface> = ({ className, children }) => {
    return (
        <View className={`flex-row ${className}`}>
            { children }
        </View>
    )
}

export default Row;
