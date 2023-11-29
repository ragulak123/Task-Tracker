var userdata = [];
window.onload = displayData;
/**
 * get all the tasks
 * call getAdminEditDetails
 */
function displayData() {
  let req = new XMLHttpRequest();
  req.open("GET", "http://localhost:9002/api/v1/admin/gettasks");
  req.send();
  req.onreadystatechange = function () {
    if (req.readyState === 4) {
      if (req.status === 200) {
        userdata = JSON.parse(this.responseText);

        getAdminEditDetails();
       
      }
    }
  };
}

/**
 * displaying all the task details
 */
function getAdminEditDetails() {
  var adminBody = "";
  var adminHead = "";

  adminHead = `<tr>
      <th>Title</th>
      <th>Description</th>
      <th>Assigned_to</th>
      <th>Duration</th>
      <th>Status</th>
      <th>Comments</th>
 
      </tr>`;
  var admin = "";

  document.getElementById("dtaa").innerHTML = admin;
  var adminBody = "";
  for (let i = 0; i < userdata.length; i++) {
    adminBody += `<tr>
           <td>${userdata[i].title}</td>
           <td id="f1">${userdata[i].description}</td>
           <td id="l1">${userdata[i].assigned_to}</td>
           <td id="v1">${userdata[i].duration}</td>
           <td id="m1">${userdata[i].status}</td>
           <td id="c1">${userdata[i].comment}</td>
          
           </tr>`;
  }
  document.getElementById("adminbody").innerHTML = adminBody;
  document.getElementById("adminhead").innerHTML = adminHead;

}

