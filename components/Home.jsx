import React from "react";
import {
	View,
	Text,
	Button,
	Image,
	StyleSheet,
	TouchableOpacity,
	Linking,
	Platform,
	ScrollView,
} from "react-native";
import { signOutUser } from "../firebase";
import { daysToGo } from "../utils/daysToGo";
export default function Home({ navigation, route }) {
	const event = route.params.gig;
	const venue = event._embedded.venues;
	const lat = venue[0].location.latitude;
	const lng = venue[0].location.longitude;
	const scheme = Platform.select({ ios: "maps:0,0?q=", android: "geo:0,0?q=" });
	const latLng = `${lat},${lng}`;
	const label = "Custom Label";
	const url = Platform.select({
		ios: `${scheme}${label}@${latLng}`,
		android: `${scheme}${latLng}(${label})`,
	});

	return (
		<ScrollView>
			<View style={styles.container}>
				<Image source={event.images[0]} style={styles.headerImage} />
				<View style={styles.venueDetails}>
					<Text style={styles.headerText}>{event.name}</Text>
					<Text style={styles.daysLeft}>
						{daysToGo(event.dates.start.localDate)} days to go
					</Text>
					<Text style={styles.sectionHeader}>Venue</Text>
					<Text style={styles.details}>{venue[0].name}</Text>
					<Text style={styles.details}>{venue[0].address.line1}</Text>
					<Text style={styles.details}>{venue[0].city.name}</Text>
					<Text style={styles.details}>{venue[0].postalCode}</Text>
					<TouchableOpacity
						style={styles.button}
						onPress={() => {
							Linking.openURL(url);
						}}
					>
						<Text>Get Directions</Text>
					</TouchableOpacity>
					<Text style={styles.sectionHeader}>Additional Info</Text>
					<Text style={styles.details}>{venue[0].ada.adaCustomCopy}</Text>
				</View>
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#000957",
	},
	headerImage: {
		width: "100%",
		height: 200,
		resizeMode: "cover",
		overflow: "hidden",
	},
	headerText: {
		fontSize: 30,
		fontWeight: "bold",
		marginTop: 10,
		marginBottom: 10,
		textAlign: "center",
		color: "#fff",
	},
	subHeader: {
		fontSize: 20,
		fontWeight: "bold",
		marginTop: 10,
		marginBottom: 10,
		color: "#fff",
	},
	sectionHeader: {
		fontSize: 18,
		fontWeight: "bold",
		marginTop: 10,
		marginBottom: 10,
		color: "#EBE645",
	},
	button: {
		backgroundColor: "#EBE645",
		padding: 10,
		margin: 10,
		borderRadius: 10,
		alignItems: "center",
		justifyContent: "center",
	},
	daysLeft: {
		fontSize: 27,
		fontWeight: "bold",
		margin: 10,
		color: "#EBE645",
		textAlign: "center",
	},
	venueDetails: {
		backgroundColor: "#344CB7",
		padding: 5,
		paddingBottom: 10,
		margin: 10,
		marginBottom: 20,
		borderRadius: 10,
		flex: 1,
		opacity: 0.9,
		shadowColor: "#000636",
		shadowOffset: { width: -2, height: 4 },
		shadowOpacity: 0.5,
		shadowRadius: 3,
		color: "#fff",
	},
	details: {
		fontSize: 15,
		color: "#fff",
	},
});
