const uri = "/api/post/";
let items = null;

document.addEventListener("DOMContentLoaded", function (event) {
    getUser();
    getPosts();
    console.log("Вызов юзера");
});

var userID;


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

function getPosts() {
    closeInput();
    let request = new XMLHttpRequest();
    request.open("GET", uri);
    request.onload = function () {
        let posts = "";
        let postsHTML = "";
        posts = JSON.parse(request.responseText);
        if (typeof posts !== "undefined") {
            if (posts.length > 0) {
                if (posts) {
                    var i;
                    for (i in posts) {
                        if (posts[i].userId == userID) {
                        postsHTML += '<div class="row">';
                        postsHTML += '<div class="col-sm-2">';
                        postsHTML += '</div>';

                        postsHTML += '<div class="col-sm-8 div-bord">';
                        postsHTML += '<h3>' + posts[i].type + '</h3>';
                        postsHTML += '<h4>' + posts[i].art.title + '</h4>';
                        postsHTML += '<h5>Комментарий:</h5>';                        
                        postsHTML += '<h5>' + posts[i].descr + '</h5><br>';
                        postsHTML += '<h5>Оценка:</h5>'; 
                        postsHTML += '<h5>' + posts[i].rating + '</h5>';
                        postsHTML += '<br>';
                            postsHTML += '<button class="btn btn-secondary btn-sm" onclick="editPost(' + posts[i].postId + ')">Изменить</button> ';
                            postsHTML += '<button class="btn btn-secondary btn-sm" onclick="deletePost(' + posts[i].postId + ')">Удалить</button><br><br>';                            

                        postsHTML += '</div>';

                        postsHTML += '<div class="col-sm-2">';
                        postsHTML += '</div>';
                        postsHTML += '</div>';
                        postsHTML += '<br>';
                       }
                    }
                }
            }
        }
        items = posts;
        document.querySelector("#postsDiv").innerHTML = postsHTML;
    };
    request.send();
}


function createPost() {
    let artText = "";
    let typeText1 = "";
    let descrText = "";
    let rateText = "";
    let userText = userID;
    console.log(userText);
    artText = document.querySelector("#createDivArt").value;
    console.log(document.querySelector("#createDivTypeP").value);
    typeText1 = document.querySelector("#createDivTypeP").value;
    console.log(typeText1);
    descrText = document.querySelector("#createDivDes").value;
    rateText = document.querySelector("#createDivRat").value;
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
            getPosts();
            document.querySelector("#createDivArt").value = "";
            document.querySelector("#createDivTypeP").value = "";
            document.querySelector("#createDivDes").value = "";
            document.querySelector("#createDivRat").value = "";
        } else {
            msg = "Неизвестная ошибка";
            console.log(msg);
        }
        document.querySelector("#actionMsg").innerHTML = msg;

    };
    request.setRequestHeader("Accepts", "application/json;charset=UTF-8");
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.send(JSON.stringify({ artId: artText, type: typeText1, descr: descrText, rating: rateText, userId: userText }));
}

function editPost(id) {
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
            if (id === items[i].postId) {
                document.querySelector("#edit-id").value = items[i].postId;
                document.querySelector("#edit-user").value = items[i].userId;
                document.querySelector("#edit-art").value = items[i].artId;
                document.querySelector("#edit-type").value = items[i].type;
                document.querySelector("#edit-descr").value = items[i].descr;
                document.querySelector("#edit-rat").value = items[i].rating;
            }
        }
    }
}

function updatePost() {
    const post = {
        postId: document.querySelector("#edit-id").value,
        userId: document.querySelector("#edit-user").value,
        artId: document.querySelector("#edit-art").value,
        type: document.querySelector("#edit-type").value,
        descr: document.querySelector("#edit-descr").value,
        rating: document.querySelector("#edit-rat").value
    };
    console.log(post);
    var request = new XMLHttpRequest();
    request.open("PUT", uri + post.postId);
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
            //getPosts();
            closeInput();
            //elm.style.display = "none";
            getPosts();
        } else {
            msg = "Неизвестная ошибка";
            console.log(msg);
        }
        document.querySelector("#actionMsg").innerHTML = msg;

    };
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.send(JSON.stringify(post));
}

function deletePost(id) {
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
            getPosts();
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