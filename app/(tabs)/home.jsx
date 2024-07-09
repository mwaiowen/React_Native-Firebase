import React, { useState } from "react";
import { View, Text, ScrollView, RefreshControl } from "react-native";
import Header from "@/components/Home/Header";
import Slider from "@/components/Home/Slider";
import Category from "@/components/Home/Category";
import PopularBusiness from "@/components/Home/PopularBusiness";

export default function home() {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const onRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 2000);
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
      }
    >
      <Header />
      <Slider />
      <Category />
      <PopularBusiness />
      <View style={{ height: 50 }}></View>
    </ScrollView>
  );
}
