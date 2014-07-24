//Javascript for To-Do List by Audrey Brockhaus

var submit = document.getElementById("submit"),
	task = document.getElementById("task"),
	yourName = document.getElementById("yourName"),
	taskWarning = document.getElementById("taskWarning"),
	dueDates = document.getElementById("date"),
	taskListBig = [],
	deleteAll = document.getElementById("deleteAll"),
	db = window.localStorage; //testing out local storage

function updateButtons(){

	var deleteButton = document.querySelectorAll(".delete"),
		completeButton = document.querySelectorAll(".completed");

	for(i = 0; i < deleteButton.length; i++) {
		var thisButton = deleteButton[i];
		thisButton.onclick = function () {
			var node = this.parentNode,
	  			siblings = node.parentNode.childNodes;

		  	for (i = 0; i < siblings.length; i++) {
		    if (node == siblings[i]) {break;}
		  	}
		  	taskListBig.splice(i, 1);
	  		updateList();
		};
	}

	for(i = 0; i < completeButton.length; i++) {
		var thisButton = completeButton[i];
		thisButton.onclick = function () {
			var node = this.parentNode,
				siblings = node.parentNode.childNodes;
	  	
		  	for (i = 0; i < siblings.length; i++) {//loops through sibs until it finds correct index-better way to do this? 
		    if (node == siblings[i]) {break;}
	  		}
			taskListBig[i].status = "complete";
			taskListBig[i].dueDate = "Complete";
			updateList();
		}
	}
}

function updateList(){
	var output ='<ul>',
		taskListOutput = document.getElementById("taskList");

	taskListBig.sort(function(a,b){return a.dueIndex - b.dueIndex;}); //sorts task list by due date

	for (i=0; i < taskListBig.length; i++) {
		output +='<li class="'+ taskListBig[i].priority +' '+ taskListBig[i].status +'">' + taskListBig[i].name + '<span class="due">Due: ' + taskListBig[i].dueDate + '</span><input type="button" value="Delete" class="delete"><input type="button" value="Completed?" class="completed"></li>';
	}

	output += '</ul>';
	taskListOutput.innerHTML = output;
	updateButtons();
};

function validate() { //activated by add event button

	var taskName = task.value,
		dueDate = dueDates.options[dueDates.selectedIndex].value,
		dueIndex = dueDates.selectedIndex,
		priority = document.querySelector('input[name = "priority"]:checked').value;
	
	db.setItem("yourStoredName", yourName.value); //testing out local storage
	
	task.focus(); 
	
	if (!taskName){
		taskWarning.style.display = "block";
	}

	else {
		taskWarning.style.display ="none";
		var newItem = [];
		newItem.name = taskName;
		newItem.dueDate = dueDate;
		newItem.dueIndex = dueIndex;
		newItem.priority = priority;
		newItem.status = "pending";
		taskListBig.push(newItem);
		updateList();
	}
};


function removeItem(mouseEvent) {
	var node = this.parentNode;
  var siblings = node.parentNode.childNodes;
  for (i = 0; i < siblings.length; i++) {
    if (node == siblings[i]) break;
  }
  taskListBig.splice(i, 1);
  updateList();
};

function bindEvents(){
	submit.onclick = function(){
		validate();
	}
	deleteAll.onclick = function(){
		taskListBig.length= 0;
		updateList();
	}
	task.onkeydown = function(event){
		if(event.which == 13 || event.keyCode == 13){
			validate();
			task.value = null;
			return false;
		}
		else{
			return true;
		}
	}
};

function setName(){
	yourName.value = db.getItem("yourStoredName");
};

window.onload= function() {
	bindEvents();
	setName();
};