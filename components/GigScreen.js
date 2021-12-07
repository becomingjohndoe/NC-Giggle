import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { useState } from "react";
import { getGigsForHomepage } from "../utils/api";

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
      {results.map((gig)=>{
        return ( 
          <View key={gig.id}>
            <Text>{gig.name}</Text>
            <Text>{gig.dates.start.localDate}</Text>
            <Text>{gig.dates.status.code}</Text>
            <Text>{gig._embedded.venues[0].name}</Text>
            <Image source={{uri:gig.images[4].url}} style={{ width: 375, height: 200 }}/>
          </View>        )
      })}
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
