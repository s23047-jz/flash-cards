import React, {useEffect, useState} from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {View, ScrollView, Text, StyleSheet} from "react-native";

import {Row, Col, Loader, Button} from "../../components";

import { ScreenProps } from "../../interfaces/screen";
import { UserStatsInterface } from "../../interfaces/user";
import { ActiveUser } from "../services/user";


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

    useEffect(() => {
        setLoading(true);
        const checkAuthentication = async () => {
            try {
                const currentUserData = await ActiveUser.getUserData();
                setCheckSelfData(currentUserData.id === userId);
                setLoading(false);
            } catch (error) {
            console.error('Error checking authentication status:', error);
            setLoading(false);
        }
    };
    checkAuthentication();
  }, []);

    return (
        <View className="flex h-screen w-full bg-sky-500 dark:bg-blue-900">
            <View className="flex flex-container w-full mt-20 mb-5">
                <Row className='w-full p-6'>
                    <Col className='w-full'>
                        <Text className='text-2xl text-white font-bold'>
                            <MaterialCommunityIcons name={'arrow-left-bold'} size={24}/>
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
            </View>
        </View>
    )
}

export default UserStats;
