/**
 * checking the admin credentials
 */


function adminLoginCheck() {
  const Username = document.getElementById("username").value;
  const Password = document.getElementById("password").value;
  if (Username == "admin" && Password == "admin123") {
    location.replace("http://localhost:9002/adminViewUser.html");
    alert("Signed in Successfully....");
  } 
  else if(!Username || !Password){
    alert("Please enter all the fields")
  }
  else {
    alert("username or password is invalid");
  }
}

