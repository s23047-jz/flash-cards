import React from "react";
import { View } from "react-native";
import { Col, Row } from "./index";
import { Skeleton } from "moti/skeleton";
import { styles } from "../assets/styles";

const LoadingCard = () => {
    const background = '#e5e5e5'
    return (
        <View className={'rounded-md p-3 mr-auto ml-auto w-full mb-7 bg-gray-300 border-none'} style={styles.card}>
            <Row className={'w-full h-full'}>
                <Row className={'w-28 h-full justify-center items-center align-middle'}>
                    <Col className={'w-full justify-center items-center align-middle'} />
                    <Col className={'w-full justify-center items-center align-middle'}>
                        <Skeleton
                            show
                            colorMode={'light'}
                            height={40}
                            width={80}
                            radius={'round'}
                            backgroundColor={background}
                        />
                    </Col>
                </Row>
                <Row className={'w-24 h-full'}>
                    <Col className={'w-full text-center items-center justify-end'}>
                        <Skeleton
                            show
                            colorMode={'light'}
                            height={50}
                            width={50}
                            radius={'round'}
                            backgroundColor={background}
                        />
                    </Col>
                    <Col className={'w-full'}>
                        <Skeleton
                            show
                            colorMode={'light'}
                            height={20}
                            width={80}
                            radius={'round'}
                            backgroundColor={background}
                        />
                    </Col>
                </Row>
                <Row className={'w-28 h-full'}>
                    <Col className={'w-full justify-center items-center'}>
                            <Skeleton
                                show
                                colorMode={'light'}
                                height={50}
                                width={50}
                                radius={'round'}
                                backgroundColor={background}
                        />
                        </Col>
                    <Col className={'w-full'}>
                        <Skeleton
                            show
                            colorMode={'light'}
                            height={20}
                            width={80}
                            radius={'round'}
                            backgroundColor={background}
                        />
                    </Col>
                </Row>
            </Row>
        </View>
    )
}

export default LoadingCard;
