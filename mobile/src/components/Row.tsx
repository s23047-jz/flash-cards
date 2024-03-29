import React from "react";

import { View } from "react-native";
import { LayoutsInterface } from "../interfaces/layouts";

export const Row: React.FC<LayoutsInterface> = ({ classNames, children }) => {
    return (
        <View className={`flex-row ${classNames}`}>
            { children }
        </View>
    )
}
