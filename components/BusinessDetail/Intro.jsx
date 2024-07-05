import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function Intro({ business }) {
  const router = useRouter();

  return (
    <View>
      <View
        style={{
          position: "absolute",
          zIndex: 10,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
          padding: 30,
        }}
      >
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back-circle-outline" size={30} color="black" />
        </TouchableOpacity>
        <AntDesign name="hearto" size={24} color="black" />
      </View>
      <Image
        source={{ uri: business?.imageUrl }}
        style={{ width: "100%", height: 340 }}
      />

      <View
        style={{
          pading: 20,
          marginTop: -20,
          backgroundColor: "#fff",
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
        }}
      >
        <Text
          style={{ fontfamily: "outfit-bold", fontSize: 26, marginLeft: 8 }}
        >
          {business.name}
        </Text>
        <Text style={{ fontfamily: "outfit", fontSize: 18 }}>
          {business.address}
        </Text>
      </View>
    </View>
  );
}
