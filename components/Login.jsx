import { View, TextInput, Button, StyleSheet, Text, Image } from "react-native";
import React, { useContext } from "react";
import { signIn, signOutUser, getUserInfo } from "../firebase";
import { UserContext } from "../context/context";

export default function Login({ navigation, route }) {
	const [email, setEmail] = React.useState("");
	const [password, setPassword] = React.useState("");
	return (
		<View style={styles.container}>
			<Image source={require("../images/3.png")} style={{ width: 375, height: 200 }}></Image>
			<TextInput
				style={{ height: 40, borderColor: "blue", borderWidth: 2 }}
				placeholder="email"
				onChangeText={(text) => setEmail(text)}
			/>
			<TextInput
				style={{ height: 40, borderColor: "blue", borderWidth: 2 }}
				placeholder="pass"
				onChangeText={(text) => setPassword(text)}
			/>
			<Button
				title="Login"
				color="blue"
				onPress={() => {
					signIn(email, password).then(() => {
						route.params.newUser(true);
					});
				}}
			/>

			<Button
				title="Sign Up"
				onPress={() => {
					navigation.navigate("Sign Up");
				}}
			/>
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
});
