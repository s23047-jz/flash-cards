import React from "react";
import { View, Text } from "react-native";
import { VoiceControlInstructionItemInterface } from "../interfaces/components";

const VoiceControlInstructionItem: React.FC<VoiceControlInstructionItemInterface> = ({ item }) => {
    return (
        <View className={'w-full h-full'}>
            <View className={'w-full'}>
                <Text className={'text-center font-bold'}>{ item.title }</Text>
                <Text className={'text-center'}>{ item.description }</Text>
            </View>
        </View>
    )
}

export default VoiceControlInstructionItem;
