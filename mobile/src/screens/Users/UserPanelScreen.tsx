import React from "react";
import { View, Image, Text, ScrollView, TouchableOpacity } from "react-native";
import { ScreenProps } from "../../interfaces/screen";

import {Row, Col, Button} from "../../components";

import LOGO from "../../assets/images/logo.png"

import {AuthService} from "../../services/auth";


const UserPanelScreen: React.FC<ScreenProps> = ({ navigation }) => {
    const options = [
        {
            label: "Information",
            routes: [
                {
                    label: "Stats",
                    to: "/stats"
                }
            ]
        },
        {
            label: "Personal Data",
            routes: [
                {
                    label: "User Name",
                    value: 'username',
                    to: "/username"
                },
                {
                    label: "E-mail",
                    value: 'email',
                    to: "/email"
                },
                {
                    label: "Change password",
                    to: "/change_password"
                },
                {
                    label: "Delete account",
                    to: "/delete_account"
                }
            ]
        }
    ]

    const logout = async () => {
        console.log("LOGIN OUT")
        await AuthService.logout(navigation);
    }

    return (
        <View className="flex h-screen w-full bg-sky-500 dark:bg-blue-900">
            <ScrollView className="flex flex-container w-full mt-20 mb-5">
                <Col className='w-full'>
                    <Row className="w-full">
                        <Image className="mx-auto object-scale-down h-40 w-40 rounded-100" source={LOGO} />
                    </Row>
                </Col>
                <Col className="w-full p-6">
                    { options.map(option => (
                        <Col className="w-full justify-center mb-4" key={option.label}>
                            <Row className='w-full'>
                                <Text className='font-bold text-white text-xl'>
                                    { option.label }
                                </Text>
                            </Row>
                            { option.routes.map(route => (
                                <Row className='w-full mt-1 mb-1' key={route.label}>
                                    <Button className='w-full p-2'>
                                        <Row className='w-full'>
                                            <Text className='mx-5 font-bold text-xl'>
                                                {route.label}
                                            </Text>
                                        </Row>
                                        {
                                            Object.keys(route).includes('value')
                                                ?
                                                    <Row className='w-full'>
                                                        <Text className='mx-5 text-sm'>
                                                            {route.value}
                                                        </Text>
                                                    </Row>
                                                :
                                                    ''
                                        }
                                    </Button>
                                </Row>
                            ))}
                        </Col>
                    ))}
                    <Col className="w-full justify-center mb-4">
                        <Row className='w-full' />
                        <Row className='w-full mt-1 mb-1'>
                            <Button className='w-full p-2' onPress={logout}>
                                <Row className='w-full'>
                                    <Text className='mx-5 font-bold text-xl'>
                                        Logout
                                    </Text>
                                </Row>
                            </Button>
                        </Row>
                    </Col>
                </Col>
            </ScrollView>
        </View>
    )
}

export default UserPanelScreen;
