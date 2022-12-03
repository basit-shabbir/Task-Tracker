class Task{
     constructor(name, state) {
        this.name = name;
        this.state = state;
       }
}
var states = ['active', 'inactive', 'done'];
var tabs = ['all'].concat(state);
var currentTab = "all";

var form = document.getElementById("new-task-form")
var input = document.getElementById("new-task-title")
var taskList = document.getElementById("task-list")
var tasks = [];
     
form.onsubmit = function (event) {
    event.preventDefault();
    if(input.value && input.value.length)
        {
            tasks.push(new Task(input.value, "active"));
            input.value = "";
            //
            renderTasks();
        }
    }
    var buttons = [{action: "done", icon: "ok"},
               {action: "active", icon: "plus"},
               {action: "inactive", icon: "minus"},
               {action: "more important", icon: "chevron-up"},
               {action: "less important", icon: "chevron-down"},
               {action: "remove", icon: "trash"}];

const taskFilter =  function(task){
    return (task.state === currentTab || currentTab === "all") 
} 



const taskRender =  function(task) {
    var div1 = document.createElement("div");
    div1.className = "row";

    var div2 = document.createElement("div");
    div2.innerHTML = '<a class="list-group-item" href="#">' + task.name + "</a>";
    div2.className = "col-xs-6 col-sm-9 col-md-10";

    var div3 = document.createElement("div");   
    div3.className = "col-xs-6 col-sm-3 col-md-2 btn-group text-right";

    buttons.forEach(function (button) {
        var btn = document.createElement("button");
       btn.innerHTML = '<i class="glyphicon glyphicon-' + button.icon + '"></i>';
        btn.className = "btn btn-default btn-xs"; 
        div3.appendChild(btn);

        if (task.state === button.action) {
            btn.disabled = true;
        }
        if (button.action === "remove") {
            btn.title = "Remove";
            btn.onclick = function () {
                if(confirm("Are you sure you want to delete the item titled " +task.name))
                {
                    tasks.splice(tasks.indexOf(task), 1);
                    renderTasks();
                }
            }
        }
                else{
                    btn.title = "Mark as " + button.action;
                    btn.onclick = function () {
                        var currentIndex = tasks.indexOf(task);
                        if(button.action == "more important", currentIndex > 0) {
                            swap(currentIndex, currentIndex-1);
                        }
                        else if(button.action == "less important" && currentIndex<tasks.length-1) {
                            swap(currentIndex, currentIndex+1);
                        }
                        else{
                            task.state = button.action;
                        }
                        renderTasks();
                    }
                }
            });
            div1.append(div2);
            div1.append(div3);
            taskList.append(div1);
            
}
function renderTasks() {
    taskList.innerHTML = "";
    countTabItems();
    tasks
    .filter(taskFilter)
    .forEach(taskRender);
    tasks = JSON.parse(localStorage.getItem("tasks"));

}   
renderTasks();

function countTabItems(){
    var myTabItems = document.getElementsByClassName("task-tab");
	var allActiveTabItems = 0;
	var allInActiveTabItems = 0;
	var allDoneTabItems = 0;

	for (var i = 0; i < tasks.length; i++) {
		switch (tasks[i].state) {
			case "active":
				allActiveTabItems++;
				break;
			case "inactive":
				allInActiveTabItems++;
				break;
			case "done":
				allDoneTabItems++;
				break;
		}
	}

	for (var i = 0; i < myTabItems.length; i++) {
		var tabItemName = myTabItems[i].getAttribute("data-tab-name");
		if (tabItemName === "all") {
			myTabItems[i].getElementsByClassName("badge")[0].innerHTML =
				tasks.length;
		} else if (tabItemName === "active") {
			myTabItems[i].getElementsByClassName("badge")[0].innerHTML =
				allActiveTabItems;
		} else if (tabItemName === "inactive") {
			myTabItems[i].getElementsByClassName("badge")[0].innerHTML =
				allInActiveTabItems;
		} else {
			myTabItems[i].getElementsByClassName("badge")[0].innerHTML =
				allDoneTabItems;
		}
	}
}
function swap(index1, index2){
    var next = tasks[index2];
	var previous = tasks[index1];

	tasks[index1] = next;
	tasks[index2] = previous;
    renderTasks();
}
function selectTab(element)
{
    var tabName = element.attributes["data-tab-name"].value;
    currentTab = tabName;
    var taskTabs = document.getElementById("task-tab");
    for(var i = 0; i<taskTabs.length; i++)
    {
        taskTabs[i].classList.remove("active");
    }
    element.classList.add("active");
    renderTasks();
}