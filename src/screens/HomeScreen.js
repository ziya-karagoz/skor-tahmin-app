import React, { useReducer, useState, useEffect } from "react";
import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "../styles/ScreenStyles";
import { loginReducer, initialState } from "../utils/reducers/loginReducer";
import firebase from "firebase";

export default function Home({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const [loginState, dispatch] = useReducer(loginReducer, initialState);

  // database get request from firestore
  const fetchData = () => {
    setLoading(true);

    const db = firebase.firestore();
    db.collection("users")
      .get()
      .then((querySnapshot) => {
        querySnapshot.docs.forEach((doc) => {
          console.log("doc.id: ", doc.id);
          console.log("loginState.docId: ", loginState.docId);
          if (doc.id == loginState.docId) {
            console.log("girdi");
            setData(doc.data());
            return;
          }
        });
      });
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {}, [data]);

  const clickHandler = () => {
    dispatch({ type: "SIGNOUT" });
    navigation.navigate("Login");
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Welcome user!</Text>
      <TouchableOpacity style={styles.button} onPress={clickHandler}>
        <Text style={styles.buttonText}>Sign out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
