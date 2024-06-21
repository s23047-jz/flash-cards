import React, { useState, useRef } from "react";
import {
    FlatList,
    Animated,
    View,
    Text
} from "react-native";
import {
    Button,
    Col,
    Row,
    Paginator,
    VoiceControlInstructionItem,
    CModal
} from "./index";
import voiceControlData from "../data/voiceControlData";
import { styles } from "../assets/styles";

const VoiceControlInstructionModal = ({ visible, onClose }: { visible: boolean, onClose: (close: boolean) => void }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollX = useRef(new Animated.Value(0)).current
    const instructionRef = useRef(null);
    const viewableItemsChanged = useRef(({ viewableItems }) => {
        setCurrentIndex(viewableItems[0].index)
    }).current
    const [parentWidth, setParentWidth] = useState(0);

    const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50}).current

    const onParentLayout = (event) => {
        const { width } = event.nativeEvent.layout;
        setParentWidth(width);
    };

    return (
        <CModal
            visible={visible}
            animationType={'fade'}
            transparent={true}
        >
            <View className={'bg-sky-500 dark:bg-blue-900 w-full rounded-xl p-4'}>
                <Row className={'w-full'}>
                    <Col className={'w-full'} onLayout={onParentLayout}>
                        <FlatList
                            data={voiceControlData}
                            initialNumToRender={7}
                            renderItem={({ item }) => <VoiceControlInstructionItem item={item} parentWidth={parentWidth} />}
                            horizontal
                            showsHorizontalScrollIndicator
                            pagingEnabled
                            bounces={false}
                            keyExtractor={(item) => item.id}
                            onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }],
                                { useNativeDriver: false }
                            )}
                            scrollEventThrottle={32}
                            viewabilityConfig={viewConfig}
                            onViewableItemsChanged={viewableItemsChanged}
                            ref={instructionRef}
                        />
                        </Col>
                </Row>
                { currentIndex === voiceControlData.length - 1 ?
                    <Row className={'w-full mt-2'} >
                        <Col className={'w-full justify-center items-center mt-2'}>
                            <Button onPress={() => onClose(false)} style={styles.button}>
                                <Text className={'text-center text-xl p-2'}>
                                    Close
                                </Text>
                            </Button>
                        </Col>
                    </Row>
                    : null
                }
                <Row className={'w-full mt-2'} >
                    <Col className={'w-full'}>
                        <Paginator data={voiceControlData} scrollX={scrollX} parentWidth={parentWidth} />
                    </Col>
                </Row>
            </View>
        </CModal>
    )
}

export default VoiceControlInstructionModal;
