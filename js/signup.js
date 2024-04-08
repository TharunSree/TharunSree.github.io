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
    let email = document.getElementById('email');
    let password = document.getElementById('password');
    let fullName = document.getElementById('full_name');
    let passwordConfirmation = document.getElementById('password_confirmation');

    // Clear previous error messages
    clearErrors();

    if (password.value !== passwordConfirmation.value) {
        displayError(password, 'Passwords do not match!!');
        return;
    }

    if (password.value.length < 6) {
        displayError(password, 'Password must be 6 characters long or more');
        return;
    }

    auth.createUserWithEmailAndPassword(email.value, password.value)
        .then(function () {
            let user = auth.currentUser;
            let databaseRef = database.ref();
            let userData = {
                email: email.value,
                full_name: fullName.value,
                last_login: Date.now()
            };
            databaseRef.child('users/' + user.uid).set(userData)
                .then(function () {
                    window.location.href = 'account_created.html';
                })
                .catch(function (error) {
                    console.error('Error writing to database:', error);
                });
        })
        .catch(function (error) {
            displayError(email, error.message);
        });
}

function displayError(inputField, message) {
    let errorElement = document.createElement('div');
    errorElement.textContent = message;
    errorElement.className = 'error-message';
    inputField.parentNode.insertBefore(errorElement, inputField.nextSibling);
}

function clearErrors() {
    let errorMessages = document.getElementsByClassName('error-message');
    while(errorMessages[0]) {
        errorMessages[0].parentNode.removeChild(errorMessages[0]);
    }
}
