
//Javascript for To-Do List by Audrey Brockhaus

(function() {

var submit = document.getElementById("submit"),
  task = document.getElementById("task"),
  yourName = document.getElementById("yourName"),
  taskWarning = document.getElementById("taskWarning"),
  dueDates = document.getElementById("date"),
  taskList = document.getElementById("taskList"),
  taskListBig = [],
  deleteAll = document.getElementById("deleteAll"),
  db = window.localStorage;

function updateLocal(){
  console.log(taskListBig);
  db.setItem("yourStoredTasks", JSON.stringify(taskListBig));
}

function validate(){
  var name = task.value;
  var dueDate = dueDates.options[dueDates.selectedIndex].value;
  var status = "pending";

  if (!task.value){
    taskWarning.style.display = "block";
  }
  else{
    taskWarning.style.display = "none";
    var newItem = new Task(name, dueDate, status);
    taskListBig.push(newItem.data);
    updateLocal();
    console.dir(taskListBig);
  }
}

function setStoredInfo(){
  var taskListBigString = db.getItem("yourStoredTasks");
  yourName.value = db.getItem("yourStoredName");

  if (taskListBigString){
    taskListBig = JSON.parse(taskListBigString);
    for (var i=0; i < taskListBig.length; i++) {
      var name = taskListBig[i].name;
      var dueDate = taskListBig[i].dueDate;
      var status = taskListBig[i].dueDate;
      var newItem = new Task(name, dueDate, status);
    }
  }
}

function setUp() {
  setStoredInfo();
  submit.addEventListener("click", function(){validate(); task.focus(); }, false); 
  task.onkeydown = function(event){
    if(event.which == 13 || event.keyCode == 13){
      validate();
      task.value = null;
      task.focus(); 
      return false;
    }
    else{
      return true;
    }
  }
}

window.onload = setUp();

})();