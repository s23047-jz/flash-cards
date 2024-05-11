import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { MotiImage } from "moti";
import Logo from "../assets/images/logo.png";


const Loader = () => {
    const [textIndex, setTextIndex] = useState(0);
    const loadingTexts = [
        'Remember, repetition improves memory',
        'You will achieve better results if you repeat at intervals',
        'Even the best mind needs a break',
    ]

    useEffect(() => {
        setTextIndex(Math.floor(Math.random() * loadingTexts.length))
    }, [])

    return (
        <View
            className="flex h-screen w-full bg-sky-500 dark:bg-blue-900 justify-center"
        >
            <View
                className='text-center w-full'
            >
                {/*
                <MotiImage
                    className="mx-auto object-scale-down h-40 w-40"
                    source={Logo}
                    style={{
                        transform: [{rotateZ: '-40deg'}],
                    }}
                    animate={{
                        transform: [{rotateZ: '40deg'}]
                    }}
                    from={{
                        transform: [{rotateZ: '-40deg'}]
                    }}
                    transition={{
                        type: 'timing',
                        duration: 1000,
                        loop: true
                    }}
                />
                */}

                <Text className='ml-auto mr-auto text-lg'>
                    Loading...
                </Text>
                <Text className='ml-auto mr-auto mt-5 text-xl font-bold p-4 text-center'>
                    { loadingTexts[textIndex] }
                </Text>
            </View>
        </View>
    )
};

export default Loader;
