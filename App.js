import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import Login from "./components/Login";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignUp from "./components/SignUp";
import Home from "./components/Home";
import { onAuthStateChanged, getAuth } from "@firebase/auth";
import { checkNewuser } from "./firebase";
import Profile from "./components/Profile";
import GigScreen from './components/GigScreen';

export default function App() {
	const [user, setUser] = React.useState(null);
	const [isLoading, setIsLoading] = React.useState(true);
	const [isNewUser, setIsNewUser] = React.useState(false);
	const auth = getAuth();
	const Stack = createNativeStackNavigator();

	// check if user is loggen into firebase
	useEffect(() => {
		setIsLoading(true);
		onAuthStateChanged(auth, (user) => {
			if (user) {
				console.log("user is logged in");
				setUser(user);
				setIsLoading(false);
			} else {
				console.log("user is not logged in");
				setUser(null);
				setIsLoading(false);
			}
			setIsNewUser(checkNewuser());
		});
	}, []);
	if (isLoading) return <Text>Loading...</Text>;
	return (
		<NavigationContainer>
			<Stack.Navigator>
				{user ? (
					<>
						{isNewUser ? (
							<>
								<Stack.Screen
									name="Profile"
									component={Profile}
									options={{ headerShown: false }}
									initialParams={{ newUser: setIsNewUser }}
								/>
							</>
						) : (
							<Stack.Screen
								name="Home"
								component={GigScreen}
								options={{ headerShown: false }}
							/>
						)}
					</>
				) : (
					<>
						<Stack.Screen name="Login" component={Login} />
						<Stack.Screen name="Sign Up" component={SignUp} />
					</>
				)}
			</Stack.Navigator>
		</NavigationContainer>
	);
}