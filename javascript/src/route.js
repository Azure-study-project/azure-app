// Webアプリケーションのルーティングを定義
module.exports = function(app, config, getAccessToken, callMSGraph, axios){
    // ルートパスにアクセスした場合に返されるレスポンスを定義
    app.get('/', (req, res) => {
        res.send(config.message.welcome);
    });

    // meパスにアクセスした場合に、MS Graph APIを使用して現在のユーザーの情報を取得し、レスポンスとして返す
    app.get('/me', async (req, res) => {
        try {
            // reqオブジェクトのcookiesプロパティからアクセストークンを取得し、変数accessTokenに代入
            let accessToken = req.cookies.access_token;
            // 環境変数からアクセスの種類を取得
            const access = config.environment.access;
            // meは、アプリ専用アクセスでは使用できないため、エラーを出力
            if (access == 'app') {
                console.error(config.message.meError);
                res.status(500).send(config.message.meError);
            }
            // 委任されたアクセスかつアクセストークン未保存の場合は、サインインページにリダイレクト
            else if (accessToken == undefined && access == 'delegate') {
                res.redirect(config.endpoint.signin);
            }
            // アクセストークンがundefinedでない場合、Microsoft Graph APIにリクエストを送ってレスポンスを返す
            const response = await callMSGraph(config.endpoint.me, accessToken, axios);
            res.send(response);
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
            let accessToken = req.cookies.access_token;
            const access = config.environment.access;
            // アプリ専用アクセスかつアクセストークン未保存の場合は、アクセストークンを取得して保存
            if (accessToken == undefined && access == 'app') {
                accessToken = await getAccessToken(req.query.code, config, axios);
                res.cookie("access_token", accessToken);
            }
            // 委任されたアクセスかつアクセストークン未保存の場合は、サインインページにリダイレクト
            else if (accessToken == undefined && access == 'delegate') {
                res.redirect(config.endpoint.signin);
            }
            const response = await callMSGraph(config.endpoint.users, accessToken, axios);
            res.send(response);
        } catch (error) {
            console.error(error);
            res.status(500).send(config.message.error);
        }
    });

    // '/teams'というパスにGETリクエストが来たときに、現在のユーザーが参加しているチームの一覧を返す処理を定義
    app.get('/teams', async (req, res) => {
        // 非同期関数の中で、try-catch文を使ってエラー処理を実施
        try {
            let accessToken = req.cookies.access_token;
            const access = config.environment.access;
            // アプリ専用アクセスかつアクセストークン未保存の場合は、アクセストークンを取得して保存
            if (accessToken == undefined && access == 'app') {
                accessToken = await getAccessToken(req.query.code, config, axios);
                res.cookie("access_token", accessToken);
            }
            // 委任されたアクセスかつアクセストークン未保存の場合は、サインインページにリダイレクト
            else if (accessToken == undefined && access == 'delegate') {
                res.redirect(config.endpoint.signin);
            }
            const response = await callMSGraph(config.endpoint.teams, accessToken, axios);
            res.send(response);
        } catch (error) {
            console.error(error);
            res.status(500).send(config.message.error);
        }
    });

    // '/channels'というパスにGETリクエストが来たときに、現在のユーザーが参加しているチームのチャンネルの一覧を返す処理を定義
    app.get('/channels', async (req, res) => {
        try {
            let accessToken = req.cookies.access_token;
            const access = config.environment.access;
            // アプリ専用アクセスかつアクセストークン未保存の場合は、アクセストークンを取得して保存
            if (accessToken == undefined && access == 'app') {
                accessToken = await getAccessToken(req.query.code, config, axios);
                res.cookie("access_token", accessToken);
            }
            // 委任されたアクセスかつアクセストークン未保存の場合は、サインインページにリダイレクト
            else if (accessToken == undefined && access == 'delegate') {
                res.redirect(config.endpoint.signin);
            }
            const response = await callMSGraph(config.endpoint.channels, accessToken, axios);
            res.send(response);
        } catch (error) {
            console.error(error);
            res.status(500).send(config.message.error);
        }
    });

    // '/messages'というパスにGETリクエストが来たときに、現在のユーザーのTeamsチャネルにあるメッセージの本文を返す処理を定義
    app.get('/messages', async (req, res) => {
        try {
            let accessToken = req.cookies.access_token;
            const access = config.environment.access;
            // アプリ専用アクセスかつアクセストークン未保存の場合は、アクセストークンを取得して保存
            if (accessToken == undefined && access == 'app') {
                accessToken = await getAccessToken(req.query.code, config, axios);
                res.cookie("access_token", accessToken);
            }
            // 委任されたアクセスかつアクセストークン未保存の場合は、サインインページにリダイレクト
            else if (accessToken == undefined && access == 'delegate') {
                res.redirect(config.endpoint.signin);
            }
            const response = await callMSGraph(config.endpoint.messages, accessToken, axios);
            const value = response.value;
            let messages = [];
            value.forEach(function(val){
                messages.push(val.body.content);
            });
            res.send(messages);
        } catch (error) {
            console.error(error);
            res.status(500).send(config.message.error);
        }
    });

    // chatsパスにアクセスした場合に、MS Graph APIを使用して.envで指定したIDのユーザーのチャット一覧を取得し、レスポンスとして返す
    app.get('/chats', async (req, res) => {
        try {
            let accessToken = req.cookies.access_token;
            const access = config.environment.access;
            // アプリ専用アクセスかつアクセストークン未保存の場合は、アクセストークンを取得して保存
            if (accessToken == undefined && access == 'app') {
                accessToken = await getAccessToken(req.query.code, config, axios);
                res.cookie("access_token", accessToken);
            }
            // 委任されたアクセスかつアクセストークン未保存の場合は、サインインページにリダイレクト
            else if (accessToken == undefined && access == 'delegate') {
                res.redirect(config.endpoint.signin);
            }
            const response = await callMSGraph(config.endpoint.chats, accessToken, axios);
            res.send(response);
        } catch (error) {
            console.error(error);
            res.status(500).send(config.message.error);
        }
    });

    // 認証コードの取得
    // '/signin'というパスにGETリクエストが来たときに、ユーザーをサインインページにリダイレクトする処理を定義
    app.get('/signin', async (req, res) => {
        try {
            var getAuthUrl = require('./auth.js');
            const signinUrl = getAuthUrl(config);
            res.redirect(signinUrl);   
        } catch (error) {
            console.error(error);
            res.status(500).send(config.message.error);
        }
    });

    // 認証コードの取得後、リダイレクトされて実行される
    app.get('/accesstoken', async (req, res) => {
        try {
            const accessToken = await getAccessToken(req.query.code, config, axios);
            res.cookie("access_token", accessToken);
            res.redirect(config.endpoint.home);
        } catch (error) {
            console.error(error);
            res.status(500).send(config.message.error);
        }
    });
}