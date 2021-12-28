import React from "react";
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	Image,
	ScrollView,
	LayoutAnimation,
	Platform,
	Button,
	Linking,
} from "react-native";
import Chats from "./Chats";
export default function Channels({ navigation, route }) {
	return (
		<View style={styles.container}>
			<Text style={styles.header}> Channels </Text>
			<TouchableOpacity
				style={styles.channelNameWrapper}
				onPress={() => {
					navigation.navigate("Chats", {
						channel: "messages",
						id: route.params.id,
					});
				}}
			>
				<Text style={styles.channelName}>#Help</Text>
			</TouchableOpacity>
			<TouchableOpacity style={styles.channelNameWrapper}>
				<Text style={styles.channelName}>#Meetup</Text>
			</TouchableOpacity>
			<TouchableOpacity style={styles.channelNameWrapper}>
				<Text style={styles.channelName}>#Venue Info</Text>
			</TouchableOpacity>
			<TouchableOpacity style={styles.channelNameWrapper}>
				<Text style={styles.channelName}>#Recommendations</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#000957",
		height: "100%",
	},
	channelName: {
		color: "#344CB7",
		fontSize: 20,
		fontWeight: "bold",
		padding: 10,
	},
	header: {
		color: "white",
		fontSize: 30,
		fontWeight: "bold",
		padding: 10,
	},
	channelNameWrapper: {
		backgroundColor: "#EBE645",
		padding: 10,
		margin: 10,
		borderRadius: 10,
		alignItems: "center",
		justifyContent: "center",
	},
});
