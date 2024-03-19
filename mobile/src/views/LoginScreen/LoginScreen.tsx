import { MaterialCommunityIcons } from "@expo/vector-icons";
import { NavigationProp } from "@react-navigation/native";
import React, { useState } from "react";
import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";

// @ts-ignore
import Logo from "../../assets/images/logo.png";
import { InputValidator } from "../../components/Validator/InputValidator";

{
  /* import DarkMode from "../../components/DarkMode"; */
}

interface Props {
  navigation: any;
  LoginMode: any;
}

const LoginScreen: React.FC<Props> = ({ navigation, LoginMode }) => {
  useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleLogin = () => {
    {
      /* validation */
    }
    if (
      InputValidator("email", email) &&
      InputValidator("password", password)
    ) {
      {
        /* handle login with api */
      }
      console.log("Email:", email);
      console.log("Password:", password);
      LoginMode();
    }
  };

  return (
    <View className="flex-1 items-center justify-center bg-sky-500 dark:bg-blue-900">
      <View className="w-72 flex min-h-full flex-1 justify-center">
        <Image className="mx-auto object-scale-down h-40 w-40" source={Logo} />

        {/*<Text className={`text-2xl font-bold mb-6 text-white`}>Log in to your account</Text>*/}
        <TextInput
          className="h-10 border border-gray-300 rounded px-3 mb-3 text-white"
          placeholder="Email"
          placeholderTextColor="rgba(255, 255, 255, 0.5)"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <View className="flex-row">
          <TextInput
            className="h-10 border border-gray-300 rounded px-3 mb-3 flex-1 text-white"
            placeholder="Password"
            placeholderTextColor="rgba(255, 255, 255, 0.5)"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            autoCapitalize="none"
            accessibilityElementsHidden
          />
          <MaterialCommunityIcons
            position="absolute"
            right="2%"
            top="10%"
            size={30}
            className="w-max h-max"
            name={showPassword ? "eye-off" : "eye"}
            color="white"
            onPress={toggleShowPassword}
          />
        </View>

        <TouchableOpacity
          className={` bg-green-500 rounded p-3`}
          onPress={handleLogin}
        >
          <Text className="text-center text-white font-bold">Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="m-5"
          onPress={() => navigation.navigate("ForgotPass")}
        >
          <Text className="text-center text-white font-bold">
            Forgot Password?
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="m-5 flex-row justify-center"
          onPress={() => navigation.navigate("SignUp")}
        >
          <Text className="text-center text-white font-bold">
            Dont have an account?{" "}
          </Text>
          <Text className="text-center text-white font-extrabold animate-bounce scale-125">
            {" "}
            Sign up
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default LoginScreen;
