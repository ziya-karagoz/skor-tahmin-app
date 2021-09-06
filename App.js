// @refresh reset

import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import firebase from 'firebase';


const firebaseConfig = {
  apiKey: "AIzaSyDECmTUe-7Opc7sbCXoB70reoxbZr_7xKo",
  authDomain: "skor-tahmin-aad71.firebaseapp.com",
  projectId: "skor-tahmin-aad71",
  storageBucket: "skor-tahmin-aad71.appspot.com",
  messagingSenderId: "987702677653",
  appId: "1:987702677653:web:0e3c5dea79e09154c48b9c",
  measurementId: "G-6MTVHBX8E9"
};

// How to check if a Firebase App is already initialized (ama calismiyor)
if(firebase.apps.length === 0){
  firebase.initializeApp(firebaseConfig);
}

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Hello World!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
