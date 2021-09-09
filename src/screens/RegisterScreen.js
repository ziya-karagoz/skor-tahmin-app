import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text, View, TextInput, Button } from "react-native";
import firebase from "firebase";
import styles from "../styles/ScreenStyles";

function RegisterScreen({ navigation }) {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [username, setusername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const fetchData = () => {
    const db = firebase.firestore();

    db.collection("users")
      .get()
      .then((querySnapshot) => {
        querySnapshot.docs.forEach((doc) => {
          data.push(doc.data());
        });
      });

    console.log("Register: ", data);
  };

  const createAccount = () => {
    const data = {
      name: name,
      surname: surname,
      username: username,
      email: email,
      password: password,
    };
    const db = firebase.firestore();
    db.collection("users").add(data);
    window.alert("basarili bir sekilde eklenmistir!");
    navigation.navigate("Login");
  };

  const handleSubmit = () => {
    if (!name) {
      alert("Please fill name");
      return;
    }
    if (!surname) {
      alert("Please fill surname");
      return;
    }
    if (!username) {
      alert("Please fill username");
      return;
    }
    if (!email) {
      alert("Please fill email");
      return;
    }
    if (!password) {
      alert("Please fill password");
      return;
    }
    fetchData();
    createAccount();
  };

  useEffect(() => {}, []);
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title} htmlFor='nameId'>
          Name:{" "}
        </Text>
        <TextInput
          style={styles.input}
          type='text'
          id='nameId'
          onChange={(e) => setName(e.target.value)}
        />
      </View>
      <View>
        <Text style={styles.title} htmlFor='surnameId'>
          Surname:{" "}
        </Text>
        <TextInput
          style={styles.input}
          type='text'
          id='surnameId'
          onChange={(e) => setSurname(e.target.value)}
        />
      </View>
      <View>
        <Text style={styles.title} htmlFor='usernameId'>
          Username:{" "}
        </Text>
        <TextInput
          style={styles.input}
          type='text'
          id='usernameId'
          onChange={(e) => setusername(e.target.value)}
        />
      </View>
      <View>
        <Text style={styles.title} htmlFor='emailId'>
          E-mail:{" "}
        </Text>
        <TextInput
          style={styles.input}
          type='text'
          id='emailId'
          onChange={(e) => setEmail(e.target.value)}
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

      <Button
        style={styles.button}
        type='button'
        onPress={handleSubmit}
        title='Register'
      >
        Register
      </Button>
    </View>
  );
}

export default RegisterScreen;
