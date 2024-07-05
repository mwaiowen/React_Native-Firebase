import { View, Text, FlatList, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../config/FirebaseConfig.js";
import BusinessListCard from "../../components/BusinessList/BusinessListCard.jsx";
import { Colors } from "../../constants/Colors.ts";

export default function BusinessListByCategory() {
  const [businessList, setBusinessList] = useState([]);
  const navigation = useNavigation();
  const { category } = useLocalSearchParams();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: category,
    });
    getBusinessList();
  }, []);

  //used to get business by category

  const getBusinessList = async () => {
    setLoading(true);
    const q = query(
      collection(db, "BusinessList"),
      where("category", "==", category)
    );
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      console.log(doc.data());
      setBusinessList((prev) => [...prev, { id: doc?.id, ...doc.data() }]);
    });
    setLoading(false);
  };

  return (
    <View>
      {businessList?.length > 0 && loading == false ? (
        <FlatList
          data={businessList}
          renderItem={({ item, index }) => (
            <BusinessListCard business={item} key={index} />
          )}
        />
      ) : loading ? (
        <ActivityIndicator
          size={"large"}
          color={Colors.PRIMARY}
          style={{ marginTop: "50%" }}
        />
      ) : (
        <Text
          style={{
            fontFamily: "nagasaki",
            fontSize: 40,
            textAlign: "center",
            marginTop: "50%",
          }}
        >
          No business found under this category 😕
        </Text>
      )}
    </View>
  );
}
