


document.addEventListener("DOMContentLoaded", function (event) {
    document.getElementById("loginBtn").addEventListener("click", logIn);
    document.getElementById("logoffBtn").addEventListener("click", logOff);
    getCurrentUser();
});

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
}

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
}

function getCurrentUser() {
    let request = new XMLHttpRequest();
    request.open("POST", "/api/Account/IsAuthenticated", true);
    request.onload = function () {
        let myObj = "";
        myObj = request.responseText !== "" ? JSON.parse(request.responseText) : {};
        document.getElementById("msg").innerHTML = myObj.message;
    };
    request.send();
}