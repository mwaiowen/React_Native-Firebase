import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Linking,
  Share,
} from "react-native";
import React from "react";

export default function ActionButton({ business }) {
  const actionButtonmenu = [
    {
      id: 1,
      name: "Call",
      icon: require("../../assets/images/call.png"),
      url: "tel:" + business?.contact,
    },
    {
      id: 2,
      name: "Location",
      icon: require("../../assets/images/pin.png"),
      url: "https://maps.app.goo.gl/nK5moxtFgntxa9kf8:" + business?.address,
    },
    {
      id: 3,
      name: "Web",
      icon: require("../../assets/images/web.png"),
      url: business?.web,
    },
    {
      id: 4,
      name: "Share",
      icon: require("../../assets/images/share.png"),
      url: business?.web,
    },
  ];

  const OnPresshandler = (item) => {
    if (item.name === "Share") {
      Share.share({
        message:
          business?.name +
          "\n Address:" +
          business?.address +
          "\n Find more detail on business directory app!",
      });
      return;
    }

    if (item.url) {
      Linking.openURL(item.url);
    } else {
      console.warn("URL is undefined or null");
    }
  };

  return (
    <View style={{ backgroundColor: "#fff", padding: 20 }}>
      <FlatList
        data={actionButtonmenu}
        numColumns={4}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        renderItem={({ item, index }) => (
          <TouchableOpacity key={index} onPress={() => OnPresshandler(item)}>
            <Image
              source={item?.icon}
              key={index}
              style={{ width: 50, height: 50 }}
            />
            <Text
              style={{
                fontFamily: "outfit-medium",
                textAlign: "center",
                marginTop: 3,
              }}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
