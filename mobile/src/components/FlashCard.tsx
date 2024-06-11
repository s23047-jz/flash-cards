import React, {
    useState,
    useRef,
    useEffect
} from "react";
import {
    TouchableOpacity,
    View,
    Animated
} from "react-native";
import { FlashCardInterface } from "../interfaces/components";

const FlashCard: React.FC<FlashCardInterface> = (
    {
        title,
        description,
        index,
        width,
        showFrontCard
    }
    ) => {
    const [bgColor, setBgColor] = useState("#dc84f1");
    const rotation = useRef(new Animated.Value(0)).current;

    const rotateX = rotation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '180deg'],
    });

    const opacityFront = rotation.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [1, 0, 0],
    });

    const opacityBack = rotation.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [0, 0, 1],
    });

    const toggleTextAndBackgroundColor = () => {
        setBgColor(bgColor === "#dc84f1" ? "#ffdc11" : "#dc84f1");
        Animated.timing(rotation, {
            toValue: showFrontCard ? 0 : 1,
            duration: 500,
            useNativeDriver: true,
        }).start();
    };

    useEffect(() => {
        toggleTextAndBackgroundColor();
    }, [showFrontCard]);

    return (
        <View className="flex-1 w-full" style={{ width, maxHeight: 515 }}>
            <Animated.View
                style={{
                  transform: [{ rotateX }],
                  backgroundColor: bgColor,
                  flex: 1,
                  marginHorizontal: 10,
                  borderRadius: 30,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
            >
                <TouchableOpacity className={'w-full h-full border flex-1 mx-10 rounded-3xl items-center justify-center'}>
                    <Animated.Text style={{ fontSize: 18, fontWeight: 'bold', opacity: opacityFront }}>
                        {title}
                    </Animated.Text>
                    <Animated.Text style={{ fontSize: 18, fontWeight: 'bold', opacity: opacityBack, position: 'absolute', transform: [{ rotateX: '180deg'}] }}>
                        {description}
                    </Animated.Text>
                </TouchableOpacity>
            </Animated.View>
        </View>
    )
};

export default FlashCard;