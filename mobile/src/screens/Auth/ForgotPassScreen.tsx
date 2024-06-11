import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Alert
} from "react-native";
import { ROUTES } from "../../constants";

// @ts-ignore
import Logo from "../../assets/images/logo.png";
import { InputValidator } from "../../components/Validator/InputValidator";
import { ScreenProps } from "../../interfaces/screen";

const ForgotPassScreen: React.FC<ScreenProps> = ({ navigation }) => {
  useState();
  const [email, setEmail] = useState("");

  const handleForgot = () => {
    {
      /* validation */
    }
    if (InputValidator("email", email)) {
      {
        /* handle recovery with api */
      }
      Alert.alert("Check email", "Password recovery sent to your email!");
    }
  };

  return (
    <View className="flex-1 items-center justify-center bg-sky-500 dark:bg-blue-900">
      <View className="w-72 flex min-h-full flex-1 justify-center">
        <Image className="mx-auto object-scale-down h-40 w-40" source={Logo} />

        {/*<Text className={`text-2xl font-bold mb-6 text-white`}>Log in to your account</Text>*/}
        <TextInput
          className="h-10 border border-gray-300 rounded-xl px-3 mb-3 text-white"
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          placeholderTextColor="rgba(255, 255, 255, 0.5)"
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TouchableOpacity
          className={` bg-green-500 rounded p-3`}
          onPress={handleForgot}
        >
          <Text className="text-center text-white font-bold">
            Recover account
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="m-5 flex-row justify-center"
          onPress={() => navigation.navigate(ROUTES.LOGIN)}
        >
          <Text className="text-center text-white font-bold">Return to </Text>
          <Text
              className="text-center text-white font-extrabold animate-bounce scale-125"
              onPress={() => navigation.navigate(ROUTES.LOGIN)}
          >
            {" "}
            Log In
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default ForgotPassScreen;
