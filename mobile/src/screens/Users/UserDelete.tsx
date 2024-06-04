import React, { useState } from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, View, Image } from "react-native";

import { Button, Col, Row } from "../../components";

import { ScreenProps } from "../../interfaces/screen";
import { UpdateUserInterface } from "../../interfaces/user";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { UsersService } from "../../services/users";
import { warning } from "../../assets/images";
import { styles } from "../../assets/styles";

const UserDelete: React.FC<ScreenProps> = ({ navigation }) => {
    const [userData, setUserData] = useState<UpdateUserInterface>({});

    const updateValue = (key: string, value: string) => {
        setUserData(prevState => ({
            ...prevState,
            [key]: value
        }))
    }

    const handleDelete = async() => {
        let allowToDelete = true;
        for (const field of ['email', 'password']) {
            if (!userData[field]) {
                allowToDelete = false;
                alert(`The ${field} is required`);
                break;
            }
        }
        if (!allowToDelete) return;
        await UsersService.deleteMe(userData, navigation);
        setUserData({})
    }

    return (
        <View className="flex h-screen w-full bg-sky-500 dark:bg-blue-900">
            <ScrollView className="flex flex-container w-full mt-20 mb-5">
                <Row className='w-full p-6' style={styles.row}>
                    <Col className='h-full justify-center align-middle' style={styles.col}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Text className='text-2xl text-white font-bold'>
                                <MaterialCommunityIcons name={'arrow-left-bold'} size={24}/>
                            </Text>
                        </TouchableOpacity>
                    </Col>
                    <Col className='h-full justify-center align-middle' style={styles.col}>
                        <Text className='text-2xl text-white font-bold text-right'>
                            User Delete
                        </Text>
                    </Col>
                </Row>
                <Row className='w-full p-6'>
                    <Col className={'w-full text-center'}>
                        <Text className={'text-xl font-bold ml-auto mr-auto text-white p-2'}>
                            <Image source={warning} className={'w-10 h-10'}/>
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
                    <Col className='w-full h-14 justify-center items-center'>
                        <TextInput
                            className={`border border-gray-300 rounded-xl px-3 mb-3 flex-1 text-black bg-white`}
                            style={styles.textField}
                            placeholder={'Email'}
                            placeholderTextColor='rgba(0, 0, 0, 0.5)'
                            autoCapitalize={"none"}
                            value={userData['email']}
                            onChangeText={text => updateValue('email', text)}
                        />
                    </Col>
                </Row>
                <Row className='w-full p-6'>
                    <Col className='w-full h-14 justify-center items-center'>
                        <TextInput
                            className={`border border-gray-300 rounded-xl px-3 mb-3 flex-1 text-black bg-white`}
                            style={styles.textField}
                            placeholder={'Password'}
                            placeholderTextColor='rgba(0, 0, 0, 0.5)'
                            autoCapitalize={"none"}
                            accessibilityElementsHidden
                            secureTextEntry={true}
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
                        disabled={!userData['email'] || !userData['password']}
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
