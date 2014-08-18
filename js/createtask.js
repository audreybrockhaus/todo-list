function Task(name, dueDate, status){
  this.data = {};
  this.data.name = name;
  this.data.dueDate = dueDate;
  this.data.status = status;
  this.createElement();
}

Task.prototype.createElement = function(){
  var thisNewListTitle =  document.createElement("h3");
  
  this.element = document.createElement("li");
  thisNewListTitle.innerHTML = this.data.name;
  this.element.appendChild(thisNewListTitle);
  this.element.appendChild(new DeleteButton); 
  this.element.appendChild(new CompleteButton);
  taskList.appendChild(this.element);
}

function DeleteButton(){
  this.element = null;
  this.createElement();
  this.setEvents();
  return this.element;
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
    
    // for (var i=0; i < taskListBig.length; i++) { //taskListBig not accessible from here, what to do?
    //     taskListBig.splice([i], 1);
    //   }
    // }

    node.remove();
    //updateLocal(); not accessible from here either
  });
}

function CompleteButton(){
  this.element = null;
  this.createElement();
  this.setEvents();
  return this.element;
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
    // for (var i=0; i < taskListBig.length; i++) { //taskListBig not accessible from here
    //   if (taskListBig[i].name === nodeName){
    //     taskListBig[i].status = "complete";
    //   }
    // }
  });
}