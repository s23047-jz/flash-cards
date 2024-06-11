import React from "react";
import { Image, View, Modal } from "react-native";
import {
    Microphone_red,
    Microphone
} from "../assets/images";

const MicrophoneModal = ({ show, active }: { show: boolean, active: boolean }) => {
    return (
        <Modal
            visible={show}
            animationType={'fade'}
            transparent={true}
            >
            <View className={'w-full h-full justify-end items-center'}>
                <View className={'w-full dark:bg-sky-500 bg-blue-900 p-2 rounded-xl justify-center items-center'} style={{maxWidth: 300}}>
                    <Image
                        className="h-10"
                        resizeMode="contain"
                        source={active ? Microphone_red : Microphone}
                    />
                </View>
            </View>
        </Modal>
    )
}

export default MicrophoneModal;
