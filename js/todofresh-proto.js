//Javascript for To-Do List by Audrey Brockhaus

(function() {

var submit = document.getElementById("submit"),
	task = document.getElementById("task"),
	yourName = document.getElementById("yourName"),
	taskWarning = document.getElementById("taskWarning"),
	dueDates = document.getElementById("date"),
	taskList = document.getElementById("taskList"),
	taskListBig = [],
	deleteAll = document.getElementById("deleteAll"),
	db = window.localStorage;

function validate(){
	if (!task.value){
		taskWarning.style.display = "block";
	}
	else{
		taskWarning.style.display = "none";
		var newItem = new Task;
	}
}

function Task(){ //constructor function for new task objects
	this.name = task.value;
	this.dueDate = dueDates.options[dueDates.selectedIndex].value;
	this.dueIndex = dueDates.selectedIndex;
	this.priority = document.querySelector('input[name = "priority"]:checked').value;
	this.status = "pending";
	this.addMe(this);
}

function DeleteButton(){ //constructor function for delete buttons
	var thisNewDeleteButton =  document.createElement("button");
	thisNewDeleteButton.innerHTML = "delete";
	thisNewDeleteButton.className = "delete";
	//thisNewDeleteButton.deleteMe();//this is returning undefined & messing everything up, why? 
	return thisNewDeleteButton;
}

DeleteButton.prototype.deleteMe = function() { 
    this.element.addEventListener("click", function() {
    	console.log("delete me");
        var node = this.parentNode;
		var nodeTitle = node.getElementsByTagName("h3");
		var nodeName = nodeTitle.innerHTML;
		console.log(nodeName);
		
		for (var i=0; i < taskListBig.length; i++) {
			if (taskListBig[i].name === nodeName){
				taskListBig.splice([i], 1);
			}
		}
    });
}

function CompleteButton(){ //constructor function for complete buttons
	var thisNewCompleteButton =  document.createElement("button");
	thisNewCompleteButton.innerHTML = "Completed?";
	thisNewCompleteButton.className = "completed";
	//thisNewCompleteButton.completeMe(); //this is returning undefined & messing everything up, why? 
	return thisNewCompleteButton;
}

CompleteButton.prototype.completeMe = function(){ //I never get called!
	this.element.addEventListener("click", function(){
		console.log("complete me");
		var node = this.parentNode,
			thisDate = node.getElementsByClassName("completed"),
			siblings = node.parentNode.childNodes;
	 	for (var i = 0; i <= siblings.length; i++) {//loops through sibs until it finds correct index-better way to do this? 
			if (node == siblings[i]) {break;}
		}
		taskListBig[i].dueDate = "Complete";
		updateLocal();
		thisDate.innerHTML = "Complete";
		node.className = "complete";
	});
}

Task.prototype.addMe = function(thisTask){ //this is a function each task has because of prototype
	taskListBig.push(this);
	updateLocal();
	var thisNewListItem = document.createElement("li");
	thisNewListItem.className = thisTask.priority;
	taskList.appendChild(thisNewListItem);
	var thisNewListTitle =  document.createElement("h3");
	thisNewListTitle.innerHTML = thisTask.name;
	thisNewListItem.appendChild(thisNewListTitle);
	var thisNewDue =  document.createElement("span");
	thisNewDue.innerHTML = thisTask.dueDate;
	thisNewDue.className = "due";
	thisNewListItem.appendChild(thisNewDue);
	thisNewListItem.appendChild(new DeleteButton);//using function to return complete delete button with function attached (hopefully--function not working yet)
	thisNewListItem.appendChild(new CompleteButton);	
}

function updateLocal(){
	db.setItem("yourStoredTasks", JSON.stringify(taskListBig));
}

function setItems(){ //this function fills in the list of stored tasks on page load
	for (var i=0; i < taskListBig.length; i++) {
		taskListBig[i].addMe; 
	}
}

function setStoredInfo(){
	var taskListBigString = db.getItem("yourStoredTasks");
	yourName.value = db.getItem("yourStoredName");

	if (taskListBigString){
	taskListBig = JSON.parse(taskListBigString);
	setItems();
	}
}

function deleteEverything(){
	taskList.innerHTML = '';
	taskListBig = [];
	updateLocal();
}

function setUp() {
	setStoredInfo();
	deleteAll.addEventListener("click", deleteEverything, false);
	submit.addEventListener("click", function(){validate(); task.focus(); }, false);
	task.onkeydown = function(event){
		if(event.which == 13 || event.keyCode == 13){
			validate();
			task.value = null;
			task.focus(); 
			return false;
		}
		else{
			return true;
		}
	}
}

window.onload = setUp();

})();