import React from "react";
import { Animated, useWindowDimensions } from "react-native";
import { PaginatorInterface } from "../interfaces/components";
import { Row } from "./index";
import { styles } from "../assets/styles";

const Paginator: React.FC<PaginatorInterface> = ({ data, scrollX }) => {
    const { width} = useWindowDimensions();
    return (
        <Row className={'justify-center align-middle items-center'} style={styles.paginator}>
            { data.map((_, i) => {
                const inputRange = [(i-1) * width, i * width, (i + 1) * width];
                const dotWidth = scrollX.interpolate({
                    inputRange,
                    outputRange: [10, 20, 10],
                    extrapolate: 'clamp'
                })

                const opacity = scrollX.interpolate({
                    inputRange,
                    outputRange: [0.3, 1, 0.3],
                    extrapolate: 'clamp'
                })

                return <Animated.View key={i.toString()} style={[styles.paginatorDots, { width: dotWidth, opacity }]}/>
            })}
        </Row>
    )
}

export default Paginator;
