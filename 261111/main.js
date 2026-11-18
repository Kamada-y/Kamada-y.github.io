let characterList = document.querySelector("#characterList");

//演習1
// 攻撃力が高い順
characters.sort(function(a, b){
  return b.attack - a.attack;
});
for(let i = 0; i < characters.length; i++){
  console.log(characters[i].name + "の攻撃力は" + characters[i].attack);
}

// 攻撃力が低い順
characters.sort(function(a, b){
  return a.attack - b.attack;
});
for(let i = 0; i < characters.length; i++){
  console.log(characters[i].name + "の攻撃力は" + characters[i].attack);
}


// レア度が高い順
characters.sort(function(a, b){
  return b.rarity - a.rarity;
});
for(let i = 0; i < characters.length; i++){
  console.log(characters[i].name + "のレア度は" + characters[i].rarity);
}

// slice( ) でコピーして並べ替え、characters の順が変わらないことを確かめる
console.log("===コピーしてcharactersの順を変更===");
let sortedCharacters = characters.slice(); // 直前にレア度が高い順sort済み
sortedCharacters.sort(function(a, b){
  return a.attack - b.attack;
});
console.log("==characters==");
for(let i = 0; i < characters.length; i++){
  console.log(characters[i].name + "の攻撃力は" + characters[i].attack);
}
console.log("==sortedCharacters==");
for(let i = 0; i < sortedCharacters.length; i++){
  console.log(sortedCharacters[i].name + "の攻撃力は" + sortedCharacters[i].attack);
}
let characterList = document.querySelector("#character-list");
let sortByAttackDescButton = document.querySelector("#sort-by-attack-desc-button");
let sortByAttackAscButton = document.querySelector("#sort-by-attack-asc-button");

sortByAttackDescButton.addEventListener("click", function() {
  characterList.innerHTML = "";
  let sortedCharacters = characters.slice();
  sortedCharacters.sort(function(a, b) {
    return b.attack - a.attack;
  });
  for (let i = 0; i < sortedCharacters.length; i++) {
    characterList.innerHTML += `<li>${sortedCharacters[i].name}の攻撃力は${sortedCharacters[i].attack}</li>`;
  }
});

sortByAttackAscButton.addEventListener("click", function() {
  characterList.innerHTML = "";
  let sortedCharacters = characters.slice();
  sortedCharacters.sort(function(a, b) {
    return a.attack - b.attack;
  });
  for (let i = 0; i < sortedCharacters.length; i++) {
    characterList.innerHTML += `<li>${sortedCharacters[i].name}の攻撃力は${sortedCharacters[i].attack}</li>`;
  }
});

//発展
//演習2
// 攻撃力が高い順
console.log("===攻撃力が高い順===");
characters.sort((a, b) => b.attack - a.attack);
characters.forEach(character => console.log(character.name + "の攻撃力は" + character.attack));

//「すべて」「炎」「水」「草」のタブを class="type-tab" で作り、querySelectorAll と forEach でまとめてつなぐ
// 押したタブのタイプだけが一覧に出るようにする（ showByType を使う）

// showByTypeは引数に文字列一致したcharacterだけを表示する。
// 「すべて」を渡した場合には全てのcharacterを表示する。
let showByType = (type) => {
  let characterList = document.querySelector("#character-list");
  characterList.innerHTML = "";
  characters.forEach(character => {
    if (type === "すべて" || character.type === type) {
      characterList.innerHTML += `<li>${character.name}（${character.type}）</li>`;
    }
  });
};

let typeTabs = document.querySelectorAll(".type-tab");
typeTabs.forEach(tab => {
  tab.addEventListener("click", () => {
    let type = tab.textContent;
    showByType(type);
  })
});



//発展
//演習3
//発展
//演習4




