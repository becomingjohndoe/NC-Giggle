import React from "react";
import { View, Text, Button, Image, StyleSheet } from "react-native";
import { signOutUser } from "../firebase";
export default function Home({ navigation, route }) {
	const event = route.params.gig;
	return (
		<View>
			<Image source={event.images[0]} style={styles.headerImage} />
			<Text style={styles.headerText}>{event.name}</Text>
			<Text>Details</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	headerImage: {
		width: "100%",
		height: 200,
		resizeMode: "cover",
		overflow: "hidden",
	},
	headerText: {
		fontSize: 30,
		fontWeight: "bold",
		marginTop: 10,
		marginBottom: 10,
	},
});
