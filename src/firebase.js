import firebase from 'firebase'
import 'firebase/firestore'

let config = {
  apiKey: "AIzaSyCTDP_h9xRb3UWyj-kqEDtneAXC2OJxJTc",
  authDomain: "we-have-to-cook.firebaseapp.com",
  databaseURL: "https://we-have-to-cook.firebaseio.com",
  projectId: "we-have-to-cook",
  storageBucket: "we-have-to-cook.appspot.com",
  messagingSenderId: "405010322455",
  appId: "1:405010322455:web:203463229cad1e6f697852",
  measurementId: "G-TVJETQFX70"
}

export const db = firebase.initializeApp(config).firestore()
export const storage = firebase.storage()

