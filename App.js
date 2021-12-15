import React, { useEffect } from "react";
import { Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { onAuthStateChanged, getAuth } from "@firebase/auth";
import { checkNewuser } from "./firebase";
import { UserProvider } from "./context/context";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Profile from "./components/Profile";
import Chats from "./components/Chats";
import DrawerNavigation from "./components/Navigation";
import GigDetails from "./components/GigDetails";
export default function App() {
	const [user, setUser] = React.useState(false);
	const [isLoading, setIsLoading] = React.useState(true);

	const auth = getAuth();
	const Stack = createNativeStackNavigator();

	// check if user is loggen into firebase
	useEffect(() => {
		console.log(auth.currentUser);
		setIsLoading(true);
		checkNewuser().then((u) => {
			setUser(u);
		});
		setIsLoading(false);
	}, []);
	console.disableYellowBox = true;

	if (isLoading) return <Text>Loading...</Text>;
	return (
		<>
			<UserProvider>
				<NavigationContainer>
					<Stack.Navigator>
						{!user ? (
							<>
								<Stack.Screen
									name="Login"
									component={Login}
									initialParams={{ newUser: setUser }}
								/>
								<Stack.Screen name="Sign Up" component={SignUp} />
								<Stack.Screen
									name="Profile"
									component={Profile}
									options={{ headerShown: false }}
									initialParams={{ newUser: setUser }}
								/>
							</>
						) : (
							<>
								<Stack.Screen
									name="navigator"
									component={DrawerNavigation}
									options={{ headerShown: false }}
									initialParams={{ newUser: setUser }}
								/>
								<Stack.Screen
									name="Chats"
									component={Chats}
									options={{
										headerStyle: {
											backgroundColor: "#344CB7",
										},
									}}
								></Stack.Screen>
								<Stack.Screen
									name="GigDetails"
									component={GigDetails}
									options={{
										headerStyle: {
											backgroundColor: "#344CB7",
										},
									}}
								/>
							</>
						)}
					</Stack.Navigator>
				</NavigationContainer>
			</UserProvider>
		</>
	);
}
