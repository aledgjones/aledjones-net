import * as firebase from 'firebase/app';
import "firebase/firestore";
import "firebase/storage";

import flamelink from 'flamelink/app';
import 'flamelink/content'
import 'flamelink/storage'

const firebaseConfig = {
    apiKey: "AIzaSyAsc6FJQxCWJQGJpAsgpzGm7xUyjQZvSBs",
    authDomain: "aledjones-web.firebaseapp.com",
    databaseURL: "https://aledjones-web.firebaseio.com",
    projectId: "aledjones-web",
    storageBucket: "aledjones-web.appspot.com",
    messagingSenderId: "26211613999",
    appId: "1:26211613999:web:45e0b5e3e07308a83535da"
};
const fbApp = firebase.initializeApp(firebaseConfig);

export const app = flamelink({
    firebaseApp: fbApp,
    dbType: 'cf' // optional, defaults to `rtdb` - can be 'rtdb' or 'cf' (Realtime DB vs Cloud Firestore)
});