import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, Text, View, Button, Image, TouchableOpacity } from "react-native";
import { signOutUser, getUserInfo } from "../firebase";
import { UserContext } from "../context/context";

const UserProfile = ({ route }) => {
  const { setUserParams } = useContext(UserContext);
  const [userInfo, setUserInfo] = useState({});
  const [pickedGenres, setPickedGenres] = useState(false);
  const genres = {
    KnvZfZ7vAvv: "Alternative",
    KnvZfZ7vAve: "Ballads/Romantic",
    KnvZfZ7vAvd: "Blues",
    KnvZfZ7vAvA: "Chanson Francais",
    KnvZfZ7vAvk: "Children's Music",
    KnvZfZ7vAeJ: "Classical",
    KnvZfZ7vAv6: "Country",
    KnvZfZ7vAvF: "Dance/Electronic",
    KnvZfZ7vAva: "Folk",
    KnvZfZ7vAv1: "Hip-Hop/Rap",
    KnvZfZ7vAvJ: "Holiday",
    KnvZfZ7vAvE: "Jazz",
    KnvZfZ7vAJ6: "Latin",
    KnvZfZ7vAvI: "Medieval/Renaissance",
    KnvZfZ7vAvt: "Metal",
    KnvZfZ7vAvn: "New Age",
    KnvZfZ7vAvl: "Other",
    KnvZfZ7vAev: "Pop",
    KnvZfZ7vAee: "R&B",
    KnvZfZ7vAed: "Reggae",
    KnvZfZ7vAe7: "Religious",
    KnvZfZ7vAeA: "Rock",
    KnvZfZ7vAeF: "World",
  };

  function AppBtn({ onPress, title, clickedBtn, btnId, setClickedBtn }) {
    
    return (
      <TouchableOpacity
        onPress={onPress}
        style={
          clickedBtn ? styles.clickedAppBtnContainer : styles.appButtonContainer
        }
      >
        <Text style={styles.appButtonText}>{clickedBtn ? "Interested" : title}</Text>
      </TouchableOpacity>
    );
  }

  useEffect(() => {
    getUserInfo().then((res) => {
      const info = res;
      setUserInfo(res);
      setPickedGenres(res.genrePreferences);
    });
  }, []);

  // console.log(userInfo);

  // const genre = genres.find((item) => item.id === userInfo.genrePreferences[0]);
  return (
    <View style={styles.container}>
    <View style={styles.facebookCard}>
      <Image
        source={{ uri: userInfo.profile_picture }}
        style={styles.cardImage}
      ></Image>
      <View></View>
      <Text style={styles.title}>{userInfo.displayName} </Text>
      <View><Text style={styles.eventTitle}>Email:</Text><Text style={styles.eventDetails}>{userInfo.email}</Text></View> 
      {userInfo.city ? (
      <View><Text style={styles.eventTitle}>City:</Text><Text style={styles.eventDetails}>{userInfo.city} </Text></View>
      ) : (
        <Text style={styles.eventDetails}>Set your City!</Text>
      )}
      {pickedGenres ? (
        <View>
          <Text style={styles.eventTitle}>Favourite Genres:</Text>
          <Text key={pickedGenres} style={styles.eventDetails}> {genres[pickedGenres]}</Text>
        </View>
      ) : (
        <Text style={styles.eventDetails}>Choose some Genres!</Text>
      )}
      {userInfo.bio ? (
        <View><Text style={styles.eventTitle}>Bio:</Text><Text style={styles.eventDetailsEnd}>{userInfo.bio} </Text></View>
      ) : (
        <Text style={styles.eventDetails}>Make your Bio!</Text>
      )}
    </View>
      <AppBtn
        title="sign out"
        onPress={() => {
          signOutUser().then(() => {
            setUserParams({
              city: "",
              genre: "",
            });
            route.params.newUser(false);
          });
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
		backgroundColor: "#000957",
    flexGrow: 0,
	},
	facebookCard: {
		backgroundColor: "#344CB7",
		padding: 0,
		margin: 10,
		borderRadius: 10,
		// flex: 1,
		flexGrow: 0,
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
		backgroundColor: "white",
		flex: 1,
		textAlign: "center",
	},
  appButtonContainer: {
		elevation: 8,
		backgroundColor: "#EBE645",
		borderRadius: 10,
		padding: 10,
		margin: 15,
	},
	appButtonText: {
		fontSize: 18,
		color: "black",
		fontWeight: "bold",
		alignSelf: "center",
		textTransform: "uppercase",
	},
	clickedAppBtnContainer: {
		elevation: 8,
		backgroundColor: "#EBE645",
		borderRadius: 10,
		padding: 10,
		margin: 15,
	},
	eventTitle: {
		flex: 1,
		flexDirection: "column",
		justifyContent: "space-around",
		alignItems: "flex-start",
		paddingLeft: 10,
    color: "white",
    fontSize: 18,
    padding: 7,
    fontWeight: "bold",
	},
  eventDetails: {
		flex: 1,
		flexDirection: "column",
		justifyContent: "space-around",
		alignItems: "flex-start",
		paddingLeft: 15,
    color: "white",
    fontSize: 14,
    padding: 3,
	},
  eventDetailsEnd: {
		flex: 1,
		flexDirection: "column",
		justifyContent: "space-around",
		alignItems: "flex-start",
		paddingLeft: 15,
    color: "white",
    fontSize: 14,
    paddingBottom: 20
  },
	date: {
		fontSize: 15,
		color: "white",
	},
	title: {
		fontSize: 25,
		fontWeight: "bold",
		color: "white",
		padding: 10,
    textAlign: "center"
	},
	venue: {
		fontSize: 15,
		fontWeight: "bold",
		color: "grey",
	},
});

export default UserProfile;
