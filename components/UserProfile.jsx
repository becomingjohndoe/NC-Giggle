import React, { useContext } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { signOutUser } from "../firebase";
import { UserContext } from "../context/context";
const UserProfile = ({ navigation, route }) => {
	const { setUserParams } = useContext(UserContext);
	return (
		<>
			<Text>Hello</Text>

			<Button
				title="sign out"
				onPress={() => {
					signOutUser().then(() => {
						setUserParams({
							city: "",
							genre: "",
						});
						route.params.newUser(false);
					});
				}}
			/>
		</>
	);
};

export default UserProfile;
