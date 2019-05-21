const uri = "/api/art/";
let items = null;

document.addEventListener("DOMContentLoaded", function (event) {
    getArts();
    getUser();
});

function getUser() {
    console.log("Вызов юзера ______");
    let request = new XMLHttpRequest();
    var user;
    var user_name;

    console.log("Открывается запрос");
    request.open("POST", "/api/Account/isAuthenticated", true);
    request.onload = function () {
        console.log(JSON.parse(request.responseText));
        console.log("Заходим в ответ");
        let userHTML = '<a class="nav-link disabled" href="#">';
        user = JSON.parse(request.responseText);
        console.log(user);
        if (user != -1) {
            console.log("Юзер опознан");
            user_name = user.userName;
            console.log(user_name);
            userHTML += user_name + '</a>';
            userID = user.id;
        }
        else {
            userHTML += 'Гость</a>';;
            console.log("Юзер не опознан");
        }
        document.querySelector("#xuser").innerHTML = userHTML;
    }
    request.send();
}

function getCount(data) {
    const el = document.querySelector("#counter");
    let name = "Количество списков: ";
    if (data > 0) {
        el.innerText = name + data;
    } else {
        el.innerText = "Списков еще нет";
    }
}

function getArts() {
    closeInput();
    let request = new XMLHttpRequest();
    request.open("GET", uri);
    console.log("Запрос на получание данных отправлен");
    request.onload = function () {
        let arts = "";
        let artsHTML = "";
        arts = JSON.parse(request.responseText);
        console.log("Ответ:");
        console.log(JSON.parse(request.responseText));
        if (typeof arts !== "undefined") {
            //getCount(lists.length);
            if (arts.length > 0) {
                if (arts) {
                    var i;
                    for (i in arts) {
                        artsHTML += '<div class="row">';
                        artsHTML += '<div class="col-sm-2">';
                        artsHTML += '</div>';

                        artsHTML += '<div class="col-sm-1 text-center div-bord" align="center" >';

                        if (arts[i].type == "Анимация") { 
                            artsHTML += '<br><img src="images/anim-icon.png" align="center" width="100" height="100" alt="Письма мастера дзен">';
                            artsHTML += 'Анимация';                         
                        }

                        if (arts[i].type == "Книга") {
                            artsHTML += '<br><img src="images/books-icon.png" align="center" width="100" height="100" alt="Письма мастера дзен">';
                            artsHTML += 'Книга';
                        }

                        if (arts[i].type == "Фильм") {
                            artsHTML += '<br><img src="images/film-icon.png" align="center" width="100" height="100" alt="Письма мастера дзен">';
                            artsHTML += 'Фильм';
                        }

                        if (arts[i].type == "Сериал") {
                            artsHTML += '<br><img src="images/series-icon.png" align="center" width="100" height="100" alt="Письма мастера дзен">';
                            artsHTML += 'Сериал';
                        }

                        artsHTML += '<button class="btn btn-secondary btn-sm btn-block" onclick="editArt(' + arts[i].artId + ')">Изменить</button>';
                        //artsHTML += '<br>';
                        artsHTML += '<button class="btn btn-secondary btn-sm btn-block" onclick="deleteArt(' + arts[i].artId + ')"> Удалить </button><br>';
                        artsHTML += '</div>';

                        artsHTML += '<div class="col-sm-7 div-bord">';
                        artsHTML += '<h3>' + arts[i].title + '</h3>';
                        artsHTML += '<h3>Описание:</h3>';
                        artsHTML += '<h5>' + arts[i].descr + '</h5>';
                        artsHTML += '<br>';
                        artsHTML += '</div>';

                        artsHTML += '<div class="col-sm-2">';
                        artsHTML += '</div>';
                        artsHTML += '</div>';

                        artsHTML += '<br>';
                        //artsHTML += '<br>';
            
                            }
                        }
                    }
                }
            items = arts;
            document.querySelector("#artsDiv").innerHTML = artsHTML;
        };
    request.send();
}

function createArt() {
    let titleText = "";
    let typeText = "";
    let descrText = "";
    titleText = document.querySelector("#createDivT").value;
    typeText = document.querySelector("#createDivType").value;
    descrText = document.querySelector("#createDivD").value;
    var request = new XMLHttpRequest();
    request.open("POST", uri);
    request.onload = function () {
        console.log(request.status);
        document.getElementById("msg").innerHTML = "";
        var msg = "";
        if (request.status === 401) {
            msg = "У вас не хватает прав для добавления";
            console.log(msg);
        } else if (request.status === 201) {
            console.log("201");
            msg = "Запись добавляется";
            document.querySelector("#actionMsg").innerHTML = msg;
            document.getElementById("msg").innerHTML = "";          
            getArts();
            document.querySelector("#createDivT").value = "";
            document.querySelector("#createDivTy").value = "";
            document.querySelector("#createDivType").value = "";
            document.querySelector("#createDivD").value = "";
        } else {
            msg = "Неизвестная ошибка";
            console.log(msg);
        }
        document.querySelector("#actionMsg").innerHTML = msg;
        
    };
    request.setRequestHeader("Accepts", "application/json;charset=UTF-8");
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.send(JSON.stringify({ title: titleText, type: typeText, descr: descrText }));
}

function editArt(id) {
    let elm = document.querySelector("#editDiv");
    document.getElementById("msg").innerHTML = "";
    var mydiv = document.getElementById('formError');
    while (mydiv.firstChild) {
        mydiv.removeChild(mydiv.firstChild);
    }
    elm.style.display = "block";
    if (items) {
        let i;
        for (i in items) {
            if (id === items[i].artId) {
                document.querySelector("#edit-id").value = items[i].artId;
                document.querySelector("#edit-title").value = items[i].title;
                document.querySelector("#edit-type").value = items[i].type;
                document.querySelector("#edit-descr").value = items[i].descr;
            }
        }
    }
}

function udateArt() {
    const art = {
        artid: document.querySelector("#edit-id").value,
        title: document.querySelector("#edit-title").value,
        type: document.querySelector("#edit-type").value,
        descr: document.querySelector("#edit-descr").value
    };
    var request = new XMLHttpRequest();
    request.open("PUT", uri + art.artid);
    request.onload = function () {
        //document.getElementById("msg").innerHTML = "";
        document.getElementById("msg").innerHTML = "";
        var msg = "";
        if (request.status === 401) {
            msg = "У вас не хватает прав для редактирования";
            console.log(msg);
        } else if (request.status === 204) {
            msg = "Запись редактируется";
            console.log(msg);
            getArts();
            closeInput();
            elm.style.display = "none";
            getArts();
        } else {
            msg = "Неизвестная ошибка";
            console.log(msg);
        }
        document.querySelector("#actionMsg").innerHTML = msg;
       
    };
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.send(JSON.stringify(art));
}

function deleteArt(id) {
    let request = new XMLHttpRequest();
    console.log(id);
    request.open("DELETE", uri + id, false);
    request.onload = function () {
        // Очистка контейнера вывода сообщений
        document.getElementById("msg").innerText = "";
        var msg = "";
        if (request.status === 401) {
            msg = "У вас не хватает прав для удаления";
            console.log(msg);
        } else if (request.status === 204) {
            msg = "Запись удалена";
            console.log(msg);
            getArts();
        } else {
            msg = "Неизвестная ошибка";
            console.log(msg);
        }
        document.querySelector("#actionMsg").innerHTML = msg;

    };
    request.send();
}

function closeInput() {
    let elm = document.querySelector("#editDiv");
    elm.style.display = "none";
}