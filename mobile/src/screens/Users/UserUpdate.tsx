import React, { useState, useEffect } from "react";

import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { Row, Col, Button, CModal } from "../../components";
import { UpdateUserInterface } from "../../interfaces/user";
import { ScreenProps } from "../../interfaces/screen";

import { UsersService } from "../../services/users";
import { ActiveUser } from "../../services/user";
import { styles } from "../../assets/styles";


const UserUpdate: React.FC<ScreenProps> = ({ navigation, route }) => {

    const { updateField, getUserData } = route.params;

    const [userData, setUserData] = useState<UpdateUserInterface>({});
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        Object.keys(userData).forEach(key => userData[key] = '')
    }, []);

    const updateValue = (key: string, value: string) => {
        setUserData(prevState => ({
            ...prevState,
            [key]: value
        }))
    }

    const handleDisabledButton = () => {
        if (updateField === 'password') return (!userData[updateField] || !userData['re_password'])
        return !userData[updateField]
    }

    const updateUser = () => {
        if (!userData[updateField]) return
        setShowModal(true);
    }

    const handleUpdate = async() => {
        const { res, data } = await UsersService.updateMe(userData, navigation)
        if ([200, 201].includes(res.status)) {
            await ActiveUser.updateUserData(data);
            setShowModal(false);
            await getUserData();
        }
    }
    return (
        <View className="flex h-screen w-full bg-sky-500 dark:bg-blue-900">
            <CModal
                visible={showModal}
                animationType={'fade'}
                transparent={true}
            >
                <View className={'bg-sky-500 dark:bg-blue-900 w-full p-4 rounded-xl'}>
                    <Row className={'w-full mt-5'}>
                        <Col className={'w-full mb-4 text-center'}>
                            <Text className={'text-xl font-bold ml-auto mr-auto'}>
                                Confirm password
                            </Text>
                        </Col>
                        <Col className={'w-full h-14 justify-center items-center'}>
                            <TextInput
                                className={`border border-gray-300 rounded-xl px-3 mb-3 flex-1 text-black bg-white`}
                                placeholder={'current password'}
                                style={styles.textField}
                                placeholderTextColor='rgba(0, 0, 0, 0.5)'
                                autoCapitalize={"none"}
                                accessibilityElementsHidden={true}
                                value={userData['current_password']}
                                secureTextEntry={true}
                                onChangeText={text => updateValue('current_password', text)}
                            />
                        </Col>
                        <Col className={'w-full mt-4'}>
                            <Button className={'p-3 w-52 text-center mr-auto ml-auto'} onPress={handleUpdate} disabled={!userData['current_password']}>
                                <Text className={'text-lg ml-auto mr-auto font-bold'}>
                                    Update
                                </Text>
                            </Button>
                        </Col>
                        <Col className={'w-full mt-4'}>
                            <TouchableOpacity className={'p-1 w-52 text-center mr-auto ml-auto'} onPress={() => setShowModal(false)} disabled={false}>
                                <Text className={'text-lg ml-auto mr-auto font-bold'}>
                                    Cancel
                                </Text>
                            </TouchableOpacity>
                        </Col>
                    </Row>
                </View>
            </CModal>
            <ScrollView className={'w-full mt-20'}>
                <Row className='w-full p-1' style={styles.row}>
                    <Col className='h-full justify-center align-middle' style={styles.col}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Text className='text-2xl text-white font-bold ml-4'>
                                <MaterialCommunityIcons name={'arrow-left-bold'} size={24}/>
                            </Text>
                        </TouchableOpacity>
                    </Col>
                    <Col className='h-full justify-center align-middle' style={styles.col}>
                        <Text className='text-2xl text-white font-bold text-right mr-4'>
                            User profile
                        </Text>
                    </Col>
                </Row>
                <Row className='w-full p-6'>
                    <Row className={'w-full text-center mt-10'}>
                        <Col className='w-full'>
                            <Text className={'text-xl text-white font-bold mr-auto ml-auto'}>
                                Enter a new { updateField }
                            </Text>
                        </Col>
                    </Row>
                    <Row className={'w-full mt-10'}>
                        <Col className='w-full h-14 justify-center items-center'>
                            <TextInput
                                className={`border border-gray-300 rounded-xl px-3 mb-3 flex-1 text-black bg-white`}
                                style={styles.textField}
                                placeholder={`${updateField}`}
                                placeholderTextColor='rgba(0, 0, 0, 0.5)'
                                autoCapitalize={"none"}
                                accessibilityElementsHidden={true}
                                value={userData[updateField]}
                                secureTextEntry={updateField === 'password'}
                                onChangeText={text => updateValue(updateField, text)}
                            />
                        </Col>
                        { updateField === 'password' ?
                            <Col className='w-full h-14 justify-center items-center'>
                                <TextInput
                                    className={`border border-gray-300 rounded-xl px-3 mb-3 flex-1 text-black bg-white`}
                                    style={styles.textField}
                                    placeholder={'repeat password'}
                                    placeholderTextColor='rgba(0, 0, 0, 0.5)'
                                    autoCapitalize={"none"}
                                    secureTextEntry={true}
                                    accessibilityElementsHidden={true}
                                    value={userData['re_password']}
                                    onChangeText={text => updateValue('re_password', text)}
                                />
                            </Col>
                        : ''}
                    </Row>
                </Row>
                <Row className='w-full p-6'>
                    <Col className='w-full'>
                        <Button className={'p-3 w-52 text-center mr-auto ml-auto'} onPress={updateUser} disabled={handleDisabledButton()}>
                            <Text className={'text-lg ml-auto mr-auto font-bold'}>
                                Change { updateField }
                                <MaterialCommunityIcons name={'check-bold'} size={18}/>
                            </Text>
                        </Button>
                    </Col>
                </Row>
            </ScrollView>
        </View>
    )
};

export default UserUpdate;
