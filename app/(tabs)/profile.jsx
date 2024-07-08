import { View, Text } from "react-native";
import React from "react";
import UserInfo from "@/components/Profile/userInfo";
import MenuList from "@/components/Profile/MenuList";

export default function profile() {
  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontFamily: "outfit-bold", fontSize: 35 }}>Profile</Text>
      {/* User info */}
      <UserInfo />
      {/* MeuList */}
      <MenuList />
    </View>
  );
}
