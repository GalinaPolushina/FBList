const uri = "/api/ulists/";
let items = null;

document.addEventListener("DOMContentLoaded", function (event) {
    getLists();
});

function getCount(data) {
    const el = document.querySelector("#counter");
    let name = "Количество списков: ";
    if (data > 0) {
        el.innerText = name + data;
    } else {
        el.innerText = "Списков еще нет";
    }
}

function getLists() {
    closeInput();
    let request = new XMLHttpRequest();
    request.open("GET", uri);
    request.onload = function () {
        let lists = "";
        let listsHTML = "";
        lists = JSON.parse(request.responseText);

        if (typeof lists !== "undefined") {
            //getCount(lists.length);
            if (lists.length > 0) {
                if (lists) {
                    var i;
                    for (i in lists) {
                        listsHTML += '<p> Список ' + lists[i].uListId + ' : ' + lists[i].url + '<br>';                        
                        listsHTML += '<button onclick="editList(' + lists[i].uListId + ')">Изменить</button>';
                        listsHTML += '<button onclick="deleteList(' + lists[i].uListId + ')">Удалить</button><br>';
                        if (typeof lists[i].post !== "undefined" && lists[i].post.length > 0) {
                            let j;
                            for (j in lists[i].post) {
                                if (typeof lists[i].post[j].art !== "undefined" && lists[i].post.length > 0)
                                listsHTML += "Произведение: " + lists[i].post[j].artId + " ";
                                listsHTML += "Статус: " + lists[i].post[j].type + " ";
                                listsHTML += "Оценка: " + lists[i].post[j].rating + "<br>";
                                listsHTML += "Комментарий: " + lists[i].post[j].descr + "</p>";
                            }
                        }
                    }
                }
            }
            items = lists;
            document.querySelector("#listsDiv").innerHTML = listsHTML;
        }
    };
    request.send();
}

function createList() {
    let urlText = "";
    urlText = document.querySelector("#createDiv").value;
    var request = new XMLHttpRequest();
    request.open("POST", uri);
    request.onload = function () {
        getLists();
        document.querySelector("#createDiv").value = "";
    };
    request.setRequestHeader("Accepts", "application/json;charset=UTF-8");
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.send(JSON.stringify({ url: urlText }));
}


function editList(id) {
    let elm = document.querySelector("#editDiv");
    elm.style.display = "block";
    if (items) {
        let i;
        for (i in items) {
            if (id === items[i].uListId) {
                document.querySelector("#edit-id").value = items[i].uListId;
                document.querySelector("#edit-url").value = items[i].url;
            }
        }
    }
}

function udateList() {
    const ulist = {
        ulistid: document.querySelector("#edit-id").value,
        url: document.querySelector("#edit-url").value
    };
    var request = new XMLHttpRequest();
    request.open("PUT", uri + ulist.ulistid);
    request.onload = function () {
        getLists();
        closeInput();
    };
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.send(JSON.stringify(ulist));
}


function deleteList(id) {
    let request = new XMLHttpRequest();
    console.log(id);
    request.open("DELETE", uri + id, false);    
    request.onload = function () {
        getLists();
    };
    request.send();
}

function closeInput() {
    let elm = document.querySelector("#editDiv");
    elm.style.display = "none";
}

