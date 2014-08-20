//constructor functions
(function() {

  function TaskItem(taskParent, taskName, dueDate, status){
    this.data = {};
    this.data.name = taskName;
    this.data.dueDate = dueDate;
    this.data.status = status;
    this.writeNewTask(taskParent, taskName, dueDate, status);
    this.attachEvents();
    return this;
  }

  TaskItem.prototype.writeNewTask = function(taskParent, taskName, dueDate, status){
    this.taskHeading = document.createElement("h3");
    this.dueDisplay = document.createElement("p");
    this.deleteButton = document.createElement("button");
    this.completeButton = document.createElement("button");
    this.el = document.createElement("li");
    this.taskHeading.innerHTML = taskName;
    this.el.appendChild(this.taskHeading);
    this.dueDisplay.innerHTML = dueDate;
    this.el.appendChild(this.dueDisplay);
    this.deleteButton.classList.add("delete");
    this.deleteButton.innerHTML = "delete";
    this.el.appendChild(this.deleteButton);
    this.completeButton.classList.add("completed");
    this.completeButton.innerHTML = "Completed?";
    this.el.appendChild(this.completeButton);

    if (status != "pending"){
        this.el.classList.add("complete");
    }

    taskParent.el.appendChild(this.el);
  }

  TaskItem.prototype.setOnDeleteCallback = function(callback) {
    this.onDeleteCallback = callback;
  }

  TaskItem.prototype.attachEvents = function() {
    var self = this;
    this.deleteButton.addEventListener("click", function() {
      self.el.remove();
      self.onDeleteCallback();
    });
  }

 window.TaskItem = TaskItem; //I run task item 

})();