import React from 'react';
import {View, Text, TouchableOpacity, Pressable} from 'react-native';
import {styled, useColorScheme} from "nativewind";
import {Button} from "../../components";

const StyledPressable = styled(Pressable)
const StyledText = styled(Text)

const DarkMode = () => {
    const { colorScheme, toggleColorScheme } = useColorScheme();
    return (

        <Button className='w-full p-2'onPress={toggleColorScheme}>
            <Text className={"mx-5 font-bold text-xl"}>
            {`Change mode! ${colorScheme === "dark" ? "🌙" : "🌞"}`}
            </Text>
        </Button>

    );
};

export default DarkMode;
