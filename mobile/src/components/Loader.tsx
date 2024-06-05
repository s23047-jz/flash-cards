import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    withRepeat
} from "react-native-reanimated";
import { Row, Col } from "../components";
import Logo from "../assets/images/logo.png";


const Loader = ({ showSentences = true } : { showSentences?: boolean }) => {
    const [textIndex, setTextIndex] = useState(0);
    const loadingTexts = [
        'Remember, repetition improves memory',
        'You will achieve better results if you repeat at intervals',
        'Even the best mind needs a break',
    ]

    const rotateZ = useSharedValue(0);
    const reanimatedStyles = useAnimatedStyle(() => {
        return {
            transform: [{ rotateZ: `${rotateZ.value}deg`}]
        }
    })

    useEffect(() => {
        rotateZ.value = withRepeat(withSpring(360), -1);
        if (showSentences) setTextIndex(Math.floor(Math.random() * loadingTexts.length))
    }, [])

    return (
        <View
            className="flex h-screen w-full bg-sky-500 dark:bg-blue-900 justify-center"
        >
            <View
                className='text-center w-full'
            >
                <Row className={'w-100'}>
                    <Col className={'w-full justify-center'}>
                        <Animated.Image
                            className="mx-auto object-scale-down h-40 w-40"
                            source={Logo}
                            style={ reanimatedStyles }
                        />
                    </Col>
                </Row>
                <Row className={'w-100'}>
                    <Col className={'w-full justify-center'}>
                        <Text className='ml-auto mr-auto text-lg text-center'>
                            Loading...
                        </Text>
                    </Col>
                </Row>
                { showSentences ?
                    <Row className={'w-100'}>
                        <Col className={'w-full justify-center'}>
                            <Text className='ml-auto mr-auto mt-5 text-xl font-bold p-4 text-center'>
                                { loadingTexts[textIndex] }
                            </Text>
                        </Col>
                    </Row>
                : null }
            </View>
        </View>
    )
};

export default Loader;
