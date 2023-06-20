// Webアプリケーションのルーティングを定義
module.exports = function(app, config, callMSGraph, axios){
    // ルートパスにアクセスした場合に返されるレスポンスを定義
    app.get('/', (req, res) => {
        res.send(config.message.welcome);
    });

    // meパスにアクセスした場合に、MS Graph APIを使用して現在のユーザーの情報を取得し、レスポンスとして返す
    app.get('/me', async (req, res) => {
        try {
            // reqオブジェクトのcookiesプロパティからアクセストークンを取得し、定数accessTokenに代入
            const accessToken = req.cookies.access_token;
            // アクセストークンがundefined(未定義)であるかどうかを判定
            if (accessToken == undefined) {
                // アクセストークンがundefinedの場合
                // resオブジェクトのredirectメソッドを呼び出し、サインインページにリダイレクト
                res.redirect(config.endpoint.signin);
            }
            else {
                // アクセストークンがundefinedでない場合
                // この関数は、Microsoft Graph APIにリクエストを送ってレスポンスを返すもの
                // awaitキーワードを使って、この関数の処理が完了するまで待機
                const response = await callMSGraph(config.endpoint.me, accessToken, axios);
                res.send(response);
            }
        } catch (error) {
            // try文中でエラーが発生した場合は、catch文が実行
            // errorという変数には、発生したエラーが格納
            console.error(error);
            res.status(500).send(config.message.error);
        }
    });

    // userパスにアクセスした場合に、MS Graph APIを使用して.envで指定したIDのユーザーの情報を取得し、レスポンスとして返す
    app.get('/users', async (req, res) => {
        try {
            const accessToken = req.cookies.access_token;
            if (accessToken == undefined) {
                res.redirect(config.endpoint.signin);
            }
            else {
                const response = await callMSGraph(config.endpoint.users, accessToken, axios);
                res.send(response);
            }
        } catch (error) {
            console.error(error);
            res.status(500).send(config.message.error);
        }
    });

    // '/teams'というパスにGETリクエストが来たときに、現在のユーザーが参加しているチームの一覧を返す処理を定義
    app.get('/teams', async (req, res) => {
        // 非同期関数の中で、try-catch文を使ってエラー処理を実施
        try {
            const accessToken = req.cookies.access_token;
            if (accessToken == undefined) {
                res.redirect(config.endpoint.signin);
            }
            else {
                const response = await callMSGraph(config.endpoint.teams, accessToken, axios);
                res.send(response);
            }
        } catch (error) {
            console.error(error);
            res.status(500).send(config.message.error);
        }
    });

    // '/channels'というパスにGETリクエストが来たときに、現在のユーザーが参加しているチームのチャンネルの一覧を返す処理を定義
    app.get('/channels', async (req, res) => {
        try {
            const accessToken = req.cookies.access_token;
            if (accessToken == undefined) {
                res.redirect(config.endpoint.signin);
            }
            else {
                const response = await callMSGraph(config.endpoint.channels, accessToken, axios);
                res.send(response);
            }
        } catch (error) {
            console.error(error);
            res.status(500).send(config.message.error);
        }
    });

    // '/messages'というパスにGETリクエストが来たときに、現在のユーザーのTeamsチャネルにあるメッセージの本文を返す処理を定義
    app.get('/messages', async (req, res) => {
        try {
            const accessToken = req.cookies.access_token;
            if (accessToken == undefined) {
                res.redirect(config.endpoint.signin);
            }
            else {
                const response = await callMSGraph(config.endpoint.messages, accessToken, axios);
                const value = response.value;
                let messages = [];
                value.forEach(function(val){
                    messages.push(val.body.content);
                });
                res.send(messages);
            }
        } catch (error) {
            console.error(error);
            res.status(500).send(config.message.error);
        }
    });

    // chatsパスにアクセスした場合に、MS Graph APIを使用して.envで指定したIDのユーザーのチャット一覧を取得し、レスポンスとして返す
    app.get('/chats', async (req, res) => {
        try {
            const accessToken = req.cookies.access_token;
            if (accessToken == undefined) {
                res.redirect(config.endpoint.signin);
            }
            else {
                const response = await callMSGraph(config.endpoint.chats, accessToken, axios);
                res.send(response);
            }
        } catch (error) {
            console.error(error);
            res.status(500).send(config.message.error);
        }
    });

    // 認証コードの取得
    // '/signin'というパスにGETリクエストが来たときに、ユーザーをサインインページにリダイレクトする処理を定義
    app.get('/signin', async (req, res) => {
        try {
            // 委任されたアクセス
            var getAuthUrl = require('./auth.js');
            const signinUrl = getAuthUrl(config);
            res.redirect(signinUrl);
            // アプリ専用アクセス
        } catch (error) {
            console.error(error);
            res.status(500).send(config.message.error);
        }
    });

    // 認証コードの取得後、リダイレクトされて実行される
    app.get('/accesstoken', async (req, res) => {
        try {
            var getAccessToken = require('./token.js');
            const accessToken = await getAccessToken(req.query.code, config, axios);
            res.cookie("access_token", accessToken);
            res.redirect(config.endpoint.home);
        } catch (error) {
            console.error(error);
            res.status(500).send(config.message.error);
        }
    });
}