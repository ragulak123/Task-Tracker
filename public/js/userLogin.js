window.onload = displayUserData;
var userData = " ";
var tablenav;


/**
 * get all the tasks
 * call taskDisplay
 */
function displayUserData() {
  names = localStorage.getItem("Name");
  
  document.getElementById("demo").innerHTML = "Welcome" + " " + names;
  tablenav = `  <input type="text" placeholder=" Search task" name="search" id="searching">
<button type="button" onclick="searchform()" id="sub" > <i class="fa fa-search" style="font-size: 40px;">
</i></button> `;
  document.getElementById("bar").innerHTML = tablenav;
  let req = new XMLHttpRequest();
  req.open("GET", "http://localhost:9002/api/v1/admin/gettasks");
  req.send();
  req.onreadystatechange = function () {
    if (req.readyState === 4) {
      if (req.status === 200) {
        userData = JSON.parse(this.responseText);
        function alerting() {
          for (let s in userData) {
            if (userData[s].notification == 1) {
              alert("Admin Assigned you a new task");
              var xhr3 = new XMLHttpRequest();
              xhr3.open(
                "PUT",
                "http://localhost:9002/api/v1/admin/updatetask/" +
                  userData[s]._id,
                true
              );
              xhr3.setRequestHeader("content-type", "application/json");
              xhr3.send(JSON.stringify({ notification: 0 }));
              xhr3.onreadystatechange = function () {
                if (xhr3.readyState == 4) {
                  if (xhr3.status == 200) {
                  }
                }
              };
            }
          }
        }
        setTimeout(alerting, 1000);
        taskDisplay();
      }
    }
  };
}

/**
 * displaying all the task details
 */
function taskDisplay() {
  var datatable1 = " ";

  var h1 = `<tr><th>Task Name</th>
    <th>Description</th>
    <th>Duration</th>
    <th>Status</th>
    <th>Assigned Date</th>
    <th>Update status</th>
    <th>Add comments</th></tr>`;
  for (let i in userData) {
    if (userData[i].assigned_to == names) {
      datatable1 += `<tr><td>
          
         ${userData[i].title}</td>
            <td>${userData[i].description}</td>
            <td>${userData[i].duration}</td>
           <td>${userData[i].status}</td>
           <td>${userData[i].assignedDate}</td>
           <td> <button type="submit" onclick="updateStaus('${userData[i]._id}')" id="submit">Update</button></td>
           <td> <input type="text" id="comments" name="fname"><button type="submit" onclick="comment('${userData[i]._id}')" id="comment"><i class="fa fa-plus" aria-hidden="true"></i></td>
          </tr>
          `;
    }
  }

  document.getElementById("userTable").innerHTML = h1 + datatable1;
  document.getElementById("top").style.display = "block";
  document.getElementById("cardData1").style.display = "none";
}
var updateId = " ";
var data1 = " ";
/**
 * update status form
 * @param updateId specific userId
 */
function updateStaus(updateId) {
  data1 = ` <form action="#">
    <label for="cars" id="lists">Choose a Task:</label>
    <select name="task" id="menu">
    <option class="l1" value="Completed">Completed</option>
    <option class="l1" value="Pending">Pending</option>
    <option class="l1" value="In-progress">In-progress</option>
    <option class="l1" value="Not Started">Not started</option>
    </select>
    <br>
    <br>
   <button type="button" onclick="statusUpdate('${updateId}')" id="submit">Update</button>
   <button type="button" onclick="closingStatus()" id="submit" >Close</button>
   </form>`;

  document.getElementById("myForm").innerHTML = data1;
  document.getElementById("myForm").style.display = "block";
  document.getElementById("myForm").reset();
}
function closingStatus() {
  document.getElementById("myForm").style.display = "none";
}

/**
 * update user status
 * @param updateId Specific userId
 */
function statusUpdate(updateId) {
  var taskdata = document.getElementById("menu").value;

  var req2 = new XMLHttpRequest();
  req2.open("PUT", `http://localhost:9002/api/v1/admin/updatetask/${updateId}`, true);
  req2.setRequestHeader("Content-type", "application/json");
  req2.send(
    JSON.stringify({
      status: taskdata,
    })
  );
  req2.onreadystatechange = function () {
    if (req2.readyState == 4) {
      if (req2.status == 200) {
        alert("Updated successfully");
        window.location.reload();
      }
    }
  };
}
/**
 * searching specific data
 */
function searchform() {
  var g = document.getElementById("searching").value;

  const a = new XMLHttpRequest();
  const url = "http://localhost:9002/api/v1/admin/taskFind/" + g;
  a.open("GET", url, true);
  a.setRequestHeader("Content-Type", "application/json");
  a.send();
  a.onreadystatechange = function () {
    if (a.readyState == 4) {
      if (a.status == 200) {
        var task1 = "";
        var result = JSON.parse(a.responseText);

        for (let i in result) {
          if (result[i].assigned_to == names) {
            task1 += `
         
            <article>
            
            <div class="article-body">
            
              <span>TASK NAME: ${result[i].title}</span>
              <span>
              <br>
               DESCRIPTION :  ${result[i].description}
              </span>
              <br>
              <span>STATUS :  ${result[i].status}</span>
              
            </div>
          </div>
        </article>
          `;
          }
        }
        document.getElementById("cardData").innerHTML = task1;
        document.getElementById("userTable").style.display = "none";
      }
    }
  };
  document.getElementById("rows").style.display = "block";
}


/**
 * adding user comments
 * @param updateId specific userId
 */

function comment(updateId) {
  var com = document.getElementById("comments").value;

  var req3 = new XMLHttpRequest();
  req3.open(
    "PUT",
    `http://localhost:9002/api/v1/admin/updatetask/${updateId}`,
    true
  );
  req3.setRequestHeader("Content-type", "application/json");
  req3.send(
    JSON.stringify({
      comment: com,
    })
  );
  req3.onreadystatechange = function () {
    if (req3.readyState == 4) {
      if (req3.status == 200) {
        alert("Comment Add Successfully....");
        window.location.reload();
      }
    }
  };
}

