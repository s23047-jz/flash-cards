import React, {useState} from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {View, Text, Image, TextInput, TouchableOpacity} from 'react-native';
// @ts-ignore
import Logo from '../../../assets/images/logo.png';
import DarkMode from "../../components/DarkMode";
import {NavigationProp, StackNavigationState} from "@react-navigation/native";

type LoginScreenNavigationProp = NavigationProp<any>

interface Props {
    navigation: LoginScreenNavigationProp;
}

const ForgotPassScreen: React.FC<Props> = ({navigation}) => {
    useState()
    const [email, setEmail] = useState('');
    let regMail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    const handleForgot = () => {
        if (!regMail.test(email)) {
            alert("Email is not correct");
            return 0
        }
        alert("Recovery email sent!")
    }

    return (
        <View className={'flex-1 items-center justify-center bg-sky-500 dark:bg-blue-900'}>
            <DarkMode></DarkMode>
            <View className="w-72 flex min-h-full flex-1 justify-center">


                <Image className="mx-auto object-scale-down h-40 w-40" source={Logo}
                />

                {/*<Text className={`text-2xl font-bold mb-6 text-white`}>Log in to your account</Text>*/}
                <TextInput
                    className={`h-10 border border-gray-300 rounded px-3 mb-3 text-white`}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    placeholderTextColor='rgba(255, 255, 255, 0.5)'
                    keyboardType="email-address"
                    autoCapitalize={"none"}
                />

                <TouchableOpacity
                    className={` bg-green-500 rounded p-3`}
                    onPress={handleForgot}
                >
                    <Text className={`text-center text-white font-bold`}>Recover account</Text>
                </TouchableOpacity>

                <TouchableOpacity className={'m-5 flex-row justify-center'} onPress={() => navigation.navigate('Login')}>
                    <Text className={'text-center text-white font-bold'}>Return to </Text>
                    <Text className={'text-center text-white font-extrabold animate-bounce scale-125'}>  Log In</Text>
                </TouchableOpacity>


            </View>
        </View>
    )
};

export default ForgotPassScreen;
