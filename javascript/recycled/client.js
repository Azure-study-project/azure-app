// MS Graph APIを使用してMicrosoft 365のデータにアクセスするためのクライアント
class MSGraphClient {
  // 3種類のプロパティを設定
  constructor(){
    this.tenantId = process.env.TENANT_ID
    this.clientId = process.env.CLIENT_ID
    this.clientSecret = process.env.CLIENT_SECRET
    this.scopes = process.env.SCOPES.split(',');
    this.msgraphClient = "@microsoft/microsoft-graph-client"
  }

  // 認証プロバイダーを定義し、クライアントを初期化するために必要なオプションを設定
  getDefaultProviders(credential){
    const providers = {
      authProvider: async (done) => {
        const accessToken = await credential.getToken("https://graph.microsoft.com/.default");
        done(null, accessToken.token);
      },
    };
    return providers;
  }

  // ClientSecretCredentialを使用して認証情報を取得し、MS Graph APIクライアントを初期化
  getSecretClient(){
    const { ClientSecretCredential } = require("@azure/identity");
    const credential = new ClientSecretCredential(this.tenantId, this.clientId, this.clientSecret);
    const providers = this.getDefaultProviders(credential);
    var { Client } = require(this.msgraphClient);
    const client = Client.init(providers);
    return client;
  }
}

// MS Graph APIクライアントをエクスポートする関数を定義
module.exports = function(){
  const msgc = new MSGraphClient();
  const client = msgc.getSecretClient();
  return client;
}