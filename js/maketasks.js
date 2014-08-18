//constructor functions
(function() {

  function TaskItem(taskParent, taskName, dueDate){
    this.data = {};
    this.data.name = taskName;
    this.data.dueDate = dueDate;
    this.writeNewTask(taskParent, taskName, dueDate);
    this.setButtons();
    return this.data;
  }

  TaskItem.prototype.writeNewTask = function(taskParent, taskName, dueDate){
    this.deleteButton = document.createElement("button");
    this.completeButton = document.createElement("button");
    this.el = document.createElement("li");
    this.el.innerHTML = taskName;
    this.deleteButton.classList.add("delete");
    this.deleteButton.innerHTML = "delete";
    this.el.appendChild(this.deleteButton);
    this.completeButton.classList.add("completed");
    this.completeButton.innerHTML = "Completed?";
    this.el.appendChild(this.completeButton);
    taskParent.el.appendChild(this.el);
  }

  TaskItem.prototype.setButtons = function() {
    this.deleteButton.addEventListener("click", deleteMe);
    this.completeButton.addEventListener("click", completeMe);
  };

  function deleteMe(){
    this.parentNode.remove();
  }

  function completeMe(){
    this.parentNode.classList.add("complete");
  }

 window.TaskItem = TaskItem; //I run task item 

})();