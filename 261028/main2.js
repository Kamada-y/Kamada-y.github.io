//第５回課題
function pickOne(){
    let results=["大吉","吉","中吉","小吉","末吉","凶","大凶"];
    let n =Math.floor(Math.random() * results.length);
    console.log(results[n]);
    return results[n];
}

let count=0;
function showMessage(){
    let title=document.querySelector("#message");
    let results=pickOne();
    title.textContent=results;
    count = count+1;
    let countText=document.querySelector("#count");
    countText.textContent=`引いた回数:${count}回`;

    if(results==="大吉"){
        title.style.color="red";
    }
    else{
        title.style.color="black";
    }
}
let button=document.querySelector("#omikuzi");
button.addEventListener("click",showMessage);
//発展課題
