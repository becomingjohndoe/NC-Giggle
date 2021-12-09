import React from "react"
import { StyleSheet, Text, View, Button } from "react-native";
import { signOutUser } from "../firebase";

const UserProfile = () => {
    return (
    <>
    <Text>Hello</Text>

    <Button title="sign out" onPress={signOutUser} />
    </>
    )
}

export default UserProfile