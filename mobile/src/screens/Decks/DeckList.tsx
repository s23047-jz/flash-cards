import React, { useState, useEffect } from "react";
import { Text, TextInput, View, ScrollView, StyleSheet, TouchableOpacity, Image } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { ScreenProps } from "../../interfaces/screen";
import { DeckListInterface, UserListInterface } from "../../interfaces/decks";
import { Row, Button, Col, Card, Loader, LoadingCard } from "../../components";

import { DecksService } from "../../services/decks";
import { UsersService } from "../../services/users";
import { ROUTES } from "../../constants";
import { AVATAR_MAPPING } from "../../utils/avatars";

const styles = StyleSheet.create({
    card: {
        height: 150,
    },
    row: {
        height: 75
    },
    button: {
        width: 150
    },
    avatar: {
        height: 50,
        width: 50
    }
});

const DeckCard: React.FC<DeckListInterface> = ({ id, title, deck_category, downloads, username, avatar }) => {
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
                        <Text className={'text-center justify-center align-top'}>
                            { deck_category }
                        </Text>
                    </Col>
                </Row>
                <Row className={'w-24 h-full'}>
                    <Col className={'w-full text-center items-center justify-end'}>
                        <MaterialCommunityIcons name={'download'} size={40} className={'ml-auto mr-auto text-center'}/>
                    </Col>
                    <Col className={'w-full'}>
                        <Text className={'text-center'}>
                            Downloads
                        </Text>
                        <Text className={'text-center font-bold'}>
                            { downloads }
                        </Text>
                    </Col>
                </Row>
                <Row className={'w-28 h-full'}>
                    <Col className={'w-full justify-center items-center'}>
                            <Image
                                source={AVATAR_MAPPING[avatar]}
                                style={styles.avatar}
                                className={'mr-auto ml-auto'}
                            />
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

const UserCard: React.FC<UserListInterface> = ({ id, rank, username, shared, avatar,  navigate }) => {
    return (
        <TouchableOpacity
            className={'w-full h-full mr-auto ml-auto mb-7'}
            style={styles.card}
            onPress={() => navigate(id)}
        >
            <Card className={'w-full h-full'}>
                <Row className={'w-full'}>
                    <Row className={'w-28 h-full'}>
                        <Col className={'w-full justify-center h-full'}>
                            <Text className={'text-center font-bold text-xl text-blue-800 dark:text-blue-100'}>
                                { rank }
                            </Text>
                        </Col>
                    </Row>
                    <Row className={'w-24 h-full'}>
                        <Col className={'w-full justify-center items-center'}>
                            <Image
                                source={AVATAR_MAPPING[avatar]}
                                style={styles.avatar}
                                className={'mr-auto ml-auto'}
                            />
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
                        <Col className={'w-full'}>
                            <Text className={'text-center'}>
                                Shared decks
                            </Text>
                            <Text className={'text-center font-bold'}>
                                { shared }
                            </Text>
                        </Col>
                    </Row>
                </Row>
            </Card>
        </TouchableOpacity>
    )
};

const DeckList: React.FC<ScreenProps> = ({ navigation, route }) => {
    const PAGES = {
        DECKS: 'decks',
        USERS: 'users'
    }

    const [search, setSearch] = useState("");
    const [selectedView, setSelectedView] = useState(PAGES.USERS);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [fetchLoading, setFetchLoading] = useState(false);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [prevPage, setPrevPage] = useState(1);

    const fetchDecks = async() => {
        console.log("fetchDecks page", page);
        const deck_list = await DecksService.getPublicDecks({ page, per_page: 4 }, navigation);
        if(data && data.length) setData(prevData => [...prevData, ...deck_list.decks]);
        else setData(deck_list.decks);
        setTotal(deck_list.total)
        setFetchLoading(false)
    }

    const fetchUsers = async() => {
        console.log("fetchUsers page", page)
        const user_list = await UsersService.getUsersRanking({ page, per_page: 4 }, navigation);
        if(data && data.length) setData(prevData => [...prevData, ...user_list.users]);
        else setData(user_list.users);
        setTotal(user_list.total)
        setFetchLoading(false)
    }

    const changeView = async(view: string) => {
        if (view !== selectedView) {

            setPrevPage(1);
            setPage(1);
            setTotal(0)
            setLoading(true);
            setData([]);

            setSelectedView(view);
            if (view === PAGES.USERS) {
                await fetchUsers();
            } else {
                await fetchDecks();
            }
            setLoading(false);
        }
    }

    const handleScroll = async({ nativeEvent }) => {
        if (isCloseToBottom(nativeEvent) && (data.length % 4 === 0) && !(data.length === total)) {
            setFetchLoading(true)
            setPage(prevState => prevState + 1);
            if (prevPage !== page) {
                setTimeout(() => {
                    if (selectedView === PAGES.USERS) {
                        fetchUsers();
                    } else {
                        fetchDecks();
                    }
                }, 1000)
            }
            setPrevPage(page);
        }
    };

    const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
        const paddingToBottom = 15;
        return layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;
    };

    const handleNavigationToUserStats = (userId: string) => {
        navigation.navigate(ROUTES.USER, {
            screen: ROUTES.USER_STATS,
            params: { userId, routeFrom: ROUTES.PUBLIC_DECKS }
        })
    }

    useEffect(() => {
        const view = PAGES.DECKS;
        const fetchData = async () => {
            await changeView(view);
        };
        fetchData();
    }, [])

    return (
        <View className="flex h-screen w-full bg-sky-500 dark:bg-blue-900">
            <View className="flex flex-container w-full mt-20 mb-5">
                <Row className='w-full p-6' style={styles.row}>
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
                        <ScrollView
                            className='flex text-center align-middle w-full p-6 h-1/4'
                            onScroll={handleScroll}
                            scrollEventThrottle={16}
                        >
                            { data.map((item, index) => selectedView === PAGES.DECKS ?
                                <DeckCard
                                    key={item.id}
                                    id={item.id}
                                    title={item.title}
                                    deck_category={item.deck_category}
                                    downloads={item.downloads}
                                    username={item.username}
                                    avatar={item.avatar}
                                /> : <UserCard
                                        key={item.id}
                                        id={item.id}
                                        rank={item.rank}
                                        username={item.username}
                                        avatar={item.avatar}
                                        shared={item.shared_decks}
                                        navigate={handleNavigationToUserStats}
                                    />
                                )}
                            {fetchLoading ? [...Array(3)].map(() => <LoadingCard />) : null}
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
