import { getChatsForUser } from "../firebase-sw-messaging";
import {
	Text,
	ScrollView,
	View,
	Button,
	StyleSheet,
	Image,
	StatusBar,
	Linking,
} from "react-native";
import React from "react";
import { Link } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ChatsList({ navigation }) {
	const [chats, setChats] = React.useState([]);

	React.useEffect(() => {
		getChatsForUser().then((result) => {
			console.log(result);
			setChats(result);
		});
	}, []);

	return (
		<View style={styles.container}>
			{chats.length === 0 ? (
				<Text> Start signing up for chatrooms!</Text>
			) : (
				<ScrollView>
					{chats.map((chatroom) => {
						console.log(chatroom, "chatroom.gig");
						const date = new Date(chatroom.gig.dates.start.localDate);
						const time = chatroom.gig.dates.start.localTime;
						return (
							<View key={chatroom.id} style={styles.facebookCard}>
								<View>
									<Image source={{ uri: chatroom.image }} style={styles.cardImage} />
								</View>
								<View style={styles.eventDetails}>
									<Text
										style={styles.buyTicket}
										onPress={() => {
											Linking.openURL(chatroom.gig.url);
										}}
									>
										Buy Tickets
									</Text>
									<Text style={styles.date}>{`${date
										.toString()
										.slice(0, 16)} ${time}`}</Text>
									<Text style={styles.title}>{chatroom.name}</Text>
									<Text style={styles.venue}>{chatroom.venue}</Text>
								</View>

								<TouchableOpacity
									style={styles.goToChatroomButton}
									onPress={() => {
										navigation.navigate("Chats", {
											id: chatroom.id,
										});
									}}
								>
									<Text style={styles.buttonInner}>Go to Chatroom</Text>
								</TouchableOpacity>
							</View>
						);
					})}
				</ScrollView>
			)}
			<StatusBar
				barStyle="dark-content"
				hidden={false}
				backgroundColor="#00BCD4"
				translucent={true}
			/>
		</View>
	);
}
const styles = StyleSheet.create({
	container: {
		// flex: 1,
		backgroundColor: "#000957",
	},
	facebookCard: {
		backgroundColor: "#344CB7",
		padding: 0,
		margin: 10,
		borderRadius: 10,
		flex: 1,
		opacity: 0.9,
		shadowColor: "#000636",
		shadowOffset: { width: -2, height: 4 },
		shadowOpacity: 0.5,
		shadowRadius: 3,
	},
	cardImage: {
		width: "100%",
		height: 200,
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
	},
	goToChatroomButton: {
		padding: 10,
		margin: 15,
		borderRadius: 5,
		backgroundColor: "#EBE645",
		flex: 1,
		textAlign: "center",
	},
	buttonInner: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		textAlign: "center",
	},
	eventDetails: {
		flex: 1,
		flexDirection: "column",
		justifyContent: "space-evenly",
		alignItems: "flex-start",
		padding: 15,
	},
	date: {
		fontSize: 15,
		color: "white",
		paddingTop: 5,
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
		color: "white",
		paddingTop: 5,
	},
	venue: {
		fontSize: 15,
		fontWeight: "bold",
		color: "#fff",
		paddingTop: 5,
	},
	buyTicket: {
		fontSize: 15,
		fontWeight: "bold",
		color: "#EBE645",
	},
});
