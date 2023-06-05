// 環境変数を取得
const env = process.env.ENV;
const localHomeUrl = process.env.LOCAL_HOME_URL;
const devHomeUrl = process.env.DEV_HOME_URL;
const homeUrl = env == 'local' ? localHomeUrl : env == 'prod' ? devHomeUrl : '';
const userId = process.env.USER_ID;
const teamId = process.env.TEAM_ID;
const channelId = process.env.CHANNEL_ID;

// Microsoft Graph APIのエンドポイントを定義したオブジェクトをモジュールとしてエクスポート
module.exports = {
    'home': `${homeUrl}`,
    'signin': `${homeUrl}/signin`,
    'me': 'https://graph.microsoft.com/v1.0/me',
    'users': `https://graph.microsoft.com/v1.0/users/${userId}`,
    'teams': `https://graph.microsoft.com/v1.0/teams/${teamId}`,
    'channels': `https://graph.microsoft.com/v1.0/teams/${teamId}/channels`,
    'messages': `https://graph.microsoft.com/v1.0/teams/${teamId}/channels/${channelId}/messages`,
    'chats': `https://graph.microsoft.com/v1.0/users/${userId}/chats`,
}