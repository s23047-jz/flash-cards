import React, {useState} from 'react';
import {View, Text, Image, TextInput, TouchableOpacity} from 'react-native';
// @ts-ignore
import Logo from '../../../assets/images/logo.png';
import DarkMode from "../DarkMode";
import {NavigationProp} from "@react-navigation/native";
import {MaterialCommunityIcons} from "@expo/vector-icons";

type SignUpScreenNavigationProp = NavigationProp<any>
interface Props {
    navigation: SignUpScreenNavigationProp;
}
const SignUpScreen: React.FC<Props> = ({navigation}) => {

    useState()

    const [email, setEmail] = useState('');
    const [nickname, setNickName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    let regMail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    let regNickname = /^[a-zA-Z0-9_]{3,20}$/;

    const handleSignUp = () => {

        if (!regNickname.test(nickname)){
            alert("Nickname is not correct")
            return 0
        }

        if (!regMail.test(email)) {
            alert("Email is not correct");
            return 0
        }

        if(password.length < 8) {
            alert("Password should contain more than 8 characters")
            return 0
        }

        if(confirmPassword != password){
            alert("Passwords are not the same")
            return 0
        }

        console.log('Nickname:', nickname)
        console.log('Email:', email);
        console.log('Password:', password);






    };

    return (
        <View className={'flex-1 items-center justify-center bg-sky-500 dark:bg-blue-900'}>
            <DarkMode></DarkMode>
            <View className="w-72 flex min-h-full flex-1 justify-center">


                <Image className="mx-auto object-scale-down h-40 w-40" source={Logo}
                />

                {/*<Text className={`text-2xl font-bold mb-6 text-white`}>Log in to your account</Text>*/}
                <TextInput
                    className={`h-10 border border-gray-300 rounded px-3 mb-3 text-white`}
                    placeholder="Nickname"
                    placeholderTextColor='rgba(255, 255, 255, 0.5)'
                    value={nickname}
                    onChangeText={setNickName}
                    keyboardType="default"
                    autoCapitalize={"none"}
                />

                <TextInput
                    className={`h-10 border border-gray-300 rounded px-3 mb-3 text-white`}
                    placeholder="Email"
                    placeholderTextColor='rgba(255, 255, 255, 0.5)'
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize={"none"}
                />

                <View className={'flex-row'}>
                    <TextInput
                        className={`h-10 border border-gray-300 rounded px-3 mb-3 flex-1 text-white`}
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
                        right={"-15%"}
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
                        className={`h-10 border border-gray-300 rounded px-3 mb-3 flex-1 text-white`}
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



                <TouchableOpacity className={'m-5 flex-row justify-center'} onPress={() => navigation.navigate('Login')}>
                    <Text className={'text-center text-white font-bold'}>Have an account? </Text>
                    <Text className={'text-center text-white font-extrabold animate-bounce scale-125'}>  Log In</Text>
                </TouchableOpacity>


            </View>
        </View>
    )
};

export default SignUpScreen;
