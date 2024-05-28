import moment from "moment";
import React, { useEffect, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View, ScrollView, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

import { Row, Col, Loader, Button, Card, LoadingCard } from "../../components";

import { ScreenProps } from "../../interfaces/screen";
import { UserStatsInterface } from "../../interfaces/user";
import { DeckListInterface } from "../../interfaces/decks";
import { ActiveUser } from "../../services/user";
import { ROUTES } from "../../constants";
import { UsersService } from "../../services/users";
import { DecksService } from "../../services/decks";
import { AVATAR_MAPPING } from "../../utils/avatars";


const styles = StyleSheet.create({
    card: {
        height: 150,
    },
    row: {
        height: 75
    },
    stats_row: {
        height: 45
    },
    button: {
        width: 150
    },
    avatar: {
        height: 150,
        width: 150
    },
    loadBtn: {
        maxWidth: 250
    }
});


const UserStats: React.FC<ScreenProps> = ({ navigation, route }) => {
    const { userId, routeFrom } = route.params;

    const PAGES = {
        USER: 'user',
        DECKS: 'decks'
    }

    const perPage = 4;

    const [loading, setLoading] = useState(true);
    const [checkSelfData, setCheckSelfData] = useState(false);
    const [selectedView, setSelectedView] = useState(PAGES.DECKS);
    const [userData, setUserData] = useState<UserStatsInterface>({});
    const [decksData, setDecksData] = useState([]);
    const [total, setTotal] = useState(0);
    const [query, setQuery] = useState(
        { "user_id": userId, page: 1, per_page: perPage }
    );
    const [fetchLoading, setFetchLoading] = useState(false);

    const fetchDecks = async() => {
        const deck_list = await DecksService.getPublicDecks(
            query,
            navigation
        );
        if(decksData && decksData.length) setDecksData(prevState => [...prevState, deck_list.decks]);
        else setDecksData(deck_list.decks);
        setQuery(prevState => ({ ...prevState, page: prevState.page + 1 }))
        setTotal(deck_list.total)
        setFetchLoading(false);
    }

    const fetchUser = async() => {
        const user_data = await UsersService.getUserStats(userId, navigation)
        setUserData(user_data)
    }

    const changeView = async(view: string) => {
        if (view !== selectedView) {
            setLoading(true);
            setTotal(0)
            setLoading(true);
            setDecksData([]);
            setSelectedView(view);
            if (view === PAGES.USER) {
                await fetchUser();
            } else {
                await fetchDecks();
                setQuery({ "user_id": userId, page: 1, per_page: perPage });
            }
            setLoading(false);
        }
    }

    const handleFetchMoreData = async() => {
        setFetchLoading(true);
        setTimeout(() => {
            fetchDecks();
        }, 1000)
    }


    useEffect(() => {
        setLoading(true);
        const checkId = async () => {
            if (!userId) navigation.navigate(ROUTES.HOME)
            try {
                const { id } = await ActiveUser.getUserData();
                const show = id === userId
                setQuery({ "user_id": userId, page: 1, per_page: perPage })
                setCheckSelfData(show);
                await changeView(PAGES.USER)
                setLoading(false);
            } catch (error) {
                console.error('Error checking authentication status:', error);
                setLoading(false);
            }
        };
        checkId();
    }, []);

    const userView = () => {
        return (
            <View className={'w-full h-full'}>
                {Object.keys(userData).length ?
                <View className={'w-full h-full'}>
                    <Row className={'w-full'}>
                        <Col className={'w-full justify-center items-center'}>
                            <Image source={AVATAR_MAPPING[userData.avatar]} style={styles.avatar} className={'mr-auto ml-auto'}/>
                        </Col>
                    </Row>
                     <Row className={'w-full mb-5'} style={styles.stats_row}>
                         <Col className={'w-full justify-center align-middle'}>
                            <Text className={'text-white font-bold text-xl text-center'}>{userData.username}</Text>
                         </Col>
                    </Row>
                    <Row className={'w-full'} style={styles.stats_row}>
                        <Text className={'text-white font-bold text-xl ml-4 h-full'}>Raking: </Text>
                        <Text className={'text-blue-950 dark:text-yellow-400 font-bold text-xl h-full'}>{userData.rank}</Text>
                    </Row>
                    <Row className={'w-full'} style={styles.stats_row}>
                        <Text className={'text-white font-bold text-xl ml-4 h-full'}>Created Decks: </Text>
                        <Text className={'text-blue-950 dark:text-yellow-400 font-bold text-xl h-full'}>{userData.created_decks}</Text>
                    </Row>
                    <Row className={'w-full'} style={styles.stats_row}>
                        <Text className={'text-white font-bold text-xl ml-4 h-full'}>Public Decks: </Text>
                        <Text className={'text-blue-950 dark:text-yellow-400 font-bold text-xl h-full'}>{userData.public_decks}</Text>
                    </Row>
                </View>
                :
                    <Text className={'text-xl font-bold text-center color-white'}>
                        No user data
                    </Text>
                }
            </View>
        )
    }

    const DeckCard: React.FC<DeckListInterface> = ({ id, title, deck_category, downloads, created_at }) => {
        const formatData = (date: Date) => {
            return moment(date).format("DD/MM/YYYY")
        }
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
                        <Col className={'w-full text-center items-center justify-end'}>
                            <MaterialCommunityIcons name={'calendar-month'} size={40} className={'ml-auto mr-auto text-center'}/>
                        </Col>
                        <Col className={'w-full'}>
                            <Text className={'text-center'}>
                                Date of creation
                            </Text>
                            <Text className={'text-center text-bold'}>
                                { formatData(created_at) }
                            </Text>
                        </Col>
                    </Row>
                </Row>
            </Card>
        )
    };

    const decksView = () => {
        return (
            <Row className={'w-full h-full'}>

            {
                decksData && decksData.length ?
                <View className={'w-full h-full'}>
                    {decksData.map(deck => (
                        <DeckCard
                            key={deck.id}
                            id={deck.id}
                            title={deck.title}
                            deck_category={deck.deck_category}
                            downloads={deck.downloads}
                            created_at={deck.created_at}
                        />
                    ))}
                    {fetchLoading ? [...Array(3)].map(() => <LoadingCard />) : null}
                    {
                        ((decksData.length % 4 === 0) &&
                            !(decksData.length === total) &&
                            selectedView === PAGES.DECKS) ?
                            <Row className={'w-full'}>
                                <Col className={'w-full justify-center items-center mb-3'}>
                                    <Button
                                        className={'p-3 w-52 text-center mr-auto ml-auto mb-3'}
                                        style={styles.loadBtn}
                                        onPress={async () => handleFetchMoreData()}
                                    >
                                        <Text className={'text-center text-lg font-bold'}>
                                            Load more
                                        </Text>
                                    </Button>
                                </Col>
                            </Row>
                            : null
                    }
                </View> :
                <View>
                    <Text>
                        No public decks
                    </Text>
                </View>
            }
            </Row>
        )
    }

    const sectionButtons = () => {
        return (
            <Row className='w-full mb-4' style={styles.row}>
                <Col className={'w-48 h-full justify-center items-center'}>
                    <Button style={styles.button} className={`p-4 ${selectedView === PAGES.USER ? 'bg-sky-300' : 'bg-sky-700 border-black'}`} onPress={() => changeView(PAGES.USER)}>
                        <Text className='text-lg ml-auto mr-auto font-bold'>
                            User Data
                        </Text>
                    </Button>
                </Col>
                <Col className={'w-48 h-full justify-center items-center'}>
                    <Button style={styles.button} className={`p-4 ${selectedView === PAGES.DECKS ? 'bg-sky-300' : 'bg-sky-700 border-black'}`} onPress={() => changeView(PAGES.DECKS)}>
                        <Text className='text-lg ml-auto mr-auto font-bold'>
                            Public Decks
                        </Text>
                    </Button>
                </Col>
            </Row>
        )
    }

    return (
        <View className="flex h-screen w-full bg-sky-500 dark:bg-blue-900">
            <ScrollView
                className="flex flex-container w-full mt-20 mb-5"
            >
                <Row className='w-full p-1' style={styles.row}>
                    <Col className='w-48 h-full justify-center align-middle'>
                        <TouchableOpacity onPress={() => routeFrom ? navigation.navigate(routeFrom) : navigation.goBack()}>
                            <Text className='text-2xl text-white font-bold ml-4'>
                                <MaterialCommunityIcons name={'arrow-left-bold'} size={24}/>
                            </Text>
                        </TouchableOpacity>
                    </Col>
                    <Col className='w-48 h-full justify-center align-middle'>
                        <Text className='text-2xl text-white font-bold text-right mr-4'>
                            Stats
                        </Text>
                    </Col>
                </Row>
                { checkSelfData ? '' : sectionButtons() }
                <Row className="w-full h-4/5 mt-2">
                    { loading ? <Loader /> :
                        <ScrollView
                            className={'w-full p-6 h-1/4'}
                            scrollEventThrottle={16}
                        >
                            { selectedView === PAGES.DECKS ? decksView() : userView() }
                        </ScrollView>
                    }
                </Row>
            </ScrollView>
        </View>
    )
}

export default UserStats;
