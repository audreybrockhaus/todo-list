//creates task list
(function(){

  function TaskList() {
    this.dueDates = document.getElementById("date");
    this.db = window.localStorage;
    this.taskDataString = this.db.getItem("yourStoredTasks");
    this.taskList =[];
    this.createLists();
    this.loadSavedTasks();
    this.attachEvents();
  }

  TaskList.prototype.createLists = function(){
    var pendingHeading = document.createElement("h3"),
    completedHeading = document.createElement("h3");

    //pending tasks list
    pendingHeading.innerHTML = "Pending Tasks";
    
    this.taskUl = document.createElement("ul");
    this.taskUl.setAttribute("id", "taskUl");

    this.el = document.createElement("div");
    this.el.setAttribute("id", "pendingDiv");

    this.el.appendChild(pendingHeading);
    this.el.appendChild(this.taskUl);

    document.body.appendChild(this.el);

    //completed tasks list
    completedHeading.innerHTML = "Completed Tasks";
    
    this.completedUl = document.createElement("ul");
    this.completedUl.setAttribute("id", "completedUl");

    this.completedList = document.createElement("div");
    this.completedList.setAttribute("id", "completedDiv");

    this.completedList.appendChild(completedHeading);
    this.completedList.appendChild(this.completedUl);

    document.body.appendChild(this.completedList);
  };

  TaskList.prototype.loadSavedTasks = function() {
    var self = this;
    if (self.taskDataString) {
      var taskData = JSON.parse(self.taskDataString);
      for (var i=0; i < taskData.length; i++) {
        var name = taskData[i].name;
        var dueIndex = taskData[i].dueIndex;
        var dueDate = taskData[i].dueDate;
        var priority = taskData[i].priority;
        var status = taskData[i].status;
        var newTaskItem = new TaskItem(name, priority, dueIndex, dueDate, status);
        this.activate(newTaskItem);
        this.setTaskObjectCallbacks(newTaskItem);
        this.renderList();
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
    var taskName = task.value,
    dueIndex = this.dueDates.selectedIndex,
    dueDate = this.dueDates.options[this.dueDates.selectedIndex].value,
    priority = document.querySelector('input[name = "priority"]:checked').value,
    status = "pending";
    var newTaskItem = new TaskItem(taskName, priority, dueIndex, dueDate, status);
    this.activate(newTaskItem);
    this.save(newTaskItem);
    this.setTaskObjectCallbacks(newTaskItem);
    this.renderList();
  };

  TaskList.prototype.attachEvents = function(){
    self = this; 
    $("#submit").on("click", function(){self.validate(); task.focus(); });
    $("#task").on("keydown", function(event){
      if(event.which == 13 || event.keyCode == 13){
        self.validate();
        task.value = null;
        task.focus(); 
        return false;
      }
      else{
        return true;
      }
    });
    $("#deleteAll").on("click", function(){self.db.setItem("yourStoredTasks", []); self.taskUl.innerHTML = ""; self.completedUl.innerHTML = "";});
  };

  TaskList.prototype.save = function() {
    var dataArray = [];
    this.taskList.forEach(function(taskItem) {
      dataArray.push(taskItem.data);
    });
    this.db.setItem("yourStoredTasks", JSON.stringify(dataArray));
  };

  TaskList.prototype.renderList = function() {
    var self = this;
    this.taskList.sort(this.sortByDate);
    self.taskList.forEach(function(taskItem) {
      if(taskItem.data.status == "pending"){
        taskItem.el.classList.remove("complete");
        taskItem.el.classList.add("pending");
        self.taskUl.appendChild(taskItem.el);
      }
      else{
        taskItem.el.classList.remove("pending");
        taskItem.el.classList.add("complete");
        self.completedUl.appendChild(taskItem.el);
      }
    });
  };

  TaskList.prototype.sortByDate = function(a, b) {
    var aIndex = a.data.dueIndex;
    var bIndex = b.data.dueIndex;
    return ((aIndex < bIndex) ? -1 : ((aIndex > bIndex) ? 1 : 0));
  };

  TaskList.prototype.activate = function(newTaskObject) {
    this.taskList.push(newTaskObject);
  };

  TaskList.prototype.setTaskObjectCallbacks = function(newTaskObject) {
    var self = this;
    $( newTaskObject.deleteButton ).click(function() {
      $( newTaskObject ).trigger( "deleteMe" );
      var index = self.taskList.indexOf(newTaskObject);
      self.taskList.splice(index, 1);
      self.save();
    });

    $( newTaskObject.completeButton ).click(function() {
      $( newTaskObject ).trigger( "completeMe" );
      self.save();
      self.renderList();
    });

    $( newTaskObject.pendingButton ).click(function() {
      $( newTaskObject ).trigger( "startMe" );
      self.save();
      self.renderList();
    });
  };

  window.TaskList = TaskList;

})();
