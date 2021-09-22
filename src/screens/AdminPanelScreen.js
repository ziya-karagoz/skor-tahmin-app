import React, { useState } from "react";
import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import firebase from "firebase";

import { finalMatch } from "../utils/constants/allMatches";
import styles from "../styles/ScreenStyles";

function AdminPanelScreen({ navigation }) {
  const [loading, setLoading] = useState(false);

  const onPressHandler = () => {
    setUsersMatchId();
    window.alert("Match created successfuly!");
  };

  const setUsersMatchId = () => {
    let tempData = [];
    setLoading(true);

    const db = firebase.firestore();
    db.collection("users")
      .get()
      .then((querySnapshot) => {
        querySnapshot.docs.forEach((doc) => {
          doc.ref.update({ currentMatchId: finalMatch.matchId });
        });
        setLoading(false);
      });
  };

  const calCulateResults = () => {
    const db = firebase.firestore();
    db.collection("users")
      .get()
      .then((querySnapshot) => {
        querySnapshot.docs.forEach((doc) => {
          let number = 0;
          if (doc.data().currentWinnerTeam === finalMatch.winner) {
            number += 3;
          }
          if (doc.data().currentPrediction === finalMatch.result) {
            number += 5;
          }
          doc.ref.update({ points: number });
        });
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText} onPress={onPressHandler}>
          Create Match
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText} onPress={() => calCulateResults()}>
          Calculate
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text
          style={styles.buttonText}
          onPress={() => navigation.navigate("Login")}
        >
          Go Back
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default AdminPanelScreen;
