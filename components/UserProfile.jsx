import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, Image } from "react-native";
import { signOutUser, getUserInfo } from "../firebase";
import { getAuth } from "firebase/auth";

const UserProfile = () => {
  const [userInfo, setUserInfo] = useState({});
  const genres = [
    {
      KnvZfZ7vAvv: "Alternative",
      KnvZfZ7vAve: "Ballads/Romantic",
      KnvZfZ7vAvd: "Blues",
    },
  ];

  //   { id: "KnvZfZ7vAvA", name: "Chanson Francais" },
  //   { id: "KnvZfZ7vAvk", name: "Children's Music" },
  //   { id: "KnvZfZ7vAeJ", name: "Classical" },
  //   { id: "KnvZfZ7vAv6", name: "Country" },
  //   { id: "KnvZfZ7vAvF", name: "Dance/Electronic" },
  //   { id: "KnvZfZ7vAva", name: "Folk" },
  //   { id: "KnvZfZ7vAv1", name: "Hip-Hop/Rap" },
  //   { id: "KnvZfZ7vAvJ", name: "Holiday" },
  //   { id: "KnvZfZ7vAvE", name: "Jazz" },
  //   { id: "KnvZfZ7vAJ6", name: "Latin" },
  //   { id: "KnvZfZ7vAvI", name: "Medieval/Renaissance" },
  //   { id: "KnvZfZ7vAvt", name: "Metal" },
  //   { id: "KnvZfZ7vAvn", name: "New Age" },
  //   { id: "KnvZfZ7vAvl", name: "Other" },
  //   { id: "KnvZfZ7vAev", name: "Pop" },
  //   { id: "KnvZfZ7vAee", name: "R&B" },
  //   { id: "KnvZfZ7vAed", name: "Reggae" },
  //   { id: "KnvZfZ7vAe7", name: "Religious" },
  //   { id: "KnvZfZ7vAeA", name: "Rock" },
  //   { id: "KnvZfZ7vAeF", name: "World" },
  // ];

  useEffect(() => {
    getUserInfo().then((res) => {
      const info = res.data();
      setUserInfo(info);
    });
  }, []);

  console.log(userInfo);

  // const genre = genres.find((item) => item.id === userInfo.genrePreferences[0]);
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: userInfo.photoURL }}
        style={{ width: 100, height: 100 }}
      ></Image>
      <Text>Name: {userInfo.displayName} </Text>
      <Text>Email: {userInfo.email} </Text>
      <Text> {genres[userInfo.genrePreferences[0]]} </Text>
      <Text> Bio: {userInfo.bio} </Text>
      <Button title="sign out" onPress={signOutUser} />
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
