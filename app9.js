"use strict";
const express = require("express");
const app = express();
const fs = require("fs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let bbs = [];  // 本来はDBMSを使用するが，今回はこの変数にデータを蓄える

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));

app.get("/hello1", (req, res) => {
  const message1 = "Hello world";
  const message2 = "Bon jour";
  res.render('show', { greet1:message1, greet2:message2});
});

app.get("/hello2", (req, res) => {
  res.render('show', { greet1:"Hello world", greet2:"Bon jour"});
});

app.get("/icon", (req, res) => {
  res.render('icon', { filename:"./public/Apple_logo_black.svg", alt:"Apple Logo"});
});

app.get("/luck", (req, res) => {
  const num = Math.floor( Math.random() * 6 + 1 );
  let luck = '';
  if( num==1 ) luck = '大吉';
  else if( num==2 ) luck = '中吉';
  console.log( 'あなたの運勢は' + luck + 'です' );
  res.render( 'luck', {number:num, luck:luck} );
});

app.get("/janken", (req, res) => {
  let hand = req.query.hand;
  let win = Number( req.query.win );
  let total = Number( req.query.total );
  console.log( {hand, win, total});
  const num = Math.floor( Math.random() * 3 + 1 );
  let cpu = '';
  if( num==1 ) cpu = 'グー';
  else if( num==2 ) cpu = 'チョキ';
  else cpu = 'パー';
  // ここに勝敗の判定を入れる
  // 今はダミーで人間の勝ちにしておく
  let judgement = '勝ち';
  win += 1;
  total += 1;
  const display = {
    your: hand,
    cpu: cpu,
    judgement: judgement,
    win: win,
    total: total
  }
  res.render( 'janken', display );
});

app.get("/get_test", (req, res) => {
  res.json({
    answer: 0
  })
});

app.get("/add", (req, res) => {
  console.log("GET");
  console.log( req.query );
  const num1 = Number( req.query.num1 );
  const num2 = Number( req.query.num2 );
  console.log( num1 );
  console.log( num2 );
  res.json( {answer: num1+num2} );
});

app.post("/add", (req, res) => {
  console.log("POST");
  console.log( req.body );
  const num1 = Number( req.body.num1 );
  const num2 = Number( req.body.num2 );
  console.log( num1 );
  console.log( num2 );
  res.json( {answer: num1+num2} );
});

// これより下はBBS関係
app.post("/check", (req, res) => {
  // 本来はここでDBMSに問い合わせる
  res.json( {number: bbs.length });//メッセージの数を返す
});

app.post("/read", (req, res) => {
  // 本来はここでDBMSに問い合わせる
  const start = Number( req.body.start );
  console.log( "read -> " + start );
  if( start==0 ) res.json( {messages: bbs });
  else res.json( {messages: bbs.slice( start )});
});

app.post("/post", (req, res) => {
  const name = req.body.name;
  const message = req.body.message;
  console.log( [name, message] );
  // 本来はここでDBMSに保存する
  bbs.push( { name: name, message: message } );//bss という配列に、投稿された名前とメッセージを追加
  res.json( {number: bbs.length } );// bbsのメッセージの数を返す．
});

app.get("/bbs", (req,res) => {
    console.log("GET /BBS");
    res.json( {test: "GET /BBS" });
});

app.post("/bbs", (req,res) => {
    console.log("POST /BBS");
    res.json( {test: "POST /BBS"});
})

app.get("/bbs/:id", (req,res) => {
    console.log( "GET /BBS/" + req.params.id );
    res.json( {test: "GET /BBS/" + req.params.id });
});

app.put("/bbs/:id", (req,res) => {
    console.log( "PUT /BBS/" + req.params.id );
    res.json( {test: "PUT /BBS/" + req.params.id });
});

app.delete("/bbs/:id", (req,res) => {
    console.log( "DELETE /BBS/" + req.params.id );
    res.json( {test: "DELETE /BBS/" + req.params.id });
});



let countMap = {};

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
        // フロントエンドから送られてきたランダムな値を取得
        const random = parseInt(req.body.random);  // 数字に変換

        if (isNaN(random) || random < 0 || random > 6) {
            return res.status(400).json({ error: "無効な数字が送信されました。" });
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


app.listen(8080, () => console.log("Example app listening on port 8080!"));
