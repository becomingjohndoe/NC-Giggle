import React, { useEffect, useRef } from "react";
import {
  TextInput,
  Button,
  View,
  Text,
  ScrollView,
  StatusBar,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  Image,
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
  // get auth object for current logged in user
  const auth = getAuth();

  const [message, setMessage] = React.useState("");
  const [messageList, setMessageList] = React.useState([]);

  const input = useRef(null);
  const scrollView = useRef(null);
  useEffect(() => {
    // Loads chat messages history and listens for upcoming ones.

    // Create the query to load the messages from the Firestore
    const chatRef = collection(getFirestore(), "chats");
    const chatSnap = doc(getFirestore(), "chats", props.route.params.id);
    const recentMessagesQuery = query(chatSnap);

    // Start listening to the query.
    onSnapshot(recentMessagesQuery, function (snapshot) {
      setMessageList(() => [...snapshot.data().messages]);
    });
  }, [props.route.params.id]);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, flexDirection: "column", justifyContent: "center" }}
      behavior="padding"
      enabled
      keyboardVerticalOffset={100}
    >
      <View style={styles.container}>
        <ScrollView
          ref={scrollView}
          onContentSizeChange={() => {
            scrollView.current.scrollToEnd({ animated: true });
          }}
        >
          {messageList.map((message, key) => {
            return (
              <>
                <Text>{message.displayName}</Text>
                <View
                  style={
                    auth.currentUser.uid === message.user
                      ? styles.fromMe
                      : styles.fromThem
                  }
                  key={message + key.toString()}
                >
                  <Text>{`${message.message}`}</Text>
                </View>
                <Image
                  source={{ uri: message.photoURL }}
                  style={
                    auth.currentUser.uid === message.user
                      ? styles.fromMe
                      : styles.fromThem
                  }
                />
                <Text>{message.timestamp.seconds}</Text>
              </>
            );
          })}
        </ScrollView>
        <View style={styles.messageAndSend}>
          <TextInput
            placeholder="message"
            style={styles.messageInput}
            ref={input}
            onChangeText={(text) => {
              setMessage(text);
            }}
          />
          <Button
            title="Send"
            onPress={() => {
              input.current.clear();
              saveMessage(message, props.route.params.id);
            }}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  fromMe: {
    alignSelf: "flex-end",
    margin: 10,
    padding: 10,
    borderRadius: 30,
    backgroundColor: "#00BCD4",
    color: "#fff",
  },
  fromThem: {
    alignSelf: "flex-start",
    margin: 10,
    padding: 10,
    borderRadius: 30,
    backgroundColor: "#E0E0E0",
    color: "black",
  },
  container: {
    flex: 1,
  },
  messageInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    margin: 5,
    padding: 5,
    borderRadius: 30,
    flexGrow: 1,
  },
  messageAndSend: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 10,
    marginBottom: 20,
  },
});
