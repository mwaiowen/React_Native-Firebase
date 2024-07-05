import React from "react";
import { View, StyleSheet, Animated } from "react-native";

const MovingBall = () => {
  // Using Animated API for animations in React Native
  const moveAnimation = new Animated.Value(0);

  React.useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(moveAnimation, {
          toValue: 1,
          duration: 3000,
          delay: 1000,
          useNativeDriver: false,
        }),
        Animated.timing(moveAnimation, {
          toValue: 0,
          duration: 3000,
          delay: 1000,
          useNativeDriver: false,
        }),
      ]),
      { iterations: -1 }
    ).start();
  }, []);

  const ballStyle = {
    ...styles.ball,
    left: moveAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: ["calc(100% - 40px)", "calc(0% - 20px)"],
    }),
    transform: [
      {
        rotate: moveAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: ["360deg", "0deg"],
        }),
      },
    ],
  };

  return (
    <View style={styles.bar}>
      <Animated.View style={ballStyle}></Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  bar: {
    width: 200,
    height: 12.5,
    backgroundColor: "#FFDAAF",
    borderRadius: 30,
    transform: [{ rotate: "-15deg" }],
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden", // Ensure the ball stays within the bar bounds
  },
  ball: {
    position: "absolute",
    bottom: 50,
    width: 50,
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 25, // 50% of width/height to make it circular
    transformOrigin: "center",
    zIndex: 1, // Ensure the ball is above the bar
  },
});

export default MovingBall;
