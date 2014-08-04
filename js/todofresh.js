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
		addTask(createTask());
	}
}

function createTask (){
	var newItem = {};
		newItem.name = task.value;
		newItem.dueDate = dueDates.options[dueDates.selectedIndex].value;
		newItem.dueIndex = dueDates.selectedIndex;
		newItem.priority = document.querySelector('input[name = "priority"]:checked').value;
		newItem.status = "pending";
	return newItem;
}

function addTask(newItem){
	taskListBig.push(newItem);
	updateLocal();
	addNewItem(newItem);
}

function updateLocal(){
	db.setItem("yourStoredTasks", JSON.stringify(taskListBig));
}

function addNewItem(thisTask){
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
	var thisNewDeleteButton =  document.createElement("button");
	thisNewDeleteButton.innerHTML = "delete";
	thisNewDeleteButton.className = "delete";
	thisNewDeleteButton.addEventListener("click", deleteItem, false);
	thisNewListItem.appendChild(thisNewDeleteButton);
	var thisNewCompleteButton =  document.createElement("button");
	thisNewCompleteButton.innerHTML = "Completed?";
	thisNewCompleteButton.className = "completed";
	thisNewCompleteButton.addEventListener("click", completeItem, false);
	thisNewListItem.appendChild(thisNewCompleteButton);
}

function deleteItem (){
	var node = this.parentNode;
	var nodeTitle = node.getElementsByTagName("h3");
	var nodeName = nodeTitle.innerHTML;
	console.log(nodeName);
	
	for (var i=0; i < taskListBig.length; i++) {
		if (taskListBig[i].name === nodeName){
			taskListBig.splice([i], 1);
		}
	}
}

function completeItem(){
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
}

function setItems(){ //this function fills in the list of stored tasks on page load
	for (var i=0; i < taskListBig.length; i++) {
		addNewItem(taskListBig[i]);
	}
}

function setStoredInfo(){
	var taskListBigString = db.getItem("yourStoredTasks");
	yourName.value = db.getItem("yourStoredName");

	if (taskListBigString){
	taskListBig = JSON.parse(taskListBigString);
	console.log(taskListBigString);
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