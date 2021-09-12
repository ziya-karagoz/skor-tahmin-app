import React from "react";
import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "../styles/ScreenStyles";
import { AuthContext } from "../components/context";

export default function Home({ navigation }) {
  const { signIn, signOut, signUp } = React.useContext(AuthContext);

  const clickHandler = () => {
    signOut();
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Welcome user!</Text>
      <TouchableOpacity style={styles.button} onPress={clickHandler}>
        <Text style={styles.buttonText}>Sign out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
