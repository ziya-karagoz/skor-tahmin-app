// @refresh reset
const sha256 = require("js-sha256");

import { StatusBar } from "expo-status-bar";
import React, { useReducer } from "react";
import { useState, useEffect, useContext } from "react";
import { View, ActivityIndicator } from "react-native";
import firebase from "firebase";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import HomeScreen from "./src/screens/HomeScreen";
import AdminPanelScreen from "./src/screens/AdminPanelScreen";
import PredictionsScreen from "./src/screens/PredictionsScreen";
import ResultsScreen from "./src/screens/ResultsScreen";

import loginReducer, { initialState } from "./src/utils/reducers/loginReducer";

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
  const [loginState, dispatch] = useReducer(loginReducer, initialState);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name='Login' options={{ headerShown: false }}>
          {(props) => <LoginScreen {...props} state={[loginState, dispatch]} />}
        </Stack.Screen>
        <Stack.Screen name='Home' options={{ headerShown: false }}>
          {(props) => <HomeScreen {...props} state={[loginState, dispatch]} />}
        </Stack.Screen>

        <Stack.Screen name='Register' options={{ headerShown: false }}>
          {(props) => <RegisterScreen {...props} />}
        </Stack.Screen>
        <Stack.Screen name='AdminPanel' options={{ headerShown: false }}>
          {(props) => <AdminPanelScreen {...props} />}
        </Stack.Screen>
        <Stack.Screen name='Predictions' options={{ headerShown: false }}>
          {(props) => (
            <PredictionsScreen {...props} state={[loginState, dispatch]} />
          )}
        </Stack.Screen>
        <Stack.Screen name='Results' options={{ headerShown: false }}>
          {(props) => <ResultsScreen {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
