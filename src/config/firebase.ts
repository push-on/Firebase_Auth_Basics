import { initializeApp } from "firebase/app"
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
// import { getAnalytics } from "firebase/analytics"

const firebaseConfig = {
	apiKey: "AIzaSyDDeDgK016Tvt1MlENsMvlZK0upq-cFrm0",
	authDomain: "fir-course-11f63.firebaseapp.com",
	projectId: "fir-course-11f63",
	storageBucket: "fir-course-11f63.appspot.com",
	messagingSenderId: "1040917336885",
	appId: "1:1040917336885:web:efacb623035f7be66ef27c",
	measurementId: "G-YW3Z4S3WRM"
}

const app = initializeApp(firebaseConfig)
// const analytics = getAnalytics(app)

export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
export const db = getFirestore(app)