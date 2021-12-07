import React from "react";
import { View, Text, Button } from "react-native";
import { signOutUser } from "../firebase";
export default function Home() {
	return (
		<View>
			<Text>Home</Text>
			<Button title="sign out" onPress={signOutUser} />
		</View>
	);
}
