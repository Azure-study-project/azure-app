// Webアプリケーションのルーティングを定義
module.exports = function(app, client){
    // ルートパスにアクセスした場合に返されるレスポンスを定義
    app.get('/', (req, res) => {
        res.send('Welcome to Azure App');
    });
    
    // aboutパスにアクセスした場合に返されるレスポンスを定義
    app.get('/about', (req, res) => {
        res.send('about')
    })
    
    // meパスにアクセスした場合に、MS Graph APIを使用して現在のユーザーの情報を取得し、レスポンスとして返す
    app.get('/me', async (req, res) => {
        try {
            const me = await client.api('/me').get();
            res.send(me);
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    });

    // userパスにアクセスした場合に、MS Graph APIを使用して.envで指定したIDのユーザーの情報を取得し、レスポンスとして返す
    app.get('/user', async (req, res) => {
        try {
            const userId = process.env.USER_ID;
            const yu = await client.api(`/users/${userId}`).get();
            res.send(yu);
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    });
    
    // chatsパスにアクセスした場合に、MS Graph APIを使用して.envで指定したIDのユーザーのチャット一覧を取得し、レスポンスとして返す
    app.get('/chats', async (req, res) => {
        try {
            const chats = await client.api(`/users/${userId}`).get();
            res.send(chats);
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    });
}