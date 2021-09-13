const sha256 = require("js-sha256");

import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text, View, TextInput, Button, SafeAreaView } from "react-native";
import firebase from "firebase";
import styles from "../styles/ScreenStyles";
import { AuthContext } from "../components/context";

function RegisterScreen({ navigation }) {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [username, setusername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setisLogin] = useState(false);
  const [userToken, setUserToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const { signIn, signOut, signUp } = React.useContext(AuthContext);

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
      isLogin: false,
      userToken: sha256(username, password),
    };
    const db = firebase.firestore();
    db.collection("users").add(userdata);
    fetchData();
    window.alert("basarili bir sekilde eklenmistir!");
    if (!loading) {
      signUp(username, userToken);
      //navigation.navigate("Login", data);
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

  useEffect(() => {
    console.log("token: ", userToken);
  }, []);
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
          onChangeText={(text) => setName(text)}
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
          onChangeText={(text) => setSurname(text)}
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
          onChangeText={(text) => setusername(text)}
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
          onChangeText={(text) => setEmail(text)}
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
          onChangeText={(text) => setPassword(text)}
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
