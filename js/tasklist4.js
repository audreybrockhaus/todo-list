//creates task list
(function(){

  function TaskList() {
    this.dueDates = document.getElementById("date");
    this.listRef = myFirebaseRef.snapshot.val();
    this.createLists();
    this.attachEvents();
    console.dir(this.listRef);
    // this.loadSavedTasks();
  }


  // myFirebaseRef.on("value", function(snapshot) {
  //   var currentList = snapshot.val();
  //   console.log(currentList.length);

  // }, function (errorObject) {
  //   console.log("The read failed: " + errorObject.code);
  // });

  // myFirebaseRef.on("value", function(snapshot) {
  //   var currentList = snapshot.val();
  //   currentList.forEach(function(item) {
  //     var newTaskItem = new TaskItem(this.name, this.priority, this.dueIndex, this.dueDate, this.status, item);
  //     // self.setTaskObjectCallbacks(newTaskItem);
  //     // self.renderList(newTaskItem);
  //   });

  // }, function (errorObject) {
  //   console.log("The read failed: " + errorObject.code);
  // });

  // TaskList.prototype.loadSavedTasks = function(){
  //   var self = this;
  //   console.log(self.listRef);
  //   // self.listRef.forEach(function(item) {
  //   //   var newTaskItem = new TaskItem(this.name, this.priority, this.dueIndex, this.dueDate, this.status, item);
  //   //   self.setTaskObjectCallbacks(newTaskItem);
  //   //   self.renderList(newTaskItem);
  //   // });
  // };

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
    this.setTaskObjectCallbacks(newTaskItem);
    this.renderList(newTaskItem);
    this.listRef.push(newTaskItem.data);
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
    $("#deleteAll").on("click", function(){self.listRef.remove(); self.taskUl.innerHTML = ""; self.completedUl.innerHTML = "";});
  };



  TaskList.prototype.renderList = function(taskItem) {
    var self = this;
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
  };

  TaskList.prototype.sortByDate = function(a, b) {
    var aIndex = a.data.dueIndex;
    var bIndex = b.data.dueIndex;
    return ((aIndex < bIndex) ? -1 : ((aIndex > bIndex) ? 1 : 0));
  };

  TaskList.prototype.setTaskObjectCallbacks = function(newTaskObject) {
    var self = this;

    $( newTaskObject ).on("deleteMe", function() {
      var myID = newTaskObject.item;
      self.listRef.child(myID).remove();
    });

    $( newTaskObject.completeButton ).click(function() {
      $( newTaskObject ).trigger( "completeMe" );
      //something here to update firebase
      self.renderList();
    });

    $( newTaskObject.pendingButton ).click(function() {
      $( newTaskObject ).trigger( "startMe" );
        //something here to update firebase
      self.renderList();
    });
  };

  window.TaskList = TaskList;

})();
