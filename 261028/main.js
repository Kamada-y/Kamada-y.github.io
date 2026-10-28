function showMessage(){
    let title=document.querySelector("#message");
    title.textContent="押されました！";
}
let button=document.querySelector("#btn");
button.addEventListener("click",showMessage);

function showMessage2(){
    let title=document.querySelector("#message");
    title.textContent="押したんだけど";
}
let button2=document.querySelector("#btn2");
button2.addEventListener("click",showMessage2);

function showMessage3(){
    let title=document.querySelector("#message");
    title.textContent=count+1;
    count=count+1;
}
let button3=document.querySelector("#btn3");
let count=0;
button3.addEventListener("click",showMessage3);