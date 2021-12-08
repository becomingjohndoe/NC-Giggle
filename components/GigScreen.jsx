import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { StyleSheet, Text, View, Image, Button } from "react-native";
import { useState } from "react";
import { getGigsForHomepage } from "../utils/api";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { Transition, Transitioning } from "react-native-reanimated";

const transition = (
  <Transition.Together>
    <Transition.In type="fade" durationMs={200}/>
      <Transition.Change />
    <Transition.Out type="fade" durationMs={200}/>
  </Transition.Together>
)
import { signOutUser } from "../firebase";

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

  const [currentIndex, setCurrentIndex] = useState(null)
  const ref = React.useRef()

  return (
    <ScrollView>
      <Button title="sign out" onPress={signOutUser} />
    <Transitioning.View 
    ref={ref}
    transition={transition}
    style={styles.container}>
      {results.map((gig, index)=>{
        return ( 
            <TouchableOpacity key={gig.id} onPress={() => 
            { ref.current.animateNextTransition();
              setCurrentIndex(index === currentIndex ? null : index);
              }} 
              style={styles.gigContainer}
              activeOpacity={0.9}
              >
              <View style={styles.gigCard}>
                <Text style={styles.gigInfo}>{gig.name}</Text>
                <Text style={styles.gigInfo}>{gig.dates.start.localDate}</Text>
                <Text style={styles.gigInfo}>{gig.dates.status.code}</Text>
                <Text style={styles.gigInfo}>{gig._embedded.venues[0].name}</Text>
                <Image source={{uri:gig.images[4].url}} style={{ width: 375, height: 200 }}/>
                {index === currentIndex && ( <View style={styles.gigExtraInfo}>
                  <Text style={styles.gigInfoBody}>Start Time: {gig.dates.start.localTime}</Text>
                  <Text style={styles.gigInfoBody}>{gig.info}</Text>
                  <Text style={styles.gigInfoBody}>{gig.url}</Text>
                </View>
                )}
              </View>
            </TouchableOpacity>
          )
      })}
      <StatusBar style="auto" />
    </Transitioning.View>
    </ScrollView> 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  gigContainer: {
    flexGrow: 0,
  },
  gigCard: {
    flexGrow: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gigInfo: {
    fontSize: 20,
    fontWeight: '700'
  },
  gigInfoBody: {
    fontSize: 15,
    lineHeight: 15 * 1.5,
    textAlign: 'center',
    marginTop: 20,
  }
});





  // <View key={gig.id}>
  // <Text>{gig.name}</Text>
  // <Text>{gig.dates.start.localDate}</Text>
  // <Text>{gig.dates.status.code}</Text>
  // <Text>{gig._embedded.venues[0].name}</Text>
  // <Image source={{uri:gig.images[4].url}} style={{ width: 375, height: 200 }}/>
  // </View>       
