import React, { useState, useEffect } from "react";
import { useHistory } from "react-dom";
import firebase from "firebase";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text, View, TextInput, Button } from "react-native";

import styles from "../styles/ScreenStyles";

function LoginScreen({ navigation }) {
  // states
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState([]);

  // effect hooks

  useEffect(() => {
    const data = fetchData();
  }, [data]);

  // database get request from firestore
  const fetchData = () => {
    setLoading(true);
    const db = firebase.firestore();

    db.collection("users")
      .get()
      .then((querySnapshot) => {
        querySnapshot.docs.forEach((doc) => {
          data.push(doc.data());
        });
        setLoading(false);
      });
    console.log("Login", data);
  };

  const handleSubmitPress = () => {
    if (!username) {
      alert("Please fill username");
      return;
    }
    if (!password) {
      alert("Please fill password");
      return;
    }

    if (!loading) {
      let userdata = {};
      data?.map((user) => {
        if (user.username === username && user.password === password) {
          userdata = user;
        } else {
          return;
        }
      });
      if (userdata.username === username && userdata.password === password) {
        navigation.navigate("Home");
      } else {
        window.alert("incorrect username or password");
      }
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <View>
          <Text style={styles.title} htmlFor='usernameId'>
            UserName:{" "}
          </Text>
          <TextInput
            style={styles.input}
            type='text'
            id='usernameId'
            onChange={(e) => setUsername(e.target.value)}
          />
        </View>
        <View>
          <Text style={styles.title} htmlFor='passwordId'>
            Password:{" "}
          </Text>
          <TextInput
            style={styles.input}
            type='text'
            id='passwordId'
            onChange={(e) => setPassword(e.target.value)}
          />
        </View>
        <Button style={styles.button} onPress={handleSubmitPress} title='Login'>
          Login
        </Button>
      </View>
      <View>
        <Button
          style={styles.button}
          type='button'
          onPress={() => navigation.navigate("Register")}
          title="Don't have any account yet?"
        >
          Don't have any account yet?
        </Button>
      </View>
    </View>
  );
}

export default LoginScreen;
