//演習１
let name= "鎌田柚香";
let num= 3;
console.log("鎌田柚香");
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
function judgeAge(age){
    let result;
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
    console.log(`${age}歳は${result}です`);
}

judgeAge(-1);
judgeAge(10);
judgeAge(45);
judgeAge(80);

//演習4発展
function judgeYear(year){
    let result;
    if(year %400 === 0){
        result="366日";
    }
    else if(year %100 === 0){
        result="365日";
    }
    else if(year %4 === 0){
        result="366日";
    }
    else {
        result="365日";
    }
    console.log(`${year}年は${result}です`);

}
judgeYear(1932);
judgeYear(2024);
judgeYear(2007);
judgeYear(1100);