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
		<View>
			<Text> Channels </Text>
			<Text
				onPress={() => {
					navigation.navigate("Chats", {
						channel: "messages",
						id: route.params.id,
					});
				}}
			>
				{" "}
				#Help
			</Text>
			<Text> #Meetup</Text>
		</View>
	);
}
