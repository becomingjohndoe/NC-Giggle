import {
  View,
  TextInput,
  Pressable,
  StyleSheet,
  Text,
  Image,
  Dimensions,
} from "react-native";
import React from "react";
import { signIn } from "../firebase";

export default function Login({ navigation, route }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  return (
    <View style={styles.container}>
      <Image
        source={require("../images/3.png")}
        style={{ width: 375, height: 200 }}
      ></Image>
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
      <View style={styles.buttonsView}>
        <Pressable
          style={styles.button}
          color="blue"
          onPress={() => {
            signIn(email, password).then(() => {
              route.params.newUser(true);
            });
          }}
        >
          <Text style={styles.text}>Sign In</Text>
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={() => {
            navigation.navigate("Sign Up");
          }}
        >
          <Text style={styles.text}>Sign Up</Text>
        </Pressable>
      </View>
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
  buttonsView: {
    flex: 1,
  },
  input: {
    marginBottom: 30,
    backgroundColor: "#577BC1",
    color: "#EBE645",
    fontSize: 24,
    height: 40,
    width: Dimensions.get("window").width,
  },
  button: {
    backgroundColor: "#577BC1",
    alignItems: "center",
    height: 40,
    fontSize: 16,
    marginBottom: 20,
    paddingBottom: 5,
    elevation: 2,
    width: Dimensions.get("window").width / 2,
  },
  text: {
    fontSize: 24,
    fontWeight: "700",
    color: "#EBE645",
  },
});
