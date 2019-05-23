//Функции, вызываемые при загрузке страницы 
document.addEventListener("DOMContentLoaded", function (event) {
    document.getElementById("loginBtn").addEventListener("click", logIn);
    document.getElementById("logoffBtn").addEventListener("click", logOff);
    getCurrentUser();
    getUser();
});

//Метод, вызываемые при загрузке страницы
function logIn() {
    var email, password = "";
    // Считывание данных с формы
    email = document.getElementById("Email").value;
    password = document.getElementById("Password").value;
    var request = new XMLHttpRequest();
    request.open("POST", "/api/Account/Login");
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.onreadystatechange = function () {
        // Очистка контейнера вывода сообщений
        document.getElementById("msg").innerHTML = "";
        var mydiv = document.getElementById('formError');
        while (mydiv.firstChild) {
            mydiv.removeChild(mydiv.firstChild);
        }
        // Обработка ответа от сервера
        if (request.responseText !== "") {
            var msg = null;
            msg = JSON.parse(request.responseText);
            document.getElementById("msg").innerHTML = msg.message;
            console.log(msg.message);
            // Вывод сообщений об ошибках
            if (typeof msg.error !== "undefined" && msg.error.length > 0) {
                for (var i = 0; i < msg.error.length; i++) {
                    var ul = document.getElementsByTagName("ul");
                    var li = document.createElement("li");
                    li.appendChild(document.createTextNode(msg.error[i]));
                    ul[0].appendChild(li);
                }
            }
            document.getElementById("Password").value = "";
        }
    };
    // Запрос на сервер
    request.send(JSON.stringify({
        email: email,
        password: password
    }));
    getUser();
}

//Выход пользователя
function logOff() {
    var request = new XMLHttpRequest();
    request.open("POST", "api/Account/Logoff");
    request.onload = function () {
        var msg = JSON.parse(this.responseText);
        document.getElementById("msg").innerHTML = "";
        var mydiv = document.getElementById('formError');
        while (mydiv.firstChild) {
            mydiv.removeChild(mydiv.firstChild);
        }
        document.getElementById("msg").innerHTML = msg.message;
    };
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.send();
    getUser();
}

//Функция для получения и отображения имени текуего пользователя
function getCurrentUser() {
    let request = new XMLHttpRequest();
    request.open("POST", "/api/Account/IsAuthenticated", true);
    request.onload = function () {
        let myObj = "";
        myObj = request.responseText !== "" ? JSON.parse(request.responseText) : {};
        console.log(myObj.message);
        if (typeof myObj.message !== "undefined" && myObj.message.length > 0) {
            document.getElementById("msg").innerHTML = myObj.message;
            console.log(myObj.message);
        }
        else
            document.getElementById("msg").innerHTML = "";
    };
    request.send();
}

//Функция для получения и отображения имени текуего пользователя
function getUser() {
    let request = new XMLHttpRequest();
    var user;
    var user_name;
    
    request.open("POST", "/api/Account/isAuthenticated", true);
    request.onload = function () {
        console.log(JSON.parse(request.responseText));
        console.log("Заходим в ответ");
        let userHTML = '<a class="nav-link disabled" href="#">Вы вошли как ';
        user = JSON.parse(request.responseText);
        console.log(user);
        if (user != -1) {
            user_name = user.userName;
            console.log(user_name);
            userHTML += user_name + '</a>';
            userID = user.id;
        }
        else {
            userHTML += 'Гость</a>';
        }
        document.querySelector("#xuser").innerHTML = userHTML;
    }
    request.send();
}