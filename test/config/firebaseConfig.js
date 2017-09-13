import firebase from 'firebase';

 // configure firebase
  const config = {
    apiKey: "AIzaSyDkPt22XPPEkOkOYPh6ISF_uvvToJqh2Og",
    authDomain: "post-it-test.firebaseapp.com",
    databaseURL: "https://post-it-test.firebaseio.com",
    projectId: "post-it-test",
    storageBucket: "post-it-test.appspot.com",
    messagingSenderId: "653724014643"
  };
  firebase.initializeApp(config);
export const dbConfigAuth = () => {
  const auth = firebase.auth();
  return auth;
};

export const dbConfigDb = () => {
  const db = firebase.database();
  return db;
};
