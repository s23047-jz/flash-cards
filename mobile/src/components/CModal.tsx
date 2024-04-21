import React from "react";

import {Modal, View} from "react-native";
import { ModalInterface } from "../interfaces/components";

const CModal: React.FC<ModalInterface> = ({ className, visible, animationType, transparent, children }) => {
    return (
        <Modal
            className={`${className}`}
            visible={visible}
            transparent={transparent}
            animationType={animationType}
        >
            <View className={'bg-zinc-700 items-center justify-center px-3 flex-1'}>
                { children }
            </View>
        </Modal>
    )
}

export default CModal;
