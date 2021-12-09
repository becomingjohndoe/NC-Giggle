import { Text, View, Button, TextInput, StyleSheet } from "react-native";
import { getAuth } from "firebase/auth";
import React from "react";
import { signOutUser, updateUser } from "../firebase";
import MultiSelect from "react-native-multiple-select";
export default function Profile({ navigation, route }) {
	const [userData, setUserData] = React.useState({ isNewUser: false });

	const auth = getAuth();
	const genres = [
		{ id: "KnvZfZ7vAvv", name: "Alternative" },
		{ id: "KnvZfZ7vAve", name: "Ballads/Romantic" },
		{ id: "KnvZfZ7vAvd", name: "Blues" },
		{ id: "KnvZfZ7vAvA", name: "Chanson Francais" },
		{ id: "KnvZfZ7vAvk", name: "Children's Music" },
		{ id: "KnvZfZ7vAeJ", name: "Classical" },
		{ id: "KnvZfZ7vAv6", name: "Country" },
		{ id: "KnvZfZ7vAvF", name: "Dance/Electronic" },
		{ id: "KnvZfZ7vAva", name: "Folk" },
		{ id: "KnvZfZ7vAv1", name: "Hip-Hop/Rap" },
		{ id: "KnvZfZ7vAvJ", name: "Holiday" },
		{ id: "KnvZfZ7vAvE", name: "Jazz" },
		{ id: "KnvZfZ7vAJ6", name: "Latin" },
		{ id: "KnvZfZ7vAvI", name: "Medieval/Renaissance" },
		{ id: "KnvZfZ7vAvt", name: "Metal" },
		{ id: "KnvZfZ7vAvn", name: "New Age" },
		{ id: "KnvZfZ7vAvl", name: "Other" },
		{ id: "KnvZfZ7vAev", name: "Pop" },
		{ id: "KnvZfZ7vAee", name: "R&B" },
		{ id: "KnvZfZ7vAed", name: "Reggae" },
		{ id: "KnvZfZ7vAe7", name: "Religious" },
		{ id: "KnvZfZ7vAeA", name: "Rock" },
		{ id: "KnvZfZ7vAeF", name: "World" },
	];
	const onSelectedItemsChange = (selectedItems) => {
		setUserData({ ...userData, genrePreferences: selectedItems });
	};
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
			<MultiSelect
				items={genres}
				uniqueKey="id"
				onSelectedItemsChange={onSelectedItemsChange}
				selectedItems={userData.genrePreferences}
			/>
			<Button
				title="Update Profile"
				onPress={() => {
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
