// OAuth 2.0認可コードフローにより、クライアントアプリケーションで認可コードという一時的なトークンを取得
// 認可コードの取得後は、アクセストークンというリソースにアクセスするためのトークンを取得

// getAuthUrlという関数を定義
// この関数は、Microsoft IDプラットフォームの認証エンドポイントにリクエストするためのURLを作成して返す
function getAuthUrl(redirect) {
    // OAth 2.0認可コードフローを使って、Microsoft IDプラットフォームに対して認証と認可を実施
    const url = "https://login.microsoftonline.com/" + process.env.TENANT_ID + "/oauth2/v2.0/authorize?" + 
    // クライアントアプリケーションのID
    "client_id=" + process.env.CLIENT_ID + 
    //  レスポンスのタイプ
    // 認可コードを取得することを意味
    "&response_type=code" + 
    // 認可コードを受け取るためのリダイレクト先のURL
    "&redirect_uri=" + redirect.split(':').join('%3A').split('/').join('%2F') + 
    // レスポンスのモード
    // 認可コードをリダイレクト先のURLのクエリパラメータとして渡すことを意味
    "&response_mode=query" +
    // アクセストークンでアクセスしたいリソースの範囲
    "&scope=" +  process.env.SCOPES.split(',').join('%20') + 
    // クライアントアプリケーションが任意に指定できるパラメータ
    // リダイレクト先で認可コードを受け取ったときに、元のリクエストと一致するかどうかを確認するために利用
    "&state=12345";
    return url;
}
// 他のファイルからこの関数を呼び出せるように、関数をモジュールとしてエクスポート
module.exports = function(redirect){
    return getAuthUrl(redirect);
}