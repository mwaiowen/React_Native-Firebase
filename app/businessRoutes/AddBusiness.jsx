import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ToastAndroid,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "expo-router";
import { Colors } from "@/constants/Colors";
import * as ImagePicker from "expo-image-picker";
import { Picker } from "@react-native-picker/picker";
import { collection, doc, getDocs, query, setDoc } from "firebase/firestore";

import { db, storage } from "@/config/FirebaseConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useUser } from "@clerk/clerk-expo";

export default function AddBusiness() {
  const { user } = useUser();
  const [image, setImage] = useState(null);
  const [categoryList, setcategoryList] = useState([]);

  const [name, setName] = useState();
  const [address, setAddress] = useState();
  const [contact, setContact] = useState();
  const [website, setWebsite] = useState();
  const [about, setAbout] = useState();
  const [category, setCategory] = useState();

  const [loading, setLoading] = useState(false);

  const onAddNewBusiness = async () => {
    setLoading(true);
    const fileName = Date.now().toString() + "jpg" + "jpeg" + "png";
    const resp = await fetch(image);

    const blob = await resp.blob();
    const imageRef = ref(storage, "business-app/" + fileName);
    uploadBytes(imageRef, blob)
      .then((snapShot) => {
        console.log("File uploaded");
      })
      .then((resp) => {
        getDownloadURL(imageRef).then(async (downloadUrl) => {
          console.log(downloadUrl);
          saveBusinessDetail(downloadUrl);
        });
      });
    setLoading(false);
  };

  const saveBusinessDetail = async (imageUrl) => {
    try {
      await setDoc(doc(db, "BusinessList", Date.now().toString()), {
        name: name,
        address: address,
        contact: contact,
        about: about,
        website: website,
        category: category,
        username: user?.fullName,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        userImage: user?.imageUrl,
        imageUrl: imageUrl,
      });
      setLoading(false);
      ToastAndroid.show("New Business Added...", ToastAndroid.LONG);
    } catch (error) {
      console.error("Error adding business:", error);
      setLoading(false);
    }
  };

  const navigation = useNavigation();

  const onImagePick = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.cancelled && result.assets.length > 0) {
      setImage(result.assets[0].uri);
    }

    console.log(result);
  };

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Add New Business",
      headerShown: true,
    });
    GetCategoryList();
  }, []);

  const GetCategoryList = async () => {
    setcategoryList([]);
    const q = query(collection(db, "Category"));
    const snapShot = await getDocs(q);

    snapShot.forEach((doc) => {
      console.log(doc.data());
      setcategoryList((prev) => [
        ...prev,
        {
          label: doc.data().name,
          value: doc.data().name,
        },
      ]);
    });
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
          fontSize: 25,
        }}
      >
        Add New Business
      </Text>
      <Text
        style={{
          fontFamily: "outfit",
          color: Colors.GRAY,
        }}
      >
        Fill all details in order to add new Business
      </Text>
      <TouchableOpacity style={{ marginTop: 20 }} onPress={() => onImagePick()}>
        {!image ? (
          <Image
            source={require("../../assets/images/Imagepicker2.png")}
            style={{
              width: 100,
              height: 100,
            }}
          />
        ) : (
          <Image
            source={{ uri: image }}
            style={{
              width: 100,
              height: 100,
              borderRadius: 15,
            }}
          />
        )}
      </TouchableOpacity>
      <View>
        <TextInput
          onChangeText={(text) => setName(text)}
          placeholder="Name"
          style={{
            padding: 15,
            borderWidth: 1,
            borderRadius: 5,
            fontSize: 17,
            backgroundColor: "#fff",
            marginTop: 10,
            borderColor: Colors.PRIMARY,
            fontFamily: "outfit",
          }}
        />

        <TextInput
          placeholder="Address"
          onChangeText={(text) => setAddress(text)}
          style={{
            padding: 10,
            borderWidth: 1,
            borderRadius: 5,
            fontSize: 17,
            backgroundColor: "#fff",
            marginTop: 10,
            borderColor: Colors.PRIMARY,
            fontFamily: "outfit",
          }}
        />
        <TextInput
          placeholder="Contact"
          onChangeText={(text) => setContact(text)}
          style={{
            padding: 10,
            borderWidth: 1,
            borderRadius: 5,
            fontSize: 17,
            backgroundColor: "#fff",
            marginTop: 10,
            borderColor: Colors.PRIMARY,
            fontFamily: "outfit",
          }}
        />
        <TextInput
          placeholder="Website"
          onChangeText={(text) => setWebsite(text)}
          style={{
            padding: 10,
            borderWidth: 1,
            borderRadius: 5,
            fontSize: 17,
            backgroundColor: "#fff",
            marginTop: 10,
            borderColor: Colors.PRIMARY,
            fontFamily: "outfit",
          }}
        />
        <TextInput
          placeholder="About"
          onChangeText={(text) => setAbout(text)}
          multiline
          numberOfLines={5}
          style={{
            padding: 10,
            borderWidth: 1,
            borderRadius: 5,
            fontSize: 17,
            backgroundColor: "#fff",
            marginTop: 10,
            borderColor: Colors.PRIMARY,
            fontFamily: "outfit",
            height: 100,
          }}
        />
        <View>
          {/* gets the category names from the backend */}
          <Picker
            selectedValue={category}
            onValueChange={(itemValue, itemIndex) => setCategory(itemValue)}
            style={{
              padding: 10,
              borderWidth: 1,
              borderRadius: 5,
              fontSize: 17,
              backgroundColor: "#fff",
              marginTop: 10,
              borderColor: Colors.PRIMARY,
              fontFamily: "outfit",
            }}
          >
            <Picker.Item label="Select Category..." value="" />
            {categoryList.map((category, index) => (
              <Picker.Item
                key={index}
                label={category.label}
                value={category.value}
              />
            ))}
          </Picker>
        </View>
      </View>
      <TouchableOpacity
        disabled={loading}
        onPress={() => onAddNewBusiness()}
        style={{
          padding: 15,
          backgroundColor: Colors.PRIMARY,
          borderRadius: 5,
          marginTop: 20,
        }}
      >
        {loading ? (
          <ActivityIndicator size="large" color={"#fff"} />
        ) : (
          <Text
            style={{
              textAlign: "center",
              fontFamily: "outfit-bold",
              color: "#fff",
            }}
          >
            Add New Business
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
}
