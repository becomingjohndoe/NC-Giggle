import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
export default function ErrorScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>No Gigs Found</Text>
    </View>
  );
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#000957",
    flexGrow: 1
	},
  text: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: "500",
    color: "#fff",
    padding: 20
  },
});