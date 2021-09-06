// @refresh reset

import { StatusBar } from "expo-status-bar";
import React from "react";
import { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDECmTUe-7Opc7sbCXoB70reoxbZr_7xKo",
  authDomain: "skor-tahmin-aad71.firebaseapp.com",
  projectId: "skor-tahmin-aad71",
  storageBucket: "skor-tahmin-aad71.appspot.com",
  messagingSenderId: "987702677653",
  appId: "1:987702677653:web:0e3c5dea79e09154c48b9c",
  measurementId: "G-6MTVHBX8E9",
};

// How to check if a Firebase App is already initialized (ama calismiyor)
if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

const fetchData = () => {
  const db = firebase.firestore();
  var docRef = db.collection("users").doc("user1");

  docRef
    .get()
    .then((doc) => {
      if (doc.exists) {
        console.log("Document data:", doc.data());
        return doc.data();
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
        return;
      }
    })
    .catch((error) => {
      return console.error("Error getting document:", error);
    });
};

export default function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {
    const data = fetchData();
    setPassword(data.password);
    setUsername(data.username);
  }, []);
  return (
    <View style={styles.container}>
      <Text>username: {username}</Text>
      <Text>password: {password}</Text>
      <StatusBar style='auto' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
