//creates task list
(function(){

  function TaskList() {
    var submit = document.getElementById("submit"),
    deleteAll = document.getElementById("deleteAll"),
    task = document.getElementById("task");
    this.dueDates = document.getElementById("date"); //for some reason this returns undefined in other functions without "this" while task is just fine without it
    this.db = window.localStorage;
    this.taskDataString = this.db.getItem("yourStoredTasks");
    this.taskList =[];
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
    var taskParent = this;
    if (taskParent.taskDataString) {
      var taskData = JSON.parse(taskParent.taskDataString);
      for (var i=0; i < taskData.length; i++) {
        var name = taskData[i].name;
        var dueDate = taskData[i].dueDate;
        var priority = taskData[i].priority;
        var status = taskData[i].status;
        var newTaskItem = new TaskItem(taskParent, name, priority, dueDate, status);
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
    taskName = task.value,
    dueDate = this.dueDates.options[this.dueDates.selectedIndex].value,
    priority = document.querySelector('input[name = "priority"]:checked').value,
    status = "pending";
    var newTaskItem = new TaskItem(taskParent, taskName, priority, dueDate, status);
    taskParent.activate(newTaskItem);
    this.save(newTaskItem);
    this.setTaskObjectCallbacks(newTaskItem);
  };

  TaskList.prototype.attachEvents = function(){
    self = this; 
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
    };
    deleteAll.addEventListener("click", function(){self.db.setItem("yourStoredTasks", []); self.el.innerHTML = "";}, false);
  };

  TaskList.prototype.save = function() {
    var dataArray = [];
    this.taskList.forEach(function(taskItem) {
      dataArray.push(taskItem.data);
    });
    this.db.setItem("yourStoredTasks", JSON.stringify(dataArray));
  };

  TaskList.prototype.activate = function(newTaskObject) {
    this.taskList.push(newTaskObject);
  };

  TaskList.prototype.setTaskObjectCallbacks = function(newTaskObject) {
    var self = this;
    newTaskObject.setOnDeleteCallback(function() {
      var index = self.taskList.indexOf(newTaskObject);
      self.taskList.splice(index, 1);
      self.save();
    });

    newTaskObject.setOnCompleteCallback(function() {
      var index = self.taskList.indexOf(newTaskObject);
      self.taskList[index].data.status = "complete";
      self.save();
    });
  };

  window.TaskList = TaskList;

})();
