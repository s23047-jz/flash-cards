import React, {useState} from 'react';
import {View, Text, TextInput, Image} from 'react-native';
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {ROUTES} from "../../constants";
import {Button} from "../../components";
import Plus from "../../assets/images/Plus.png";
import {ScreenProps} from "../../interfaces/screen";

const MyPublicDecks: React.FC<ScreenProps> = ({ navigation, route }) => {
    useState();
    const [search, setSearch] = useState("");
    return (
        <View className="flex-1 items-center justify-center bg-sky-500 dark:bg-blue-900 placeholder-gray-400">
            <Text className="text-white font-extrabold animate-bounce scale-150 absolute top-16 right-14">
                My Downloaded Decks
            </Text>
            <View className=" top-14 absolute left-6">
                <MaterialCommunityIcons
                    onPress={() => navigation.goBack()}
                    size={30}
                    name="arrow-left-bold"
                    color="white"
                />
            </View>
            <View className="flex-row absolute top-32">
                <TextInput
                    className="h-10 w-72 border border-gray-300 rounded-xl px-3 mb-3 text-gray-700 bg-white"
                    placeholder="Search"
                    value={search}
                    onChangeText={setSearch}
                    autoCapitalize="none"
                />
                <MaterialCommunityIcons
                    position="absolute"
                    right="2%"
                    top="10%"
                    size={30}
                    className="w-max h-max"
                    name="magnify"
                    color="black"
                />
            </View>

            <Button
                className={'p-3 m-5 w-60 h-16 justify-center mr-auto ml-auto rounded-3xl'}>
                <Text className="mx-5 font-bold">Example deck name</Text>
                <Text className="mx-5 font-bold">Category</Text>
            </Button>
        </View>
    );
};

export default MyPublicDecks;
