//construct tasks
(function() {

  function TaskItem(taskParent, taskName, priority, dueDate, status){
    this.data = {};
    this.data.name = taskName;
    this.data.priority = priority;
    this.data.dueDate = dueDate;
    this.data.status = status;
    this.writeNewTask(taskParent, taskName, priority, dueDate, status);
    this.attachEvents();
    return this;
  }

  TaskItem.prototype.writeNewTask = function(taskParent, taskName, priority, dueDate, status){
    var taskHeading = document.createElement("h3"),
    dueDisplay = document.createElement("p");
    this.deleteButton = document.createElement("button");
    this.completeButton = document.createElement("button");
    this.el = document.createElement("li");
    this.el.classList.add(priority);
    this.el.classList.add(status);
    taskHeading.innerHTML = taskName;
    this.el.appendChild(taskHeading);
    dueDisplay.innerHTML = dueDate;
    this.el.appendChild(dueDisplay);
    this.deleteButton.classList.add("delete");
    this.deleteButton.innerHTML = "delete";
    this.el.appendChild(this.deleteButton);
    this.completeButton.classList.add("completed");
    this.completeButton.innerHTML = "Completed?";
    this.el.appendChild(this.completeButton);
    console.log(priority);
    taskParent.el.appendChild(this.el);
  };

  TaskItem.prototype.setOnDeleteCallback = function(callback) {
    this.onDeleteCallback = callback;
  };

  TaskItem.prototype.setOnCompleteCallback = function(callback) {
    this.onCompleteCallback = callback;
  };

  TaskItem.prototype.attachEvents = function() {
    var self = this;
    self.deleteButton.addEventListener("click", function() {
      self.el.remove();
      self.onDeleteCallback();
    });

    self.completeButton.addEventListener("click", function() {
      self.el.classList.add("complete");
      self.onCompleteCallback();
    });
  };

 window.TaskItem = TaskItem; 

})();