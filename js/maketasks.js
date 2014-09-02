//construct tasks
(function() {

  function TaskItem(taskName, priority, dueIndex, dueDate, status){
    this.data = {};
    this.data.name = taskName;
    this.data.priority = priority;
    this.data.dueIndex = Number(dueIndex);
    this.data.dueDate = dueDate;
    this.data.status = status;
    this.writeNewTask(taskName, priority, dueDate, status);
    this.attachEvents();
    return this;
  }

  TaskItem.prototype.writeNewTask = function(taskName, priority, dueDate, status){
    var taskHeading = document.createElement("h3"),
    dueDisplay = document.createElement("p");
    this.deleteButton = document.createElement("button");
    this.completeButton = document.createElement("button");
    this.pendingButton = document.createElement("button");
    this.el = document.createElement("li");
    this.el.classList.add(priority);
    taskHeading.innerHTML = taskName;
    this.el.appendChild(taskHeading);
    dueDisplay.innerHTML = dueDate;
    this.el.appendChild(dueDisplay);
    this.deleteButton.classList.add("delete");
    this.deleteButton.innerHTML = "delete";
    this.el.appendChild(this.deleteButton);
    this.completeButton.classList.add("completed");
    this.completeButton.innerHTML = "Complete this task";
    this.el.appendChild(this.completeButton);
    this.pendingButton.classList.add("pendingButton");
    this.pendingButton.innerHTML = "Start task again";
    this.el.appendChild(this.pendingButton);
  };

  TaskItem.prototype.setOnDeleteCallback = function(callback) {
    this.onDeleteCallback = callback;
  };

  TaskItem.prototype.setOnCompleteCallback = function(callback) {
    this.onCompleteCallback = callback;
  };

  TaskItem.prototype.setOnPendingCallback = function(callback) {
    this.onPendingCallback = callback;
  };

  TaskItem.prototype.attachEvents = function() {
    var self = this;
    self.deleteButton.addEventListener("click", function() {
      self.el.remove();
      self.onDeleteCallback();
    });

    self.completeButton.addEventListener("click", function() {
      self.onCompleteCallback();
    });

    self.pendingButton.addEventListener("click", function() {
      self.onPendingCallback();
    });
  };

 window.TaskItem = TaskItem; 

})();