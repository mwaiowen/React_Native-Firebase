import React, { useState } from "react";
import { View, TextInput, FlatList, Text } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { db } from "./firebase";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (text) => {
    setSearchQuery(text);
    try {
      const snapshot = await db
        .collection("BusinessList")
        .where("searchField", ">=", text.toLowerCase())
        .get();

      const results = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setSearchResults(results);
    } catch (error) {
      console.error("Error searching:", error);
    }
  };

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        padding: 10,
        marginVertical: 10,
        marginTop: 15,
        borderRadius: 8,
      }}
    >
      <FontAwesome name="search" size={24} color="#333" />
      <TextInput
        placeholder="Search..."
        style={{
          fontFamily: "outfit",
          fontSize: 16,
          marginLeft: 10,
          flex: 1,
        }}
        onChangeText={handleSearch}
        value={searchQuery}
      />
      <FlatList
        data={searchResults}
        renderItem={({ item }) => (
          <Text style={{ marginVertical: 5 }}>{item.name}</Text>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default SearchBar;
