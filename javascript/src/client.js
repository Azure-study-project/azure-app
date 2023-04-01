// .envの読み込み
require('dotenv').config();

class MSGraphClient {
  constructor(){
    this.tenantId = process.env.TENANT_ID
    this.clientId = process.env.CLIENT_ID
    this.clientSecret = process.env.CLIENT_SECRET
  }

  getOptions(credential){
    options = {
      authProvider: async (done) => {
        const accessToken = await credential.getToken("https://graph.microsoft.com/.default");
        done(null, accessToken.token);
      },
    };
    return options;
  }

  getClient(){
    const ClientSecretCredential = require("@azure/identity");
    const credential = new ClientSecretCredential(tenantId, clientId, clientSecret);
    const options = this.getOptions(credential);
    var Client = require("@microsoft/microsoft-graph-client");
    return Client.init(options);
  }

  // ClientSecretCredentialは、Azure Identityライブラリで使用される認証プロバイダーの1つ
  // Azure ADに登録されたアプリケーションのクライアントIDとシークレットを使用してOAuth2.0トークンを取得するための認証プロバイダー
  // const { ClientSecretCredential } = require("@azure/identity");

  // Microsoft Graph APIを呼び出すためのクライアントライブラリ
  // HTTPリクエストを作成し、送信し、レスポンスを受信し、解析するための機能を提供
  // const { Client } = require("@microsoft/microsoft-graph-client");
}

exports.MSGraphClient = MSGraphClient;
// exports.Client = MSGraphClient.getClient;
