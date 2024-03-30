import React from "react";

import { View } from "react-native";
import { LayoutsInterface } from "../interfaces/layouts";

const Col: React.FC<LayoutsInterface> = ({ className, children }) => {
    return (
        <View className={`flex flex-col ${className}`}>
            { children }
        </View>
    )
}

export default Col;
