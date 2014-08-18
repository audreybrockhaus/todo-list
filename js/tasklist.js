//creates task list
(function() {

  function TaskList() {
    var submit = document.getElementById("submit"),
    task = document.getElementById("task");
    this.db = window.localStorage;
    this.taskList = [];
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
    var taskListBigString = this.db.getItem("yourStoredTasks");
    var taskParent = this;
    if (taskListBigString) {
      this.taskList = JSON.parse(taskListBigString);
      for (var i=0; i < this.taskList.length; i++) {
        var name = this.taskList[i].name;
        var dueDate = this.taskList[i].dueDate;
        var newItem = new TaskItem(taskParent, name, dueDate);
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
    dueDate = dueDates.options[dueDates.selectedIndex].value;
    this.save(new TaskItem(taskParent, taskName, dueDate));
  };

  TaskList.prototype.attachEvents = function(){
    self = this; //thank you Naomi I did need this, never would have found it!
    submit.addEventListener("click", function(){self.validate(); task.focus(); }, false);
    task.onkeydown = function(event){
      if(event.which == 13 || event.keyCode == 13){
        self.validate();
        task.value = null;
        task.focus(); 
        self.setTaskEvents();
        return false;
      }
      else{
        return true;
      }
    }
  };

  TaskList.prototype.setTaskEvents = function() {
    var self = this;
    console.dir(this.taskList);
    // this.taskList.forEach(function(task) {
    //   box.setClickCallback(function() {
    //     box.toggle();
    //     self.updateList(); //doesn' exist yet
    //   });
    // });
  };

  TaskList.prototype.save = function(newTaskObject) {
    this.taskList.push(newTaskObject);
    this.db.setItem("yourStoredTasks", JSON.stringify(this.taskList));
  };

  window.TaskList = TaskList; //I run task list 

})();
