import { View, Text, Image, TextInput } from "react-native";
import React from "react";
import { useUser } from "@clerk/clerk-expo";
import { Colors } from "@/constants/Colors";
import { FontAwesome } from "@expo/vector-icons";
import SearchBar from "@/constants/searchBar";

export default function Header() {
  const { user } = useUser();
  return (
    <View
      style={{
        padding: 10,
        paddingTop: 40,
        backgroundColor: Colors.PRIMARY,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          padding: 20,
          gap: 10,
        }}
      >
        <Image
          source={{ uri: user?.imageUrl }}
          style={{
            width: 45,
            height: 45,
            borderRadius: 99,
          }}
        />
        <View>
          <Text
            style={{ fontFamily: "outfit-bold", fontSize: 30, color: "white" }}
          >
            Welcome,
          </Text>
          <Text
            style={{ fontFamily: "outfit-bold", fontSize: 30, color: "white" }}
          >
            {user?.fullName}
          </Text>
        </View>
      </View>
      {/* Search Bar */}
      <SearchBar />
    </View>
  );
}
