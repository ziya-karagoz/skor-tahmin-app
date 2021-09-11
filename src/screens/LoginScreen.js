import React, { useState, useEffect } from "react";
import { useHistory } from "react-dom";
import firebase from "firebase";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text, View, TextInput, Button, SafeAreaView } from "react-native";

import { AuthContext } from "../components/context";

import styles from "../styles/ScreenStyles";

function LoginScreen({ navigation, route }) {
  // states
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState([]);

  const { signIn, signOut } = React.useContext(AuthContext);

  // effect hooks
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    console.log("Data: ", data);
  }, [data]);

  useEffect(() => {
    if (route.params !== undefined && route.params !== data) {
      fetchData();
    }
  }, [route.params]);

  // database get request from firestore
  const fetchData = () => {
    let tempData = [];
    setLoading(true);

    const db = firebase.firestore();
    db.collection("users")
      .get()
      .then((querySnapshot) => {
        querySnapshot.docs.forEach((doc) => {
          tempData.push(doc.data());
        });
        setLoading(false);
      });
    setData(tempData);
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
    <SafeAreaView style={styles.container}>
      <View>
        <View>
          <Text style={styles.title} htmlFor='usernameId'>
            UserName:{" "}
          </Text>
          <TextInput
            style={styles.input}
            type='text'
            id='usernameId'
            onChangeText={(text) => setUsername(text)}
            value={username}
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
            value={password}
          />
        </View>
        <Button style={styles.button} onPress={signOut()} title='Login'>
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
    </SafeAreaView>
  );
}

export default LoginScreen;
