import React, {useState} from 'react';
import {View, Text, Image, TextInput, TouchableOpacity} from 'react-native';
// @ts-ignore
import Logo from '../../assets/images/logo.png';
import {MaterialCommunityIcons} from "@expo/vector-icons";
import { InputValidator } from "../../components/Validator/InputValidator";
import { ConfirmPassValidator } from "../../components/Validator/InputValidator";
import {ROUTES} from "../../constants";
import { ScreenProps } from "../../interfaces/screen";
import {AuthService} from "../../services/auth";
import {ActiveUser} from "../../services/user";


const SignUpScreen: React.FC<ScreenProps> = ({navigation}) => {

    useState()

    const [email, setEmail] = useState('');
    const [nickname, setNickName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleSignUp = async () => {
        {/* validation */}
        if(
        InputValidator("nickname", nickname) &&
        InputValidator("email", email) &&
        InputValidator("password", password) &&
        ConfirmPassValidator(password, confirmPassword)
        ){
            {/* handle sign up with api */}
            console.log('Nickname:', nickname)
            console.log('Email:', email);
            console.log('Password:', password);
        }
        const body = {
            email,
            password,
            username: nickname,
            re_password: confirmPassword
        }
        const { res } = await AuthService.register(body);
        if ([200, 201].includes(res.status)) navigation.navigate(ROUTES.LOGIN);
    };

    return (
        <View className={'flex-1 items-center justify-center bg-sky-500 dark:bg-blue-900'}>
            <View className="w-72 flex min-h-full flex-1 justify-center">


                <Image className="mx-auto object-scale-down h-40 w-40" source={Logo}
                />

                {/*<Text className={`text-2xl font-bold mb-6 text-white`}>Log in to your account</Text>*/}
                <TextInput
                    className={`h-10 border border-gray-300 rounded-xl px-3 mb-3 text-white`}
                    placeholder="Nickname"
                    placeholderTextColor='rgba(255, 255, 255, 0.5)'
                    value={nickname}
                    onChangeText={setNickName}
                    keyboardType="default"
                    autoCapitalize={"none"}
                />

                <TextInput
                    className={`h-10 border border-gray-300 rounded-xl px-3 mb-3 text-white`}
                    placeholder="Email"
                    placeholderTextColor='rgba(255, 255, 255, 0.5)'
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize={"none"}
                />

                <View className={'flex-row'}>
                    <TextInput
                        className={`h-10 border border-gray-300 rounded-xl px-3 mb-3 flex-1 text-white`}
                        placeholder="Password"
                        placeholderTextColor='rgba(255, 255, 255, 0.5)'
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={!showPassword}
                        autoCapitalize={"none"}
                        accessibilityElementsHidden={true}
                    />
                    <MaterialCommunityIcons
                        position='absolute'
                        right={"2%"}
                        top={"10%"}
                        size={30}
                        className={'w-max h-max'}
                        name={showPassword ? 'eye-off' : 'eye'}
                        color="white"
                        onPress={toggleShowPassword}
                    />
                </View>

                <View className={'flex-row'}>
                    <TextInput
                        className={`h-10 border border-gray-300 rounded-xl px-3 mb-3 flex-1 text-white`}
                        placeholder="Confirm password"
                        placeholderTextColor='rgba(255, 255, 255, 0.5)'
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        secureTextEntry={!showPassword}
                        autoCapitalize={"none"}
                        accessibilityElementsHidden={true}
                    />
                </View>

                <TouchableOpacity
                    className={` bg-green-500 rounded p-3`}
                    onPress={handleSignUp}
                >
                    <Text className={`text-center text-white font-bold`}>Sign Up</Text>
                </TouchableOpacity>



                <TouchableOpacity className={'m-5 flex-row justify-center'} onPress={() => navigation.navigate(ROUTES.LOGIN)}>
                    <Text className={'text-center text-white font-bold'}>Have an account? </Text>
                    <Text className={'text-center text-white font-extrabold animate-bounce scale-125'}>  Log In</Text>
                </TouchableOpacity>


            </View>
        </View>
    )
};

export default SignUpScreen;
