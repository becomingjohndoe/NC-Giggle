import React, { useContext, useEffect, useState } from "react";
import GigScreen from "./GigScreen";
import ErrorScreen from "./ErrorScreen";
import Profile from "./Profile";
import Chats from "./Chats";
import { createDrawerNavigator } from "@react-navigation/drawer";
import UserProfile from "./UserProfile";
import { getGigsForHomePage } from "../utils/api";
import {
  View,
  Button,
  Text,
  StyleSheet,
  Modal,
  Pressable,
  Picker,
} from "react-native";

import { UserContext } from "../context/context";

import ChatsList from "./ChatsList";
import { TextInput } from "react-native-gesture-handler";
import { getUserInfo } from "../firebase";
import CustomDrawer from "./CustomDrawer";

const Drawer = createDrawerNavigator();

const DrawerNavigation = ({ navigation, route }) => {
  const { userParams } = useContext(UserContext);
  // console.log(userParams);
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [genreValue, setGenreValue] = useState("");
  const [sortByValue, setSortByValue] = useState("date,asc");
  const [userCity, setUserCity] = useState("");
  const [initialCity, setInitialCity] = useState(userParams.city);
  const [initialGenre, setInitialGenre] = useState(userParams.genre);
  const [gigs, setGigs] = useState([{}]);
  const [genres, setGenres] = useState([
    { value: "", label: "Select a genre" },
    { value: "KnvZfZ7vAvv", label: "Alternative" },
    { value: "KnvZfZ7vAve", label: "Ballads/Romantic" },
    { value: "KnvZfZ7vAvd", label: "Blues" },
    { value: "KnvZfZ7vAvA", label: "Chanson Francais" },
    { value: "KnvZfZ7vAvk", label: "Children's Music" },
    { value: "KnvZfZ7vAeJ", label: "Classical" },
    { value: "KnvZfZ7vAv6", label: "Country" },
    { value: "KnvZfZ7vAvF", label: "Dance/Electronic" },
    { value: "KnvZfZ7vAva", label: "Folk" },
    { value: "KnvZfZ7vAv1", label: "Hip-Hop/Rap" },
    { value: "KnvZfZ7vAvE", label: "Jazz" },
    { value: "KnvZfZ7vAJ6", label: "Latin" },
    { value: "KnvZfZ7vAvI", label: "Medieval/Renaissance" },
    { value: "KnvZfZ7vAvt", label: "Metal" },
    { value: "KnvZfZ7vAvn", label: "New Age" },
    { value: "KnvZfZ7vAvl", label: "Other" },
    { value: "KnvZfZ7vAev", label: "Pop" },
    { value: "KnvZfZ7vAee", label: "R&B" },
    { value: "KnvZfZ7vAed", label: "Reggae" },
    { value: "KnvZfZ7vAe7", label: "Religious" },
    { value: "KnvZfZ7vAeA", label: "Rock" },
    { value: "KnvZfZ7vAeF", label: "World" },
  ]);
  const [sort, setSort] = useState([
    { value: "date,asc", label: "Date Ascending" },
    { value: "date,desc", label: "Date Descending" },
    { value: "name,asc", label: "Name Ascending" },
    { value: "name,desc", label: "Name Descending" },
    { value: "venueName,asc", label: "Venue Name Ascending" },
    { value: "venueName,desc", label: "Venue Name Descending" },
    { value: "random", label: "Random" },
  ]);

  const filter = () => {
    getGigsForHomePage(genreValue, sortByValue, userCity).then((results) => {
      setGigs(results);
    });
    setModalVisible(!modalVisible);
  };
  useEffect(() => {
    console.log("useEffect");
    getUserInfo().then((user) => {
      if (user) {
        console.log(user);
        setUserCity(user.city);
        setInitialCity(user.city);
        setInitialGenre(user.genrePrefrences[0]);
      }
      getGigsForHomePage(initialGenre, sortByValue, initialCity).then(
        (results) => {
          setGigs(results);
        }
      );
    });
    setIsLoading(false);
    // console.log("here", userParams);
  }, [initialCity]);
  if (isLoading) {
    return <Text>Loading</Text>;
  }
  return (
    <>
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawer {...props} />}
        initialRouteName="Home"
        screenOptions={{ headerStyle: { backgroundColor: "#344CB7" } }}
      >
        {gigs ? (
          <Drawer.Screen
            name="Home"
            children={() => <GigScreen events={gigs} />}
            options={{
              headerTitle: "Gigs",
              headerRight: () => (
                <>
                  <>
                    <Button
                      onPress={() => setModalVisible(!modalVisible)}
                      title="Filter"
                      color="gray"
                    />
                  </>
                </>
              ),
            }}
          />
        ) : (
          <Drawer.Screen
            name="Home"
            component={ErrorScreen}
            options={{
              headerTitle: "Gigs",
              headerRight: () => (
                <>
                  <>
                    <Button
                      onPress={() => setModalVisible(!modalVisible)}
                      title="Filter"
                      color="gray"
                    />
                  </>
                </>
              ),
            }}
          />
        )}
        <Drawer.Screen
          name="Profile"
          component={UserProfile}
          initialParams={route.params}
        />
        {/* <Drawer.Screen name="Chatroom" component={Chats} /> */}
        <Drawer.Screen name="ChatsList" component={ChatsList} />
      </Drawer.Navigator>
      <View>
        <Modal visible={modalVisible} animationType="slide">
          <View style={styles.container}>
            <Text style={styles.text}>Select a genre:</Text>
            <Picker
              selectedValue={genreValue}
              onChange={(itemValue) => setGenreValue(itemValue.target.value)}
            >
              {genres.map((genre) => {
                return (
                  <Picker.Item
                    key={genre.value}
                    value={genre.value}
                    label={genre.label}
                  />
                );
              })}
            </Picker>
            <Text style={styles.text}>City:</Text>
            <TextInput
              defaultValue={userCity}
              onChange={(city) => setUserCity(city.target.value)}
            />
            <Text style={styles.text}>Sort By:</Text>
            <Picker
              selectedValue={sortByValue}
              onChange={(itemValue) => setSortByValue(itemValue.target.value)}
            >
              {sort.map((sortBy) => {
                return (
                  <Picker.Item
                    key={sortBy.value}
                    value={sortBy.value}
                    label={sortBy.label}
                  />
                );
              })}
            </Picker>

            <Pressable
              style={[styles.button]}
              onPress={() => {
                filter();
              }}
            >
              <Text>Apply</Text>
            </Pressable>
          </View>
        </Modal>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    borderColor: "red",
    borderWidth: 3,
    borderStyle: "solid",
    flex: 1,
    paddingTop: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    marginBottom: 20,
    marginTop: 20,
    fontSize: 20,
    fontWeight: "700",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
});
export default DrawerNavigation;
