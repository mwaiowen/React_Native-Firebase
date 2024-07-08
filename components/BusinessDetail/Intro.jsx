import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  ToastAndroid,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { db } from "@/config/FirebaseConfig";
import { deleteDoc, doc } from "firebase/firestore";
import { useUser } from "@clerk/clerk-expo";

export default function Intro({ business }) {
  const router = useRouter();
  const { user } = useUser();

  const deleteBusiness = async () => {
    console.log("Business deleted");
    await deleteDoc(doc(db, "BusinessList", business?.id));

    //navigate to previous screens
    router.back();
    ToastAndroid.show("Business Deleted", ToastAndroid.LONG);
  };

  const onDelete = () => {
    Alert.alert(
      "Do you really want to delete this business?",
      "This action cannot be undone.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => deleteBusiness(),
        },
      ]
    );
  };

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
          display: "flex",
          flexDirection: "row",
          padding: 20,
          justifyContent: "space-between",
          marginTop: -20,
          backgroundColor: "#fff",
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
        }}
      >
        <View
          style={{
            padding: 20,
            marginTop: -20,
            backgroundColor: "#fff",
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
          }}
        >
          <Text
            style={{
              fontfamily: "outfit-bold",
              fontSize: 26,
            }}
          >
            {business.name}
          </Text>

          <Text style={{ fontfamily: "outfit", fontSize: 18 }}>
            {business.address}
          </Text>
        </View>
        {user?.primaryEmailAddress?.emailAddress === business?.userEmail && (
          <TouchableOpacity onPress={() => onDelete()}>
            <MaterialIcons name="delete" size={24} color="red" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
