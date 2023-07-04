const { CosmosClient } = require("@azure/cosmos");
const { v4: uuidv4 } = require('uuid');

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
            console.log(value);
            let messages = [];
            value.forEach(function(val){
                messages.push(val.body.content);
            });
            res.send(value);
        } catch (error) {
            console.error(error);
            res.status(500).send(config.message.error);
        }
    });

    // '/messages'というパスにGETリクエストが来たときに、現在のユーザーのTeamsチャネルにあるメッセージの本文を返す処理を定義
    app.get('/messages/save', async (req, res) => {
        try {
            const endpoint = "https://azure-study-cosmosdb.documents.azure.com:443/";
            const key = "29V8BKfk46gLzzepo9EToMMHRH7YnCFnoGiKxxPYSz85CQpqfxsKlLcruFOI4Tl7nnfn64f05cexACDb7MVP6w==";
            const client = new CosmosClient({ endpoint, key });

            const databaseId = "TeamsDB";
            const containerId = "TeamsContainer";

            async function main() {
                const { database } = await client.databases.createIfNotExists({ id: databaseId });
                const { container } = await database.containers.createIfNotExists({ id: containerId });

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
                console.log("message1:", messages);

                value.forEach(function(val){
                    if (val.from) {
                        messages.push({
                            id: val.id,
                            message: val.body.content,
                            user: val.from.user.displayName || "N/A"
                        });
                    }
                });
                console.log("message:", messages);

                messages.forEach(async function(message){
                    const { resource: createdItem } = await container.items.create(message);
                    console.log(`Created item with id:\n${createdItem.id}\n`);
                });
            }

            main().catch((error) => {
                console.error("Error running sample:", error.message);
            });
            res.send("cosmosDBに無事にデータを保存しました");
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

    // cosmosDBの接続テスト
    app.get('/cosmos', async (req, res) => {
        try {
            const endpoint = "https://azure-study-cosmosdb.documents.azure.com:443/";
            const key = "29V8BKfk46gLzzepo9EToMMHRH7YnCFnoGiKxxPYSz85CQpqfxsKlLcruFOI4Tl7nnfn64f05cexACDb7MVP6w==";
            const client = new CosmosClient({ endpoint, key });

            const databaseId = "TeamsDB";
            const containerId = "TeamsContainer";

            async function main() {
                const { database } = await client.databases.createIfNotExists({ id: databaseId });
                const { container } = await database.containers.createIfNotExists({ id: containerId });

                const itemDefinition = {
                    id: uuidv4(),
                    user: "yu saito",
                    message: "aaa"
                };

                const { resource: createdItem } = await container.items.create(itemDefinition);
                console.log(`Created item with id:\n${createdItem.id}\n`);
            }

            main().catch((error) => {
                console.error("Error running sample:", error.message);
            });
            res.send("cosmosDBに接続しました。");
        } catch (error) {
            console.error(error);
            res.status(500).send(config.message.error);
        }
    });
}