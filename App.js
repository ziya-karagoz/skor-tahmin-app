// @refresh reset
const sha256 = require("js-sha256");

import { StatusBar } from "expo-status-bar";
import React from "react";
import { useState, useEffect, useContext } from "react";
import { View, ActivityIndicator } from "react-native";
import firebase from "firebase";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { loginReducer, initialState } from "./src/utils/reducers/loginReducer";

import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import HomeScreen from "./src/screens/HomeScreen";

import styles from "./src/styles/ScreenStyles";

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
  const [loginState, dispatch] = React.useReducer(loginReducer, initialState);

  useEffect(() => {
    console.log("loginState: ", loginState);
  }, [loginState.docId]);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen
          name='Login'
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Home'
          options={{ headerShown: false }}
          component={HomeScreen}
        />

        <Stack.Screen
          name='Register'
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
