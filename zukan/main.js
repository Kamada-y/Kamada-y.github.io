let characterList = document.querySelector("#characterList");
let characterCount = document.querySelector("#characterCount");
let typeTabs = document.querySelectorAll(".type-tab");
let selectedType = "すべて";
let searchWord = "";
let sortOrder = "default";  //今どの並べ替え順が選ばれているかを保存しておく変数。ページを開いた最初はまだ何も選ばれていないので、初期値として "default"（登録順）を入れてる//
let favorites = [];


// 2. タブの色を変える関数（スライド31の classList を応用）
function changeButtonColor(activeTab) {
  typeTabs.forEach((tab) => {
    tab.classList.remove("btn-secondary");
    tab.classList.add("btn-outline-secondary");
  });
  activeTab.classList.remove("btn-outline-secondary");
  activeTab.classList.add("btn-secondary");
}

// 3. すべてのタブにクリック設定をまとめてつなぐ（スライド17、20）
typeTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    selectedType = tab.textContent; 
    render();
    changeButtonColor(tab);
  });
});



//検索欄　スライド7の23ページ  searchInput：HTMLから document.querySelector("#searchInput") で捕まえてきた「検索ボックス」の要素そのもの。value：日本語で「値（あたい）」という意味。フォーム部品（<input> や <select>）の中に入っているデータを取り出すときに使う→メモ帳見て//
let searchInput = document.querySelector("#searchInput");
searchInput.addEventListener("input", () => {    //addEventListener には、「イベント(input:入力)が起きたときに実行してほしい処理のまとまり（関数）」を渡すルールがある//
    searchWord=searchInput.value   //searchWord(検索欄)にsearchInput.value(検索ボックスの値)が代入されたらaddEventListenerで処理//
    render();
});


//セレクトボックス   changeは変化//
let sortSelect = document.querySelector("#sortSelect");
sortSelect.addEventListener("change", () => {
    sortOrder = sortSelect.value
    render();
});

//実行される処理部分//
function render() {
    //1．ピックアップしたキャラで新しい配列の作成//
    let visibleCharacters = [];
    characters.forEach((character) => {
        let matchesType = selectedType === "すべて" || character.type === selectedType;  //タブが「すべて」であるか、または（||）キャラのタイプが選んだタブと一致すれば true になる→メモ帳見て！//
        let matchesWord = character.name.includes(searchWord);  //キャラの名前に、検索欄の文字（searchWord）が含まれていれば true になる。空文字のときは全員 true。//
        if (matchesType && matchesWord) {   //タイプと検索文字の両方（&&）が true のキャラだけを、.push() で visibleCharacters の箱に追加→メモ帳見て！//
            visibleCharacters.push(character);
        }
    });


    // 2. 新しい配列の並べ替え→絞り込み検索作成//
    if (sortOrder === "attackDesc") {
        visibleCharacters.sort((a, b) => b.attack - a.attack);
    }else if(sortOrder === "attackAsc"){
        visibleCharacters.sort((a,b)=>a.attack - b.attack);
    }else if(sortOrder === "rarityDesc"){
        visibleCharacters.sort((a, b) => b.rarity - a.rarity);
    }
    characterList.innerHTML = "";
    characterCount.textContent = `${characters.length}体中 ${visibleCharacters.length}体を表示`;
    if(visibleCharacters.length === 0){
        characterList.innerHTML = "<p>見つかりませんでした</p>";
    }else{  //ここからは ”見つかりまでんでした” 以外の並べかえ//
            //まずレアリティから//
        visibleCharacters.forEach((character) => {
            let rarityStars = "";
            for (let i = 0; i < character.rarity; i++) {
                rarityStars += "★";
            }
            
            //"見つかりませんでした"以外は画像を表示//
            let imageTag = `<img src="${character.image}" class="card-img">`;
            characterList.innerHTML += `
            <div class="col-6 col-md-4 col-lg-3">
                <div class="card h-100 position-relative">
                    ${imageTag}
                    <div class="card-body text-center">
                        <h5 class="card-title">
                        ${character.name}
                        </h5>
                        <p class="card-text">
                        ${character.type}/攻撃力${character.attack}<br>
                        ${rarityStars}
                        </p>
                    </div>
                </div>
            </div>`;

            
        });
    }
}



render();


//前回まで（第6回）はshowTypeが主役だった。
// 今回（第7回）ではshowTypeに「検索」と「並べ替え」を合体させたのが render()。



