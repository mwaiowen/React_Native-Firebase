import { View, Text, TextInput } from "react-native";
import React, { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import Category from "@/components/Home/Category";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/config/FirebaseConfig";
import ExploreBusinessList from "@/components/Explore/ExploreBusinessList";

export default function explore() {
  const [businessList, setBusinessList] = useState([]);

  const getBusinessByCategory = async (category) => {
    const q = query(
      collection(db, "BusinessList"),
      where("category", "==", category)
    );

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      console.log(doc.data());
      setBusinessList((prev) => [...prev, { id: doc.id, ...doc.data() }]);
    });
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontFamily: "outfit-bold", fontSize: 30 }}>
        Explore More
      </Text>

      {/* search bar */}
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 10,
          alignItems: "center",
          backgroundColor: "#fff",
          padding: 10,
          marginVertical: 10,
          marginTop: 15,
          borderRadius: 8,
          borderWidth: 1,
          borderColor: Colors.PRIMARY,
        }}
      >
        <FontAwesome name="search" size={24} color={Colors.PRIMARY} />
        <TextInput
          placeholder="Search..."
          style={{
            fontFamily: "outfit",
            fontSize: 16,
          }}
        />
      </View>

      {/* category */}
      <Category
        explore={true}
        onCategorySelect={(category) => getBusinessByCategory(category)}
      />

      {/* Businesslist */}
      <ExploreBusinessList businessList={businessList} />
    </View>
  );
}
