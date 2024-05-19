import React, { useEffect, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View, ScrollView, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

import {Row, Col, Loader, Button, Card} from "../../components";

import { ScreenProps } from "../../interfaces/screen";
import { UserStatsInterface } from "../../interfaces/user";
import { ActiveUser } from "../../services/user";
import { ROUTES } from "../../constants";
import { logo } from "../../assets/images";
import {DeckListInterface} from "../../interfaces/decks";


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
        height: 100,
        width: 100
    }
});


const UserStats: React.FC<ScreenProps> = ({ navigation, route }) => {
    const { userId } = route.params;

    const PAGES = {
        USER: 'user',
        DECKS: 'decks'
    }

    const [loading, setLoading] = useState(false);
    const [checkSelfData, setCheckSelfData] = useState(false);
    const [selectedView, setSelectedView] = useState(PAGES.USER);
    const [userData, setUserData] = useState<UserStatsInterface>({});
    const [decksData, setDecksData] = useState([]);


    useEffect(() => {
        setLoading(true);
        const checkId = async () => {
            if (!userId) navigation.navigate(ROUTES.HOME)
            try {
                const currentUserData = await ActiveUser.getUserData();
                setCheckSelfData(currentUserData.id === userId);
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
                        <Image source={logo} style={styles.avatar}/>
                    </Row>
                    <Row className={'w-full'}>
                        <Text className={'text-white font-bold'}>Raking: </Text>
                        <Text className={'text-blue-950 dark:text-blue-100 font-bold'}>{userData.ranking}</Text>
                    </Row>
                    <Row className={'w-full'}>
                        <Text className={'text-white font-bold'}>Created Decks: </Text>
                        <Text className={'text-blue-950 dark:text-blue-100 font-bold'}>{userData.created_decks}</Text>
                    </Row>
                    <Row className={'w-full'}>
                        <Text className={'text-white font-bold'}>Public Decks: </Text>
                        <Text className={'text-blue-950 dark:text-blue-100 font-bold'}>{userData.public_decks}</Text>
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
                        <Col className={'w-full justify-start mb-3'}>
                            <Text className={'text-center'}>
                                { downloads }
                            </Text>
                        </Col>
                    </Row>
                    <Row className={'w-28 h-full'}>
                        <Col className={'w-full'}>
                            <MaterialCommunityIcons name={'calendar-month'} size={40} className={'ml-auto mr-auto text-center'}/>
                        </Col>
                        <Col className={'w-full'}>
                            <Text className={'text-center'}>
                                Date of creation
                            </Text>
                        </Col>
                         <Col className={'w-full'}>
                            <Text className={'text-center'}>
                                { created_at }
                            </Text>
                        </Col>
                    </Row>
                </Row>
            </Card>
        )
    };

    const decksView = () => {
        return (
            <View className={'w-full h-full'}>

            {
                decksData && decksData.length ?
                <View className={'w-full h-full'}>

                </View> :
                <View>
                    <Text>
                        No public decks
                    </Text>
                </View>
            }
            </View>
        )
    }

    return (
        <View className="flex h-screen w-full bg-sky-500 dark:bg-blue-900">
            <View className="flex flex-container w-full mt-20 mb-5">
                <Row className='w-full p-1' style={styles.row}>
                    <Col className='w-48 h-full justify-center align-middle'>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
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
                {checkSelfData ? '' :
                    <Row className='w-full p-6'>
                        <Col className={'w-48 h-full justify-center items-center'}>
                            <Button style={styles.button} className={`p-4 ${selectedView === PAGES.USER ? 'bg-sky-300' : 'bg-sky-700 border-black'}`} onPress={() => changeView(PAGES.USERS)}>
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
                }
                <Row className="w-full h-4/5 mt-2">
                    { loading ? <Loader /> :
                        <ScrollView className={'w-full h-full'}>
                            { selectedView === PAGES.DECKS ? decksView() : userView() }
                        </ScrollView>
                    }
                </Row>
            </View>
        </View>
    )
}

export default UserStats;
