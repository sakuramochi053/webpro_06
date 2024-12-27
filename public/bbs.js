"use strict";

let number=0;//いくつまで読んだか.
const bbs = document.querySelector('#bbs');
document.querySelector('#post').addEventListener('click', () => {  //投稿ボタンが押されたら.
    const name = document.querySelector('#name').value;
    const message = document.querySelector('#message').value;

    const params = {  // URL Encode
        method: "POST",
        body:  'name='+name+'&message='+message,   //送るパラメータ.
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };
    console.log( params );
    const url = "/post";
    fetch( url, params )//パラメータに基づいて送る
    .then( (response) => {
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
    const params = {  // URL Encode
        method: "POST",
        body:  '',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };
    const url = "/check";
    fetch( url, params )
    .then( (response) => {
        if( !response.ok ) {
            throw new Error('Error');
        }
        return response.json();
    })
    .then( (response) => {
        let value = response.number;
        console.log( value );

        console.log( number );
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
                number += response.messages.length;
                for( let mes of response.messages ) {
                    console.log( mes );  // 表示する投稿
                    let cover = document.createElement('div'); // １つ目の投稿の枠
                    cover.className = 'cover';
                    let name_area = document.createElement('span');
                    name_area.className = 'name';
                    name_area.innerText = mes.name;
                    let mes_area = document.createElement('span');
                    mes_area.className = 'mes';
                    mes_area.innerText = mes.message;
                    cover.appendChild( name_area );
                    cover.appendChild( mes_area );

                    bbs.appendChild( cover );
                }
            })
        }
    });
});