// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyDRGSjEzFMh986ju3LQbDGymvB95Uw4u9Q",
    authDomain: "login-and-register-16ec7.firebaseapp.com",
    databaseURL: "https://login-and-register-16ec7-default-rtdb.firebaseio.com",
    projectId: "login-and-register-16ec7",
    storageBucket: "login-and-register-16ec7.appspot.com",
    messagingSenderId: "862876891453",
    appId: "1:862876891453:web:6852e38e2930c5675aed54"
  };

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

const auth = firebase.auth(app);
const database = firebase.database(app);

function register() {
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let full_name = document.getElementById('full_name').value;
    let password_confirmation = document.getElementById('password_confirmation').value;

    if (password !== password_confirmation) {
        alert('Passwords do not match!!');
        return;
    }

    auth.createUserWithEmailAndPassword(email, password)
    .then(function() {
        let user = auth.currentUser;
        let database_ref = database.ref();
        let user_data = {
            email : email,
            full_name : full_name,
            last_login : Date.now()
        };
        database_ref.child('users/' + user.uid).set(user_data);
        alert('User Created!!');
    })
    .catch(function(error) {
        let error_code = error.code;
        let error_message = error.message;
        alert(error_message);
    });
}
