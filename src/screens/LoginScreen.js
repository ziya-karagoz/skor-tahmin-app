import React, { useState, useEffect, useContext, useReducer } from "react";
import firebase from "firebase";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text, View, TextInput, Button, SafeAreaView } from "react-native";
import { loginReducer, initialState } from "../utils/reducers/loginReducer";
import { LOGIN } from "../utils/constants/constants";
import styles from "../styles/ScreenStyles";

function LoginScreen({ navigation, route }) {
  // states
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState([]);

  const [loginState, dispatch] = useReducer(loginReducer, initialState);

  // effect hooks
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    console.log(loginState);
  }, [loginState]);

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

    if (!loading) {
      data.map((item) => {
        if (
          item.data().username === username &&
          item.data().password === password
        ) {
          dispatch({ type: LOGIN, payload: item.id });

          navigation.navigate("Home");
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
    </SafeAreaView>
  );
}

export default LoginScreen;
