import React from "react";
import GigScreen from "./GigScreen";
import Profile from "./Profile";
import { createDrawerNavigator } from "@react-navigation/drawer";

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
    return (
       <Drawer.Navigator initialRouteName="Gigs">
           <Drawer.Screen name="Profile" component={Profile} />
           <Drawer.Screen name="Gigs" component={GigScreen} />
       </Drawer.Navigator >
    )
}

export default DrawerNavigation;