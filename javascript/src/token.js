// 認可コードを使い、Microsoft IDプラットフォームのトークンエンドポイントにリクエストして、アクセストークンを取得
// アクセストークンとは、リソースにアクセスするためのトークン

// 非同期関数を定義
// 引数として認可コードを受け取り、アクセストークンを返す
async function getDelegatedAccessToken(code, config, axios) {
  // optionsというオブジェクトを作成
  // このオブジェクトに、HTTPリクエストの設定を格納
  const options = {
    // リクエストのメソッドでPOSTと指定し、データを送信することを意味する
    method: 'POST',
    // リクエストのURLで、Microsoft IDプラットフォームのトークンエンドポイントのURLを指定
    url: config.endpoint.delegatedAccessToken,
    // リクエストのヘッダー
    headers: {
      // データがURLエンコードされた形式で送信されることを意味
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    // リクエストのボディ
    data: {
      // クライアントアプリケーションのID
      client_id: config.id.clientId,
      // アクセストークンでアクセスしたいリソースの範囲
      scope: config.id.scopes,
      // 認可コード
      code: code,
      // アクセストークンを受け取るためのリダイレクト先のURL
      redirect_uri: config.endpoint.redirect,
      // トークンの種類
      // 認可コードフローでトークンを取得することを意味
      grant_type: 'authorization_code',
      // クライアントアプリケーションの秘密鍵
      client_secret: config.id.clientSecret
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

async function getAppAccessToken(config){
  const { ClientSecretCredential } = require("@azure/identity");
  const credential = new ClientSecretCredential(config.id.tenantId, config.id.clientId, config.id.clientSecret);
  return await credential.getToken(config.endpoint.appAccessToken).then((response) => {
    return response.token;
  })
  .catch((error) => {
    console.error(error);
    return undefined;
  });;
}

// codeとconfigとaxiosの引数を受け取って、アクセストークンを返す非同期関数をモジュールとしてエクスポート
module.exports = async function(code, config, axios){
  const access = config.environment.access;
  if (access == 'delegate') {
    return await getDelegatedAccessToken(code, config, axios);
  }
  else if (access == 'app') {
    return await getAppAccessToken(config);
  }
  else {
    console.error('Invalid access type');
    return undefined;
  }
}