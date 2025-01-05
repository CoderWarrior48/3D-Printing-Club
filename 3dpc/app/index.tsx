import { View, StyleSheet, Text, Alert } from "react-native";
import { router } from "expo-router";
import { useState } from "react";
import { useAuth } from "./context/AuthContext";
import React from "react";
import Button from "@/components/Button";
import { Image } from "react-native";


const PlaceholderImage = require("@/assets/images/3dpc.png");


export default function Login () {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { onLogin, onRegister } = useAuth();

    const login = async () => {
        const result = await onLogin!(email, password);
        if (result && result.error) {
            alert(result.msg);
        }
    };


    const register = async () => {
        const result = await onRegister!(email, password);
        if (result && result.error) {
            alert(result.msg);
        }
        else {
            login();
        }
    }

    return (
        <View style={styles.container}>
      <View style={styles.imageContainer}>
      <Image source={PlaceholderImage} style={styles.image} />
      </View>
      <Text style={styles.header}>3DPC</Text>
      <View style={styles.footerContainer}>
        <Button label="Sign in" />
        <Button
          theme="primary"
          label="Create an Account"
          icon="user-plus"
          onPress={login}
        />
        {!email ? (
          <Text>You are not logged in</Text>
        ) : (
          <Text>You are logged in</Text>
        )}
      </View>
    </View>
    )
}

const styles = StyleSheet.create({
    header: {
      color: "#fff",
      fontSize: 45,
      fontWeight: 800,
      margin: 30,
    },
    container: {
      flex: 1,
      backgroundColor: "#25292e",
      alignItems: "center",
    },
    imageContainer: {
      flex: 0.8,
    },
    footerContainer: {
      flex: 1 / 2,
      alignItems: "center",
    },
    image: {
        width: 350,
        height: 440,
        borderRadius: 18,
      },
  });