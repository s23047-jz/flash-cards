import React, { useState } from "react";
import { Text, TextInput, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { ScreenProps } from "../../interfaces/screen";
import { ROUTES } from "../../constants";
import { Row, Button } from "../../components";

const DeckList: React.FC<ScreenProps> = ({ navigation }) => {

    const [search, setSearch] = useState("");
    const [deckList, setDeckList] = useState([]);

    return (
        <View className="flex-1 items-center justify-center bg-sky-500 dark:bg-blue-900 placeholder-gray-400">
            <Text className="text-white font-extrabold animate-bounce scale-150 absolute top-16 right-10">
                Public Decks
            </Text>
            <Row className="absolute top-32">
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
            </Row>
            <Row className="w-100 bg-zinc-900">
                { deckList && deckList.length ? (
                    <Text>DECKS</Text>
                ) : (
                    <Button>
                        <Row className='w-full'>
                            <Text className='mx-5 font-bold text-xl'>

                            </Text>
                        </Row>
                    </Button>
                )}
            </Row>
        </View>
    )
};

export default DeckList;
