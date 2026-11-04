//演習1
function showMessage(){
    let title=document.querySelector("#message");
    title.textContent="押したよ";
}
let button=document.querySelector("#btn");
button.addEventListener("click",showMessage);

function showMessage2(){
    let title=document.querySelector("#message");
    title.textContent="押したんだけど";
}
let button2=document.querySelector("#btn2");
button2.addEventListener("click",showMessage2);

//発展1
function plusCount(){
    let counter=document.querySelector("#counter");
    currentCount++;
    counter.textContent=currentCount;
}
let plus=document.querySelector("#plus");
let currentCount=0;
plus.addEventListener("click",plusCount);


//演習2
for (let i=0; i<=10; i++) {
    console.log(i); 
}

let sum=0;
for(let i=1; i<=100; i++){
    sum = sum+i  //
}
console.log(`1から100までの合計:${sum}`);

for(let i=5; i<=50; i=i+5){
    console.log(i); 
}

//発展2
for(let i=1; i<=30; i++){
    if(i % 15===0){
        console.log("FizzBuzz");
    }
    else if (i % 3===0){
        console.log("Fizz");
    }
    else if (i % 5===0){
        console.log("Buzz");
    }
    else{
        console.log(i);
    }
}

//演習3
let favorites=["プリン","犬","ONEPUNCHMAN","寿司","ポケポケ"];
for(let i=0; i<favorites.length; i++){
    console.log(favorites[i]);
}

let scores=[72,85,64,90,58];
let scoressum=0;
for(let i=0; i<scores.length; i++){
    scoressum += scores[i];
}
let average=scoressum/scores.length;
console.log("合計:"+scoressum);
console.log("平均:"+average);


function showArray(){
    let title=document.querySelector("#array");
    title.textContent=pickOne();
}
let button3=document.querySelector("#random");
button3.addEventListener("click",showArray);

//発展3
function pickOne(){
    let results=["プリン","犬","ONEPUNCHMAN","寿司","ポケポケ"];
    let n =Math.floor(Math.random() * results.length);
    console.log(results[n]);
    return results[n];

}
//課題