const firebase = require('firebase');

module.exports = () => {
    const config =  {
        apiKey: 'AIzaSyAyLQtYUNfRvMG7tqL85kto0Zv9l0H0xxk',
        authDomain: 'postitapp-f266c.firebaseapp.com',
        databaseURL: 'https://postitapp-f266c.firebaseio.com',
        projectId: 'postitapp-f266c',
        storageBucket: 'postitapp-f266c.appspot.com',
        messagingSenderId: '276992209544' };
//  Initialize Database
firebase.initializeApp(config);
// const auth = firebase.auth();
}