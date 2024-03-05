import React, {useState} from 'react';
// @ts-ignore
import Logo from '../../../assets/images/logo.png';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {View, Text, Image, TextInput, TouchableOpacity} from 'react-native';

const LoginScreen = () => {
    useState()

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    const handleLogin = () => {
        if (reg.test(email) === false) {
            alert("Email is not correct");
        }else if(password === "" ){
            alert("Password is empty")
        }else{
            console.log('Email:', email);
            console.log('Password:', password);
        }

    };

    return (
        <View className="flex min-h-full flex-1 flex-col justify-center">
            {/*<View className="hero container max-w-screen-lg mx-auto pb-10"> */}
            <Image
                    className="mx-auto object-scale-down h-40 w-40"
                    source={Logo}
            />
                {/*<Text className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Log in to your account
                </Text>*/}
            <Text className={`text-2xl font-bold mb-6 text-white`}>Log in to your account</Text>
            <TextInput
                className={`h-10 border border-gray-300 rounded px-3 mb-3`}
                placeholder="Email"
                placeholderTextColor='white'
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize={"none"}
            />

            <View className={'flex-row items-center relative'}>
                <TextInput
                    className={`h-10 border border-gray-300 rounded px-3 mb-3 flex-1 `}
                    placeholder="Password"
                    placeholderTextColor='white'
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    autoCapitalize={"none"}
                    accessibilityElementsHidden={true}
                />
                <MaterialCommunityIcons
                    position='absolute'
                    right={"-15%"}
                    top={"10%"}
                    size={30}
                    className={'w-max h-max'}
                    name={showPassword ? 'eye-off' : 'eye'}
                    color="white"
                    onPress={toggleShowPassword}
                />
            </View>

            <TouchableOpacity
                className={` bg-green-500 rounded p-3`}
                onPress={handleLogin}
            >
                <Text className={`text-center text-white font-bold`}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity className={'m-5'}>
                <Text className={'text-center text-white font-bold'}>Forgot Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity className={'m-5 flex-row'  }>
                <Text className={'text-center text-white font-bold'}>Dont have an account? </Text>
                <Text className={'text-center text-white font-extrabold animate-bounce scale-125'}>  Sign up</Text>
            </TouchableOpacity>


        </View>
    )
}
export default LoginScreen;
