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
		addTask(newItem());
	}
}

function createTask (){
	var el = new NewItem();
		el.name = task.value;
		el.dueDate = dueDates.options[dueDates.selectedIndex].value;
		el.dueIndex = dueDates.selectedIndex;
		el.priority = document.querySelector('input[name = "priority"]:checked').value;
		el.status = "pending";
	return el;
}

function NewItem(){
	this.setEvents();
}

function addTask(newItem){
		taskListBig.push(newItem);
		db.setItem("yourStoredTasks", JSON.stringify(taskListBig));
		addNewItem(newItem);
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
	thisNewListItem.appendChild(thisNewDeleteButton);
	var thisNewCompleteButton =  document.createElement("button");
	thisNewCompleteButton.innerHTML = "Completed?";
	thisNewCompleteButton.className = "completed";
	thisNewListItem.appendChild(thisNewCompleteButton);
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
	db.setItem("yourStoredTasks", JSON.stringify(taskListBig));
	db.setItem("yourStoredName", '');
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