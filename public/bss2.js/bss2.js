"use strict";

let number=0;//いくつまで読んだか.
const bbs = document.querySelector('#bbs');//htmlにおける＃bbsから値を取得する．
document.querySelector('#post').addEventListener('click', () => {  //投稿ボタンが押されたら.
    const name = document.querySelector('#name').value;//mameに名前を代入
    const message = document.querySelector('#message').value;//，messageにメッセージを代入

    const params = {  // URL Encode
        method: "POST",
        body:  'name='+name+'&message='+message,   //サーバーに送るパラメータ.
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'//このようなurlが送られる
        }
    };
    console.log( params );
    const url = "/post";//urlがポストと言う名前のサーバーと通信
    fetch( url, params )//パラメータに基づいて送る
    .then( (response) => {//_通信が失敗したらerrorと返す
        if( !response.ok ) {
            throw new Error('Error');
        }
        return response.json();//サーバーから送られてくるものをreturnする.
    })
    .then( (response) => {
        console.log( response );
        document.querySelector('#message').value = "";  //投稿内容が来ているか確認するためにあえて消す
    });
});



document.querySelector('#check').addEventListener('click', () => { //もし新しい投稿があったら持ってくる
    const params = {  // URL Encode    ←おそらく通信の設定
        method: "POST",
        body:  '',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };
    const url = "/check";
    fetch( url, params ) //通信開始
    .then( (response) => {
        if( !response.ok ) {
            throw new Error('Error');
        }
        return response.json();
    })
    .then( (response) => {
        let value = response.number;//サーバーに問い合わせて、現在の投稿数を取ってくる
        console.log( value );

        console.log( number );//numberは最初0
        if( number != value ) { //クライアントが持っているデータとサーバが持っているデータを比較して違っていたら受け取る
            const params = {
                method: "POST",
                body: 'start='+number,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'               
                }
            }
            const url = "/read";
            fetch( url, params )
            .then( (response) => {
                if( !response.ok ) {
                    throw new Error('Error');
                }
                return response.json();
            })
            .then( (response) => {  //投稿が来たら表示をする部分
                number += response.messages.length;//ここでnumberを追加
                for( let mes of response.messages ) {
                    console.log( mes );  // 表示する投稿
                    let cover = document.createElement('div'); // メッセージを囲むためのdivを作成する。
                    cover.className = 'cover';//coverというタグをつける
                    let name_area = document.createElement('span');//メッセージを表示させるためのspanを作成する
                    name_area.className = 'name';//nameというタグを付ける
                    name_area.innerText = mes.name;//mes.message というサーバーから受け取ったメッセージの内容をspan要素に設定して、ウェブページ上に表示する
                    let mes_area = document.createElement('span');//メッセージを表示させるためのspanを作成する
                    mes_area.className = 'mes';//mesという
                    mes_area.innerText = mes.message;
                    cover.appendChild( name_area );//送信者名を含むname_areaをcoverの子要素として追加する．
                    cover.appendChild( mes_area );

                    bbs.appendChild( cover );//完成した投稿枠（cover）を、HTML の掲示板部分（#bbs）に追加する
                }
            })
        }
    });
});