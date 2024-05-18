import React, { useState, useCallback } from "react";
import { Text, TextInput, View, ScrollView, StyleSheet } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { ScreenProps } from "../../interfaces/screen";
import { DeckListInterface, UserListInterface } from "../../interfaces/decks";
import { Row, Button, Col, Card, Loader } from "../../components";

import { DecksService } from "../../services/decks";

const styles = StyleSheet.create({
    card: {
        height: 150,
    },
    row: {
        height: 75
    },
    button: {
        width: 150
    }
});

const DeckCard: React.FC<DeckListInterface> = ({ id, title, deck_category, downloads, username }) => {
    return (
        <Card className={'mr-auto ml-auto w-full mb-7'} style={styles.card}>
            <Row className={'w-full'}>
                <Row className={'w-28 h-full'}>
                    <Col className={'w-full justify-end'}>
                        <Text className={'text-center font-bold'}>
                            { title }
                        </Text>
                    </Col>
                    <Col className={'w-full'}>
                        <Text className={'text-center justify-middle align-top'}>
                            { deck_category }
                        </Text>
                    </Col>
                </Row>
                <Row className={'w-24 h-full'}>
                    <Col className={'w-full text-center items-center justify-end'}>
                        <MaterialCommunityIcons name={'download'} size={40} className={'ml-auto mr-auto text-center'}/>
                    </Col>
                    <Col className={'w-full justify-end'}>
                        <Text className={'text-center'}>
                            Downloads
                        </Text>
                    </Col>
                    <Col className={'w-full justify-start'}>
                        <Text className={'text-center'}>
                            { downloads }
                        </Text>
                    </Col>
                </Row>
                <Row className={'w-28 h-full'}>
                    <Col className={'w-full'}>
                        <Text className={'text-center'}>
                            Avatar
                        </Text>
                    </Col>
                    <Col className={'w-full'}>
                        <Text className={'text-center'}>
                            { username }
                        </Text>
                    </Col>
                </Row>
            </Row>
        </Card>
    )
};

const UserCard: React.FC<UserListInterface> = ({ id, rank, username, shared }) => {
    return (
        <Card className={'mr-auto ml-auto w-full mb-7'} style={styles.card}>
            <Row className={'w-full'}>
                <Row className={'w-28 h-full'}>
                    <Col className={'w-full justify-center h-full'}>
                        <Text className={'text-center font-bold text-xl text-blue-950 dark:text-blue-100'}>
                            { rank }
                        </Text>
                    </Col>
                </Row>
                <Row className={'w-24 h-full'}>
                    <Col className={'w-full'}>
                        <Text className={'text-center'}>
                            Avatar
                        </Text>
                    </Col>
                    <Col className={'w-full'}>
                        <Text className={'text-center'}>
                            { username }
                        </Text>
                    </Col>
                </Row>
                <Row className={'w-28 h-full'}>
                    <Col className={'w-full text-center items-center justify-end'}>
                        <MaterialCommunityIcons name={'share'} size={40} className={'ml-auto mr-auto text-center'}/>
                    </Col>
                    <Col className={'w-full justify-end'}>
                        <Text className={'text-center'}>
                            Shared decks
                        </Text>
                    </Col>
                    <Col className={'w-full justify-start'}>
                        <Text className={'text-center'}>
                            { shared }
                        </Text>
                    </Col>
                </Row>
            </Row>
        </Card>
    )
};

const DeckList: React.FC<ScreenProps> = ({ navigation }) => {

    const PAGES = {
        DECKS: 'decks',
        USERS: 'users'
    }

    const [search, setSearch] = useState("");
    const [selectedView, setSelectedView] = useState(PAGES.DECKS);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const users = [
        {
            id: 1,
            rank: 1,
            username: 'Winner',
            shared: 2303
        },
        {
            id: 2,
            rank: 2,
            username: 'Loser',
            shared: 2000
        }
    ]

    const fetchDecks = async() => {
        const deck_list = await DecksService.getPublicDecks({"test": "test"}, navigation);
        setData(deck_list)
    }

    const fetchUsers = async() => {
        setData(users)
    }

    const changeView = async(view: string) => {
        if (view === PAGES.USERS) {
            await fetchUsers();
        } else {
            await fetchDecks();
        }
        setSelectedView(view);
    }

    useFocusEffect(
        useCallback(() => {
            const view = PAGES.DECKS;
            setLoading(true);
            const fetchData = async () => {
                await changeView(view);
            };
            fetchData();
            setLoading(false);
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
                            placeholder="Search..."
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
                <Row className="w-full" style={styles.row}>
                    <Col className={'w-48 h-full justify-center items-center'}>
                        <Button style={styles.button} className={`p-4 ${selectedView === PAGES.DECKS ? 'bg-sky-300' : 'bg-sky-700 border-black'}`} onPress={() => changeView(PAGES.DECKS)}>
                            <Text className='text-lg ml-auto mr-auto font-bold'>
                                Decks
                            </Text>
                        </Button>
                    </Col>
                    <Col className={'w-48 h-full justify-center items-center'}>
                        <Button style={styles.button} className={`p-4 ${selectedView === PAGES.USERS ? 'bg-sky-300' : 'bg-sky-700 border-black'}`} onPress={() => changeView(PAGES.USERS)}>
                            <Text className='text-lg ml-auto mr-auto font-bold'>
                                Users
                            </Text>
                        </Button>
                    </Col>
                </Row>
                <Row className="w-full h-3/5 mt-2">
                    { loading ? <Loader /> : data && data.length ? (
                        <ScrollView className='flex text-center align-middle w-full p-6 h-1/4'>
                            { data.map(item => selectedView === PAGES.DECKS ?
                                <DeckCard
                                    key={item.id}
                                    id={item.id}
                                    title={item.title}
                                    deck_category={item.deck_category}
                                    downloads={item.downloads}
                                    username={item.username}
                                /> : <UserCard id={item.id} rank={item.rank} username={item.username} shared={item.shared} />
                                )}
                        </ScrollView>
                    ) : (
                        <Row className='w-full mt-10'>
                            <Col className='w-full'>
                                <Text className='font-bold text-xl text-center'>
                                    {selectedView === PAGES.DECKS ?
                                        "There are no public decks yet." :
                                        "There are no users in the ranking."
                                    }
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
