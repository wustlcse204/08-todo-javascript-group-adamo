document.addEventListener("DOMContentLoaded", function(event) {
    loadAPI();
    document.getElementById("add-item-button").addEventListener("click", addItem);
})

var xhttp = new XMLHttpRequest();

function loadAPI() {
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var itemsList = JSON.parse(this.responseText);
            for (i=0; i<itemsList.length; i++) {
                createItem(itemsList[i]);
            }
        }
    }

    xhttp.open("GET", "https://cse204.work/todos", true);
    xhttp.setRequestHeader("x-api-key","ea8ab2-ab5cb1-9254fd-35e967-531f0c");
    xhttp.send();
}

function createItem(item){
    var id = item.id;
    var text = item.text;
    var itemTask = document.createElement("li");

    var completeTask = document.createElement("button");
    completeTask.innerText="Mark as Complete";
    completeTask.addEventListener("click", markCompleted);

    var taskTitle = document.createTextNode(text);

    var deleteTask = document.createElement("button");
    deleteTask.innerText = "Delete";
    deleteTask.addEventListener("click", deleteItem);
    
    itemTask.id = id;
    document.getElementById("tasks-list").appendChild(itemTask);
    if (item.completed == true) {
        itemTask.classList.add("completed");
    }

    itemTask.appendChild(taskTitle);
    itemTask.appendChild(completeTask);

    itemTask.appendChild(deleteTask);     
}

function addItem()   
{
    var inputText = {text: document.getElementById("new-task").value};
   
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            createItem(JSON.parse(this.responseText));
        } 
        else if (this.readyState == 4) {
            console.log(this.responseText);
        }
    };
    xhttp.open("POST", "https://cse204.work/todos", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.setRequestHeader("x-api-key", "ea8ab2-ab5cb1-9254fd-35e967-531f0c");
    xhttp.send(JSON.stringify(inputText));
}

function markCompleted() {
    var item = {completed: true}
    var id = this.parentNode.id;

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById(id).style.textDecoration="line-through";
        } 
        else if (this.readyState == 4) {
            console.log(this.responseText);
        }
    };   
    xhttp.open("PUT", "https://cse204.work/todos/"+id, true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.setRequestHeader("x-api-key", "ea8ab2-ab5cb1-9254fd-35e967-531f0c");
    xhttp.send(JSON.stringify(item));
}

function deleteItem() {
    var id = this.parentNode.id;

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById(id).remove();
        } 
        else if (this.readyState == 4) {
            console.log(this.responseText);
        }
    };
    xhttp.open("DELETE", "https://cse204.work/todos/"+id, true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.setRequestHeader("x-api-key", "ea8ab2-ab5cb1-9254fd-35e967-531f0c");
    xhttp.send();
}