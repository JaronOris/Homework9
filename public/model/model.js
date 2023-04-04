function initListeners() {}

function initFirebase() {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      console.log("Auth changed Logged in");
      if (user.displayName) {
        $(".name").html(user.displayName);
      }
      $(".load").prop("disabled", false);
      $("#loginButton").removeClass("displayEle");
      $("#loginButton").addClass("hideEle");
      $("#logoutButton").removeClass("hideEle");
      $("#logoutButton").addClass("displayEle");
      $("#loginCallout").removeClass("displayEle");
      $("#loginCallout").addClass("hideEle");
      $("#userGallery").removeClass("hideEle");
      $("#userGallery").addClass("displayEle");
      userExists = true;
    } else {
      console.log("Auth changed Logged out");
      $(".name").html("");
      $(".load").attr("disabled", true);
      $("#loginButton").removeClass("hideEle");
      $("#loginButton").addClass("displayEle");
      $("#logoutButton").removeClass("displayEle");
      $("#logoutButton").addClass("hideEle");
      $("#loginCallout").removeClass("hideEle");
      $("#loginCallout").addClass("displayEle");
      $("#userGallery").removeClass("displayEle");
      $("#userGallery").addClass("hideEle");
      userExists = false;
      userFullName = "";
    }
  });
}

function signIn() {
  firebase
    .auth()
    .signInAnonymously()
    .then(() => {
      console.log("Signed in");
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log("Error signing in" + errorMessage);
    });
}

function signOut() {
  firebase
    .auth()
    .signOut()
    .then(() => {
      console.log("Signed out");
    })
    .catch((error) => {
      console.log("Error signing out" + errorMessage);
    });
}

function createAccount() {
  let fName = $("#fName").val();
  let lName = $("#lName").val();
  let email = $("#email").val();
  let password = $("#password").val();
  let fullName = fName + " " + lName;

  console.log(
    "create" + " " + fName + " " + lName + " " + email + " " + password
  );

  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      console.log("Account Created");
      firebase.auth().currentUser.updateProfile({
        displayName: fullName,
      });
      userFullName = fullName;
      $(".name").html(userFullName);
      $("#fName").val("");
      $("#lName").val("");
      $("#email").val("");
      $("#password").val("");
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log("Error" + " " + errorMessage);
    });
}

function login() {
  let email = $("#userEmail").val();
  let password = $("#userPass").val();

  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      console.log("Logged in");
      $("#userEmail").val("");
      $("#userPass").val("");
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log("Error logging in " + errorMessage);
    });
}
