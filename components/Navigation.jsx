import React from "react";
import GigScreen from "./GigScreen";
import Profile from "./Profile";
import { createDrawerNavigator } from "@react-navigation/drawer";
import UserProfile from "./UserProfile";

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
    return (
       <Drawer.Navigator initialRouteName="Home">
           <Drawer.Screen name="Home" component={GigScreen} />
           <Drawer.Screen name="Profile" component={UserProfile} />
       </Drawer.Navigator >
    )
}

export default DrawerNavigation;