import React, { useState, useRef } from "react";
import {
    FlatList,
    Animated,
    View
} from "react-native";
import Row from "./Row";
import Col from "./Col";
import Paginator from "./Paginator";
import VoiceControlInstructionItem from "./VoiceControlInstructionItem";
import CModal from "./CModal";
import voiceControlData from "../data/voiceControlData";

const VoiceControlInstructionModal = ({ visible }: { visible: boolean }) => {
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
