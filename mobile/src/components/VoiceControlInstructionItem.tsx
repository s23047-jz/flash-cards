import React from "react";
import { View, Text } from "react-native";
import { VoiceControlInstructionItemInterface } from "../interfaces/components";
import { Row, Col } from "./index";

const VoiceControlInstructionItem: React.FC<VoiceControlInstructionItemInterface> = ({ item, parentWidth }) => {
    return (
        <View className={'w-full'} style={{ width: parentWidth }}>
            <Row className={'w-full mt-5'}>
                <Col className={'w-full justify-center items-center text-center'}>
                    <Text className={'text-center font-bold text-lg p-3'}>
                        { item.title }
                    </Text>
                </Col>
            </Row>
            <Row className={'w-full justify-center mt-3'}>
                <Col className={'w-full justify-center items-center text-center'}>
                    <Text className={'text-center'}>
                        { item.description }
                    </Text>
                </Col>
            </Row>
        </View>
    )
}

export default VoiceControlInstructionItem;
