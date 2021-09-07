import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet, Text, View } from "react-native";

function RegisterScreen({ navigation }) {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [username, setusername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const clickHandler = () => {
    const data = {
      name: name,
      surname: surname,
      username: username,
      email: email,
      password: password,
    };
  };

  useEffect(() => {}, []);
  return (
    <div>
      <div>
        <form onSubmit={(e) => e.preventDefault()}>
          <div>
            <label htmlFor='nameId'>Name: </label>
            <input
              type='text'
              id='nameId'
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor='surnameId'>Surname: </label>
            <input
              type='text'
              id='surnameId'
              onChange={(e) => setSurname(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor='usernameId'>Username: </label>
            <input
              type='text'
              id='usernameId'
              onChange={(e) => setusername(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor='emailId'>E-mail: </label>
            <input
              type='text'
              id='emailId'
              onChange={(e) => setEmail(e.target.value)}
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

          <button onClick={clickHandler}>Register</button>
        </form>
      </div>
    </div>
  );
}

export default RegisterScreen;
