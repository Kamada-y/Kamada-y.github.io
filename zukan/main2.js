let characterList = document.querySelector("#characterList");
let imageTag = `<img src="${character.image}" width="80">`;
characterList.innerHTML += `<li>${imageTag} ${character.name}</li>`;

showAll=()=>{
  showType("すべて");
  changeButtonColor(showAllButton);
}
showFire=()=>{
  showType("炎");
  changeButtonColor(showFireButton);
}
showWater=()=>{
  showType("水");
  changeButtonColor(showWaterButton);
}
showGrass=()=>{
  showType("草");
  changeButtonColor(showGrassButton);
}

//どのボタンでどんなキャラを表示するか指定する
let showAllButton = document.querySelector("#characterAll");
let showFireButton = document.querySelector("#typeFire");
let showWaterButton = document.querySelector("#typeWater");
let showGrassButton = document.querySelector("#typeGrass");

//ボタンを押すと指定されたキャラが表示する
showAllButton.addEventListener("click", showAll);
showFireButton.addEventListener("click", showFire);
showWaterButton.addEventListener("click", showWater);
showGrassButton.addEventListener("click", showGrass);




let selectedType = "すべて"; // 選んでいるタブ
let searchWord = ""; // 検索欄の文字

function render() {
let visibleCharacters = []; // 表示するキャラを集める
for (let i = 0; i < characters.length; i++) {
let character = characters[i];
let matchesType = selectedType === "すべて" || character.type === selectedType;
let matchesWord = character.name.includes(searchWord);
if (matchesType && matchesWord) {
visibleCharacters.push(character);
}
}
// visibleCharacters を並べ替え（次回）、カードで表示し、件数を出す
}



let name = "たろう";
let age = 20;
console.log(name + "さんは" + age + "歳です"); // + でつなぐ
console.log(`${name}さんは${age}歳です`); // 同じ結果
function greet(name) {
return `ようこそ、${name}さん`;
}
let message = greet("わかめ");
console.log(message);





// 1. ボタンのIDと表示するタイプの組み合わせをリストにする
    // :は「idというラベルの中身は "#characterAll" です」というデータの定義
const buttons=[{id:"#characterAll",type:"すべて"},{id:"#typeFire",type:"炎"},{id:"#typeWater",type:"水"},{id:"#typeGrass",type:"草"}];
for(let i=0; i<buttons.length; i++){
    console.log(buttons[i])
}

// 2. リストを1つずつ取り出して、一括でクリック設定をする
buttons.forEach(({ id, type }) => {
  const button = document.querySelector(id);
  button.addEventListener("click", () => {
    showType(type);
    changeButtonColor(button);
  });
});



//選択されていないボタンは白色に青枠、選択中のボタンは青色になる⓵
const changeButtonColor=(activeButton)=>{
    showAllButton.className = "btn btn-outline-primary";
    showFireButton.className = "btn btn-outline-primary";
    showWaterButton.className = "btn btn-outline-primary";
    showGrassButton.className = "btn btn-outline-primary";

    activeButton.className = "btn btn-primary";
}