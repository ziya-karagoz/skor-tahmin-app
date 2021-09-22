import React, { useState, useEffect } from "react";
import firebase from "firebase";
import { View, TouchableOpacity, Text, SafeAreaView } from "react-native";
import styles from "../styles/ScreenStyles";

function ResultsScreen({ navigation }) {
  const [loading, setLoading] = useState(false);
  let tempData = [];
  const fetchData = () => {
    setLoading(true);
    const db = firebase.firestore();
    db.collection("users")
      .get()
      .then((querySnapshot) => {
        querySnapshot.docs.forEach((doc) => {
          tempData.push({
            username: doc.data().username,
            points: doc.data().points,
          });
        });
      });
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
    console.log(tempData);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}> Results!</Text>
      <View>
        {tempData.forEach((user) => (
          <View>
            <Text>
              {user.username} - {user.points}
            </Text>
          </View>
        ))}
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={styles.buttonText}>Go Back</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default ResultsScreen;
