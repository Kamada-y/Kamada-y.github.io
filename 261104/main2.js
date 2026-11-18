//演習3　演習2の一覧に、「すべて」「炎」「水」「草」のボタンを付ける(タイプは自分のデータに合わせて良い)
let characters=[
    {name:"サイタマ",type:"打撃",attack:100,emoji:"👊",rarity:1},
    {name:"ジェノス",type:"打撃",attack:75,emoji:"🤖",rarity:2},
    {name:"バング",type:"武術",attack:85,emoji:"🥋",rarity:2},
    {name:"タツマキ",type:"念動力",attack:90,emoji:"🌀✨",rarity:4},
    {name:"フブキ",type:"念動力",attack:55,emoji:"🌀",rarity:1},
    {name:"ソニック",type:"刺突",attack:60,emoji:"🥷",rarity:1},
    {name:"アトミック侍",type:"斬撃",attack:80,emoji:"⚔️",rarity:3},
    {name:"ゾンビマン",type:"射撃",attack:50,emoji:"🧟",rarity:3},
    {name:"金属バット",type:"打撃",attack:70,emoji:"🏏",rarity:2},
];

let characterList = document.querySelector("#characterList");
for(let i=0;i<characters.length;i++){
    let character=characters[i];
    characterList.innerHTML += `<li>${character.emoji}${character.name}(${character.type})攻撃力${character.attack}</li>`;
}

function showByType(type){
  characterList.innerHTML = "";
  for(let i = 0; i < characters.length; i++){
    let character = characters[i];
    if(type === "すべて" || character.type === type){  
      characterList.innerHTML += `<li>${character.emoji}${character.name}(${character.type}) 攻撃力 ${character.attack}</li>`;
    }
  }
}

function showByAttackGreaterEqual(attack){
  characterList.innerHTML = "";
  for(let i = 0; i < characters.length; i++){
    let character = characters[i];
    if(character.attack >= attack){  
      characterList.innerHTML += `<li>${character.emoji}${character.name}(${character.type}) 攻撃力 ${character.attack}</li>`;
    }
  }}

function showAll(){
  showByType("すべて");
}
function showFire(){
  showByType("打撃");
}
function showMartialarts(){
  showByType("武術");
}
function showTelekinesis(){
  showByType("念動力");
}
function showPierce(){
  showByType("刺突");
}
function showSlash(){
  showByType("斬撃");
}
function showShoot(){
  showByType("射撃");
}
function showAttackGreaterEqual60(){
  showByAttackGreaterEqual(60); // 攻撃力60以上のキャラクターを表示する
}

let showAllButton = document.querySelector("#characterAll");
let showFireButton = document.querySelector("#typeStrick");
let showMartialartsButton = document.querySelector("#typeMartialarts");
let showTelekinesisButton = document.querySelector("#typeTelekinesis");
let showPierceButton = document.querySelector("#typePierce");
let showSlashButton = document.querySelector("#typeSlash");
let showShootButton = document.querySelector("#typeShoot");
let showAttackGreaterEqual60Button = document.querySelector("#showAttackGreaterEqual60");

showAllButton.addEventListener("click", showAll);
showFireButton.addEventListener("click", showFire);
showMartialartsButton.addEventListener("click", showMartialarts);
showTelekinesisButton.addEventListener("click", showTelekinesis);
showPierceButton.addEventListener("click", showPierce);
showSlashButton.addEventListener("click", showSlash);
showShootButton.addEventListener("click", showShoot);
showAttackGreaterEqual60Button.addEventListener("click", showAttackGreaterEqual60);
