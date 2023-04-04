var userExists = false;
var userFullName = "";

$(document).ready(function () {
  try {
    let app = firebase.app();
    initFirebase();
    initListeners();
  } catch (error) {
    console.log("error", error);
  }
});
