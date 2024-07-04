import { View, Text, Image, Touchab, TouchableOpacity } from "react-native";
import React from "react";

export default function CategoryCard({ category, onCategoryPres }) {
  return (
    <TouchableOpacity onPress={() => onCategoryPres(category)}>
      <View style={{ padding: 15, borderRadius: 99, marginRight: 15 }}>
        <Image
          source={{ uri: category.icon }}
          style={{
            width: 50,
            height: 50,
          }}
        />
      </View>
      <Text
        style={{
          fontSize: 12,
          fontFamily: "outfit-medium",
          textAlign: "center",
          marginTop: 5,
        }}
      >
        {category.name}
      </Text>
    </TouchableOpacity>
  );
}
