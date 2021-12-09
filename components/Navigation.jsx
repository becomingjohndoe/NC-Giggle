import React from "react";
import GigScreen from "./GigScreen";
import Profile from "./Profile";
import { createDrawerNavigator } from "@react-navigation/drawer";
import UserProfile from "./UserProfile";
import { Button } from "react-native";

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
    return (
       <Drawer.Navigator initialRouteName="Home">
           <Drawer.Screen name="Home" component={GigScreen} options={{
									headerTitle: "Gigs",
									headerRight: () => (
										<Button
											onPress={() => alert("This is a button!")}
											title="Options"
											color="gray"
										/>
									),
								}}/>
           <Drawer.Screen name="Profile" component={UserProfile} />
       </Drawer.Navigator >
    )
}

export default DrawerNavigation;