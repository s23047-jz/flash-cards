import React from "react";
import Routes from "../../constants/routes";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Button, Col, Row } from "../../components";
import { ScreenProps } from "../../interfaces/screen";

const ControlView: React.FC<ScreenProps> = ({ navigation }) => {

    const styles = StyleSheet.create({
        row: {
            height: 75
        },
        col: {
            width: '50%'
        },
    })

    const options = [
        {
            label: "Users",
            routes: [
                {
                    label: "User List",
                    to: Routes.MODERATOR_USERS_SCREEN
                }
            ]
        },
        {
            label: "Decks",
            routes: [
                {
                    label: "Reported decks",
                    to: Routes.MODERATOR_REPORTED_DECKS_SCREEN,
                }
            ]
        }
    ];

    return (
        <View className="flex h-screen w-full bg-sky-500 dark:bg-blue-900 pb-14">
            <ScrollView className="flex flex-container w-full mt-20 mb-5">
                <Row className='w-full p-1' style={styles.row}>
                    <Col className='h-full justify-center align-middle' style={styles.col} />
                    <Col className='h-full justify-end align-middle' style={styles.col}>
                        <Text className='text-2xl text-white font-bold text-right mr-4'>
                            Moderator control
                        </Text>
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
                                        </Button>
                                    </Row>
                                ))}
                            </Col>
                        ))}
                    </Col>
                </Row>
            </ScrollView>
        </View>
    )
};

export default ControlView;
