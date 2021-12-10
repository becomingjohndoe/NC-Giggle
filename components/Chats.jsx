import React, { useEffect } from "react";
import {
	TextInput,
	Button,
	View,
	Text,
	ScrollView,
	StatusBar,
} from "react-native";
import saveMessage from "../firebase-sw-messaging";
import {
	query,
	docChanges,
	onSnapshot,
	collection,
	deleteMessage,
	getFirestore,
	doc,
	getDoc,
	data,
} from "firebase/firestore";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Chats() {
	const [message, setMessage] = React.useState("");
	const [messages, setMessages] = React.useState([]);
	useEffect(() => {
		// Loads chat messages history and listens for upcoming ones.

		// Create the query to load the last 12 messages and listen for new ones.
		const chatRef = collection(getFirestore(), "chats");
		const chats = doc(getFirestore(), "chats", "1");
		getDoc(chats).then((result) => {});

		const recentMessagesQuery = query(chats);
		// Start listening to the query.
		onSnapshot(recentMessagesQuery, function (snapshot) {
			console.log(snapshot.data().messages);
			setMessages(() => [...snapshot.data().messages]);
		});
	}, []);
	return (
		<SafeAreaView>
			<ScrollView>
				{messages.map((message, key) => {
					return (
						<Text
							style={{ float: "right" }}
							key={message + key.toString()}
						>{`${message.message} ${message.timestamp}`}</Text>
					);
				})}
			</ScrollView>
			<TextInput
				placeholder="message"
				style={{ height: 40, borderColor: "blue", borderWidth: 2 }}
				onChangeText={(text) => setMessage(text)}
			/>

			<Button
				title="Send"
				onPress={() => {
					saveMessage(message);
				}}
			/>
			<StatusBar
				barStyle="dark-content"
				hidden={false}
				backgroundColor="#00BCD4"
				translucent={true}
			/>
		</SafeAreaView>
	);
}
