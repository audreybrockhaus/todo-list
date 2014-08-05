
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

Task.prototype.createElement = function(){
  var thisNewListTitle =  document.createElement("h3");
  
  this.element = document.createElement("li");
  thisNewListTitle.innerHTML = this.name;
  this.element.appendChild(thisNewListTitle);
  this.element.appendChild(new DeleteButton); 
  this.element.appendChild(new CompleteButton);
  taskList.appendChild(this.element);
}

DeleteButton.prototype.createElement = function(){
  this.element = document.createElement("button");
  this.element.innerHTML = "delete";
  this.element.setAttribute("class", "delete");
  document.body.appendChild(this.element);
}

DeleteButton.prototype.setEvents = function() {
  this.element.addEventListener("click", function() {
    var node = this.parentNode;
    var nodeTitle = node.getElementsByTagName("h3")[0];
    var nodeName = nodeTitle.innerHTML;
    
    for (var i=0; i < taskListBig.length; i++) {
      if (taskListBig[i].name === nodeName){
        console.log("hello");
        taskListBig.splice([i], 1);
      }
    }

    node.remove();
    updateLocal();
  });
}

CompleteButton.prototype.createElement = function(){
  this.element = document.createElement("button");
  this.element.innerHTML = "complete?";
  this.element.setAttribute("class", "completed");
  document.body.appendChild(this.element);
}

CompleteButton.prototype.setEvents = function() {
  this.element.addEventListener("click", function() {
    var node = this.parentNode;
    var nodeTitle = node.getElementsByTagName("h3")[0];
    var nodeName = nodeTitle.innerHTML;
    node.setAttribute("class", "complete");
    for (var i=0; i < taskListBig.length; i++) {
      if (taskListBig[i].name === nodeName){
        console.log("hello");
        taskListBig[i].status = "complete";
      }
    }
  });
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
    console.dir(taskListBig);
    updateLocal();
  }
}

function createStoredList(){ //this is only called when page loads if there are stored tasks in db
  console.log(taskListBig.length);
  for (var i=0; i < taskListBig.length; i++) {
    console.log("hai");
    this.element = document.createElement("li");
    var thisNewListTitle =  document.createElement("h3");
    thisNewListTitle.innerHTML = taskListBig[i].name;
    this.element.appendChild(thisNewListTitle);
    this.element.appendChild(new DeleteButton); 
    this.element.appendChild(new CompleteButton);
    if (taskListBig[i].status === "complete"){
      this.element.setAttribute("class", "complete");
    };
    taskList.appendChild(this.element);
    console.dir(taskListBig);
  }
}

function setStoredInfo(){
  var taskListBigString = db.getItem("yourStoredTasks");
  yourName.value = db.getItem("yourStoredName");

  if (taskListBigString){
    taskListBig = JSON.parse(taskListBigString);
    createStoredList();
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