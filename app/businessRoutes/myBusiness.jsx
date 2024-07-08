import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-expo";
import { collection, getDocs, query, where, doc } from "firebase/firestore";
import { db } from "@/config/FirebaseConfig";
import BusinessListCard from "@/components/Explore/BusinessListCard";
import { useSafeAreaFrame } from "react-native-safe-area-context";
import { useNavigation } from "expo-router";
import { Colors } from "@/constants/Colors";

export default function MyBusiness() {
  const { user } = useUser();

  const [businessList, setBusinessList] = useState([]);

  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  // only to be called when the user info exists
  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: "My Business",
      headerStyle: {
        backgroundColor: Colors.PRIMARY,
      },
    });
    user && GetUserBusiness();
  }, [user]);

  // get business details from firebase in relation to the user who posted it

  const GetUserBusiness = async () => {
    setLoading(true);
    const q = query(
      collection(db, "BusinessList"),
      where("userEmail", "==", user?.primaryEmailAddress?.emailAddress)
    );

    const querySnapshot = await getDocs(q);

    const businesses = [];
    querySnapshot.forEach((doc) => {
      businesses.push({ id: doc.id, ...doc.data() });
    });
    setLoading(false);
    setBusinessList(businesses);
  };

  return (
    <View
      style={{
        padding: 20,
      }}
    >
      <Text
        style={{
          fontFamily: "outfit-bold",
          fontSize: 30,
        }}
      >
        MyBusiness
      </Text>

      <FlatList
        onRefresh={GetUserBusiness} // pull down to refresh
        refreshing={loading}
        data={businessList}
        renderItem={({ item, index }) => (
          <BusinessListCard business={item} key={index} />
        )}
      />
    </View>
  );
}
