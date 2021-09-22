import React, { useReducer, useState, useEffect } from "react";
import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import styles from "../styles/ScreenStyles";
import { loginReducer, initialState } from "../utils/reducers/loginReducer";
import firebase from "firebase";
import { LOGOUT } from "../utils/constants/constants";

export default function Home({ navigation, state }) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});

  const [loginState, dispatch] = state;

  // database get request from firestore
  const fetchData = () => {
    setLoading(true);
    const db = firebase.firestore();
    db.collection("users")
      .get()
      .then((querySnapshot) => {
        querySnapshot.docs.forEach((doc) => {
          if (doc.id === loginState.docId) {
            setData(doc.data());
            setLoading(false);
            return;
          }
        });
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const signOutHandler = () => {
    dispatch({ type: LOGOUT });
    navigation.navigate("Login");
  };

  const clickHandler = () => {
    navigation.navigate("Predictions");
  };

  const resultsHanler = () => {
    navigation.navigate("Results");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        Welcome {data.name} {data.surname}
      </Text>

      <Text>Your points: {data.points}</Text>
      <TouchableOpacity style={styles.button} onPress={clickHandler}>
        <Text style={styles.buttonText}>Go to Predictions</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={resultsHanler}>
        <Text style={styles.buttonText}>Score Table</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={signOutHandler}>
        <Text style={styles.buttonText}>Sign out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
