import React, { useState } from "react";

import { View, Text, TextInput, TouchableOpacity } from "react-native";
import {MaterialCommunityIcons} from "@expo/vector-icons";

import {Row, Col, Button} from "../../components";

import { ScreenProps } from "../../interfaces/screen";
import { UpdateUserInterface } from "../../interfaces/user";

import { UsersService } from "../../services/users";
import {ActiveUser} from "../../services/user";


const UserUpdate: React.FC<ScreenProps> = ({ navigation, route }) => {

    const { updateField } = route.params;

    const [userData, setUserData] = useState<UpdateUserInterface>({
        username: '',
        email: '',
        password: '',
        re_password: '',
    })

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

    const updateUser = async() => {
        if (!userData[updateField]) return

        const body = {}
        body[updateField] = userData[updateField]

        const { res, data } = await UsersService.updateMe(body, navigation)

        if ([200, 201].includes(res.status)) {
            await ActiveUser.updateUserData(data);
        }
    }

    return (
        <View className="flex h-screen w-full bg-sky-500 dark:bg-blue-900">
            <View className={'w-full mt-20'}>
                <Row className='w-full p-6'>
                    <Col className='w-full'>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Text className='text-2xl text-white font-bold'>
                                <MaterialCommunityIcons name={'arrow-left-bold'} size={24}/>
                                User profile
                            </Text>
                        </TouchableOpacity>
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
                        <Col className='w-full h-14'>
                            <TextInput
                                className={`border border-gray-300 rounded-xl px-3 mb-3 flex-1 text-black bg-white`}
                                placeholder={`${updateField}`}
                                placeholderTextColor='rgba(0, 0, 0, 0.5)'
                                autoCapitalize={"none"}
                                accessibilityElementsHidden={true}
                                value={userData[updateField]}
                                onChangeText={text => updateValue(updateField, text)}
                            />
                        </Col>
                        { updateField === 'password' ?
                            <Col className='w-full h-14'>
                                <TextInput
                                    className={`border border-gray-300 rounded-xl px-3 mb-3 flex-1 text-black bg-white`}
                                    placeholder={'repeat password'}
                                    placeholderTextColor='rgba(0, 0, 0, 0.5)'
                                    autoCapitalize={"none"}
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
            </View>
        </View>
    )
};

export default UserUpdate;
