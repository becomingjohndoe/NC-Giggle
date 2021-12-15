import {
  Text,
  View,
  TextInput,
  Image,
  StyleSheet,
  Dimensions,
  Pressable,
} from "react-native";
import { useState } from "react";
import React from "react";
import { createUser, signOutUser } from "../firebase";

export default function SignUp({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <View style={styles.container}>
      <Image
        source={require("../images/3.png")}
        style={{ width: 375, height: 200 }}
      ></Image>
      {/* <Text style={styles.headerText}>Insert Email and Password</Text> */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#EBE645"
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#EBE645"
        onChangeText={(text) => setPassword(text)}
      />
      <Pressable
        color="blue"
        style={styles.button}
        onPress={() => {
          createUser(email, password, navigation).then(() => {
            navigation.navigate("Profile");
          });
        }}
      >
        <Text style={styles.text}>Sign Up</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000957",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    marginBottom: 30,
    backgroundColor: "#577BC1",
    color: "#EBE645",
    fontSize: 24,
    height: 40,
    borderRadius: 10,
    padding: 10,
    width: Dimensions.get("window").width - 50, 
  },
  button: {
    backgroundColor: "#577BC1",
    alignItems: "center",
    height: 40,
    fontSize: 16,
    marginBottom: 20,
    paddingBottom: 5,
    borderRadius: 10,
    elevation: 2,
    width: Dimensions.get("window").width / 2,
  },
  text: {
    fontSize: 20,
    fontWeight: "700",
    color: "#EBE645",
    padding: 7,
  },
  headerText: {
    fontSize: 28,
    marginBottom: 20,
    fontWeight: "700",
    color: "#EBE645",
  },
});
