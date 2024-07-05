import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { collection, doc, getDoc, query } from "firebase/firestore";
import { db } from "@/config/FirebaseConfig";
import { Colors } from "@/constants/Colors";
import Intro from "../../components/BusinessDetail/Intro";
import ActionButton from "@/components/BusinessDetail/ActionButton";
import About from "@/components/BusinessDetail/About";
import Reviews from "@/components/BusinessDetail/Reviews";

export default function BusinessDetail() {
  const { businessid } = useLocalSearchParams(); //business id should match the file name
  const [business, setBusiness] = useState([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    GetBusinessDetailById();
  }, []);

  const GetBusinessDetailById = async () => {
    setLoading(true);
    try {
      const docRef = doc(db, "BusinessList", businessid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setBusiness({ id: docSnap.id, ...docSnap.data() });
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error fetching document:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
      {loading ? (
        <ActivityIndicator
          size="large"
          color={Colors.PRIMARY}
          style={{ flex: 1, justifyContent: "center" }}
        />
      ) : (
        <View style={{ flex: 1 }}>
          {/* this is the intro */}
          {business && <Intro business={business} />}

          {/* action button */}
          {business && <ActionButton business={business} />}

          {/* About section */}
          {business && <About business={business} />}

          {/* Reviews */}
          {business && <Reviews business={business} />}
        </View>
      )}
    </ScrollView>
  );
}
