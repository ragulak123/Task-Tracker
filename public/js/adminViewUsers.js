window.onload = getUserDetails;
/**
 * get all the users details
 * call displayUserDetails
 */
function getUserDetails() {
  let req = new XMLHttpRequest();
  req.open("GET", "http://localhost:9002/api/v1/user/users");
  req.send();
  req.onreadystatechange = function () {
    if (req.readyState === 4) {
      if (req.status === 200) {
        userdata = JSON.parse(this.responseText);

        displayUserDetails();
      }
    }
  };
}

/**
 * displaying all the users details
 */
function displayUserDetails() {
  var admin = `<table class="table table-hover table-responsive" >
    <thead id="adminhead">
    <tr>
         <th>Name</th>
         <th>Email</th>
         </tr>
         </thead>
         <tbody id="adminbody">`;
  for (let i = 0; i < userdata.length; i++) {
    admin += `<tr>
              <td>${userdata[i].username}</td>
              <td id="f1">${userdata[i].email}</td>
              </tr>`;
  }
  admin += `</tbody></table>`;
  document.getElementById("addTable").innerHTML = admin;
}
/**
 * creating new task
 */
function addUsers() {
  const description = document.getElementById("description").value;
  const duration = document.getElementById("duration").value;
  const status = document.getElementById("status").value;
  const title = document.getElementById("title").value;

  let data = Math.floor((Math.random() * 1000000) + 1);
  
  var num1 = 0;
  var http2 = new XMLHttpRequest();
  http2.open("POST", `http://localhost:9002/api/v1/admin/addtask`);
  http2.setRequestHeader("Content-Type", "application/json");
  http2.send(
    JSON.stringify({
      taskId:data,
      title: title,
      description: description,
      assigned_to: " ",
      status: status,
      duration: duration,
      notification: num1,
      comment: " ",
    })
  );

  http2.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status == 200) {
      }
    }
    document.getElementById("description").value = "";
    document.getElementById("duration").value = "";
    document.getElementById("status").value = "";
    document.getElementById("title").value = "";
  };
}
