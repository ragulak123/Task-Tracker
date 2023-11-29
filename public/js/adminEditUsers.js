var userdata = [];
/**
 * get all task details
 * call getAdminEditDetails
 */
function getUserDetails() {
  let req = new XMLHttpRequest();
  req.open("GET", "http://localhost:9002/api/v1/admin/gettasks");
  req.send();
  req.onreadystatechange = function () {
    if (req.readyState === 4) {
      if (req.status === 200) {
        userdata = JSON.parse(this.responseText);

        getAdminEditDetails();
        search_sort();
      }
    }
  };
}
/**
 * displaying all tasks in a table
 */

function getAdminEditDetails() {
  var adminBody = "";
  var adminHead = "";

  adminHead = `<tr>
  <th>TaskId</th>
      <th>Title</th>
      <th>Description</th>
      <th >User
      <button type="button" onclick=sortTable() id="sub" style="border:none;background:transparent"><i class="fa fa-sort" aria-hidden="true"></i></button></th>
      <th>Duration</th>
      <th>Status</th>
      <th>Comments</th>
      <th>Edit</th>
      <th>Delete</th>
      </tr>`;
  var admin = "";

  document.getElementById("dtaa").innerHTML = admin;
  var adminBody = "";
  for (let i = 0; i < userdata.length; i++) {
    adminBody += `<tr>
    <td>${userdata[i].taskId}</td>
           <td>${userdata[i].title}</td>
           <td id="f1">${userdata[i].description}</td>
           <td id="l1">${userdata[i].assigned_to}</td>
           <td id="v1">${userdata[i].duration}</td>
           <td id="m1">${userdata[i].status}</td>
           <td id="c1">${userdata[i].comment}</td>
           <td><button type="button" data-toggle="modal" data-target="#edit" data-uid="1" onclick="updateUser('${i}')" class="update btn btn-warning btn-sm"><span class="glyphicon glyphicon-pencil"></span></button></td>
           <td><button type="button" data-toggle="modal" data-target="#delete" data-uid="1"  onclick="oneStepDelete('${i}')"class="delete btn btn-danger btn-sm"><span class="glyphicon glyphicon-trash"></span></button></td>
           </tr>`;
  }
  document.getElementById("adminbody").innerHTML = adminBody;
  document.getElementById("adminhead").innerHTML = adminHead;
}

/**
 * deleting the task
 * @param id index of the task
 */

function oneStepDelete(id) {
  var Modal = `<div id="delete" class="modal fade" role="dialog">
      <div class="modal-dialog">
      <div class="modal-content">
      <div class="modal-header">
      <button type="button" class="close" data-dismiss="modal">×</button>
      <h4 class="modal-title">Delete Data</h4>
      </div>
      <div class="modal-body">
      <strong>Are you sure you want to delete this data?</strong>
      </div>
      <div class="modal-footer">
      <button type="button" id="del" class="btn btn-danger" data-dismiss="modal"onclick="deleteTask('${id}')">Delete</button>
      <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
      </div>
      </div>
      </div>
      </div>`;
  document.getElementById("deleteUser").innerHTML = Modal;
}

var usermodal = "";
/**
 * updating the task details
 * @param  updatedata index of the task
 */
function updateUser(updatedata) {
  usermodal += `
       <div id="edit" class="modal fade" role="dialog">
       <div class="modal-dialog">
      <div class="modal-content">
      <div class="modal-header">
      <button type="button" class="close" data-dismiss="modal">×</button>
      <h4 class="modal-title">Update Task</h4>
      </div>
      <div class="modal-body">
      <input id="titleUpdate" type="text" class="form-control" name="fname" placeholder="Title">
      <br>
     
   
  <input id="descriptionUpdate" type="text" class="form-control" name="fname" placeholder="Description">
      
  <br>
  
  <input id="assignedUpdate" type="text" class="form-control" name="fname" placeholder="Assigned_to">
  <br>
  <input id="durationUpdate1" type="text" class="form-control" name="fname" placeholder="Duration">
  <br>
  
  
  <label for="cars">Choose Status</label>

  <select name="cars" id="statusUpdate">
  <option value="Completed">Completed</option>
  <option value="Pending">Pending</option>
  <option value="In Progress">In Progress</option>
</select>


   </div>
      <div class="modal-footer">
      <button type="button" id="up1" class="btn btn-warning" data-dismiss="modal" onclick="taskUpdate('${updatedata}')">Update</button>
      <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
      </div>
      </div>
      </div>
      </div>
      `;

  document.getElementById("Update").innerHTML = usermodal;

  document.getElementById("titleUpdate").value = userdata[updatedata].title;
  document.getElementById("descriptionUpdate").value =
    userdata[updatedata].description;
  document.getElementById("assignedUpdate").value =
    userdata[updatedata].assigned_to;
  document.getElementById("statusUpdate").value =
    userdata[updatedata].status;

  document.getElementById("durationUpdate1").value =
    userdata[updatedata].duration;
}
/**
 * 
 * @param  delete index of the task
 */
function deleteTask(deleteIndex) {
  var http2 = new XMLHttpRequest();
  http2.open(
    "Delete",
    `http://localhost:9002/api/v1/admin/deletetask/${userdata[deleteIndex]._id}`
  );
  http2.setRequestHeader("Content-Type", "application/json");
  http2.send();
  http2.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status == 200) {
        getUserDetails();
      }
    }
  };
}

/**
 * update the task
 * @param  index index of the task
 */
function taskUpdate(index) {
  const description = document.getElementById("descriptionUpdate").value;
  const assigned_to = document.getElementById("assignedUpdate").value;

  const status = document.getElementById("statusUpdate").value;

  const title = document.getElementById("titleUpdate").value;

  const duration1 = document.getElementById("durationUpdate1").value;

 
  var http3 = new XMLHttpRequest();
  http3.open(
    "PUT",
    `http://localhost:9002/api/v1/admin/updatetask/${userdata[index]._id}`
  );
  http3.setRequestHeader("Content-Type", "application/json");
  http3.send(
    JSON.stringify({
      title: title,
      description: description,
      assigned_to: assigned_to,
      status: status,
      duration: duration1,
    })
  );
  http3.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status == 200) {
        getUserDetails();
      }
    }
  };

  event.preventDefault();
}

window.onload = getUserDetails;

/**
 * searching the specific data
 */
function search_sort() {
  document.getElementById("searchInput").addEventListener("input", function () {
    var input, filter, table, tbody, tr, td, i, txtValue;
    input = document.getElementById("searchInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("table1");
    tbody = document.getElementById("adminbody");
    tr = tbody.getElementsByTagName("tr");

    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td");
      for (var j = 0; j < td.length; j++) {
        txtValue = td[j].textContent || td[j].innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
          break; // Break the inner loop to avoid displaying the row multiple times
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  });
}

function sortTable() {
  let table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById("table1");
  switching = true;
  while (switching) {
    switching = false;
    rows = table.rows;
    for (i = 1; i < (rows.length - 1); i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("td")[3];
      y = rows[i + 1].getElementsByTagName("td")[3];
      if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
} 