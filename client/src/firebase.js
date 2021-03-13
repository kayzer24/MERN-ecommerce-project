import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
	apiKey: "apikey",
	authDomain: "auth_domain",
	databaseURL: "db_url",
	projectId: "project_id",
	storageBucket: "storage_bucket",
	messagingSenderId: "messagingSenderId",
	appId: "appId"
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

// export
export const auth = firebase.auth() 
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider()
