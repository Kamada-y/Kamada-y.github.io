// HTML要素の取得
const zipcodeInput = document.getElementById('zipcode');
const searchBtn = document.getElementById('searchBtn');
const messageArea = document.getElementById('message');
const prefectureInput = document.getElementById('prefecture');
const cityInput = document.getElementById('city');
const townInput = document.getElementById('town');
const streetInput = document.getElementById('street');
const registerForm = document.getElementById('registerForm');

// メッセージを表示する関数（type: 'error' | 'success' | 'info'）
function showMessage(text, type = 'info') {
  messageArea.textContent = text;
  messageArea.className = 'form-text mt-2'; // クラスをリセット

  if (type === 'error') {
    messageArea.classList.add('text-danger');
  } else if (type === 'success') {
    messageArea.classList.add('text-success');
  } else {
    messageArea.classList.add('text-muted');
  }
}

// 住所欄をリセットする関数
function clearAddress() {
  prefectureInput.value = '';
  cityInput.value = '';
  townInput.value = '';
}

// 郵便番号から住所を検索する非同期関数（async）
async function searchAddress() {
  // 1. 入力値の整形（前後の空白削除・ハイフン削除・全角数字を半角へ変換）
  const rawValue = zipcodeInput.value.trim();
  const normalizedZip = rawValue
    .replace(/[０-９]/g, (s) => String.fromCharCode(s.charCodeAt(0) - 0xFEE0))
    .replace(/[-ー−]/g, '');

  // 2. バリデーション（7桁の数字かチェック）
  if (!/^\d{7}$/.test(normalizedZip)) {
    clearAddress();
    showMessage('郵便番号は7桁の数字で入力してください（例：1000001 または 100-0001）。', 'error');
    return;
  }

  // 検索中の表示とボタンの無効化（連打防止）
  showMessage('住所を検索しています...', 'info');
  searchBtn.disabled = true;

  try {
    // 3. zipcloud APIへ通信（awaitで結果を待つ）
    const url = `https://zipcloud.ibsnet.co.jp/api/search?zipcode=${normalizedZip}`;
    const response = await fetch(url);

    // HTTPエラーのチェック
    if (!response.ok) {
      throw new Error('サーバーとの通信に失敗しました。');
    }

    // JSONデータの解析（awaitで完了を待つ）
    const data = await response.json();

    // 4. API側のステータス・検索結果のチェック
    if (data.status !== 200) {
      clearAddress();
      showMessage(`エラーが発生しました：${data.message}`, 'error');
      return;
    }

    if (!data.results || data.results.length === 0) {
      clearAddress();
      showMessage('該当する住所が見つかりませんでした。番号をお確かめください。', 'error');
      return;
    }

    // 5. 取得した住所をフォームに反映（先頭の候補を使用）
    const result = data.results[0];
    prefectureInput.value = result.address1; // 都道府県
    cityInput.value = result.address2;       // 市区町村
    townInput.value = result.address3;       // 町域

    showMessage('住所を入力しました。続けて番地を入力してください。', 'success');
    
    // ユーザーの入力の手間を減らすため、番地欄へ自動でカーソルを移動
    streetInput.focus();

  } catch (error) {
    // ネットワーク切断などの通信エラー時
    clearAddress();
    showMessage('通信エラーが発生しました。インターネット接続を確認してください。', 'error');
    console.error(error);
  } finally {
    // 成功・失敗に関わらずボタンを再び押せるようにする
    searchBtn.disabled = false;
  }
}

// 「住所検索」ボタンが押されたときの処理
searchBtn.addEventListener('click', searchAddress);

// 郵便番号欄でEnterキーが押されたときにも検索を実行する（フォーム送信を防ぐ）
zipcodeInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    searchAddress();
  }
});

// 登録ボタン押下時のデモ動作
registerForm.addEventListener('submit', (event) => {
  event.preventDefault();
  alert('入力内容の送信デモです！');
});