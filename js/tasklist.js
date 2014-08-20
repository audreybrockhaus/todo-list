//creates task list
(function(){

  function TaskList() {
    var submit = document.getElementById("submit"),
    task = document.getElementById("task");
    this.db = window.localStorage;
    this.taskList =[]; 
    this.taskData =[]; //separate from list because JSON won't stringify dom elements
    this.createList();
    this.loadSavedTasks();
    this.attachEvents();
  }

  TaskList.prototype.createList = function(){
    this.el = document.createElement("ul");
    this.el.setAttribute("id", "taskUl");
    document.body.appendChild(this.el);
  };

  TaskList.prototype.loadSavedTasks = function() {
    var taskDataString = this.db.getItem("yourStoredTasks"),
    taskParent = this;
    if (taskDataString) {
      this.taskData = JSON.parse(taskDataString);
      for (var i=0; i < this.taskData.length; i++) {
        var name = this.taskData[i].name;
        var dueDate = this.taskData[i].dueDate;
        var status = this.taskData[i].status;
        var newTaskItem = new TaskItem(taskParent, name, dueDate, status);
        taskParent.activate(newTaskItem);
        this.setTaskObjectCallbacks(newTaskItem);

      }
    }
  };

  TaskList.prototype.validate = function() {
    self = this; 
    if (!task.value){
      taskWarning.style.display = "block";
    }
    else{
      taskWarning.style.display = "none";
      self.requestNewTask();
    }
  };

  TaskList.prototype.requestNewTask= function(){
    var taskParent = this,
    task = document.getElementById("task"),
    dueDates = document.getElementById("date"),
    taskName = document.getElementById("task").value,
    dueDate = dueDates.options[dueDates.selectedIndex].value,
    status = "pending";

    var newTaskItem = new TaskItem(taskParent, taskName, dueDate, status);
    this.taskList.push(newTaskItem);
    this.taskData.push(newTaskItem.data);
    this.save(newTaskItem);
    this.setTaskObjectCallbacks(newTaskItem);
  };

  TaskList.prototype.attachEvents = function(){
    var self = this; //thank you Naomi I did need this, never would have found it!
    submit.addEventListener("click", function(){self.validate(); task.focus(); }, false);
    task.onkeydown = function(event){
      if(event.which == 13 || event.keyCode == 13){
        self.validate();
        task.value = null;
        task.focus(); 
        return false;
      }
      else{
        return true;
      }
    }
  };

  TaskList.prototype.setTaskObjectCallbacks = function(newTaskObject) {

    var self = this;
    newTaskObject.setOnDeleteCallback(function() {
      var index = self.taskList.indexOf(newTaskObject);
      self.taskList.splice(index, 1);
      self.save();
    });
  };


  TaskList.prototype.save = function() {
    var dataArray = [];
    this.taskList.forEach(function(taskItem) {
      dataArray.push(taskItem.data);
    });
    this.db.setItem("yourStoredTasks", JSON.stringify(dataArray));
  };

  TaskList.prototype.activate = function(newTaskObject) {
    var self = this;
    this.taskList.push(newTaskObject);
//    newTaskObject.deleteButton.addEventListener("click", this.deleteTask.bind(this, newTaskObject /* , more, items */));
//    newTaskObject.completeButton.addEventListener("click", this.completeTask);
  };

  TaskList.prototype.deleteTask = function(newTaskObject) { //how to update taskList from here? I moved function here from maketasks
    console.log(newTaskObject)
    this.parentNode.remove();
  };

  TaskList.prototype.completeTask = function() {  //how to update taskList from here? I moved function here from maketasks
    this.parentNode.classList.add("complete");
  };

  TaskList.prototype.updateList = function() { //*how to call from inside element so don't need to go through everything?

  };

  window.TaskList = TaskList; //I run task list 

})();
