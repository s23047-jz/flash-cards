import React, { useState } from "react";
import { View, Image, Text, ScrollView, TouchableOpacity } from "react-native";
import { ScreenProps } from "../../interfaces/screen";

import { Row, Col, Button, CModal } from "../../components";

import { AuthService } from "../../services/auth";
import Routes from "../../constants/routes";
import DarkMode from "../../components/DarkMode";
import { ROUTES } from "../../constants";
import { warning, logo } from "../../assets/images";

const UserPanelScreen: React.FC<ScreenProps> = ({navigation, route}) => {

    const { userData, getUserData } = route.params;

    const [showModal, setShowModal] = useState(false);

    const options = [
        {
            label: "Information",
            routes: [
                {
                    label: "Stats",
                    to: Routes.USER_STATS
                }
            ]
        },
        {
            label: "Personal Data",
            routes: [
                {
                    label: "User Name",
                    value: 'username',
                    to: Routes.USER_UPDATE,
                    params: { updateField: 'username', getUserData }
                },
                {
                    label: "E-mail",
                    value: 'email',
                    to: Routes.USER_UPDATE,
                    params: { updateField: 'email', getUserData }
                },
                {
                    label: "Change password",
                    to: Routes.USER_UPDATE,
                    params: { updateField: 'password', getUserData }
                }
            ]
        }
    ]

    const handleDelete = () => {
        setShowModal(false);
        navigation.navigate(ROUTES.USER_DELETE);
    }

    const logout = async () => {
        await AuthService.logout(navigation);
    }

    const getDeleteModal = () => {
        return (
            <CModal
                visible={showModal}
                animationType={'fade'}
                transparent={true}
            >
                <View className={'bg-sky-500 dark:bg-blue-900 w-full p-4 rounded-xl'}>
                    <Row className={'w-full mt-5'}>
                        <Col className={'w-full mb-4 text-center'}>
                            <Text className={'text-xl font-bold ml-auto mr-auto text-white p-2'}>
                                <Image source={warning} className={'w-10 h-10'}/>
                                Delete User Account
                            </Text>
                        </Col>
                        <Col className={'w-full mb-4 text-center'}>
                            <Text className={'text-lg ml-auto mr-auto text-center text-white'}>
                                You will be redirected to the user deletion form.
                            </Text>
                        </Col>
                        <Col className={'w-full mt-4'}>
                            <Button
                                className={'p-3 w-52 text-center mr-auto ml-auto'}
                                onPress={handleDelete}
                            >
                                <Text className={'text-lg ml-auto mr-auto font-bold'}>
                                    Continue
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
        )
    }


    return (
        <View className="flex h-screen w-full bg-sky-500 dark:bg-blue-900 pb-14">
            {getDeleteModal()}
            <ScrollView className="flex flex-container w-full mt-20 mb-5">
                <Row className="w-full">
                    <Col className='w-full'>
                        <Image className="mx-auto object-scale-down h-40 w-40 rounded-100" source={logo}/>
                    </Col>
                </Row>
                <Row className='w-full p-6'>
                    <Col className="w-full">
                        {options.map(option => (
                            <Col className="w-full justify-center mb-4" key={option.label}>
                                <Row className='w-full'>
                                    <Text className='font-bold text-white text-xl'>
                                        {option.label}
                                    </Text>
                                </Row>
                                {option.routes.map(path => (
                                    <Row className='w-full mt-1 mb-1' key={path.label}>
                                        <Button className='w-full p-2' onPress={() => navigation.navigate(path.to, (path.params || {}))}>
                                            <Row className='w-full'>
                                                <Text className='mx-5 font-bold text-xl'>
                                                    {path.label}
                                                </Text>
                                            </Row>
                                            {
                                                Object.keys(path).includes('value')
                                                    ?
                                                    <Row className='w-full'>
                                                        <Text className='mx-5 text-sm'>
                                                            {userData[path.value]}
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
                            <Text className='font-bold text-white text-xl'>
                                Settings
                            </Text>

                            <Row className='w-full'/>
                            <Row className='w-full mt-1 mb-1'>
                                <DarkMode/>
                            </Row>
                            <Row className='w-full mt-1 mb-1'>
                                <Button className='w-full p-2' onPress={() => setShowModal(true)}>
                                    <Row className='w-full'>
                                        <Text className='mx-5 font-bold text-xl'>
                                            Delete account
                                        </Text>
                                    </Row>
                                </Button>
                            </Row>
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
                </Row>
            </ScrollView>
        </View>
    )
};

export default UserPanelScreen;
