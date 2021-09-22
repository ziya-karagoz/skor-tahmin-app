import React, { useState, useEffect, useContext, useReducer } from "react";
import firebase from "firebase";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  Text,
  View,
  TextInput,
  Button,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { loginReducer, initialState } from "../utils/reducers/loginReducer";
import { LOGIN } from "../utils/constants/constants";
import styles from "../styles/ScreenStyles";
import { TestContext } from "../components/TestContext";
import { adminLogin } from "../utils/constants/constants";

function LoginScreen({ navigation, route, state }) {
  // states
  const [loginState, dispatch] = state;
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState([]);

  // effect hooks
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (route?.params !== undefined && route?.params !== data) {
      fetchData();
    }
  }, [route?.params]);

  // database get request from firestore
  const fetchData = () => {
    let tempData = [];
    setLoading(true);

    const db = firebase.firestore();
    db.collection("users")
      .get()
      .then((querySnapshot) => {
        querySnapshot.docs.forEach((doc) => {
          tempData.push(doc);
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

    // admin panel navigation
    if (username === adminLogin.username && password === adminLogin.password) {
      navigation.navigate("AdminPanel");
    }

    if (!loading) {
      data.map((item) => {
        if (
          item.data().username === username &&
          item.data().password === password
        ) {
          dispatch({ type: LOGIN, payload: item.id });
          navigation.navigate("Home");
        } else {
          return;
        }
      });
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
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText} onPress={handleSubmitPress}>
          Login
        </Text>
      </TouchableOpacity>
      <View>
        <TouchableOpacity style={styles.button}>
          <Text
            style={styles.buttonText}
            onPress={() => navigation.navigate("Register")}
          >
            Register
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default LoginScreen;
