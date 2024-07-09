import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
  Image,
} from "react-native";
import React, { useState } from "react";
import { Rating } from "react-native-ratings";
import { Colors } from "@/constants/Colors";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useUser } from "@clerk/clerk-expo";
import { db } from "@/config/FirebaseConfig";

export default function Reviews({ business }) {
  const [rating, setRating] = useState();
  const [userInput, setUserInput] = useState();

  const { user } = useUser();

  //submitting the review
  const onSubmit = async () => {
    const docRef = doc(db, "BusinessList", business?.id);
    await updateDoc(docRef, {
      reviews: arrayUnion({
        rating: rating,
        comment: userInput,
        userName: user?.fullName,
        userImage: user?.imageUrl,
        userEmail: user?.primaryEmailAddress?.emailAddress,
      }),
    });

    ToastAndroid.show(
      "Comment added successfully...Thankyou!",
      ToastAndroid.BOTTOM
    );
  };

  return (
    <View
      style={{
        padding: 20,
      }}
    >
      <Text style={{ fontFamily: "outfit-bold", fontSize: 20 }}>Reviews</Text>
      <View>
        <Rating
          showrating={false}
          onFinishRating={(rating) => setRating(rating)}
          style={{ paddingVertical: 10 }}
        />
        <TextInput
          style={{
            borderWidth: 1,
            padding: 10,
            borderRadius: 10,
            borderColor: Colors.GRAY,
            textAlignVertical: "top",
          }}
          numberOfLines={4}
          placeholder="Write your comment.."
          onChangeText={(value) => setUserInput(value)}
        />
        <TouchableOpacity
          disabled={!userInput}
          style={{
            padding: 10,
            backgroundColor: Colors.PRIMARY,
            borderRadius: 6,
            marginTop: 10,
          }}
        >
          <Text
            onPress={() => onSubmit()}
            style={{
              fontFamily: "outfit",
              color: "#fff",
              justifyContent: "flex-end",
              textAlign: "center",
            }}
          >
            Submit
          </Text>
        </TouchableOpacity>
      </View>

      <View>
        {business?.reviews?.map((item, index) => (
          <View
            key={index}
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 10,
              alignItems: "center",
              padding: 10,
              borderWidth: 1,
              borderColor: Colors.GRAY,
              borderRadius: 15,
              marginTop: 10,
            }}
          >
            <Image
              source={{ uri: item.userImage }}
              style={{
                width: 50,
                height: 50,
                borderRadius: 99,
              }}
            />
            <View style={{ display: "flex" }}>
              <Text style={{ fontFamily: "outfit-medium" }}>
                {item.userName}{" "}
              </Text>
              <Text>{item.comment} </Text>

              <Rating
                imageSize={20}
                ratingCount={item.rating}
                style={{ alignItems: "flex-start" }}
              />
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}
