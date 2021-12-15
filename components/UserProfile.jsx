import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, Text, View, Button, Image } from "react-native";
import { signOutUser, getUserInfo } from "../firebase";
import { getAuth } from "firebase/auth";
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

  useEffect(() => {
    getUserInfo().then((res) => {
      const info = res;
      setUserInfo(res);
      setPickedGenres(res.genrePreferences);
    });
  }, []);

  console.log(userInfo);

  // const genre = genres.find((item) => item.id === userInfo.genrePreferences[0]);
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: userInfo.profile_picture }}
        style={{ width: 100, height: 100 }}
      ></Image>
      <Text>Name: {userInfo.displayName} </Text>
      <Text>Email: {userInfo.email} </Text>
      {userInfo.city ? (
        <Text>City: {userInfo.city} </Text>
      ) : (
        <Text>Set your City!</Text>
      )}
      {pickedGenres ? (
        <View>
          <Text>Genres I'm interested in:</Text>
          {pickedGenres.map((choice) => {
            return <Text key={genres[choice]}> {genres[choice]}</Text>;
          })}
        </View>
      ) : (
        <Text>Choose some Genres!</Text>
      )}
      {userInfo.bio ? (
        <Text> Bio: {userInfo.bio} </Text>
      ) : (
        <Text>Make your Bio!</Text>
      )}
      <Button
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
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default UserProfile;
