// 環境変数からユーザーID、チームID、チャンネルIDを取得
const redirectUrl = process.env.BASE_URL;
const userId = process.env.USER_ID;
const teamId = process.env.TEAM_ID;
const channelId = process.env.CHANNEL_ID;

// Microsoft Graph APIのエンドポイントを定義したオブジェクトをモジュールとしてエクスポート
module.exports = {
    'localhost': `${redirectUrl}`,
    'signin': `${redirectUrl}/signin`,
    'me': 'https://graph.microsoft.com/v1.0/me',
    'users': `https://graph.microsoft.com/v1.0/users/${userId}`,
    'teams': `https://graph.microsoft.com/v1.0/teams/${teamId}`,
    'channels': `https://graph.microsoft.com/v1.0/teams/${teamId}/channels`,
    'messages': `https://graph.microsoft.com/v1.0/teams/${teamId}/channels/${channelId}/messages`,
    'chats': `https://graph.microsoft.com/v1.0/users/${userId}/chats`,
}