//演習1　好きなキャラを1体オブジェクトで作る。console.logでnameとattackを表示する。
let character={
    name:"サイタマ",
    type:"打撃",
    attack:100,
    emoji:"👊",
}
console.log(character.name);
console.log(character.attack);

//テンプレートリテラルで、例：「👊ヒノコ(炎)攻撃力72」のように1行で表示する
console.log(`${character.emoji}${character.name}(${character.type})攻撃力${character.attack}`);

//attackを書きかえてもう一度表示する
character.attack +=10;
console.log(character.attack);

//発展1　ボタンを押すと、その1行がh1に表示されるようにする
let title = document.querySelector("#title");
function showCharacter(){
    title.textContent = `${character.emoji}${character.name}(${character.type}) 攻撃力 ${character.attack}`;
}
let characterObjectButton = document.querySelector("#characterObject");
characterObjectButton.addEventListener("click", showCharacter);


//演習2　3体以上のキャラのオブジェクトの配列を作る
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

//forで全員をconsoleに表示する
for(let i=0;i<characters.length;i++){
    let character=characters[i];
    console.log(`${character.emoji}${character.name}(${character.type})攻撃力${character.attack}`);
}

//index.htmlに<ul id="characterlist"></ul>を書き、innerHTMLで全員をliで表示する
let characterList = document.querySelector("#characterList");
for(let i=0;i<characters.length;i++){
    let character=characters[i];
    characterList.innerHTML += `<li>${character.emoji}${character.name}(${character.type})攻撃力${character.attack}</li>`;
}

//攻撃力の合計と平均を表示する
let scores=[100,75,85,90,55,60,80,50,70];
let scoressum=0;
for(let i=0; i<scores.length; i++){
    scoressum += scores[i];
}
let average=scoressum/scores.length;
console.log("合計:"+scoressum);
console.log("平均:"+average);

//発展2
for(let i=0; i<characters.length; i++) {
    let character = characters[i];
    let rarityStars = "";

    for(let j = 0; j < character.rarity; j++) {
    rarityStars += "★";
     }
characterList.innerHTML += `<li>${character.emoji}${character.name}(${character.type}) 攻撃力 ${character.attack} レアリティ ${rarityStars}</li>`;
}
