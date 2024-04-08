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
  
  // Set up our login function
  function login () {
    // Get all our input fields
    email = document.getElementById('email').value;
    password = document.getElementById('password').value;
  
    // Validate input fields
    if (validate_email(email) == false || validate_password(password) == false) {
      displayError('Email or Password is Outta Line!!');
      return;
      // Don't continue running the code
    }
  
    auth.signInWithEmailAndPassword(email, password)
    .then(function() {
      // Declare user variable
      var user = auth.currentUser;
  
      // Add this user to Firebase Database
      var database_ref = database.ref();
  
      // Create User data
      var user_data = {
        last_login : Date.now()
      };
  
      // Push to Firebase Database
      database_ref.child('users/' + user.uid).update(user_data)
      .then(function() {
        window.location.href = "success.html";
      })
      .catch(function(error) {
        console.error('Error writing to database:', error);
      });
  
    })
    .catch(function(error) {
      // Firebase will use this to alert of its errors
      var error_message = error.message;
      displayError(error_message);
    });
  }
  
  // Validate Functions
  function validate_email(email) {
    expression = /^[^@]+@\w+(\.\w+)+\w$/;
    if (expression.test(email) == true) {
      // Email is good
      return true;
    } else {
      // Email is not good
      return false;
    }
  }
  
  function validate_password(password) {
    // Firebase only accepts lengths greater than 6
    if (password.length < 6) {
      return false;
    } else {
      return true;
    }
  }
  
  function validate_field(field) {
    if (field == null) {
      return false;
    }
  
    if (field.length <= 0) {
      return false;
    } else {
      return true;
    }
  }
  
  function displayError(message) {
    let errorElement = document.getElementById('error-message');
    errorElement.textContent = message;
    errorElement.style.display = 'block';
  }
  