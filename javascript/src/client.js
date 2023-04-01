// MS Graph APIを使用してMicrosoft 365のデータにアクセスするためのクライアント
class MSGraphClient {
  // 3種類のプロパティを設定
  constructor(){
    this.tenantId = process.env.TENANT_ID
    this.clientId = process.env.CLIENT_ID
    this.clientSecret = process.env.CLIENT_SECRET
  }

  // 認証プロバイダーを定義し、クライアントを初期化するために必要なオプションを設定
  setOptions(credential){
    const options = {
      authProvider: async (done) => {
        const accessToken = await credential.getToken("https://graph.microsoft.com/.default");
        done(null, accessToken.token);
      },
    };
    return options;
  }

  // ClientSecretCredentialを使用して認証情報を取得し、MS Graph APIクライアントを初期化
  getClient(){
    const { ClientSecretCredential } = require("@azure/identity");
    const credential = new ClientSecretCredential(this.tenantId, this.clientId, this.clientSecret);
    const options = this.setOptions(credential);
    var { Client } = require("@microsoft/microsoft-graph-client");
    const client = Client.init(options);
    return client;
  }
}

// MS Graph APIクライアントをエクスポートする関数を定義
module.exports = function(){
  const msgc = new MSGraphClient();
  const client = msgc.getClient();
  return client;
}