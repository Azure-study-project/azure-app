// .envファイルを読み込むための設定
require('dotenv').config();

// expressモジュールの読み込み
// expressは、Node.jsでWebアプリケーションを作成するためのフレームワーク
const express = require('express');

// expressアプリケーションの作成
const app = express();

// Cookie読み取りのための準備
const cookieParser = require('cookie-parser');
app.use(cookieParser());

// axiosというHTTPリクエストを簡単に行えるモジュールを読み込み
const axios = require('axios');

// アプリケーションのルーティングを定義するためのroute.jsファイルを読み込み
const route = require('./route.js');
route(app, axios);

// 環境変数からポート番号を取得
const port = process.env.PORT

// アプリケーションを起動して、指定されたポートでリクエストを待ち受けるように設定
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});