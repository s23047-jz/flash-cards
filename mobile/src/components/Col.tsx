import React from "react";

import { View } from "react-native";
import { LayoutsInterface } from "../interfaces/layouts";

export const Col: React.FC<LayoutsInterface> = ({ children, classNames }) => {
    return (
        <View className={`flex-col ${classNames}`}>
            { children }
        </View>
    )
}
