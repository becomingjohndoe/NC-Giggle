import React, { useEffect } from "react";
import {
	TextInput,
	Button,
	View,
	Text,
	ScrollView,
	StatusBar,
	StyleSheet
} from "react-native";
import saveMessage from "../firebase-sw-messaging";
import { getAuth } from "firebase/auth";
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

export default function Chats(props) {
	const auth = getAuth();
	const [message, setMessage] = React.useState("");
	const [messages, setMessages] = React.useState([]);

	useEffect(() => {
		// Loads chat messages history and listens for upcoming ones.

		// Create the query to load the last 12 messages and listen for new ones.
		const chatRef = collection(getFirestore(), "chats");
		const chats = doc(getFirestore(), "chats", props.route.params.id);
		getDoc(chats).then((result) => {});

		const recentMessagesQuery = query(chats);
		// Start listening to the query.
		onSnapshot(recentMessagesQuery, function (snapshot) {
			setMessages(() => [...snapshot.data().messages]);
		});
	}, [props.route.params.id]);
	return (
		<SafeAreaView>
			<ScrollView>
				{messages.map((message, key) => {
					return (
						<Text style={auth.currentUser.uid === message.user ? styles.fromMe : styles.fromThem }
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
					saveMessage(message, props.route.params.id);
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

const styles = StyleSheet.create({
fromMe: {
	alignSelf: "flex-end",
	margin: 10,
padding: 10,
borderRadius: 10,
backgroundColor: "#00BCD4",
color: "white", 
},
fromThem: {
	alignSelf: "flex-start",
	margin: 10,
padding: 10,
borderRadius: 10,
backgroundColor: "blue",
color: "white", 
}
})
