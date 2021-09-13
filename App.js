// @refresh reset
const sha256 = require("js-sha256");

import { StatusBar } from "expo-status-bar";
import React from "react";
import { useState, useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import firebase from "firebase";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import HomeScreen from "./src/screens/HomeScreen";

import styles from "./src/styles/ScreenStyles";

import { AuthContext } from "./src/components/context";
import {
  initialLoginState,
  loginReducer,
} from "./src/utils/reducers/loginReducer";

// objcet for firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDECmTUe-7Opc7sbCXoB70reoxbZr_7xKo",
  authDomain: "skor-tahmin-aad71.firebaseapp.com",
  projectId: "skor-tahmin-aad71",
  storageBucket: "skor-tahmin-aad71.appspot.com",
  messagingSenderId: "987702677653",
  appId: "1:987702677653:web:0e3c5dea79e09154c48b9c",
  measurementId: "G-6MTVHBX8E9",
};

const Stack = createNativeStackNavigator();

// check if a Firebase App is already initialized
if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

export default function App() {
  // const [isLoading, setIsLoading] = useState(true);
  // const [userToken, setUserToken] = useState(null);

  const [loginState, dispatch] = React.useReducer(
    loginReducer,
    initialLoginState
  );

  const authContext = React.useMemo(
    () => ({
      signIn: (username, password, inputUsername, inputPassword) => {
        // setUserToken("afsad");
        // setIsLoading(false);
        let userToken = null;
        if (username === inputUsername && password === inputPassword) {
          userToken = sha256(username, password);
          console.log("token app: ", userToken);
          dispatch({
            type: "LOGIN",
            id: username,
            token: userToken,
            isLoading: false,
          });
        } else {
          window.alert("username or password incorrect!");
        }
        console.log("userToken: ", userToken);
      },
      signOut: () => {
        // setUserToken(null);
        // setIsLoading(false);
        dispatch({
          type: "LOGOUT",
          isLoading: false,
        });
      },
      signUp: (username, userToken) => {
        // setUserToken("afsad");
        // setIsLoading(false);
        dispatch({
          type: "REGISTER",
          id: username,
          token: userToken,
          isLoading: false,
        });
      },
    }),
    []
  );

  useEffect(() => {
    setTimeout(() => {
      let userToken = null;
      dispatch({ type: "LOGIN", token: userToken });
    }, 1000);
  }, []);

  if (loginState.isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size='large' />
      </View>
    );
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {loginState.userToken !== null ? (
          <Stack.Navigator>
            <Stack.Screen
              name='Home'
              component={HomeScreen}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        ) : (
          <Stack.Navigator>
            <Stack.Screen
              name='Login'
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name='Register'
              component={RegisterScreen}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
