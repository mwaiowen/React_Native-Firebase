import { View, Text, FlatList } from "react-native";
import React from "react";
import BusinessListCard from "./BusinessListCard";

export default function ExploreBusinessList({ businessList }) {
  return (
    <View>
      <FlatList
        data={businessList}
        renderItem={({ item, index }) => (
          <BusinessListCard business={item} key={index} />
        )}
      />
    </View>
  );
}
