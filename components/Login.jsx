import { View, TextInput, Button, StyleSheet, Text } from "react-native";
import React from "react";
import { signInWithGoogle } from "../firebase";

export default function Login({ navigation }) {
	return (
		<View style={styles.container}>
			<TextInput
				style={{ height: 40, borderColor: "blue", borderWidth: 2 }}
				defaultValue="email"
			/>
			<TextInput
				style={{ height: 40, borderColor: "blue", borderWidth: 2 }}
				defaultValue="password"
			/>
			<Button title="Login" color="blue" />
			<Button title="Login with Google" color="blue" onPress={signInWithGoogle} />
			<Text
				onPress={() => {
					navigation.navigate("Sign Up");
				}}
			>
				Sign Up
			</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "white",
		color: "blue",
	},
});
