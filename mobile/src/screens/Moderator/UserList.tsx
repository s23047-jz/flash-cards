import React, { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import { UserListInterface } from "../../interfaces/decks";
import {
    Button,
    Card,
    Col,
    Loader,
    LoadingCard,
    Row
} from "../../components";
import { AVATAR_MAPPING } from "../../utils/avatars";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { UsersService } from "../../services/users";
import { ScreenProps } from "../../interfaces/screen";
import moment from "moment/moment";

const styles = StyleSheet.create({
    card: {
        height: 150,
    },
    row: {
        height: 75
    },
    avatar: {
        height: 50,
        width: 50
    },
    loadBtn: {
        maxWidth: 250
    }
});

const UserCard: React.FC<UserListInterface> = ({ id, username, shared, created_at, avatar }) => {
    const formatData = (date: Date) => {
        return moment(date).format("DD/MM/YYYY")
    }

    return (
        <TouchableOpacity
            className={'w-full h-full mr-auto ml-auto mb-7'}
            style={styles.card}
            disabled={true}
        >
            <Card className={'w-full h-full'}>
                <Row className={'w-full'}>
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

const UserList: React.FC<ScreenProps> = ({ navigation}) => {
    const perPage = 4;
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [fetchLoading, setFetchLoading] = useState(false);
    const [usersQuery, setUsersQuery] = useState({ search: '', page: 1, per_page: perPage });
    const [total, setTotal] = useState(0);

    const setSearch = async(value: string) => {
        setLoading(true);
        setData([]);
        setUsersQuery(prevState => (
            {
                ...prevState,
                search: value,
                page: 1,
            }
        ))
        await fetchUsers();
        setLoading(false);
    }

    const fetchUsers = async() => {
        const users_data = await UsersService.getUsersRanking(usersQuery, navigation)
        if(data && data.length) setData(prevData => [...prevData, ...users_data.users]);
        else setData(users_data.users);
        setUsersQuery(prevState => ({ ...prevState, page: prevState.page + 1 }))
        setTotal(users_data.total)
        setFetchLoading(false);
    }

    const handleFetchMoreData = async() => {
        setFetchLoading(true);
        setTimeout(() => {
            fetchUsers();
        }, 1000)
    };

    useFocusEffect(
        useCallback(() => {
            try {
                setLoading(true);
                setData([]);
                setUsersQuery({ search: '', page: 1, per_page: perPage });
                fetchUsers();
                setLoading(false);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
            return () => {
            };
        }, [])
    )

    return (
        <View className="flex h-screen w-full bg-sky-500 dark:bg-blue-900">
            <View className="flex flex-container w-full mt-20 mb-5">
                <Row className='w-full p-6' style={styles.row}>
                    <Col className='w-48 h-full justify-center align-middle'>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Text className='text-2xl text-white font-bold ml-4'>
                                <MaterialCommunityIcons name={'arrow-left-bold'} size={24}/>
                            </Text>
                        </TouchableOpacity>
                    </Col>
                    <Col className='w-44 h-full justify-center align-middle'>
                        <Text className='text-2xl text-white font-bold text-right mr-4'>
                            Users
                        </Text>
                    </Col>
                </Row>
                <Row className="w-full mt-5 justify-center text-center">
                    <Col className='w-full'>
                        <TextInput
                            className="h-10 w-72 border border-gray-300 rounded-xl px-3 mb-3 text-gray-700 bg-white mr-auto ml-auto"
                            placeholder="Search..."
                            value={usersQuery.search}
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
                <Row className="w-full h-4/6 mt-2">
                    { loading ? <Loader /> : data && data.length ? (
                        <ScrollView
                            className='flex text-center align-middle w-full p-6 h-1/4'
                            scrollEventThrottle={16}
                        >
                            { data.map((item) =>
                                    <UserCard
                                        key={item.id}
                                        id={item.id}
                                        created_ad={item.created_ad}
                                        username={item.username}
                                        avatar={item.avatar}
                                        shared={item.shared_decks}
                                    />
                                )}
                            {fetchLoading ? [...Array(3)].map(() => <LoadingCard />) : null}
                            {
                                ((data.length % 4 === 0) && !(data.length === total)) ?
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

                        </ScrollView>
                    ) : (
                        <Row className='w-full mt-10'>
                            <Col className='w-full'>
                                <Text className='font-bold text-xl text-center'>
                                    There are no users in the list.
                                </Text>
                            </Col>
                        </Row>
                    )}
                </Row>
            </View>
        </View>
    )
};

export default UserList;
