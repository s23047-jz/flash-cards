import React from 'react';
import {View, Text, Image} from 'react-native';
import {ScreenProps} from "../../interfaces/screen";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import GreenCards from "../../assets/images/greencards.png";
import {Button} from "../../components";

const DisplayDeck: React.FC<ScreenProps> = ({ navigation, route }) => {
    return (

        <View className="flex-1 bg-sky-500 dark:bg-blue-900 placeholder-gray-400">
            <Text className="text-white font-extrabold animate-bounce scale-150 absolute top-16 right-10">
                {/* DECK TITTLE */}
                Deck Preview
            </Text>
            <View className=" top-14 absolute left-6">
                <MaterialCommunityIcons
                    onPress={() => navigation.goBack()}
                    size={30}
                    name="arrow-left-bold"
                    color="white"
                />
            </View>
            <View className={"flex-1 top-36 pb-36"}>
                <Text className={"text-white font-bold scale-150 left-40"}>
                    Deck Tittle
                </Text>
                <Text className={"text-white font-bold scale-125 left-28 mt-2 mb-4"}>
                    Number of flashcards: 0
                </Text>

                <Button
                    className={'p-3 m-3 w-72 h-16 justify-center mr-auto ml-auto rounded-3xl'}>
                    <Text className="scale-125 font-bold text-center justify-center" >Review flashcards</Text>
                    <Text className="font-bold text-center justify-center">Create, edit and delete</Text>
                </Button>

                <Button
                    className={'p-3 m-3 w-72 h-16 bg-pink-500 justify-center mr-auto ml-auto rounded-3xl'}>
                    <Text className="scale-125 font-bold text-center justify-center" >Learn with flashcards</Text>
                    <Text className="font-bold text-center justify-center">Repeat and memorize</Text>
                </Button>

                <Button
                    className={'p-3 m-3 w-72 h-16 bg-blue-500 justify-center mr-auto ml-auto rounded-3xl'}>
                    <Text className="scale-125 font-bold text-center justify-center" >Voice control</Text>
                    <Text className="font-bold text-center justify-center">Repeat and memorize in voice mode</Text>
                </Button>

                <Button
                    className={'p-3 m-3 w-72 h-16 bg-green-400 justify-center mr-auto ml-auto rounded-3xl'}>
                    <Text className="scale-125 font-bold text-center justify-center" >Memorized flashcards</Text>
                    <Text className="font-bold text-center justify-center">to be continued</Text>
                </Button>

                <Button
                    className={'p-3 m-3 w-72 h-16 bg-red-500 mr-auto ml-auto rounded-3xl'}>
                    <Text className="scale-125 font-bold text-center justify-center" >Unremembered flashcards</Text>
                    <Text className="font-bold text-center justify-center">to be continued</Text>
                </Button>

            </View>
        </View>
    );
};

export default DisplayDeck;
