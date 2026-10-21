let name= "YuzukaKAmada";
let num= 3;
console.log("name");
console.log(num);
num= 4;
console.log(num);
console.log(typeof "123")
console.log(typeof 123)                 
let x;
console.log(x);

function saywelcome(name){
    console.log(name +"さん、ようこそ");
}
saywelcome("かつお");
saywelcome("わかめ");
saywelcome("たらお");

function saywelcome2(name,favorite){
    console.log(name+"さんの好きなものは"+favorite+"だよ")

}
console.log("------------");
saywelcome2("かつお","野球");
saywelcome2("わかめ","ゴム飛び");
saywelcome2("たらお","お絵描き");

function multiply(num1,num2){
    return num1*num2;
}
console.log(multiply(3,4));
console.log(multiply(3,10));

function splitBill(total,people){
    return Math.ceil(total/people);

}
console.log(splitbill(3000,3));
console.log(splitbill(5000,3));

