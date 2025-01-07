"use strict";

document.querySelector('#mawasu').addEventListener('click', () => {
    // 0〜6 のランダムな数字を生成
    var random = Math.floor(Math.random() * 6)+1;
    const randomDisplay = document.querySelector('#randomDisplay');
    const diceImage = document.createElement('img');
    diceImage.src = `/public/dice${random}.png`;  // サイコロ画像のパス

    // 画像を追加
    randomDisplay.innerHTML = '';  // 前回の内容をクリア
    randomDisplay.appendChild(diceImage);  // 画像を追加

    // サイコロの値を表示
    const valueText = document.createElement('p');
    valueText.textContent = `サイコロの値: ${random}`;
    randomDisplay.appendChild(valueText); 
    const params = {
        method: "POST",
        body: JSON.stringify({ random: random }),  // JSONとして送信
        headers: {
            'Content-Type': 'application/json'  // JSON形式に変更
        }
    };

    console.log(params);  // 送信するパラメータをデバッグ用に表示

    const url = "/goukei"; // サーバーのエンドポイント
    fetch(url, params)
        .then((response) => {
            if (!response.ok) {
                throw new Error('リクエスト失敗');
            }
            return response.json();  // サーバーからのレスポンスをJSONとして処理
        })
        .then((response) => {
            console.log(response);  // サーバーからのレスポンス内容を表示

            if (response.error) {
                alert(response.error);
                return;
            }

            // サーバーから返ってきたカウントの結果
            const countMap = response.countMap;

            const totalCount = Object.values(countMap).reduce((total, count) => total + count, 0);
            // 結果を表示する要素
            const resultContainer = document.querySelector('#result');
            resultContainer.innerHTML = '';  // 最初に内容をクリア

            let maxProbability = 0;
            for (let key in countMap) {
                if (countMap.hasOwnProperty(key)) {
                    const probability = ((countMap[key] / totalCount) * 100).toFixed(2);
                    maxProbability = Math.max(maxProbability, parseFloat(probability));
                }
            }

            // 出現回数を表示
            for (let key in countMap) {
                if (countMap.hasOwnProperty(key)) {
                    const probability = ((countMap[key] / totalCount) * 100).toFixed(2);
                    const countDisplay = document.createElement('div');
                    countDisplay.classList.add('count');
                    countDisplay.innerText = `${key} は ${countMap[key]} 回出現しました 確率:${probability}%です`;
                    if (parseFloat(probability) === maxProbability) {
                        countDisplay.classList.add('highlight');
                    }
                    resultContainer.appendChild(countDisplay);
                }
            }
        })
        .catch((error) => {
            console.error("Error during fetch operation:", error);
        });
});
