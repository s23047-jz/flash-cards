import React, { useState } from "react";
import {ScrollView, Text, TextInput, TouchableOpacity, View} from "react-native";

import { Button, Col, Row } from "../../components";

import { ScreenProps } from "../../interfaces/screen";
import { UpdateUserInterface } from "../../interfaces/user";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const UserDelete: React.FC<ScreenProps> = ({ navigation }) => {
    const [userData, setUserData] = useState<UpdateUserInterface>({});

    const updateValue = (key: string, value: string) => {
        setUserData(prevState => ({
            ...prevState,
            [key]: value
        }))
    }

    const handleDelete = async() => {
        console.log('ss')
    }

    return (
        <View className="flex h-screen w-full bg-sky-500 dark:bg-blue-900">
            <ScrollView className="flex flex-container w-full mt-20 mb-5">
                <Row className='w-full p-6'>
                    <Col className='w-full'>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Text className='text-2xl text-white font-bold'>
                                <MaterialCommunityIcons name={'arrow-left-bold'} size={24}/>
                                User Delete
                            </Text>
                        </TouchableOpacity>
                    </Col>
                </Row>
                <Row className='w-full p-6'>
                    <Col className={'w-full text-center'}>
                        <Text className={'text-xl font-bold ml-auto mr-auto text-white'}>
                            Delete User Account
                        </Text>
                    </Col>
                </Row>
                <Row className='w-full p-6'>
                    <Col className={'w-full text-center'}>
                        <Text className={'text-lg ml-auto mr-auto text-center text-white'}>
                            To delete your account, enter your email address and password,
                            then click the confirm button to complete the deletion.
                        </Text>
                    </Col>
                </Row>
                <Row className='w-full p-6'>
                    <Col className='w-full h-14'>
                        <TextInput
                            className={`border border-gray-300 rounded-xl px-3 mb-3 flex-1 text-black bg-white`}
                            placeholder={'Email'}
                            placeholderTextColor='rgba(0, 0, 0, 0.5)'
                            autoCapitalize={"none"}
                            accessibilityElementsHidden={true}
                            value={userData['email']}
                            onChangeText={text => updateValue('email', text)}
                        />
                    </Col>
                </Row>
                <Row className='w-full p-6'>
                    <Col className='w-full h-14'>
                        <TextInput
                            className={`border border-gray-300 rounded-xl px-3 mb-3 flex-1 text-black bg-white`}
                            placeholder={'Password'}
                            placeholderTextColor='rgba(0, 0, 0, 0.5)'
                            autoCapitalize={"none"}
                            accessibilityElementsHidden={true}
                            value={userData['password']}
                            onChangeText={text => updateValue('password', text)}
                        />
                    </Col>
                </Row>
                <Row className='w-full p-6'>
                    <Col className='w-full h-14'>
                        <Button
                        className={'p-3 w-52 text-center mr-auto ml-auto'}
                        onPress={handleDelete}
                        >
                            <Text className={'text-lg ml-auto mr-auto font-bold'}>
                                Confirm
                            </Text>
                        </Button>
                    </Col>
                </Row>
            </ScrollView>
        </View>
    )
}

export default UserDelete;
