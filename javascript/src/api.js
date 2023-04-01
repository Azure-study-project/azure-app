// async function getUser() {
//     try {
//         const user = client.api('/users/1df57c8e-fd5d-41e1-8f17-d4a29bcc15b3').get();
//         return await user
//     } catch (error) {
//         console.error(error);
//     }
// }

// (async () => {
//     const user = await getUser();
//     console.log(user);
// })();

exports.routes = function(app, client){
    // appインスタンスに対して、GETリクエストが送信された場合に実行されるコールバック関数を定義
    // ルートパス(/)にGETリクエストが送信された場合、"Hi there"を返す
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
    
    app.get('/chats', async (req, res) => {
        try {
            const chats = await client.api('/users/1df57c8e-fd5d-41e1-8f17-d4a29bcc15b3/chats').get();
            res.send(chats);
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    });
}