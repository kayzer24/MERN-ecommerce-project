import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
	apiKey: "AIzaSyCKxCUVqf5Cdo7MxHctwbeMRuRSTe81htQ",
	authDomain: "ecommerce-3940c.firebaseapp.com",
	databaseURL: "https://ecommerce-3940c-default-rtdb.firebaseio.com",
	projectId: "ecommerce-3940c",
	storageBucket: "ecommerce-3940c.appspot.com",
	messagingSenderId: "292184481528",
	appId: "1:292184481528:web:3a6341970d9d5bb720250d"
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

// export
export const auth = firebase.auth() 
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider()