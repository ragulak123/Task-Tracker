/**
 * register new user
 */


function signUp() {  
  let name = document.getElementById("username").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let key = "user";

  

  //AJAX POST to register user in DB
  var http = new XMLHttpRequest();
  http.open("POST", "http://localhost:9002/api/v1/user/register", true);
  http.setRequestHeader("Content-Type", "application/json");
  http.send(
    JSON.stringify({
      username: name,
      email: email,
      role: key,
      password: password,
    })
  );
  http.onreadystatechange = function () {
    if (http.readyState == 4) {
      if (http.status == 201) {
        alert("User registered successfully...");
        location.replace("http://localhost:9002/login.html");
        localStorage.setItem("Username", name);

      }
      else{
        alert("Please enter all the fields");
      }
    } 
  };

  event.preventDefault();
}
