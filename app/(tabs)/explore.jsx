import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import Category from "@/components/Home/Category";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/config/FirebaseConfig";
import ExploreBusinessList from "@/components/Explore/ExploreBusinessList";
import { useRouter } from "expo-router";

export default function Explore() {
  const router = useRouter();

  // Searchbar logic
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // Search business logic
  const searchBusinesses = async (name) => {
    setLoading(true); // Set loading to true when searching
    const q = query(
      collection(db, "BusinessList"),
      where("name", ">=", name),
      where("name", "<=", name + "\uf8ff")
    );

    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      setSearchResults([]);
    } else {
      const results = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setSearchResults(results);
    }
    setLoading(false); // Set loading to false after getting results
  };

  const handleSearch = (text) => {
    setSearchQuery(text);
    if (text === "") {
      setSearchResults([]);
    } else {
      searchBusinesses(text);
    }
  };

  // Business list by category logic
  const [businessList, setBusinessList] = useState([]);

  const getBusinessByCategory = async (category) => {
    setBusinessList([]);
    const q = query(
      collection(db, "BusinessList"),
      where("category", "==", category)
    );

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      setBusinessList((prev) => [...prev, { id: doc.id, ...doc.data() }]);
    });
  };

  return (
    <View style={{ padding: 25 }}>
      <Text style={{ fontFamily: "outfit-bold", fontSize: 30 }}>
        Explore More
      </Text>

      {/* Search bar */}
      <View style={styles.searchContainer}>
        <FontAwesome name="search" size={24} color={Colors.PRIMARY} />
        <TextInput
          onChangeText={handleSearch}
          value={searchQuery}
          placeholder="Search..."
          style={styles.searchInput}
        />
      </View>

      {/* Category */}
      <Category
        explore={true}
        onCategorySelect={(category) => getBusinessByCategory(category)}
      />

      {/* Business list */}
      <ExploreBusinessList businessList={businessList} />

      {/* Search results */}
      <ScrollView>
        <View>
          <Text style={styles.searchResultsTitle}>Search Results</Text>
        </View>
        {loading ? (
          <ActivityIndicator
            size="large"
            color={Colors.PRIMARY}
            style={styles.loadingIndicator}
          />
        ) : searchResults.length > 0 ? (
          <FlatList
            scrollEnabled
            data={searchResults}
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
        ) : (
          <Text style={styles.noResultsText}>
            No business found under this category 😕
          </Text>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    marginVertical: 10,
    marginTop: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
  },
  searchInput: {
    fontFamily: "outfit",
    fontSize: 16,
    marginLeft: 10,
    flex: 1,
  },
  searchResultsTitle: {
    fontFamily: "outfit-bold",
    fontSize: 20,
    marginBottom: 10,
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
  noResultsText: {
    fontFamily: "nagasaki",
    fontSize: 20,
    textAlign: "center",
    marginTop: "50%",
  },
  loadingIndicator: {
    marginTop: "50%",
  },
});
