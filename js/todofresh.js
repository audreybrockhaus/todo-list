//Javascript for To-Do List by Audrey Brockhaus

(function() {

var submit = document.getElementById("submit"),
	task = document.getElementById("task"),
	yourName = document.getElementById("yourName"),
	taskWarning = document.getElementById("taskWarning"),
	dueDates = document.getElementById("date"),
	taskList = document.getElementById("taskList"),
	taskListBig = [],
	jString = JSON.stringify(taskListBig),
	deleteAll = document.getElementById("deleteAll"),
	db = window.localStorage;


function createTask (){
	var newItem = {};
		newItem.name = task.value;
		newItem.dueDate = dueDates.options[dueDates.selectedIndex].value;
		newItem.dueIndex = dueDates.selectedIndex;
		newItem.priority = document.querySelector('input[name = "priority"]:checked').value;
		newItem.status = "pending";
		taskListBig.push(newItem);
		console.dir(taskListBig);
		db.setItem("yourStoredTasks", jString);
		addNewItem();
}

function addNewItem(newItem){
	var thisNewItem = taskListBig[taskListBig.length-1]; //selects the newest element in the array
	var thisNewListItem = document.createElement("li");
	var thisNewListItemText = document.createTextNode
	thisNewListItem.appendChild = document.createElement("button");
	taskList.appendChild(thisNewListItem);
}

function setStoredInfo(){
	var taskListBigString = db.getItem("yourStoredTasks");
	console.log(taskListBigString);
	yourName.value = db.getItem("yourStoredName");

	if (taskListBigString){
	taskListBig = JSON.parse(taskListBigString);
	console.dir(taskListBig);
	}
}

window.onload= function() {
	setStoredInfo();
	submit.onclick = function(){
		createTask();
	}
}

})();