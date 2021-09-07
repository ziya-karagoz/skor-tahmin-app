import React, { useState, useEffect } from "react";
import firebase from "firebase";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet, Text, View } from "react-native";

function LoginScreen({ navigation }) {
  // states
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState([]);

  // effect hooks
  useEffect(() => {
    console.log("data: ", data);
    console.log("loading: ", loading);
  }, [data, loading]);

  useEffect(() => {
    setLoading(true);
    const data = fetchData();
  }, []);

  // database get request from firestore
  const fetchData = () => {
    const db = firebase.firestore();

    db.collection("users")
      .get()
      .then((querySnapshot) => {
        querySnapshot.docs.forEach((doc) => {
          data.push(doc.data());
        });
        setLoading(false);
      });
  };

  // compare datatabase users with form inputs
  const clickHandler = () => {
    if (!loading) {
      data.map((user) => {
        if (user.username === username && user.password === password) {
          console.log("oldu");
        }
      });
    }
  };

  return (
    <div>
      <div>
        <form onSubmit={(e) => e.preventDefault()}>
          <div>
            <label htmlFor='usernameId'>UserName: </label>
            <input
              type='text'
              id='usernameId'
              onChange={(e) => setUsername(e.target.value)}
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
          <button onClick={clickHandler}>Login</button>
        </form>
      </div>
      <div>
        <button onClick={() => navigation.navigate("Register")}>
          Don't have any account yet?
        </button>
      </div>
    </div>
  );
}

export default LoginScreen;