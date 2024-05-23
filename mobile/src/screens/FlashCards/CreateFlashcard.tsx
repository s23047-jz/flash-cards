import React, {useState} from 'react';
import {View, Text, TextInput, Image} from 'react-native';
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {ScreenProps} from "../../interfaces/screen";
import {InputValidator} from "../../components/Validator/InputValidator";
import {DecksService} from "../../services/decks";
import {ROUTES} from "../../constants";
import {Button} from "../../components";
import MicrophoneBlack from "../../assets/images/Microphone_black.png";
import MicrophoneRed from "../../assets/images/Microphone_red.png";
import GenerateText from "../../assets/images/Generate_text.png";
import Plus from "../../assets/images/Plus.png";


const CreateFlashcard: React.FC<ScreenProps> = ({ navigation, route }) => {
    const { deck } = route.params;
    console.log("creating in ", deck)
    const [sideA, setSideA] = useState("");
    const [sideB, setSideB] = useState("");

    const handleCreate = async () => {
        if (
            InputValidator("deck", setSideA) &&
            InputValidator("deck", setSideB)
        ) {
            navigation.goBack()

        }
        else {
            alert("Flashcards fields must not be empty.")
        }
    }


    return (
        <View className="flex-1 items-center justify-center bg-sky-500 dark:bg-blue-900 placeholder-gray-400">
            <Text className="text-white font-extrabold animate-bounce scale-150 absolute top-16 right-12">
                Create Flashcard
            </Text>
            <View className=" top-14 absolute left-6">
                <MaterialCommunityIcons
                    onPress={() => navigation.goBack()}
                    size={30}
                    name="arrow-left-bold"
                    color="white"
                />
            </View>

            <View className={"items-center justify-center top-12"}>
                <View>
                <Text className="text-base mb-3 left-12 text-white font-bold scale-125">Front side:</Text>
                <TextInput
                    className="h-24 w-72 border border-gray-300 rounded-xl px-3 mb-3 text-gray-700 bg-white"
                    autoCapitalize="sentences"
                    multiline={true}
                    onChangeText={setSideA}
                />
                    <Button
                        className={'w-72 h-14 justify-center mr-auto ml-auto rounded-1xl'}
                    >
                        <Text className="mb-1.5 font-bold top-1  text-right right-2" >Front side - dictate the content</Text>
                        <Image
                            className="absolute h-10 -left-9"
                            resizeMode="contain"
                            source={MicrophoneBlack}
                        />
                    </Button>
                </View>



            <View className="m-3 pt-5">
                <Text className="text-base mb-3 left-12 text-white font-bold scale-125">Back side:</Text>
                <TextInput
                    className="h-24 w-72 border border-gray-300 rounded-xl px-3 mb-3 text-gray-700 bg-white"
                    autoCapitalize={"sentences"}
                    multiline={true}
                    onChangeText={setSideB}
                />
                <Button
                    className={'w-72 h-14 justify-center mr-auto ml-auto rounded-1xl'}
                >
                    <Text className="mb-1.5 font-bold top-1  text-right right-2" >Back side - dictate the content</Text>
                    <Image
                        className="absolute h-10 -left-9"
                        resizeMode="contain"
                        source={MicrophoneBlack}
                    />
                </Button>
                <Button
                    className={'w-72 h-14 m-5 justify-center mr-auto ml-auto rounded-1xl'}
                >
                    <Text className="scale-125 mb-1.5 font-bold top-1 text-right right-11" >Generate content with AI</Text>
                    <Image
                        className="absolute h-10 -left-7"
                        resizeMode="contain"
                        source={GenerateText}
                    />
                </Button>
            </View>

                <View className={"flex-row"}>
                    <Button
                        onPress={() => navigation.goBack()}
                        className={'p-3 w-30 h-16 justify-center mr-3 rounded-3xl'}>
                        <Text className="mx-5 scale-125 font-bold">Cancel</Text>
                    </Button>
                    <Button
                        onPress={handleCreate}
                        className={'p-3 ml-3 w-25 h-16 justify-center rounded-3xl'}>
                        <Text className="mx-5 scale-125 font-bold">Create!</Text>
                    </Button>
                </View>

                </View>
        </View>
    );
};

export default CreateFlashcard;
