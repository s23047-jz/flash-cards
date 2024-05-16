import React, { useState, useEffect, useCallback } from "react";
import { Text, TextInput, View, ScrollView } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { ScreenProps } from "../../interfaces/screen";
import { Row, Button, Col } from "../../components";

import { DecksService } from "../../services/decks";

const DeckList: React.FC<ScreenProps> = ({ navigation }) => {

    const PAGES = {
        DECKS: 'decks',
        USERS: 'users'
    }

    const [search, setSearch] = useState("");
    const [selectedView, setSelectedView] = useState(PAGES.DECKS);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchDecks = async() => {
        console.log("FETCHING DECK LIST")
        const deck_list = await DecksService.getPublicDecks({"test": "test"}, navigation);
        console.log("deck_list", deck_list)
        setData(deck_list)
    }

    const fetchUsers = async() => {
        console.log('users')
    }

    const changeView = async(view: string) => {
        setSelectedView(view);
        if (selectedView === PAGES.USERS) {
            await fetchUsers();
        } else {
            console.log("FETCHING DECKS")
            await fetchDecks();
        }
    }

    useFocusEffect(
        useCallback(() => {
            const view = PAGES.DECKS; // Replace with the logic to get the desired view
            const fetchData = async () => {
                await changeView(view);
            };
            fetchData();
        }, [])
    );

    return (
        <View className="flex h-screen w-full bg-sky-500 dark:bg-blue-900">
            <View className="flex flex-container w-full mt-20 mb-5">
                <Row className='w-full p-6'>
                    <Col className='w-full'>
                        <Text className="text-2xl text-white font-bold text-right">
                            Public Decks
                        </Text>
                    </Col>
                </Row>
                <Row className="w-full mt-5 justify-center text-center">
                    <Col className='w-full'>
                        <TextInput
                            className="h-10 w-72 border border-gray-300 rounded-xl px-3 mb-3 text-gray-700 bg-white mr-auto ml-auto"
                            placeholder="Search"
                            value={search}
                            onChangeText={setSearch}
                            autoCapitalize="none"
                        />
                        <MaterialCommunityIcons
                            position="absolute"
                            right="15%"
                            top="10%"
                            size={30}
                            className="w-max h-max"
                            name="magnify"
                            color="black"
                        />
                    </Col>
                </Row>
                <Row className="w-full">
                    <Button className={`w-32 p-4 ${selectedView === PAGES.DECKS ? 'bg-sky-300' : 'bg-sky-700 border-black'}`} onPress={() => changeView(PAGES.DECKS)}>
                        <Text className='text-lg ml-auto mr-auto font-bold'>
                            Decks
                        </Text>
                    </Button>
                    <Button className={`w-32 p-4 ${selectedView === PAGES.USERS ? 'bg-sky-300' : 'bg-sky-700 border-black'}`} onPress={() => changeView(PAGES.USERS)}>
                        <Text className='text-lg ml-auto mr-auto font-bold'>
                            Users
                        </Text>
                    </Button>
                </Row>
                <Row className="w-full">
                    { data && data.length ? (
                        <ScrollView className='flex'>

                        </ScrollView>
                    ) : (
                        <Row className='w-full mt-10'>
                            <Col className='w-full'>
                                <Text className='font-bold text-xl text-center'>
                                    There are no public decks yet.
                                </Text>
                            </Col>
                        </Row>
                    )}
                </Row>
            </View>
        </View>
    )
};

export default DeckList;
