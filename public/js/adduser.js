window.onload = getUserDetails;
/**
 * get the users details from the db and store in a variable
 * call displayUserDetails
 */
function getUserDetails() {
  let req = new XMLHttpRequest();
  req.open("GET", "http://localhost:9002/api/v1/user/users");
  req.send();
  req.onreadystatechange = function () {
    if (req.readyState === 4) {
      if (req.status === 200) {
        usersData = JSON.parse(this.responseText);

        displayUserDetails();
      }
    }
  };
}
/**
 * display all users
 */

function displayUserDetails() {
  var admin = `<table class="table table-hover table-responsive" >
    <thead id="adminhead">
    <tr>
         <th>Name</th>
         <th>Email</th>
         <th>Add Task</th>
         </tr>
         </thead>
         <tbody id="adminbody">`;
  
  for (let i = 0; i < usersData.length; i++) {
    admin += `<tr>
              <td>${usersData[i].username}</td>
              <td id="f1">${usersData[i].email}</td>
             <td style="margin-right:150px"><button  type="button" data-toggle="modal" data-target="#AssignModal" data-uid="1" onclick="assignTask('${usersData[i].username}')" class="update btn btn-warning btn-sm"><span class="glyphicon glyphicon-pencil"></span></button></td>
              </tr>`;
  }
  admin += `</tbody></table>`;
  document.getElementById("addTable").innerHTML = admin;
}

/**
 * assign task to the user
 * @param name specific username
 */
function assignTask(name) {
  var req1 = new XMLHttpRequest();
  const url = "http://localhost:9002/api/v1/admin/gettasks";
  req1.open("GET", url, true);
  req1.send();

  req1.onreadystatechange = function () {
    if (req1.readyState === 4) {
      if (req1.status === 200) {
        tasks = JSON.parse(req1.responseText);

        let usertasks = `  <label for="cars" id="lists" >Choose a Task:</label>
            <select name="task" id="menu">`;
        for (let j in tasks) {
          if (tasks[j].assigned_to == " ") {
            usertasks += `
               <option value="${tasks[j]._id}"  >${tasks[j].title}</option>`;
          }
        }

        let usertasks1 = ` </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onclick="closepopup()" id="a">Close</button>
              <button type="button" class="btn btn-primary" onclick="updateTask('${name}')" id="b">Assign Task</button>
              `;
        document.getElementById("assignModal").innerHTML = usertasks;
        document.getElementById("assignFooter").innerHTML = usertasks1;
      }
    }
  };
}

/**
 * update specific user detailss
 * @param username specific username
 */
function updateTask(username) {
  document.getElementById("AssignModal").style.display = "none";
  let id = document.getElementById("menu").value;
  let num = 1;
  var req = new XMLHttpRequest();
  req.open("PUT", "http://localhost:9002/api/v1/admin/updatetask/" + id, true);
  req.setRequestHeader("Content-Type", "application/json");
  req.send(
    JSON.stringify({
      assigned_to: username,
      notification: num,

      assignedDate:new Date().toLocaleDateString()
    })
  );
  req.onreadystatechange = function () {
    if (req.readyState === 4) {
      if (req.status == 200) {
        alert("Task Assigned successfully");
      }
    }
  };
  event.preventDefault();
}

/**
 * add task
 */
function addUserDetails() {
  const description = document.getElementById("description").value;

  const duration = document.getElementById("durationAdd1").value;
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
  };
}
/**
 * close button for assign task
 */
function closepopup() {
  document.getElementById("AssignModal").style.display = "none";
}
