import { useEffect } from "react/cjs/react.development"
import { getChatsForUser } from "../firebase-sw-messaging"
import { Text } from "react-native";
import React from "react";

export default function ChatsList() {

    getChatsForUser();

    return <Text>chatsList</Text>;
}