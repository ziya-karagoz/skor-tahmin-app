import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Button,
} from "react-native";
import firebase from "firebase";
import { finalMatch } from "../utils/constants/allMatches";
import styles from "../styles/ScreenStyles";

function PredictionsScreen({ navigation, state }) {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [loginState, dispatch] = state;
  const [score, setScore] = useState("");
  const [winner, setWinner] = useState("");

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
            setLoading(true);
            return;
          }
        });
      });
  };

  const setMatchInfoToDb = () => {
    const db = firebase.firestore();
    db.collection("users")
      .get()
      .then((querySnapshot) => {
        querySnapshot.docs.forEach((doc) => {
          if (doc.id === loginState.docId) {
            doc.ref.update({
              currentWinnerTeam: winner,
              currentPrediction: score,
            });
          }
        });
      });
  };

  const handleSubmit = () => {
    if (!winner) {
      alert("Please fill winner");
      return;
    }
    if (!score) {
      alert("Please fill score");
      return;
    }
    window.alert("Enrolled successfuly!");
    setMatchInfoToDb();
    navigation.navigate("Home");
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        {finalMatch.matchId === data.currentMatchId ? "France - Croatia" : ""}
      </Text>
      <View>
        <Text style={styles.title} htmlFor='winnerId'>
          Winner
        </Text>
        <TextInput
          style={styles.input}
          type='text'
          id='winnerId'
          onChangeText={(text) => setWinner(text)}
        />
      </View>
      <View>
        <Text style={styles.title} htmlFor='scoreId'>
          Score'e.g. (2-1)'
        </Text>
        <TextInput
          style={styles.input}
          type='text'
          id='scoreId'
          onChangeText={(text) => setScore(text)}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default PredictionsScreen;
