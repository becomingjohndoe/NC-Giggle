// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	sendPasswordResetEmail,
	onAuthStateChanged,
	GoogleAuthProvider,
	signInWithRedirect,
	getRedirectResult,
} from "firebase/auth";
import {
	doc,
	setDoc,
	getDoc,
	getFirestore,
	collection,
	addDoc,
	updateDoc,
} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyDwuwcfV_yiEVliu-hwBDHSU9zvrzf0S88",
	authDomain: "test-authentication-with-react.firebaseapp.com",
	projectId: "test-authentication-with-react",
	storageBucket: "test-authentication-with-react.appspot.com",
	messagingSenderId: "509266572396",
	appId: "1:509266572396:web:18a0816e4fc471a6c85449",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();
const db = getFirestore();

export const createUser = async (email, password) => {
	createUserWithEmailAndPassword(auth, email, password)
		.then(() => {
			console.log("User created successfully");
		})
		.catch((error) => {
			alert(error);
		});
};

export const signIn = async (email, password) => {
	signInWithEmailAndPassword(auth, email, password)
		.then(() => {
			console.log("User signed in successfully");
		})
		.catch((error) => {
			alert(error);
		});
};

export const signInWithGoogle = async () => {
	signInWithRedirect(auth, provider).catch(() => {
		alert("Error signing in");
	});
};

export const signOutUser = async () => {
	signOut(auth);
};

// use this when you need user information on a certain page/component
// gets called when user is signed in
// use getAuth to get auth object
onAuthStateChanged(auth, (user) => {
	try {
		if (checkNewuser()) {
			const userData = {
				email: user.email,
				uid: user.uid,
				profile_picture: user.photoURL,
				displayName: user.displayName,
				age: 0,
				city: "",
				bio: "",
				rating: 0,
				awards: [],
				genrePrefrences: [],
			};
			setDoc(doc(db, "users", user.uid), userData);
		}
	} catch (error) {
		console.log(error);
	}
});

export const checkNewuser = async () => {
	if (auth.currentUser) {
		const docRef = doc(db, "users", auth.currentUser.uid);
		const docSnap = await getDoc(docRef);
		if (docSnap.exists()) {
			if (docSnap.data().genrePrefrences.length === 0) {
				// set genre preferences
				return true;
			}
		}
	} else {
		return false;
	}
};

export const updateUser = async (userData) => {
	const userRef = doc(db, "users", auth.currentUser.uid);
	await updateDoc(userRef, userData);
};

export default app;
