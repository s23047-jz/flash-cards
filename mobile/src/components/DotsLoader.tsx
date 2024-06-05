import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withTiming,
  withDelay,
  withRepeat,
  Easing,
} from 'react-native-reanimated';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  dot: {
    width: 15,
    height: 15,
    borderRadius: 15,
    marginHorizontal: 5,
  },
});

const DotsLoader = () => {
  const colors = ['#FF5733', '#33FF57', '#3357FF', '#FF33A1'];
  const jumpHeight = 30;
  const duration = 400;

  const progress = Array(colors.length).fill(0).map(
      () => useSharedValue(0)
  );

  useEffect(() => {
    progress.forEach((p, index) => {
      p.value = withDelay(
        index * (duration / 2),
        withRepeat(
          withSequence(
            withTiming(-jumpHeight, { duration, easing: Easing.ease }),
            withTiming(0, { duration, easing: Easing.ease })
          ), -1, true
        )
      );
    });
  }, []);

  return (
    <View style={styles.container}>
      {colors.map((color, index) => {
        const animatedStyle = useAnimatedStyle(() => ({
          transform: [{ translateY: progress[index].value }],
        }));

        return (
          <Animated.View
            key={index}
            style={[styles.dot, { backgroundColor: color }, animatedStyle]}
          />
        );
      })}
    </View>
  );
};

export default DotsLoader;
