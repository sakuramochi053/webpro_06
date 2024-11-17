# webpro_06

## このプログラムについて

## ファイル一覧

ファイル名 | 説明
-|-
app5.js | プログラム本体
kawase.ejs| 為替を表示するプログラム
kuizu.ejs|国旗クイズを表示するプログラム

## 概要
#### kawase.ejsの概要
入力画面に調べたい通貨をカタカナで入力すると調べた通貨の日本円の価格を表示される.ただし調べられるのはドル，ウォン，ルピー，ユーロのみ．他の通貨や関係のない言葉を入力した場合？？？と表示される．


#### kuizu.ejsの概要
サイトを開くと日本もしくはイギリス,アメリカの国旗がランダムで表示される.下の入力欄に表示されている国旗の国名を入力すると正解と表示され,また3つのうちのどれかがランダムに表示される.入力欄に間違った答えや関係のない言葉を入力すると不正解と表示され，画像は変更されない.


## 使用方法

#### kawase.ejsの使用方法
1. app5.js を起動する
1. Webブラウザでlocalhost:8080/kawaseにアクセスする
1. 調べたい通貨を入力する

#### kuizu.ejsの使用方法
1. app5.js を起動する
1. Webブラウザでlocalhost:8080/kuizuにアクセスする
1. 表示された国旗の答えを書く
1. 正解なら次の問題が表示され不正解ならそのままの状態のままになる

## フローチャート



#### kawaseのフローチャート
```mermaid
flowchart TD;

start["開始"];
start --> if
end1["終了"]
if{"入力され通貨の判定"}
doru["130円"]
yuro["163円"]
rupi-["1.8円"]
won["0.11円"]
igai["???"]
if -->|ドル| doru
if -->|ルピー| rupi-
if -->|ウォン| won
if -->|ユーロ| yuro
if -->|それ以外| igai
doru --> end1
yuro --> end1
rupi- --> end1
won --> end1
igai --> end1

```

#### kawaseのフローチャート
```mermaid


flowchart TD;

start["開始"];
senntaku["クイズの問題の画像をランダムで生成"];
seikai["正解と表示し画像を変更"]
fuseikai["不正解と表示し画像を変更しない"]
start --> senntaku 
senntaku --> if
if -->|正解| seikai
if -->|不正解| fuseikai
seikai --> end1
fuseikai--> end1
end1["終了"]
if{"入力された答えの判定"}



```