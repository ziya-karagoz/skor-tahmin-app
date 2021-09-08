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
      data.map((user) => {
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
    <div>
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
            <button onClick={handleSubmitPress}>Login</button>
          </form>
        </div>
        <div>
          <button type='button' onClick={() => navigation.navigate("Register")}>
            Don't have any account yet?
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginScreen;
