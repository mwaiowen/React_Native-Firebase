import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "@/constants/Colors";
import { collection, getDocs, limit, query } from "firebase/firestore";
import { db } from "@/config/FirebaseConfig";
import PopularBusinessCard from "./PopulaBusinessCard";

export default function PopularBusiness() {
  const [popularBusinessList, setPopularBusinessList] = useState([]);
  useEffect(() => {
    GetPopularBusinessList();
  }, []);

  const GetPopularBusinessList = async () => {
    setPopularBusinessList([]);
    const q = query(collection(db, "BusinessList"), limit(10));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.data());
      setPopularBusinessList((prev) => [
        ...prev,
        { id: doc.id, ...doc.data() },
      ]);
    });
  };
  return (
    <View>
      <View
        style={{
          paddingLeft: 20,
          marginBottom: 10,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 20,
        }}
      >
        <Text
          style={{
            paddingLeft: 20,
            fontSize: 20,
            fontFamily: "outfit-bold",
          }}
        >
          Popular Business
        </Text>
        <Text style={{ color: Colors.PRIMARY, fontFamily: "outfit-medium" }}>
          View All
        </Text>
      </View>
      <FlatList
        data={popularBusinessList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <View>
            <PopularBusinessCard business={item} key={index} />
          </View>
        )}
      />
    </View>
  );
}
