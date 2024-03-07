import React from 'react';
import {View, Text, TouchableOpacity, Pressable} from 'react-native';
import {styled, useColorScheme} from "nativewind";

const StyledPressable = styled(Pressable)
const StyledText = styled(Text)

const DarkMode = () => {
    const { colorScheme, toggleColorScheme } = useColorScheme();
    return (
        <TouchableOpacity onPress={toggleColorScheme} className={'absolute right-0 top-5'}>
            <Text selectable={false} className="dark:text-white">

                {`Change mode! ${colorScheme === "dark" ? "🌙" : "🌞"}`}

            </Text>
        </TouchableOpacity>
    );
};

export default DarkMode;
