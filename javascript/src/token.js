// 認可コードを使い、Microsoft IDプラットフォームのトークンエンドポイントにリクエストして、アクセストークンを取得
// アクセストークンとは、リソースにアクセスするためのトークン

// 非同期関数を定義
// 引数として認可コードを受け取り、アクセストークンを返す
async function getAccessToken(code, axios) {
    // 環境変数を取得
    const env = process.env.ENV;
    const localRedirectUrl = process.env.LOCAL_REDIRECT_URL;
    const devRedirectUrl = process.env.DEV_REDIRECT_URL;
    const redirectUrl = env == 'local' ? localRedirectUrl : env == 'dev' ? devRedirectUrl : '';
  // optionsというオブジェクトを作成
  // このオブジェクトに、HTTPリクエストの設定を格納
  const options = {
    // リクエストのメソッドでPOSTと指定し、データを送信することを意味する
    method: 'POST',
    // リクエストのURLで、Microsoft IDプラットフォームのトークンエンドポイントのURLを指定
    url: "https://login.microsoftonline.com/" + process.env.TENANT_ID + "/oauth2/v2.0/token",
    // リクエストのヘッダー
    headers: {
      // データがURLエンコードされた形式で送信されることを意味
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    // リクエストのボディ
    data: {
      // クライアントアプリケーションのID
      client_id: process.env.CLIENT_ID,
      // アクセストークンでアクセスしたいリソースの範囲
      scope: process.env.SCOPES.split(',').join(' '),
      // 認可コード
      code: code,
      // アクセストークンを受け取るためのリダイレクト先のURL
      redirect_uri: redirectUrl,
      // トークンの種類
      // 認可コードフローでトークンを取得することを意味
      grant_type: 'authorization_code',
      // クライアントアプリケーションの秘密鍵
      client_secret: process.env.CLIENT_SECRET,
    }
  };
  // optionsというオブジェクトに指定されたHTTPリクエストを非同期で送信
  return await axios(options)
  // レスポンスが正常に受信された場合
  // レスポンスオブジェクトのdataプロパティにあるaccess_tokenという値を返す
  .then((response) => {
    return response.data.access_token;
  })
  // レスポンスがエラーになった場合
  // エラーオブジェクトをコンソールに出力し、undefinedという値を返す
  .catch((error) => {
    console.error(error);
    return undefined;
  });
}
// codeとaxiosの引数を受け取って、アクセストークンを返す非同期関数をモジュールとしてエクスポート
module.exports = async function(code, axios){
  // getAccessTokenという関数にcodeとaxiosを渡して、アクセストークンを非同期で取得
  // awaitキーワードを使って、Promiseが解決されるまで待機
  const accessToken = await getAccessToken(code, axios);
  return accessToken;
}