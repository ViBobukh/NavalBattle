let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

let xhr = new XMLHttpRequest();

xhr.open('POST', 'http://localhost:3000');

xhr.responseType = "";

xhr.onload = function () {
    let responseObj = xhr.response;
    console.log(responseObj);
}

xhr.send();
