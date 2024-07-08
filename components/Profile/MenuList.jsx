import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Share,
} from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";

export default function MenuList() {
  const router = useRouter();

  //Sign out
  const { signOut } = useAuth();

  // better for share and logout functionality
  const onMenuClick = (item) => {
    if (item.path == "logout") {
      signOut();
      return;
    }
    if (item.path == "share") {
      Share.share({
        message: "Download app ",
      });
      return;
    } else {
      router.push(item.path);
    }
  };
  const menuList = [
    {
      id: 1,
      name: "Add Business",
      icon: require("../../assets/images/add.png"),
      path: "/businessRoutes/AddBusiness",
    },
    {
      id: 2,
      name: "My Business",
      icon: require("../../assets/images/business-and-trade.png"),
      path: "/businessRoutes/myBusiness",
    },
    {
      id: 3,
      name: "Share App",
      icon: require("../../assets/images/share_1.png"),
      path: "share",
    },
    {
      id: 4,
      name: "LogOut",
      icon: require("../../assets/images/logout.png"),
      path: "logout",
    },
  ];
  return (
    <View
      style={{
        marginTop: 15,
      }}
    >
      <FlatList
        data={menuList}
        numColumns={2}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => onMenuClick(item)}
            key={index}
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              flex: 1, //stretch equally
              padding: 10,
              borderRadius: 15,
              borderWidth: 1,
              margin: 10,
              backgroundColor: "#fff",
              borderColor: Colors.PRIMARY,
            }}
          >
            <Image
              source={item.icon}
              style={{ width: 50, height: 50, flex: 1 }}
            />
            <Text style={{ fontFamily: "outfit-medium", fontSize: 18 }}>
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />
      <Text
        style={{
          fontFamily: "outfit-bold",
          textAlign: "center",
          color: Colors.GRAY,
        }}
      >
        Owen Mwai developed @ 2024
      </Text>
    </View>
  );
}
