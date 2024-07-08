import { View, Text, Image } from "react-native";
import React from "react";
import { useUser } from "@clerk/clerk-expo";
import { Colors } from "@/constants/Colors";

export default function UserInfo() {
  const { user } = useUser();
  return (
    <View
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 30,
      }}
    >
      <Image
        source={{ uri: user?.imageUrl }}
        style={{ width: 100, height: 100, borderRadius: 99, marginTop: 20 }}
      />
      <Text style={{ fontFamily: "outfit-bold", fontSize: 28 }}>
        {user?.fullName}
      </Text>
      <Text style={{ fontFamily: "outfit-bold", color: Colors.GRAY }}>
        {user?.primaryEmailAddress?.emailAddress}
      </Text>
    </View>
  );
}
