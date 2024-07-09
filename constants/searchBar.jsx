import React, { useState } from "react";
import {
  View,
  TextInput,
  FlatList,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { query, where, getDocs, collection } from "firebase/firestore";
import { db } from "../config/FirebaseConfig";
import { FontAwesome } from "@expo/vector-icons";
import { Colors } from "./Colors";
import { useRouter } from "expo-router";

const SearchBar = ({ business }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const router = useRouter();

  const searchBusinesses = async (name) => {
    const q = query(
      collection(db, "BusinessList"),
      where("name", ">=", name),
      where("name", "<=", name + "\uf8ff")
    );

    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      setSearchResults([]);
      setShowResults(false);
    } else {
      const results = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setSearchResults(results);
      setShowResults(true);
    }
  };

  const handleSearch = (text) => {
    setSearchQuery(text);
    if (text === "") {
      setSearchResults([]);
      setShowResults(false);
    } else {
      searchBusinesses(text);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <FontAwesome name="search" size={24} color={Colors.PRIMARY} />
        <TextInput
          style={styles.input}
          onChangeText={handleSearch}
          value={searchQuery}
          placeholder="Search..."
        />
      </View>
      {showResults && (
        <FlatList
          data={searchResults}
          scrollEnabled
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.resultItem}
              onPress={() => router.push("/businessdetail/" + item?.id)}
            >
              <Image
                source={{ uri: item.imageUrl }}
                style={styles.image}
                resizeMode="cover"
              />
              <View style={styles.textContainer}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.about}>{item.category}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
    marginTop: 15,
    borderRadius: 8,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  input: {
    fontFamily: "outfit",
    fontSize: 16,
    marginLeft: 10,
    flex: 1,
  },
  resultItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  textContainer: {
    marginLeft: 10,
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  about: {
    fontSize: 14,
    color: "#888",
  },
});

export default SearchBar;
