// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
window.$ = window.jQuery = require('jquery');
const { ipcRenderer } = require('electron');


$(document).ready(function () {
  var a = 1;
  $("#mytestid").click(function () {
    if (a == 1) {
      a = 0;
      console.log("haha1");
      $("#mytestid").css("color", "blue");
      $('#mytestid').text("1111111");

    }
    else {
      a = 1;
      console.log("haha2");
      $("#mytestid").css("color", "red");
      $('#mytestid').text("000000000");
    }

  });



  ///////////////동기(synchronous) 사용법  blocking방식입니다 응답을 기다립니다. 변수에 응답값이 할당될때까지 기다립니다///////////////
  console.log("야를 보냄");
  var response_from_main = ipcRenderer.sendSync('synchronous-message', '야');
  console.log( response_from_main+ "가 왔음") // "pong"이 출력됩니다.
  ///////////////blocking function 사용법///////////////




  ///////////////비동기(asynchronous) 사용법 (setTimeout같은 느낌   뒤에 코드가 시작됩니다 응답을 안기다림 non-blocking 방식) ///////////////
  ipcRenderer.send('asynchronous-message', '있'); //main.js에 잇을 보냄
  console.log("있 보냄");
  ipcRenderer.on('asynchronous-reply', (event, arg) => {
    console.log(arg + "이 왔음") // main.js에서 메세지가 온것에 대한 다시응답
  })
  ///////////////비동기 사용법///////////////





});







