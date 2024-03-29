// .envファイルを読み込むための設定
require('dotenv').config();

// expressモジュールの読み込み
// expressは、Node.jsでWebアプリケーションを作成するためのフレームワーク
const express = require('express');

// expressアプリケーションの作成
const app = express();

// ファイルシステムにアクセスするためのAPIを提供するfsモジュールの読み込み
const fs = require('fs');

// HTTPSリクエストを送信するためのAPIを提供するhttpsモジュールの読み込み
const https = require('https');

// Cookie読み取りのための準備
const cookieParser = require('cookie-parser');
app.use(cookieParser());

// axiosというHTTPリクエストを簡単に行えるモジュールを読み込み
const axios = require('axios');

// 他のファイルに定義されたモジュールを読み込み
const config = require('./config.js');
const getAccessToken = require('./token.js');
const callMSGraph = require('./msgraph.js');

// アプリケーションのルーティングを定義するためのroute.jsファイルを読み込み
const route = require('./route.js');
route(app, config, getAccessToken, callMSGraph, axios);

// 環境変数からポート番号を取得
const port = config.environment.port;

if (port == 80) {
    // HTTPサーバー
    // アプリケーションを起動して、指定されたポートでリクエストを待ち受けるように設定
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
}
else if (port == 443){
    // HTTPSサーバーを作成
    const server = https.createServer({
        key: fs.readFileSync('./privatekey.pem'),
        cert: fs.readFileSync('./cert.pem'),
    }, app);

    // アプリケーションを起動して、指定されたポートでリクエストを待ち受けるように設定
    server.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
}
else {
    console.error(`Trying to run on port ${port}`);
    console.error('incorrect port number');
}