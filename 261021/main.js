//演習１
// 自分の名前を変数 name に、好きな数を変数 num に入れて表示する
let name= "鎌田柚香";
let num= 3;
console.log(name);
console.log(num);

// num に別の数を入れ直してから、もう一度表示する
num= 4;
console.log(num);

// typeof "123" と typeof 123 を表示して比べる
console.log(typeof "123")
console.log(typeof 123)    

// 宣言だけした変数（let x;）を表示すると何が出るか見てみる
let x;
console.log(x);


//演習2
// 名前を引数で受け取り「○○さん、ようこそ」と表示する関数を書いて、3人分呼び出す
function saywelcome(name){
    console.log(name +"さん、ようこそ");
}
console.log("----------------");
saywelcome("かつお");
saywelcome("わかめ");
saywelcome("たらお");

// 引数を2つにして、名前と好きなものを表示するように変える
function saywelcome2(name,favorite){
    console.log(name+"さんの好きなものは"+favorite+"だよ");
}
console.log("------------");
saywelcome2("かつお","野球");
saywelcome2("わかめ","ゴム飛び");
saywelcome2("たらお","お絵描き");

// 引数を渡さずに呼び出すと、何が表示されるか試す
console.log("----------------");
saywelcome();
saywelcome2();


//演習３
// 2つの数を受け取り、掛け算した結果を返す関数 multiply を書く
function multiply(a,b){
    return a*b;
}

console.log(multiply(3,4));
console.log(multiply(3,10));

// 合計金額と人数を受け取り、1人あたりの金額を返す関数 splitBill を書く
function splitBill(total,people){
    return Math.ceil(total/people);
}
console.log(splitBill(3000,3));
console.log(splitBill(5000,6));
// ヒント：端数を切り上げるには Math.ceil(値) を使う
// 返り値を変数に入れて、console.log で表示する


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