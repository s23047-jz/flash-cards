import React from "react";

import { View } from "react-native";
import { LayoutsInterface } from "../interfaces/layouts";

export const Row: React.FC<LayoutsInterface> = ({ children, className }) => {
    return (
        <View className={`flex-row ${className}`}>
            { children }
        </View>
    )
}
