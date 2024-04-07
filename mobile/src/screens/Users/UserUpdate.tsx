import React from "react";

import {View, Text, TextInput} from "react-native";
import {MaterialCommunityIcons} from "@expo/vector-icons";

import {Row, Col, Button} from "../../components";

import {ScreenProps} from "../../interfaces/screen";


const UserUpdate: React.FC<ScreenProps> = ({ navigation, route }) => {

    const { updateField } = route.params;

    return (
        <View className="flex h-screen w-full bg-sky-500 dark:bg-blue-900">
            <View className={'w-full mt-20'}>
                <Row className='w-full p-6'>
                    <Col className='w-full'>
                        <Text className='text-2xl text-white font-bold'>
                            <MaterialCommunityIcons name={'arrow-left-bold'} size={24}/>
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
                        <Col className='w-full h-14'>
                            <TextInput
                                className={`border border-gray-300 rounded-xl px-3 mb-3 flex-1 text-black bg-white`}
                                placeholder={`${updateField}`}
                                placeholderTextColor='rgba(255, 255, 255, 0.5)'
                                autoCapitalize={"none"}
                                accessibilityElementsHidden={true}
                            />
                        </Col>
                    </Row>
                </Row>
                <Row className='w-full p-6'>
                    <Col className='w-full'>
                        <Button className={'p-3 w-52 text-center mr-auto ml-auto'}>
                            <Text className={'text-lg ml-auto mr-auto font-bold'}>
                                Change username
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
