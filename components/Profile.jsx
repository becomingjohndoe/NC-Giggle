import { Text, View, Button, TextInput, StyleSheet } from "react-native";
import { getAuth } from "firebase/auth";
import React from "react";
import { signOutUser, updateUser } from "../firebase";
export default function Profile({ navigation, route }) {
	const [userData, setUserData] = React.useState({});
	const auth = getAuth();
	return (
		<View>
			<Text>{auth.currentUser.displayName} Profile</Text>
			<TextInput
				placeholder={auth.currentUser.displayName || "name"}
				style={{ height: 40, borderColor: "blue", borderWidth: 2 }}
				onChangeText={(text) => setUserData({ ...userData, displayName: text })}
			/>
			<TextInput
				placeholder="age"
				style={{ height: 40, borderColor: "blue", borderWidth: 2 }}
				onChangeText={(text) => setUserData({ ...userData, age: text })}
			/>
			<TextInput
				placeholder="city"
				style={{ height: 40, borderColor: "blue", borderWidth: 2 }}
				onChangeText={(text) => setUserData({ ...userData, city: text })}
			/>
			<TextInput
				placeholder="bio"
				style={{ height: 40, borderColor: "blue", borderWidth: 2 }}
				onChangeText={(text) => setUserData({ ...userData, bio: text })}
			/>
			<TextInput
				placeholder="profile picture"
				style={{ height: 40, borderColor: "blue", borderWidth: 2 }}
				onChangeText={(text) => setUserData({ ...userData, profile_picture: text })}
			/>
			<Button
				title="Update Profile"
				onPress={() => {
					console.log(route.params);
					updateUser(userData);
					route.params.newUser(false);
				}}
			/>
			<Button
				title="sign out"
				onPress={() => {
					signOutUser();
				}}
			/>
		</View>
	);
}
