const express = require("express");
const query = require("express/lib/middleware/query");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));

app.get("/hello1", (req, res) => {
  const message1 = "Hello world";
  const message2 = "Bon jour";
  res.render('show', { greet1:message1, greet2:message2});
});

app.get("/hello2", (req, res) => {
  res.render('show', { greet1:"Hello world", greet2:"Bon jour"});
});

app.get("/icon", (req, res) => {
  res.render('icon', { filename:"./public/5.png", alt:"Apple Logo"});
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
  let win = Number(req.query.win) || 0;
  let total = Number(req.query.total) || 0; 

  console.log( {hand, win, total});

  const num = Math.floor( Math.random() * 3 + 1 );
  let cpu = '';
  if( num==1 ) cpu = 'グー';
  else if( num==2 ) cpu = 'チョキ';
  else cpu = 'パー';
 
  let judgment = '';
  if (hand === cpu) {
    judgment = "引き分け"; 
  } else if (
    (hand === 'グー' && cpu === 'チョキ') ||
    (hand === 'チョキ' && cpu === 'パー') ||
    (hand === 'パー' && cpu === 'グー')
  ) {
    judgment = "勝ち"; 
    win += 1; 
  } else {
    judgment = "負け"; 
  }


  total += 1;
  
  const display = {
    your: hand,
    cpu: cpu,
    judgment: judgment,
    win: win,
    total: total
  }
  res.render( 'janken', display );
});


app.get("/kawase",(req,res) => {
let siraberuokane = req.query.siraberuokane;

console.log ({siraberuokane});
let hennkannsaretaokane = ''; 
if (siraberuokane == 'ドル')
{
  hennkannsaretaokane = '130'
}
else if(siraberuokane == 'ユーロ')
{
  hennkannsaretaokane = '163'
}
else if(siraberuokane == 'ルピー')
{
    hennkannsaretaokane = '1.8'
}
else if(siraberuokane == 'ウォン')
{
    hennkannsaretaokane = '0.11'
}
else hennkannsaretaokane = '???'
const display = {
  siraberuokane: siraberuokane,
  hennkannsaretaokane: hennkannsaretaokane
  }
res.render( 'kawase', display );

});


app.listen(8080, () => console.log("Example app listening on port 8080!"));


app.get('/kuizu',(req,res) =>{
  let kaitou = req.query.kaitou;
  let mondai1 = "./public/2.png";//日本の写真
  let mondai2 = "./public/3.png";//アメリカの写真
  let mondai3 = "./public/4.png";//イギリスの写真
  let numkuizu2 = Number(req.query.numkuizu2)|| 0; //写真を更新するか判断
  let seigo = Number(req.query.seigo)|| 0; //写真があっているか判断
  let seigo2 =''//正解か誤答か判断
  let mondai = req.query.mondai;//反映させる写真
  let numkuizuhantei = Number(req.query.numkuizuhantei)|| 0; //写真を生成する数字を生成するかどうかを判定
  let numkuizu = req.query.numkuizu; //生成する写真を設定
//ランダムな数を変えないようにする

  

  if (seigo == 1)//正誤判定
  {
    if (numkuizu == 1){
      if(kaitou == '日本')
      {
        seigo2 = '正解';
        numkuizu2 = 0;//写真を変更する数値にする
        numkuizuhantei = 0;
      }
    else {seigo2 = '不正解';
      
    } }
    if (numkuizu == 2){
      if(kaitou == 'アメリカ')
      {
        seigo2 = '正解';
        numkuizu2 =  0;//写真を変更する数値にする
        numkuizuhantei = 0;
      }
    else {seigo2 = '不正解'
     
    } }
    if (numkuizu == 3){
      if(kaitou == 'イギリス')
      {
        seigo2 = '正解';
        numkuizu2 = 0;//写真を変更する数値にする
        numkuizuhantei = 0;
      }
    else {seigo2 = '不正解';
      
    } }
  }
else
{
seigo2 = '答えを書いてね' ;
seigo = 1;//次回から正誤判定を行うようにする
}




if (numkuizuhantei== 0)
  {
    numkuizu = Math.floor( Math.random() * 3 + 1 );
  if (numkuizu==1)
  {
      mondai = mondai1;
      
  }
  if (numkuizu==2)
    {
        mondai = mondai2;
        
    }
  if (numkuizu==3)
  {
      mondai = mondai3;
      
  }
  }

 

numkuizuhantei = 1;
  res.render( 'kuizu', { filename2:mondai, alt:"Apple Logo",numkuizu:numkuizu,seigo:seigo,numkuizu2:numkuizu2,numkuizu:numkuizu,seigo2:seigo2,numkuizuhantei:numkuizuhantei}  );
}
);







