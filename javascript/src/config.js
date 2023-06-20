// 環境変数を取得
const env = process.env.ENV;
const port = process.env.PORT;
const access = process.env.ACCESS;
const tenantId = process.env.TENANT_ID;
const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const userId = process.env.USER_ID;
const teamId = process.env.TEAM_ID;
const channelId = process.env.CHANNEL_ID;
const scopes = process.env.SCOPES.split(',').join(' ');
const scopesEncode = process.env.SCOPES.split(',').join('%20');
const localHomeUrl = process.env.LOCAL_HOME_URL;
const devHomeUrl = process.env.DEV_HOME_URL;
const localRedirectUrl = process.env.LOCAL_REDIRECT_URL;
const devRedirectUrl = process.env.DEV_REDIRECT_URL;
const homeUrl = env == 'local' ? localHomeUrl : env == 'dev' ? devHomeUrl : '';
const redirectUrl = env == 'local' ? localRedirectUrl : env == 'dev' ? devRedirectUrl : '';
const redirectEncodeUrl = redirectUrl.split(':').join('%3A').split('/').join('%2F');

// 文字列や、エンドポイントを定義したオブジェクトをモジュールとしてエクスポート
module.exports = {
    'message': {
        'welcome': 'Welcome to Azure App',
        'error': 'Internal Server Error',
        'meError': '/me cannot be used with app access'
    },
    'environment': {
        'env': `${env}`,
        'port': `${port}`,
        'access': `${access}`,
    },
    'id' : {
        'tenantId': `${tenantId}`,
        'clientId': `${clientId}`,
        'clientSecret': `${clientSecret}`,
        'userId': `${userId}`,
        'teamId': `${teamId}`,
        'channelId': `${channelId}`,
        'scopes': `${scopes}`,
        'scopesEncode': `${scopesEncode}`,
    },
    'endpoint': {
        'home': `${homeUrl}`,
        'redirect': `${redirectUrl}`,
        'redirectEncode': `${redirectEncodeUrl}`,
        'signin': `${homeUrl}/signin`,
        'msgraphClient': '@microsoft/microsoft-graph-client',
        'auth': `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/authorize`,
        'delegatedAccessToken': `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`,
        'appAccessToken': 'https://graph.microsoft.com/.default',
        'me': 'https://graph.microsoft.com/v1.0/me',
        'users': `https://graph.microsoft.com/v1.0/users/${userId}`,
        'teams': `https://graph.microsoft.com/v1.0/teams/${teamId}`,
        'channels': `https://graph.microsoft.com/v1.0/teams/${teamId}/channels`,
        'messages': `https://graph.microsoft.com/v1.0/teams/${teamId}/channels/${channelId}/messages`,
        'chats': `https://graph.microsoft.com/v1.0/users/${userId}/chats`,
    },
}