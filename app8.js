"use strict";
const express = require("express");
const app = express();
const fs = require("fs");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));


// 出現回数を格納するオブジェクト
let countMap = {};



//countMap = {};
//saveCountMap();

// 永続化されたカウントをファイルから読み込む
function loadCountMap() {
    try {
        if (fs.existsSync('countMap.json')) {
            const data = fs.readFileSync('countMap.json', 'utf8');
            countMap = JSON.parse(data);
        }
    } catch (error) {
        console.error('Count map load error:', error);
    }
}

// カウントをファイルに保存する
function saveCountMap() {
    try {
        fs.writeFileSync('countMap.json', JSON.stringify(countMap));
    } catch (error) {
        console.error('Count map save error:', error);
    }
}

// 初期データをロード
loadCountMap();

// ランダムな数字を受け取るエンドポイント
app.post("/goukei", (req, res) => {
    try {
        const random = parseInt(req.body.random);  // 数字に変換

        if (isNaN(random) || random < 0 || random > 6) {
            return res.status(400).json({ error: "無効な数字が発生しました。" });
        }

        // `countMap` にその値が存在するか確認し、存在すればカウントを増やす
        if (countMap[random]) {
            countMap[random] += 1;  // 数字が既に存在する場合はカウントを増加
        } else {
            countMap[random] = 1;  // 初めての数字の場合は1で初期化
        }

        // カウントをファイルに保存
        saveCountMap();

        // カウントの結果をレスポンスとして返す
        res.status(200).json({ countMap });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "サーバーエラーが発生しました" });
    }
});

// サーバーを起動
app.listen(8080, () => console.log("Server running on port 8080"));
