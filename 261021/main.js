//演習１
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

//演習2
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
saywelcome();
saywelcome2();

//演習３
function multiply(a,b){
    return a*b;
}

console.log(multiply(3,4));
console.log(multiply(3,10));

function splitBill(total,people){
    return Math.ceil(total/people);

}
console.log(splitBill(3000,3));
console.log(splitBill(5000,6));


//演習4
function judgeage(age){
    if (age<=0){
        result= "エラー";
    }
    else if (age<18){
        result="未成年";
    }
    else if(age>=65){
        result="高齢者";
    }
    else {
        result="成人";
    }
}
console.log(`${age}歳は${result}です`);

judgeage(-1);
judgeage(10);
judgeage(45);
judgeage(80);

//演習4発展