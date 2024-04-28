import React, {useState} from 'react';
import {View, Text, TextInput, Image} from 'react-native';
import {ScreenProps} from "../../interfaces/screen";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {ROUTES} from "../../constants";
import {Button} from "../../components";


const CreateDeck: React.FC<ScreenProps> = ({ navigation, route }) => {
    useState();
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");

    return (
        <View className="flex-1 items-center justify-center bg-sky-500 dark:bg-blue-900 placeholder-gray-400">
            <Text className="text-white font-extrabold animate-bounce scale-150 absolute top-16 right-10">
                Create Deck
            </Text>
            <View className=" top-14 absolute left-6">
                <MaterialCommunityIcons
                    onPress={() => navigation.navigate(ROUTES.MYDECKS)}
                    size={30}
                    name="arrow-left-bold"
                    color="white"
                />
            </View>


            <View className="m-3">
                <Text className="text-base mb-3 left-12 text-white font-bold scale-125">Title:</Text>
                <TextInput
                    className="h-10 w-72 border border-gray-300 rounded-xl px-3 mb-3 text-gray-700 bg-white"
                    autoCapitalize="none"
                    onChangeText={setTitle}
                />
            </View>

            <View className="m-3">
                <Text className="text-base mb-3 left-12 text-white font-bold scale-125">Category:</Text>
                <TextInput
                    className="h-10 w-72 border border-gray-300 rounded-xl px-3 mb-3 text-gray-700 bg-white"
                    autoCapitalize="none"
                    onChangeText={setCategory}
                />
            </View>


            <View className={"flex-row"}>
            <Button
                onPress={() => navigation.navigate(ROUTES.CREATEDECK)}
                className={'p-3 w-25 h-16 justify-center m-2 rounded-3xl'}>
                <Text className="mx-5 font-bold">Cancel</Text>
            </Button>
                <Button
                    onPress={() => navigation.navigate(ROUTES.CREATEDECK)}
                    className={'p-3 w-25 h-16 justify-center m-2 rounded-3xl'}>
                    <Text className="mx-5 font-bold">Create</Text>
                </Button>
            </View>

        </View>
    );
};

export default CreateDeck;
