import React from "react";
import Chats from "./Chats";
import Home from "./Home";
import Channels from "./Channels";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

export default function GigDetails({ navigation, route }) {
	const Tab = createMaterialTopTabNavigator();
	console.log(route);
	return (
		<Tab.Navigator>
			<Tab.Screen
				name="Home"
				component={Home}
				initialParams={{ id: route.params.id, gig: route.params.gig }}
			/>
			<Tab.Screen
				name="Channels"
				component={Channels}
				initialParams={{ id: route.params.id, gig: route.params.gig }}
			/>
		</Tab.Navigator>
	);
}
