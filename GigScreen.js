import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import { getGigsForHomepage } from "./components/utils/api";

export default function GigScreen() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    getGigsForHomepage()
      .then((results) => {
        setResults(results);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <View style={styles.container}>
      <Text>We're hoping for some gig info in here</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
