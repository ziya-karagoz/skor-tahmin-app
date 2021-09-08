import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet, Text, View } from "react-native";
import firebase from "firebase";

function RegisterScreen({ navigation }) {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [username, setusername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

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
    createAccount();
  };

  useEffect(() => {}, []);
  return (
    <div>
      <div>
        <form onSubmit={(e) => e.preventDefault()}>
          <div>
            <label htmlFor='nameId'>Name: </label>
            <input
              type='text'
              id='nameId'
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor='surnameId'>Surname: </label>
            <input
              type='text'
              id='surnameId'
              onChange={(e) => setSurname(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor='usernameId'>Username: </label>
            <input
              type='text'
              id='usernameId'
              onChange={(e) => setusername(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor='emailId'>E-mail: </label>
            <input
              type='text'
              id='emailId'
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor='passwordId'>Password: </label>
            <input
              type='text'
              id='passwordId'
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type='button' onClick={handleSubmit}>
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegisterScreen;
