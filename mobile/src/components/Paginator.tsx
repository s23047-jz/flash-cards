import React from "react";
import { Animated, View } from "react-native";
import { PaginatorInterface } from "../interfaces/components";
import { styles } from "../assets/styles";

const Paginator: React.FC<PaginatorInterface> = ({ data, scrollX, parentWidth }) => {
    return (
        <View className={'justify-center align-middle items-center flex-row'} style={styles.paginator}>
            { data.map((_, i) => {
                const inputRange = [(i-1) * parentWidth, i * parentWidth, (i + 1) * parentWidth];
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

                return <Animated.View
                    key={i.toString()}
                    style={[styles.paginatorDots, { width: dotWidth, opacity }]}
                    className={'dark:bg-sky-500 bg-blue-900'}
                />
            })}
        </View>
    )
}

export default Paginator;
