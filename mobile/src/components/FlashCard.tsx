import React, { useState, useRef } from "react";
import {
    Text,
    TouchableOpacity,
    View,
    Animated
} from "react-native";
import { Button } from "./index";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FlashCardInterface } from "../interfaces/components";

const FlashCard: React.FC<FlashCardInterface> = (
    {
        title,
        description,
        handleCardNavigation,
        index,
        width
    }
    ) => {
    const [showText, setShowText] = useState(false);
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
        setShowText(!showText);
        setBgColor(bgColor === "#dc84f1" ? "#ffdc11" : "#dc84f1");
        Animated.timing(rotation, {
            toValue: showText ? 0 : 1,
            duration: 500,
            useNativeDriver: true,
        }).start();
    };


    return (
        <View className="flex-1 w-full" style={{ width }}>
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
                <TouchableOpacity className={'w-full h-full border flex-1 mx-10 rounded-3xl items-center justify-center'} onPress={toggleTextAndBackgroundColor}>
                    <Animated.Text style={{ fontSize: 18, fontWeight: 'bold', backgroundColor: 'blue', opacity: opacityFront }}>
                        {title}
                    </Animated.Text>
                    <Animated.Text style={{ fontSize: 18, fontWeight: 'bold', backgroundColor: 'blue', opacity: opacityBack, position: 'absolute', transform: [{ rotateX: '180deg'}] }}>
                        {description}
                    </Animated.Text>
                </TouchableOpacity>
            </Animated.View>

            <View className="flex-row items-center justify-center">
                <Button onPress={() => handleCardNavigation(false, index)} className="w-32 h-16 bg-red-600 dark:bg-red-600 items-center justify-center m-3">
                    <MaterialCommunityIcons
                        size={60}
                        name="close-thick"
                        color="black"
                    />
                </Button>

                <Button onPress={() => handleCardNavigation(true, index)} className="w-32 h-16 bg-green-400 dark:bg-green-400 items-center justify-center m-3">
                    <MaterialCommunityIcons
                        size={60}
                        name="check-bold"
                        color="black"
                    />
                </Button>
            </View>
        </View>
    )
};

export default FlashCard;