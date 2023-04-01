// .envの読み込み
require('dotenv').config();

// expressモジュールの読み込み
// expressは、Node.jsでWebアプリケーションを作成するためのフレームワーク
const express = require('express');

// express関数を呼び出して、appという名前のインスタンスを作成
const app = express();

// var c = require('./client.js');
// const MSGraphClient = c.MSGraphClient;
// console.dir(MSGraphClient);
// const client = MSGraphClient.getClient;
// console.log(client);

const tenantId = process.env.TENANT_ID
const clientId = process.env.CLIENT_ID
const clientSecret = process.env.CLIENT_SECRET

const { ClientSecretCredential } = require("@azure/identity");
const credential = new ClientSecretCredential(tenantId, clientId, clientSecret);
const options = {
    authProvider: async (done) => {
    const accessToken = await credential.getToken("https://graph.microsoft.com/.default");
    done(null, accessToken.token);
    },
};
var { Client } = require("@microsoft/microsoft-graph-client");
const client = Client.init(options);

// const api = require('./api.js');
// api.routes(app, Client);

app.get('/', (req, res) => {
    res.send('Welcome to Azure App');
});

app.get('/about', (req, res) => {
    res.send('about')
})

app.get('/me', async (req, res) => {
    try {
        const me = await client.api('/me').get();
        res.send(me);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/yu', async (req, res) => {
    try {
        const yu = await client.api('/users/1df57c8e-fd5d-41e1-8f17-d4a29bcc15b3').get();
        res.send(yu);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// 8080番ポートでサーバの起動
// appインスタンスに対して、8080番ポートでリクエストを受信するように指示
// リクエストが受信された場合に実行されるコールバック関数を定義
// docker logs <CONTAINER ID>でログの確認が可能
app.listen(8080, () => {
    console.log(`Server running on port 8080`);
});