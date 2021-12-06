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
	getFirestore,
	collection,
	addDoc,
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
		.then((userCredential) => {
			console.log(userCredential);
			try {
				addDoc(collection(db, "users"), {
					email: userCredential.user.email,
					uid: userCredential.user.uid,
				});
			} catch (err) {
				console.log(err);
			}
		})
		.catch((error) => {
			console.log(error);
		});
};

export const signInWithGoogle = async () => {
	signInWithRedirect(auth, provider);
};

export const signOutUser = async () => {
	signOut(auth);
};

// use this when you need user information on a certain page/component
// gets called when user is signed in
// use getAuth to get auth object
onAuthStateChanged(auth, (user) => {
	try {
		if (user) {
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
			};
			setDoc(doc(db, "users", user.uid), userData);
		}
	} catch (error) {
		console.log(error);
	}
});

export default app;
