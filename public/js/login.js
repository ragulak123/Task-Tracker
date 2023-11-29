/**
 * checking the user credentials
 */

function userLoginCheck() {
  let name = document.getElementById("user").value;
  localStorage.setItem("Name", name);
  let password = document.getElementById("pass").value;
  let key = "user";

  var http = new XMLHttpRequest();
  http.open("POST", `http://localhost:9002/api/v1/user/login`, true);
  http.setRequestHeader("Content-type", "application/json");
  http.send(JSON.stringify({ username: name, role: key, password: password }));
  http.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status == 200) {
        let userData = JSON.parse(this.responseText);
        localStorage.setItem("Token", userData);
        displayUser();
      } else {
        alert("Invalid credentials...");
      }
    }
  };
  event.preventDefault();
}

/**
 * displaying the user details
 */
function displayUser() {
  const http = new XMLHttpRequest();
  http.open("GET", `http://localhost:9002/api/v1/user/auth-user`, true);
  http.setRequestHeader("Content-type", "application/json");
  http.setRequestHeader("x-user-auth-token", localStorage.getItem("Token"));
  http.send();
  http.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status == 200) {
        location.replace("http://localhost:9002/userLogin.html");
      }
    }
  };
  event.preventDefault();
}
