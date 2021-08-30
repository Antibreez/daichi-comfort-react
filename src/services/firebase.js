
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyClIrqD9yvb40urZ4500e4gJR4p6hijoc0",
    authDomain: "daichi-comfort-b7429.firebaseapp.com",
    databaseURL: "https://daichi-comfort-b7429-default-rtdb.firebaseio.com",
    projectId: "daichi-comfort-b7429",
    storageBucket: "daichi-comfort-b7429.appspot.com",
    messagingSenderId: "170712659704",
    appId: "1:170712659704:web:3275e5a3585e636797ad0d",
    measurementId: "G-4L22161E8M"
};

class Firebase {
  constructor() {
    firebase.initializeApp(firebaseConfig);

    this.auth = firebase.auth();
    this.database = firebase.database();

    this.userUid = null;
    this.registrationErrorMessage = '';
    this.loginErrorMessage = '';
  }

  setUserUid = (uid) => this.userUid = uid;
  getEmail = () => this.auth.currentUser.email;

  getRegistrationErrorMessage = () => {
    return this.registrationErrorMessage;
  }

  getLoginErrorMessage = () => {
    return this.loginErrorMessage;
  }

  signWithEmail = (email, password) => 
    this.auth.signInWithEmailAndPassword(email, password)
    .catch((error) => {
      this.loginErrorMessage = error.message;
    });

  getUserCardsRef = () => this.database.ref(`/cards/${this.userUid}`);
  signUpWithEmail = (email, password) => this.auth.createUserWithEmailAndPassword(email, password).catch((error) => {
    this.registrationErrorMessage = error.message;
  });

  signOut = () => this.auth.signOut();

  getRecaptcha = () => {
    return new firebase.auth.RecaptchaVerifier('recaptcha-container', {
      'size': 'invisible',
    
    })
  }
}

export default new Firebase();