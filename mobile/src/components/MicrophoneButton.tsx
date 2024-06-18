import React from "react";
import { Image, TouchableOpacity, View } from "react-native";
import {
    Microphone_red,
    Microphone
} from "../assets/images";

const MicrophoneButton = ({ show, active, onPress }: { show: boolean, active: boolean, onPress: () => Promise<void> }) => {
    return (
        <View
            style={[{ opacity: show ? 1 : 0, position: 'absolute', bottom: 0, zIndex: 120 }]}
            className={'w-full items-center'}
        >
            <TouchableOpacity
                onPress={async () => {await onPress();}}
                className={'w-full dark:bg-sky-500 bg-blue-900 p-2 rounded-xl justify-center items-center'}
                style={{maxWidth: 300}}
            >
                <Image
                    className="h-10"
                    resizeMode="contain"
                    source={active ? Microphone_red : Microphone}
                />
            </TouchableOpacity>
        </View>
    )
}

export default MicrophoneButton;
