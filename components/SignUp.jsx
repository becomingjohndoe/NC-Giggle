import { View, TextInput, Button, StyleSheet } from "react-native";
import { useState } from "react";
import React from "react";
import { createUser, signOutUser } from "../firebase";

export default function SignUp({ navigation }) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	return (
		<View style={styles.container}>
			<TextInput
				style={{ height: 40, borderColor: "blue", borderWidth: 2 }}
				defaultValue="email"
				onChangeText={(text) => setEmail(text)}
			/>
			<TextInput
				style={{ height: 40, borderColor: "blue", borderWidth: 2 }}
				defaultValue="password"
				onChangeText={(text) => setPassword(text)}
			/>
			<Button
				title="Sign Up"
				color="blue"
				onPress={() => {
					createUser(email, password, navigation);
				}}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});
