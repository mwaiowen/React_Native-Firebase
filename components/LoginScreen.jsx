import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import * as WebBrowser from "expo-web-browser";
import { Colors } from "@/constants/Colors";
import { useWarmUpBrowser } from "../hooks/useWarmUpBrowser";
import { useOAuth } from "@clerk/clerk-expo";

WebBrowser.maybeCompleteAuthSession();
export default function LoginScreen() {
  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();

      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);

  return (
    <View>
      <View
        style={{
          display: "flex",
          alignItems: "center",
          marginTop: 100,
        }}
      >
        <Image
          source={require("../assets/images/login.png")}
          style={{
            width: 220,
            height: 450,
            borderRadius: 20,
            borderWidth: 6,
            borderColor: "#000",
          }}
        />
      </View>
      <View style={{ backgroundColor: "#fff", padding: 20, marginTop: -20 }}>
        <Text
          style={{
            fontFamily: "outfit-bold",
            fontSize: 30,
            textAlign: "center",
          }}
        >
          Your ultimate{" "}
          <Text style={{ color: Colors.PRIMARY }}>
            community business directory
          </Text>
          <Text>App</Text>
        </Text>
        <Text
          style={{
            fontFamily: "outfit-medium",
            fontSize: 40,
            color: Colors.GRAY,
          }}
        >
          Find your own busines and post to your commmunity
        </Text>
        <TouchableOpacity style={styles.btn} onPress={onPress}>
          <Text
            style={{ textAlign: "center", color: "#fff", fontFamily: "outfit" }}
          >
            Let's get started
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: Colors.PRIMARY,
    padding: 16,
    borderRadius: 99,
    marginTop: 20,
  },
});
