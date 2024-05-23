import React from 'react';
import {View, Text, Image} from 'react-native';
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {ScreenProps} from "../../interfaces/screen";
import {DeckListInterface} from "../../interfaces/decks";
import {Button} from "../../components";
import {ROUTES} from "../../constants";
import Plus from "../../assets/images/Plus.png";

const FlashCard: React.FC<DeckListInterface> = ({ id, SideA, SideB }) => {
    return (
        <Button
            className={'p-3 m-3 w-72 h-16 justify-center mr-auto ml-auto rounded-3xl'}>
            <Text className="ml-16 font-bold" >{SideA}</Text>
            <Text className="ml-16 font-bold">{SideB}</Text>
            {/* PRZYCISKI EDIT DELETE */}
        </Button>
    )}

const DisplayFlashcards: React.FC<ScreenProps> = ({ navigation, route }) => {
    const { deck } = route.params;
    const handleCreateFlashcards = async () => {
        navigation.navigate(ROUTES.CREATE_FLASHCARD, { deck: deck })
    }

    return (
        <View className="flex-1 bg-sky-500 dark:bg-blue-900 placeholder-gray-400 justify-center items-center">
            <Text className="text-white font-extrabold animate-bounce scale-150 absolute top-16 right-12">
                Flashcards Preview
            </Text>
            <View className=" top-14 absolute left-6">
                <MaterialCommunityIcons
                    onPress={() => navigation.goBack()}
                    size={30}
                    name="arrow-left-bold"
                    color="white"
                />
            </View>

            <View className={"top-32 flex-1 pb-48"}>
                <Button
                    onPress={handleCreateFlashcards}
                    className={'p-3 w-72 h-16 justify-center m-3 rounded-3xl'}>
                    <Text className="mx-8 scale-125 font-bold">Create new flashcard</Text>
                    <Image
                        className="absolute flex-grow h-10 -right-6"
                        resizeMode="contain"
                        source={Plus}
                    />
                </Button>


            </View>
        </View>
    );
};

export default DisplayFlashcards;
