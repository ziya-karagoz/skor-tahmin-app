import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text, View, TextInput, Button, SafeAreaView } from "react-native";
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
    setLoading(true);
    const db = firebase.firestore();

    db.collection("users")
      .get()
      .then((querySnapshot) => {
        querySnapshot.docs.forEach((doc) => {
          data.push(doc.data());
        });
      });
    setLoading(false);
  };

  const createAccount = () => {
    const userdata = {
      name: name,
      surname: surname,
      username: username,
      email: email,
      password: password,
    };
    const db = firebase.firestore();
    db.collection("users").add(userdata);
    fetchData();
    window.alert("basarili bir sekilde eklenmistir!");
    if (!loading) {
      navigation.navigate("Login", data);
    }
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
    createAccount();
  };

  useEffect(() => {}, []);
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.title} htmlFor='nameId'>
          Name:{" "}
        </Text>
        <TextInput
          style={styles.input}
          type='text'
          id='nameId'
          onChangeText={(e) => setName(e.target.value)}
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
          onChangeText={(e) => setSurname(e.target.value)}
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
          onChangeText={(e) => setusername(e.target.value)}
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
          onChangeText={(e) => setEmail(e.target.value)}
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
          onChangeText={(e) => setPassword(e.target.value)}
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
    </SafeAreaView>
  );
}

export default RegisterScreen;