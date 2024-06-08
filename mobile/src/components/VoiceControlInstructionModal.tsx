import React, { useState, useRef } from "react";
import {
    FlatList,
    Animated,
    View
} from "react-native";
import {
    CModal,
    VoiceControlInstructionItem,
    Paginator
} from "./index";
import voiceControlData from "../data/voiceControlData";

const VoiceControlInstructionModal = ({ visible }: { visible: boolean }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollX = useRef(new Animated.Value(0)).current
    const instructionRef = useRef(null);
    const viewableItemsChanged = useRef(({ viewableItems }) => {
        setCurrentIndex(viewableItems[0].index)
    }).current

    const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50}).current

    return (
        <CModal
            visible={visible}
            animationType={'fade'}
            transparent={true}
        >
            <View className={'flex-1'}>
                <FlatList
                    data={voiceControlData}
                    renderItem={({ item }) => <VoiceControlInstructionItem item={item} /> }
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
            </View>
            <Paginator data={voiceControlData} scrollX={scrollX} />
        </CModal>
    )
}

export default VoiceControlInstructionModal;
